import { useState } from 'react'
import { motion } from 'framer-motion'
import { isMobile } from 'react-device-detect';

import projectStyle from '../projects.module.scss'

import { projectDataType } from '../../../types'

interface keyIndex {
  project: projectDataType 
  animation: any
}

const Project: React.FC<keyIndex> = ({ project, animation }) => {
  const [isOpen, setIsOpen] = useState(false)
  if (isMobile) {
    return (
      <motion.li
        className={projectStyle.projectCard}
        variants={animation}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundImage: `url(${project.projectImageUrl})`
        }}
      >
        <motion.div
          className={projectStyle.projectInfo}
          animate={{
            opacity: isOpen ? 1 : 0
          }}
        >
          <h3>{project.name}</h3>
          <p>{project.info}</p>
          <div className={projectStyle.projectSeeLanguage}>
            <motion.a
              href={project.link}
              animate={{
                backgroundColor: "rgba(222, 222, 222, 0.1)",
                color: "rgb(222, 222, 222)"
              }}
              whileHover={{
                backgroundColor: "rgba(222, 222, 222, 1)",
                color: "rgb(27, 27, 27)"
              }}
            >
              See project!
            </motion.a>
            <div className={projectStyle.projectLanguageBox}>
              <p style={{ color: project.technology.techColor }}>{project.technology.techName}</p>
              <div
                className={projectStyle.projectLanguageIcon}
                style={{
                  backgroundImage: `url(${project.technology.techIconUrl})`
                }}
              />
            </div>
          </div>
        </motion.div>
      </motion.li>
    )
  }
  else {
    return (
      <motion.li
        className={projectStyle.projectCard}
        variants={animation}
        style={{
          backgroundImage: `url(${project.projectImageUrl})`
        }}
      >
        <motion.div
          className={projectStyle.projectInfo}
          whileHover={{
            opacity: 1
          }}
        >
          <h3>{project.name}</h3>
          <p>{project.info}</p>
          <div className={projectStyle.projectSeeLanguage}>
            <motion.a
              href={project.link}
              animate={{
                backgroundColor: "rgba(222, 222, 222, 0.1)",
                color: "rgb(222, 222, 222)"
              }}
              whileHover={{
                backgroundColor: "rgba(222, 222, 222, 1)",
                color: "rgb(27, 27, 27)"
              }}
            >
              See project!
            </motion.a>
            <div className={projectStyle.projectLanguageBox}>
              <p style={{ color: project.technology.techColor }}>{project.technology.techName}</p>
              <div
                className={projectStyle.projectLanguageIcon}
                style={{
                  backgroundImage: `url(${project.technology.techIconUrl})`
                }}
              />
            </div>
          </div>
        </motion.div>
      </motion.li>
    )
  }
}
export default Project