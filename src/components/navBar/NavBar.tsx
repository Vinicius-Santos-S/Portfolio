import React,{ useState } from "react"
import { Link } from "react-router-dom"
import navBarStyle from "./navBar.module.scss"
import { motion, AnimatePresence } from "framer-motion"
import MobileMenu from "./mobileMenu"
import { routeData } from "../../types"
import { MotionMenuIcon, MotionHomeIcon, MotionAboutIcon, MotionProjectsIcon } from "../../svgImports"

interface IProps {
  currentPath: string
}

const NavBar: React.FC<IProps> = ({ currentPath }) => {
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


  return (
    
    <nav className={navBarStyle.navbarContainer}>
      <div className={navBarStyle.navbarWrapper}>
        <h1>somethingHere</h1>
        <ul
          className={navBarStyle.navbarListDesktop}
        >
          {
            linksData.map((route, index: any) =>
              <Link key={index} to={route.link}>
                <motion.li
                >
                  {route.name}
                </motion.li>
              </Link>
            )
          }
          <motion.div className={navBarStyle.undelineBar}
            animate={{
              // left: `${linksData.indexOf(currentPath) * 100}px`,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          />
        </ul>
        {/* <MotionMenuIcon
          className={navBarStyle.navbarMobileButton}
          onClick={handleMenuExit}
        />
        <AnimatePresence>
          {
            isOpenMenu &&
              <MobileMenu 
                data={linksData}
                currentPath={currentPath}
                setToCloseMenu={handleMenuExit}
              />
          }
        </AnimatePresence> */}
      </div>
    </nav>
  )
}

export default NavBar
