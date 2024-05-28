import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Template from '../template'
import projectStyle from './projects.module.scss'

function Projects() {
  interface projectDataType {
    name: string,
    info: string
    proLanguage: string,
    image: string,
    link: string
  };
  
  interface IProps {
    filter: string;
  }
  
  const [currentFilter, setCurrentFilter] = useState<string>("")

  const projectsDataTest: projectDataType[] = [
    {
      name: "Tic-tac-toe Game",
      info: "Simple tic-tac-toe game using react",
      proLanguage: "Python",
      image: "url",
      link: "string"
    },
    {
      name: "Tic-tac-toe Game",
      info: "Simple tic-tac-toe game using react",
      proLanguage: "React",
      image: "url",
      link: "string"
    },
    {
      name: "Tic-tac-toe Game",
      info: "Simple tic-tac-toe game using react",
      proLanguage: "React.js",
      image: "url",
      link: "string"
    },
    {
      name: "Tic-tac-toe Game",
      info: "Simple tic-tac-toe game using react",
      proLanguage: "React.js",
      image: "url",
      link: "string"
    },
    {
      name: "Tic-tac-toe Game",
      info: "Simple tic-tac-toe game using react",
      proLanguage: "React.js",
      image: "url",
      link: "string"
    },
  ];

  function getFields<T>(input: Array<T>, field: keyof T): Array<T[keyof T]>  {
    const output: Array<T[keyof T]> = [];
    for (let i = 0; i < input.length; ++i) {
      output.push(input[i][field]);
    }
    return output;
  }
  
  type KeyOf<T> = keyof T;

  function filterByKey<T>(array: T[], key: KeyOf<T>, value: any): T[] {
    return array.filter(item => item[key] === value);
  }

  const Filter = () => {
    const programmingLanguages: string[] = getFields(projectsDataTest, "proLanguage");
    const TreatedLanguages: string[] = [...new Set(programmingLanguages)];

    const handleClick = (language:string) => {
      if(currentFilter === language){
        setCurrentFilter("")
      }
      else{
        setCurrentFilter(language)
      }
    } 


    return (
      <div className={projectStyle.filterBar}>
        {
          TreatedLanguages.map((language, index) => 
            <motion.div 
              className={projectStyle.filterButton}
              key={index}
              onClick={() => handleClick(language)}
              animate={{ 
                backgroundColor: currentFilter === language ? "rgba(222, 222, 222, 1)" : "rgba(222, 222, 222, 0.1)", 
                color: currentFilter === language ? "rgb(27, 27, 27)" : "rgb(222, 222, 222)"
              }}
              whileHover={{
                backgroundColor: "rgba(222, 222, 222, 1)",
                color: "rgb(27, 27, 27)"
              }}
            >
              {language}
            </motion.div>
          )
        }
      </div>
    )
  }

  const ProjectList: React.FC<IProps> = ( { filter } ) => {
    if(filter === ""){
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
          projectsDataTest.map((project, index) =>
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
                    <div className={projectStyle.projectImage}/>
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
          key={"withoutFilter"}
          variants={container}
          initial="hidden"
          animate="show"
          exit="hidden"  
        >
          {
            filterByKey(projectsDataTest, "proLanguage", currentFilter).map((project, index) =>
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
                      <div className={projectStyle.projectImage}/>
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

  const container = {
    hidden: { opacity: 1},
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


  return (
    <Template>
      <main className={projectStyle.projectContainer}>
        <div className={projectStyle.projectWrapper}>
          <h1>Projects</h1>
          <Filter/>
          <AnimatePresence mode='wait'>
            <ProjectList filter={currentFilter}/>
          </AnimatePresence>
        </div>
      </main>
    </Template>
  )
}

export default Projects
