const { test } = require('node:test')
const assert = require('node:assert/strict')
const vm = require('node:vm')
const { build } = require('esbuild')

test('music fades, repeats, remembers mute and cleans up on unmount', async () => {
  const bundle = await build({
    entryPoints: ['src/components/BackgroundMusic.jsx'],
    bundle: true, write: false, format: 'cjs', jsx: 'automatic',
    plugins: [{
      name: 'isolate-audio-component',
      setup(builder) {
        builder.onResolve({ filter: /^(react|react\/jsx-runtime|lucide-react)$/ }, args => ({ path: args.path, external: true }))
        builder.onResolve({ filter: /ThemeContext/ }, () => ({ path: 'theme', external: true }))
        builder.onResolve({ filter: /\.mp3$/ }, () => ({ path: 'track', external: true }))
      },
    }],
  })
  let effect, audio, frameId = 0
  const frames = new Map()
  const events = new Map()
  const storage = new Map()
  const states = []
  const modules = {
    react: {
      useEffect: callback => { effect = callback },
      useRef: value => ({ current: value }),
      useState: value => { const index = states.push(value) - 1; return [value, next => { states[index] = next }] },
    },
    'react/jsx-runtime': { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) },
    'lucide-react': { Volume2: 'volume', VolumeX: 'mute' },
    theme: { useTheme: () => ({ isDarkMode: true }) },
    track: 'music.mp3',
  }
  class FakeAudio {
    constructor() { audio = this; this.paused = true; this.duration = 100; this.currentTime = 0; this.events = new Map() }
    play() { this.paused = false; return Promise.resolve() }
    pause() { this.paused = true }
    addEventListener(name, callback) { this.events.set(name, callback) }
    removeEventListener(name) { this.events.delete(name) }
    removeAttribute() {}
    load() {}
  }
  const context = {
    module: { exports: {} }, require: name => modules[name], Audio: FakeAudio,
    localStorage: { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value) },
    window: { addEventListener: (name, callback) => events.set(name, callback), removeEventListener: name => events.delete(name) },
    requestAnimationFrame: callback => { frames.set(++frameId, callback); return frameId },
    cancelAnimationFrame: id => frames.delete(id),
  }
  vm.runInNewContext(bundle.outputFiles[0].text, context)
  const render = context.module.exports.default
  const button = render()
  const cleanup = effect()
  let now = 0
  const advance = (time, count = 100) => {
    audio.currentTime = time
    for (let i = 1; i <= count; i++) {
      const pending = [...frames.values()]
      frames.clear()
      now += 16
      pending.forEach(callback => callback(now))
    }
  }
  assert.equal(audio.paused, true, 'no sound before interaction')
  events.get('pointerdown')({ type: 'pointerdown', target: { closest: () => null } })
  await new Promise(setImmediate)
  advance(0)
  assert.equal(audio.volume, 0)
  advance(10)
  assert.ok(audio.volume > 0.3 && audio.volume <= 0.32)
  advance(99)
  assert.ok(audio.volume < 0.06, 'track fades before ending')
  audio.events.get('ended')()
  await new Promise(setImmediate)
  assert.equal(audio.currentTime, 0)
  assert.equal(audio.volume, 0)
  advance(10)
  button.props.onClick()
  advance(10)
  assert.equal(audio.paused, true, 'mute fades then pauses')
  assert.equal(storage.get('music-muted'), 'true')
  button.props.onClick()
  await new Promise(setImmediate)
  advance(10)
  assert.equal(audio.paused, false)
  assert.equal(storage.get('music-muted'), 'false')
  cleanup()
  assert.equal(frames.size, 0)
  assert.equal(events.size, 0)
  assert.equal(audio.paused, true)
  storage.set('music-muted', 'true')
  render()
  const cleanupMuted = effect()
  events.get('pointerdown')({ type: 'pointerdown', target: { closest: () => null } })
  assert.equal(audio.paused, true, 'saved mute prevents automatic playback')
  cleanupMuted()
})
