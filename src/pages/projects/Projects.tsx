import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useAnimation} from 'framer-motion';
import { readDocuments } from '../../service/firebaseConfig';
import { isMobile } from 'react-device-detect';

import ProjectList from "./projectList/projectList";
import Filter from './projectFilter';
import LoadingDiv from '../../components/loadingAnimation/loadingDiv';

import projectStyle from './projects.module.scss'

import { clientSideProjectDataType }  from '../../types'
// import testeImage from  '../../1.jpg'
// import testeImageReact from  '../../icon/proficiencesIcons/reactIcon.png'

interface Iprop {
  currentColor: string
}

const Projects: React.FC<Iprop> = ({currentColor}) => {
  const [projectsData, setProjectsData] = useState<clientSideProjectDataType[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>("");
  const [isloading, setIsLoading] = useState(true)

  // const TestData : projectDataType[] = [
  //   {
  //     name: 'Tic-Tac-Toe Game',
  //     info: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos velit a ratione eius odio assumenda minus aut omnis ab. Quasi repudiandae expedita eveniet ut porro error facilis sunt laudantium veniam!",
  //     proLanguage: 'React',
  //     prolanguageColor: 'rgb(97, 219, 251)',
  //     projectImageId: 'infoo',
  //     projectImageUrl: testeImage,
  //     proLanguageIconUrl: testeImageReact,
  //     link: 'infoo'
  //   },
  // ]

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const fetchedData = await readDocuments('Projects');
      setProjectsData(fetchedData);
      setIsLoading(false)
    }
    fetchData();
  }, []);

  const updateFilter = (language: string) => {
    setCurrentFilter(language);
  };




  const animationsInstructions = {
    main: {
      initialMain: { x: 1000 },
      animateMain: { x: 0 },
      exitMain: { x: -1250 },
    },
    title: {
      animateTitle: { color: currentColor }
    },
    container: {
      initialContainer: { opacity: 0 },
      animateContainer: { opacity: 1 }
    }


  }

  const mainAnimation = useAnimation();
  const titleAnimation = useAnimation();
  const containerAnimation = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await mainAnimation.start('animateMain');
      await titleAnimation.start('animateTitle');
      await containerAnimation.start('animateContainer');
    };

    sequence();
  }, [mainAnimation, titleAnimation, containerAnimation]);

  return (
    <motion.div className={projectStyle.mainDiv}
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
        Projects
      </motion.h1>
      <motion.div
        className={projectStyle.container}
        variants={animationsInstructions.container}
        initial="initialContainer"
        animate={containerAnimation}
      >
        <Filter data={projectsData} filter={currentFilter} onUpdateFilter={updateFilter} />
        <AnimatePresence mode='wait'>
          { isloading ?
            <LoadingDiv/>
            :
            <>      
              {isMobile && <p className={projectStyle.guideText}>↓ Click to see more</p>}
              <ProjectList data={projectsData} filter={currentFilter}/>
            </>
          }
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default Projects
