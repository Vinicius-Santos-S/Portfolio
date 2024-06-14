import { motion } from 'framer-motion'
import Project from './project'
import projectStyle from '../projects.module.scss'
import { projectDataType } from '../../../types'
interface IProps {
  data: projectDataType[]
  filter: string
}

const ProjectList: React.FC<IProps> = ({ data, filter }) => {
  const filterByTechName = (projects: projectDataType[], techName: string): projectDataType[] => {
    if(filter){
      return projects.filter(project => project.technology.techName === techName);
    }
    else {
      return projects
    }
  };

  const listAnimations = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    hidden: {
      opacity: 1,
    },
  }

  const listItemAnimations = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0 },
    hovering: { scale: 1.07 }
  }

  return (
    <>
      <motion.ul
        className={projectStyle.projectList}
        key={filter}
        initial="hidden"
        animate="visible"
        variants={listAnimations}
      >
        
        {/* {
          filterByKey(data, "proLanguage", filter).map((project, index) =>
            <Project
              key={index}
              animation={listItemAnimations}
              project={project}
            />
          )
        } */}
        {
          filterByTechName(data, filter).map((project, index) =>
            <Project
              key={index}
              animation={listItemAnimations}
              project={project}
            />
          )
        }

      </motion.ul>
    </>
  )
}


export default ProjectList  