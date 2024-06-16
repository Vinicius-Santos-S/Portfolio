import React, { useEffect, useState } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import aboutStyles from './about.module.scss';
import { Link } from 'react-router-dom';
import DivInView from '../../components/divInView/divInView';
import AwaitAnimationDiv from '../../components/awaitAnimationDiv/awaitAnimationDiv';
import styleVariables from '../../_variables.module.scss';
import LoadingDiv from '../../components/loadingAnimation/loadingDiv';
import { fetchTechnologies } from '../../service/firebaseConfig';
import { technologiesDataType } from '../../types'

interface Iprop {
  currentColor: string
}

const About: React.FC<Iprop> = ({ currentColor }) => {
  const [technologiesData, setTechnologiesData] = useState<technologiesDataType[]>([])
  const [isloading, setIsLoading] = useState(true)

  
  const getFields = (technologiesData: technologiesDataType[]) => {
    const array = []
    for (const technologyData of technologiesData) {
      array.push(technologyData.techType)
    }
    return [...new Set(array)]
  };

  const filterByTechType = (technologie: technologiesDataType[], techType: string): technologiesDataType[] => {
    return technologie.filter(project => project.techType === techType);
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const fetchedData = await fetchTechnologies();
      setTechnologiesData(fetchedData);
      setIsLoading(false)
    }
    fetchData();
  }, []);

  const mainAnimation = useAnimation();
  const titleAnimation = useAnimation();
  const aboutCeapAnimation = useAnimation();
  const gridInViewAnimation = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await mainAnimation.start('animateMain');
      await titleAnimation.start('animateTitle');
      await aboutCeapAnimation.start('animateAboutCeap');
      await gridInViewAnimation.start('animateGridInView')
    };
    sequence();
  }, [mainAnimation, titleAnimation, aboutCeapAnimation, gridInViewAnimation]);

  const animationsInstructions = {
    main: {
      initialMain: { x: 1000 },
      animateMain: { x: 0 },
      exitMain: { x: -1250 },
    },

    titleContainer: {
      initial: {
      },
      animateTitle: {
        color: currentColor,
      }
    },

    aboutCeapAndMeContainer: {
      initial: {
        opacity: 0
      },
      animateAboutCeap: {
        opacity: 1,
        transition: { delay: 0.6 }
      }
    },

    gridInViewContainer: {
      initial: {
        opacity: 0
      },
      animateGridInView: {
        opacity: 1,
        transition: { delay: 0.6 }
      }
    },

    proficiencesContainer: {
      initial: {
        opacity: 0
      },
      animate: {
        opacity: 1
      }
    },

    buttonContainer: {
      initial: {
        opacity: 0
      },
      animate: {
        opacity: 1
      }
    }
  }

  const awaitAnimationDivData = [
    {
      class: { cssModule: aboutStyles, class: "aboutCeapAndMeContainer" },
      variants: animationsInstructions.aboutCeapAndMeContainer,
      useAnimation: aboutCeapAnimation,
      Children:
        <>
          <div className={aboutStyles.info}>
            <h2>About me and CEAP</h2>
            <p>I am a developer with a solid foundation from <a href="https://ceappedreira.org.br/">CEAP</a>, where I learned essential programming and web development skills. It was at CEAP that I discovered my passion for programming, and I am very grateful for the contribution that the institution has made in my life.</p>
          </div>
          <div className={aboutStyles.ceapImage} />
        </>
    },
    {
      class: { cssModule: aboutStyles, class: "animateGridInViewContainer" },
      variants: animationsInstructions.gridInViewContainer,
      useAnimation: gridInViewAnimation,
      Children:
        <>
          <DivInView classToReceive={{ cssModule: aboutStyles, class: "proficiencesContainer" }} variants={animationsInstructions.proficiencesContainer}>
            <h2>What I have learned and know</h2>
            <AnimatePresence>
              {
                isloading ?
                  <LoadingDiv currentColor={currentColor} />
                  :
                  <>
                    {
                      getFields(technologiesData).map((technologieToFilter, index) =>
                        <div className={aboutStyles.techTypeContainer} key={index}>
                          <h3>{technologieToFilter}</h3>
                          <ul className={aboutStyles.technologiesContainer} >
                            {
                              filterByTechType(technologiesData, technologieToFilter).map((techName, index) =>
                                <li key={index}>
                                  <div className={aboutStyles.techIcon} style={{
                                    backgroundImage: `url(${techName.techIconUrl})`
                                  }}/>
                                  <p style={{ color: techName.techColor}}>{techName.techName}</p>
                                </li>
                            )}
                          </ul>
                        </div>
                      )
                    }
                  </>
              }
            </AnimatePresence>
          </DivInView>
          <DivInView classToReceive={{ cssModule: aboutStyles, class: "buttonContainer" }} variants={animationsInstructions.buttonContainer}>
            <Link to={"/projects"}>
              <motion.div
                className={aboutStyles.button}
                whileHover={{
                  color: styleVariables.black,
                  backgroundColor: styleVariables.babyPowder
                }}
              >
                Check my projects
              </motion.div>
            </Link>
          </DivInView>
        </>
    }

  ]
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
        variants={animationsInstructions.titleContainer}
        animate={titleAnimation}
      >
        About me
      </motion.h1>

      {
        awaitAnimationDivData.map((div, index) =>
          <AwaitAnimationDiv key={index} classToReceive={div.class} variants={div.variants} useAnimation={div.useAnimation}>
            {div.Children}
          </AwaitAnimationDiv>
        )
      }
    </motion.div>
  )
}

export default About
