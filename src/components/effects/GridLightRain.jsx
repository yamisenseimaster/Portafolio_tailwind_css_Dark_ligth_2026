const BEAMS = [
  { left: '6%', delay: '-2.4s', duration: '7.8s', height: '150px' },
  { left: '14.8%', delay: '-5.2s', duration: '9.4s', height: '210px' },
  { left: '24.4%', delay: '-1.1s', duration: '8.6s', height: '170px' },
  { left: '33.2%', delay: '-6.7s', duration: '10.2s', height: '230px' },
  { left: '42.9%', delay: '-3.3s', duration: '8.9s', height: '180px' },
  { left: '52.1%', delay: '-7.6s', duration: '11.2s', height: '250px' },
  { left: '61.5%', delay: '-.8s', duration: '8.1s', height: '160px' },
  { left: '70.4%', delay: '-4.9s', duration: '9.8s', height: '220px' },
  { left: '79.8%', delay: '-2s', duration: '8.4s', height: '175px' },
  { left: '88.9%', delay: '-6.1s', duration: '10.6s', height: '240px' },
  { left: '96%', delay: '-3.8s', duration: '9.1s', height: '190px' },
];

export default function GridLightRain() {
  return (
    <div className="grid-light-rain" aria-hidden="true">
      {BEAMS.map((beam) => (
        <span
          key={`${beam.left}-${beam.delay}`}
          style={{
            '--beam-left': beam.left,
            '--beam-delay': beam.delay,
            '--beam-duration': beam.duration,
            '--beam-height': beam.height,
          }}
        />
      ))}
    </div>
  );
}
