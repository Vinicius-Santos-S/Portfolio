import { motion } from 'framer-motion'
import Project from './project'
import projectStyle from '../projects.module.scss'
import { clientSideProjectDataType } from '../../../types'
interface IProps {
  data: clientSideProjectDataType[]
  filter: string
}

const ProjectList: React.FC<IProps> = ({ data, filter }) => {
  type KeyOf<T> = keyof T;

  function filterByKey<T>(array: T[], key: KeyOf<T>, value: any): T[] {
    if (value) {
      return array.filter(item => item[key] === value);
    }
    else {
      return array
    }
  }

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
        
        {
          filterByKey(data, "proLanguage", filter).map((project, index) =>
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