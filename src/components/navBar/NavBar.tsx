import React,{ useState } from "react"
import { Link } from "react-router-dom"
import navBarStyle from "./navBar.module.scss"
import { motion, AnimatePresence } from "framer-motion"
import MobileMenu from "./mobileMenu"
import { routeData } from "../../types"
import { MotionMenuIcon, MotionHomeIcon, MotionAboutIcon, MotionProjectsIcon } from "../../svgImports"
import variables from '../../_variables.module.scss';

interface IProps {
  currentPath: string
  currentColor: string
}

const NavBar: React.FC<IProps> = ({ currentPath, currentColor }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const linksData: routeData[] = [
    {
      name: "Home",
      link: "/",
      iconSvg: MotionHomeIcon
    },
    {
      name: "About",
      link: "/about",
      iconSvg: MotionAboutIcon
    },
    {
      name: "Projects",
      link: "/projects",
      iconSvg: MotionProjectsIcon
    }
  ]

  const handleMenuExit = () => {
    setIsOpenMenu(!isOpenMenu)
  }

  function getIndexIarrayOfObjects(currentPath:string) {
    for(let index = 0; index < linksData.length; index++){
      if((linksData[index]["link"]) === currentPath){
        return index
      }
    }
    return 1
  }

  return (
    
    <nav className={navBarStyle.navbarContainer}>
      <div className={navBarStyle.navbarWrapper}>
        <h1>a</h1>
        <ul
          className={navBarStyle.navbarListDesktop}
        >
          {
            linksData.map((route, index: any) =>
              <Link key={index} to={route.link}>
                <motion.li
                  animate={{
                    color: currentPath === route.link ? currentColor : variables.babyPowder
                  }}
                >
                  {route.name}
                </motion.li>
              </Link>
            )
          }
          <motion.div className={navBarStyle.undelineBar}
            animate={{
              left: `${getIndexIarrayOfObjects(currentPath) * 110}px`,
              backgroundColor: currentColor
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          />
        </ul>
        <MotionMenuIcon
          className={navBarStyle.navbarMobileButton}
          onClick={handleMenuExit}
        />
        <AnimatePresence>
          {
            isOpenMenu &&
              <MobileMenu 
                data={linksData}
                currentPath={currentPath}
                currentColor={currentColor}
                setToCloseMenu={handleMenuExit}
              />
          }
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default NavBar
