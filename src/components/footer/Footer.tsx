import footerStyle from './footer.module.scss'
import { contactData } from '../../types'

import { MotionGitHubIcon, MotionLinkendinIcon } from "../../svgImports"

interface Iprop {
  currentColor: string
}

const contactsData: contactData[] = [
  {
    name: "Github",
    link: "https://github.com/Vinicius-Santos-S",
    iconSvg: MotionGitHubIcon
  },
  {
    name: "Linkedin",
    link: "www.linkedin.com/in/vini-santos-silva",
    iconSvg: MotionLinkendinIcon
  },

]

const Footer: React.FC<Iprop> = ({currentColor}) => {
  return (
    <footer className={footerStyle.footerContainer}>
      <address className={footerStyle.footerWrapper}>
        <ul className={footerStyle.footerList}>
          {
            contactsData.map((contact, index) =>
              <li key={index}>
                <a
                  href={contact.link}
                >
                  <contact.iconSvg 
                    className={footerStyle.socialIcon}
                    whileHover={{
                      scale: 1.1,
                      fill: currentColor
                    }}
                  />
                </a>
              </li>
            )
          }
        </ul>
      </address>
    </footer>
  )
}

export default Footer