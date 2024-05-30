import { motion } from 'framer-motion'

import projectStyle from './projects.module.scss'

import projectDataType from '../../types'

interface IProps {
  data: projectDataType[]
  filter: string
}

const ProjectList: React.FC<IProps> = ({ data, filter }) => {
  type KeyOf<T> = keyof T;

  function filterByKey<T>(array: T[], key: KeyOf<T>, value: any): T[] {
    return array.filter(item => item[key] === value);
  }

  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  }

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }

  if (filter === "") {
    return (
      <motion.ul
        className={projectStyle.projectList}
        key={"withoutFilter"}
        variants={container}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        {
          data.map((project, index) =>
            <motion.li
              className={projectStyle.projectCard}
              key={index}
              variants={item}
            >
              <h3>{project.name}</h3>
              <div 
                className={projectStyle.projectInfo}
                style={{
                  backgroundImage: `url(${project.imageUrl})`
                }}  
              >
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
                    <p>{project.proLanguage}</p>
                    <div  
                      className={projectStyle.projectImage} 
                      style={{
                        backgroundImage:`url(${project.iconUrl})`
                      }}  
                    />
                  </div>
                </div>
              </div>
            </motion.li>
          )
        }
      </motion.ul>
    )
  }
  else {
    return (
      <motion.ul
        className={projectStyle.projectList}
        key={"withFilter"}
        variants={container}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        {
          filterByKey(data, "proLanguage", filter).map((project, index) =>
            <motion.li
              className={projectStyle.projectCard}
              key={index}
              variants={item}
            >
              <h3>{project.name}</h3>
              <div className={projectStyle.projectInfo}>
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
                    <p>{project.proLanguage}</p>
                    <div className={projectStyle.projectImage} />
                  </div>
                </div>
              </div>
            </motion.li>
          )
        }

      </motion.ul>

    )
  }


}


export default ProjectList  