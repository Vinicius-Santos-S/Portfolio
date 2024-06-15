import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom'
import homeStyles from './home.module.scss';
import styleVariables from '../../_variables.module.scss';
import AwaitAnimationDiv from '../../components/awaitAnimationDiv/awaitAnimationDiv'


interface Iprops {
  currentColor: string;
}

const Home: React.FC<Iprops> = ({ currentColor }) => {
  const animationsInstructions = {
    main: {
      initialMain: { x: 1000 },
      animateMain: { x: 0 },
      exitMain: { x: -1100 },
    },

    titleContainer: {
      initial: {
      },
      animateTitle: {
        color: currentColor
      }
    },

    underTextContainer: {
      initial: {
        opacity: 0
      },
      animateUnderText: {
        opacity: 1,
        transition: { delay: 0.6 }
      }
    },

    myNameContainer: {
      initial: {
        opacity: 0
      },
      animateMyName: {
        opacity: 1,
        transition: { delay: 0.6 }
      }
    },

    myOtherNameContainer: {
      initial: {
        opacity: 0
      },
      animateMyOtherName: {
        opacity: 1,
        transition: { delay: 0.6 }
      }
    },

    buttonContainer:{
      initial: {
        opacity: 0
      },
      animateButton: {
        opacity: 1,
        transition: { delay: 0.6 }
      }
    }

  }

  const mainAnimation = useAnimation();
  const titleAnimation = useAnimation();
  const underTextAnimation = useAnimation();
  const myNameAnimation = useAnimation();
  const myNameOtherAnimation = useAnimation();
  const buttonAnimation = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await mainAnimation.start('animateMain');
      await titleAnimation.start('animateTitle');
      await underTextAnimation.start('animateUnderText')
      await myNameAnimation.start('animateMyName')
      await myNameOtherAnimation.start('animateMyOtherName')
      await buttonAnimation.start('animateButton')
    };
    sequence();
  }, [mainAnimation, titleAnimation, underTextAnimation, myNameAnimation, buttonAnimation]);

  const awaitAnimationDivData = [
    {
      class: { cssModule: homeStyles, class: "underTextContainer" },
      variants: animationsInstructions.underTextContainer,
      useAnimation: underTextAnimation,
      Children: <p>Welcome to my portfolio</p>
    },
    {
      class: { cssModule: homeStyles, class: "myNameContainer" },
      variants: animationsInstructions.myNameContainer,
      useAnimation: myNameAnimation,
      Children: <p>My name is <strong style={{ color: currentColor, fontSize: "20px" }}>Vinicius Santos Silva</strong>,</p>
    },
    {
      class: { cssModule: homeStyles, class: "myOtherNameContainer" },
      variants: animationsInstructions.myOtherNameContainer,
      useAnimation: myNameOtherAnimation,
      Children: <p>but you can call me <strong style={{ color: currentColor, fontSize: "30px" }}>Naooto</strong>.</p>
    },
    {
      class: { cssModule: homeStyles, class: "buttonContainer" },
      variants: animationsInstructions.buttonContainer,
      useAnimation: buttonAnimation,
      Children: 
        <Link to={"/about"}>
          <motion.div
            className={homeStyles.button}
            whileHover={{
              color: styleVariables.black,
              backgroundColor: styleVariables.babyPowder
            }}
          >
            About me
          </motion.div>
        </Link>
    },



  ]

  return (
    <motion.div className={homeStyles.mainDiv}
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
      <div className={homeStyles.welcomeContainer}>
        <motion.h1
          className={homeStyles.titleContainer}
          variants={animationsInstructions.titleContainer}
          initial="initial"
          animate={titleAnimation}
        >
          HELLO
        </motion.h1>
        {
          awaitAnimationDivData.map((div, index) =>
            <AwaitAnimationDiv key={index} classToReceive={div.class} variants={div.variants} useAnimation={div.useAnimation}>
              {div.Children}
            </AwaitAnimationDiv>
          )
        }
      </div>
      <div className={homeStyles.welcomeImage} />
    </motion.div>
  );
};

export default Home;