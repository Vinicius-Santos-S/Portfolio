import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import aboutStyles from './about.module.scss';
import { Link } from 'react-router-dom';
import DivInView from './gridInView/divInView';
import styleVariables from '../../_variables.module.scss';

import { readDocuments } from '../../service/firebaseConfig';
import { clientSideProjectDataType } from '../../types'

interface Iprop {
  currentColor: string
}


// const testData: projectDataType[] = [
//   {
//     name: 'uga',
//     info: 'uga',
//     proLanguage: 'React',
//     prolanguageColor: 'rgb(97, 219, 251)',
//     proLanguageIconUrl: reactIcon,
//     projectImageId: 'uga',
//     projectImageUrl: 'uga',
//     link: 'uga',
//   },
//   {
//     name: 'uga',
//     info: 'uga',
//     proLanguage: 'Python',
//     prolanguageColor: 'rgb(75, 139, 190)',
//     proLanguageIconUrl: pythonIcon,
//     projectImageId: 'uga',
//     projectImageUrl: 'uga',
//     link: 'uga',
//   },
//   {
//     name: 'uga',
//     info: 'uga',
//     proLanguage: 'C',
//     prolanguageColor: 'rgb(92, 107, 192)',
//     proLanguageIconUrl: cIcon,
//     projectImageId: 'uga',
//     projectImageUrl: 'uga',
//     link: 'uga',
//   }
// ]



const About: React.FC<Iprop> = ({currentColor}) => {
  const [projectsData, setProjectsData] = useState<clientSideProjectDataType[]>([]);
  useEffect(() => {
    async function fetchData() {
      const fetchedData = await readDocuments('Projects');
      setProjectsData(fetchedData);
    }
    fetchData();
  }, []);
  
  const animationsInstructions = {
    main: {
      initialMain: { x: 1000 },
      animateMain: { x: 0 },
      exitMain: { x: -1250 },
    },
    title: {
      animateTitle: { color: currentColor }
    },
    aboutCeap: {
      initialAboutCeap: { opacity: 0 },
      animateAboutCeap: { opacity: 1, transition: { delay: 0.6 } }
    },
    proficiences: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    button: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      hovering: {
        color: styleVariables.black,
        backgroundColor: styleVariables.babyPowder
      }
    } 

  }

  const mainAnimation = useAnimation();
  const titleAnimation = useAnimation();
  const aboutCeapAnimation = useAnimation();  
  
  useEffect(() => {
    const sequence = async () => {
      await mainAnimation.start('animateMain');
      await titleAnimation.start('animateTitle');
      await aboutCeapAnimation.start('animateAboutCeap');
    };
    sequence();
  }, [mainAnimation, titleAnimation, aboutCeapAnimation]);
  
  return (
    <motion.div className={aboutStyles.mainDiv}
      variants={animationsInstructions.main}
      initial="initialMain"
      animate={mainAnimation}
      exit="exitMain"
      transition={{ 
        type: 'spring', 
        stiffness: 120, 
        damping: 20, 
        duration: 0.5, 
        ease: 'easeOut'
      }}
    >
      <motion.h1
        variants={animationsInstructions.title}
        animate={titleAnimation}
      >
        About me
      </motion.h1>

      <motion.div 
        className={aboutStyles.aboutCeapAndMe}
        variants={animationsInstructions.aboutCeap}
        initial="initialAboutCeap"
        animate={aboutCeapAnimation}
      >
        <div className={aboutStyles.info}>
          <h2>About me and CEAP</h2>
          <p>I am a developer with a solid foundation from CEAP, where I learned essential programming and web development skills.</p>
        </div>
        <div className={aboutStyles.ceapImage}/>
      </motion.div>

      <div className={aboutStyles.gridInView}>
        <DivInView classToReceive="proficiencesContainer" variants={animationsInstructions.proficiences}>
          <h2>What i know</h2>
          <div className={aboutStyles.proficiencesGrid}>
            {
              projectsData.map((project, index) =>
                <div
                  className={aboutStyles.proficienceDiv}
                  key={index}
                >
                  <div
                    className={aboutStyles.icon}
                    style={{ 
                      backgroundImage: `url(${project.proLanguageIconUrl})` 
                    }}
                  />
                  <h3
                    style={{
                      color: project.prolanguageColor
                    }}
                  >
                    {project.proLanguage}
                  </h3>
                </div>
              )
            }
          </div>
        </DivInView>
        <DivInView classToReceive="buttonContainer" variants={animationsInstructions.button}>
          <Link to={"/projects"}>
            <motion.div
              variants={animationsInstructions.button}
              className={aboutStyles.button}
              whileHover="hovering"
            >
                Check my projects
            </motion.div>
          </Link>
        </DivInView>
      </div>
    </motion.div>
  )
}

export default About
