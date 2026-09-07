// eslint-disable-next-line no-unused-vars
import {motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

import { FiGithub

 } from 'react-icons/fi'
const ProjectCard = ({project}) => {

  const cardVariants = {
    hidden: {  y: 20, opacity: 0 },
    visible: { 
       y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };
  return <motion.div
            variants={cardVariants}
            whileHover={{
              y: -8,
              transition: {
                duration: 0.3,
                ease: 'easeOut',
              },
            }}  
            className="group relative"
            >
              <div className="cyber-card cyber-card-hover record-card overflow-hidden transition-all duration-500">

                {/* Project Image */}
                <div className='relative overflow-hidden'>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Featured badge */}
                  {project.featured && (
                    <div className='absolute top-4 left-4'>
                        <span className='cyber-cta text-xs px-3 py-1 rounded-full font-medium'>
                            Destacado
                        </span>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div  className='absolute top-4 right-4'>
                        <span
                            className="cyber-chip text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm"
                        >
                            {project.category}
                        </span>
                  </div>  

                  {/* hover overlay with CTA buttons */}
                        <motion.div
                            initial={{opacity:0}}
                            whileHover={{opacity:1}}
                            transition={{duration:0.3}}
                            className='absolute inset-0 bg-[#07100f]/72 backdrop-blur-sm flex items-center justify-center space-x-4'
                        >
                          <motion.a
                            href={project.liveUrl}
                            initial={{y: 20, opacity:0.5}}
                            whileHover={{y:0, opacity:1, scale:1.05}}
                            transition={{duration:0.3, delay:0.1}}
                            className='cyber-cta px-4 py-2 rounded-full flex items-center space-x-2 text-sm font-medium transition-colors'
                          >
                            <ExternalLink size={16} />
                            <span>Ver demo</span>
                          </motion.a>

                          <motion.a
                            href={project.githubUrl}
                            initial={{y: 20, opacity:0.5}}
                            whileHover={{y:0, opacity:1, scale:1.05}}
                            transition={{duration:0.3, delay:0.2}}
                            className="border border-white/70 text-white hover:bg-white hover:text-[#101c1f] px-4 py-2 rounded-full flex items-center space-x-2 text-sm font-medium transition-all"
                          >
                            <FiGithub size={16} />
                            <span>GitHub</span>
                          </motion.a>

                        </motion.div>

                

                </div>

                {/** Project Details */}
                <div className='p-6'>
                  <h3 className='text-xl font-medium mb-3 group-hover:text-[#00ed9a] transition-colors'>
                    {project.title}
                  </h3>

                  <p className="cyber-muted-text text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  {/** Tech Stack  Tags*/}
                  <div className='flex flex-wrap gap-2'>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="cyber-chip text-xs px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
        </motion.div>
}

export default ProjectCard
