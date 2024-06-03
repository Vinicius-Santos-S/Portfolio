import { useState } from "react"
import { Link } from "react-router-dom"
import navBarStyle from "./navBar.module.scss"
import { motion, AnimatePresence } from "framer-motion"
import MobileMenu from "./mobileMenu"
import { routeData } from "../types"

import { ReactComponent as MenuIcon } from "../icon/menuIcon.svg"
import { ReactComponent as HomeIcon } from "../icon/homeIcon.svg"
import { ReactComponent as AboutIcon }  from "../icon/personIcon.svg"
import { ReactComponent as ProjectsIcon }  from "../icon//projectsIcon.svg"

interface IProps {
  currentPath: string
}

const NavBar: React.FC<IProps> = ({ currentPath }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const linksData: routeData[] = [
    {
      name: "Home",
      link: "/",
      iconUrl: HomeIcon
    },
    {
      name: "About",
      link: "/about",
      iconUrl: AboutIcon
    },
    {
      name: "Projects",
      link: "/projects",
      iconUrl: ProjectsIcon
    }
  ]

  const handleMenuExit = () => {
    setIsOpenMenu(!isOpenMenu)
  }

  return (
    <nav className={navBarStyle.navbarContainer}>
      <MenuIcon/>
      <div className={navBarStyle.navbarWrapper}>
        <h1>somethingHere</h1>
        <ul
          className={navBarStyle.navbarListDesktop}
        >
          {
            linksData.map((route, index: any) =>
              <Link key={index} to={route.link}>
                <motion.li
                  animate={{
                    backgroundColor: currentPath === route.link ? "rgba(222, 222, 222, 1)" : "rgba(222, 222, 222, 0.1)",
                    color: currentPath === route.link ? "rgb(27, 27, 27)" : "rgb(222, 222, 222)"
                  }}
                  whileHover={{
                    backgroundColor: "rgba(222, 222, 222, 1)",
                    color: "rgb(27, 27, 27)"
                  }}
                >
                  {route.name}
                </motion.li>
              </Link>
            )
          }
        </ul>
        <motion.div
          className={navBarStyle.navbarMobileButton}
          onClick={() => setIsOpenMenu(!isOpenMenu)}
          style={{
            backgroundImage: `url(${menuIcon})`
          }}
        />
        <AnimatePresence>
          {
            isOpenMenu &&
            <MobileMenu 
              data={linksData}
              currentPath={currentPath}
              onMouseOut={handleMenuExit}
            />
          }
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default NavBar
