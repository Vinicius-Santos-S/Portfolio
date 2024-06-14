import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom'
import homeStyles from './home.module.scss';
import styleVariables from '../../_variables.module.scss';

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
    title: {
      animateTitle: { color: currentColor }
    },
    underText: {
      initialUnderText: { opacity: 0 },
      animateUnderText: { opacity: 1, transition: { delay: 0.6 } },
    },
    myName: {
      initialMyName: { opacity: 0 },
      animateMyName: { opacity: 1, transition: { delay: 0.6 } },
    },
    myOtherName: {
      initialMyOtherName: { opacity: 0 },
      animateMyOtherName: { opacity: 1, transition: { delay: 0.6 } },
    },
    button: {
      initialButton: { opacity: 0 },
      animateButton: { opacity: 1, transition: { delay: 0.6 } },
      hovering: { backgroundColor: styleVariables.babyPowder, color: styleVariables.black }
    }

  }

  const mainAnimation = useAnimation();
  const titleAnimation = useAnimation();
  const underTextAnimation = useAnimation();
  const myNameAnimation = useAnimation();
  const myOtherNameAnimation = useAnimation();
  const buttonAnimation = useAnimation();

  useEffect(() => { 
    const sequence = async () => {
      await mainAnimation.start('animateMain');
      await titleAnimation.start('animateTitle');
      await underTextAnimation.start('animateUnderText');
      await myNameAnimation.start('animateMyName');
      await myOtherNameAnimation.start('animateMyOtherName')
      await buttonAnimation.start('animateButton');
    };

    sequence();
  }, [mainAnimation, titleAnimation, underTextAnimation, myNameAnimation, myOtherNameAnimation, buttonAnimation, ]);

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
        {/* OPTIMIZE THIS PIECE OF THE CODE FOR THE LOVE OF GOD PLS    */}
        <motion.h1
          variants={animationsInstructions.title}
          animate={titleAnimation}
        >
          Hello!
        </motion.h1>

        <motion.p
          variants={animationsInstructions.underText}
          initial="initialUnderText"
          animate={underTextAnimation}
        >
          Welcome to my portfolio!
        </motion.p>

        <motion.p
          variants={animationsInstructions.myName}
          initial="initialMyName"
          animate={myNameAnimation}
        >
          My name is <strong style={{ color: currentColor, fontSize: "25px"}}>Vinicius Santos Silva.</strong>
        </motion.p>

        <motion.p
          variants={animationsInstructions.myOtherName}
          initial="initialMyOtherName"
          animate={myOtherNameAnimation}
        >
          Or you can just call me <strong style={{ color: currentColor, fontSize: "45px"}}>Naooto.</strong>
        </motion.p> 

        <Link to={"/about"}>
          <motion.div 
            className={homeStyles.button}
            variants={animationsInstructions.button}
            initial="initialButton"
            animate={buttonAnimation}
            whileHover="hovering"
          >
            About me
          </motion.div>
        </Link>
      </div>
      <div className={homeStyles.welcomeImage}/>


    </motion.div>
  );
};

export default Home;