import { Link } from "react-router-dom"
import navBarStyle from "./navBar.module.scss"
import { motion } from "framer-motion"

interface IProps {
  currentPath:string
}

const NavBar: React.FC<IProps> = ({ currentPath }) => {
  interface linkdata {
    name: string
    link: string
  }

  const linksData: linkdata[] = [
    {
      name: "Home",
      link: "/"
    },
    {
      name: "About",
      link: "/about"
    },
    {
      name: "Projects",
      link: "/projects"
    }
  ]

  return (
    <nav className={navBarStyle.navbarContainer}>
      <div className={navBarStyle.navbarWrapper}>
        <h1>somethingHere</h1>
        <ul 
          className={navBarStyle.navbarList}
        >
          {
            linksData.map((route, index:any) =>
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
      </div>
    </nav>
  )
}

export default NavBar
