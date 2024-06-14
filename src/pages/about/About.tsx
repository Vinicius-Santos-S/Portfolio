import React, { useEffect, useState } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import aboutStyles from './about.module.scss';
import { Link } from 'react-router-dom';
import DivInView from './divInView';
import styleVariables from '../../_variables.module.scss';
import LoadingDiv from '../../components/loadingAnimation/loadingDiv';
import { fetchTechnologies } from '../../service/firebaseConfig';
import { technologiesDataType } from '../../types'

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
  const [technologiesData, setTechnologiesData] = useState<technologiesDataType[]>([])
  const [isloading, setIsLoading] = useState(true)
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const fetchedData = await fetchTechnologies();
      setTechnologiesData(fetchedData);
      setIsLoading(false)
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
  const proficiencesAnimation = useAnimation();   
  
  useEffect(() => {
    const sequence = async () => {
      await mainAnimation.start('animateMain');
      await titleAnimation.start('animateTitle');
      await aboutCeapAnimation.start('animateAboutCeap');
      await proficiencesAnimation.start('animate')
    };
    sequence();
  }, [mainAnimation, titleAnimation, aboutCeapAnimation, proficiencesAnimation]);
  
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
          <p>I am a developer with a solid foundation from <a href="https://ceappedreira.org.br/">CEAP</a>, where I learned essential programming and web development skills. It was at CEAP that I discovered my passion for programming, and I am very grateful for the contribution that the institution has made in my life.</p>
        </div>
        <div className={aboutStyles.ceapImage}/>
      </motion.div>

      <motion.div
        className={aboutStyles.gridInView}
        variants={animationsInstructions.proficiences}
        initial={"initial"}
        animate={proficiencesAnimation}
      >

        <DivInView classToReceive="proficiencesContainer" variants={animationsInstructions.proficiences}>
          <h2>What I Have Learned and Know</h2>
          <AnimatePresence>
          {
            isloading ?
            <LoadingDiv currentColor={currentColor}/>
            :
            <div className={aboutStyles.proficiencesGrid}>
              {
                technologiesData.map((technologie, index) =>
                  <div
                    className={aboutStyles.proficienceDiv}
                    key={index}
                  >
                    <div
                      className={aboutStyles.icon}
                      style={{ 
                        backgroundImage: `url(${technologie.techIconUrl})` 
                      }}
                    />
                    <h3
                      style={{
                        color: technologie.techColor
                      }}
                    >
                      {technologie.techName}
                    </h3>
                  </div>
                )
              }
            </div>
          }
          </AnimatePresence>
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
      </motion.div>
    </motion.div>
  )
}

export default About
