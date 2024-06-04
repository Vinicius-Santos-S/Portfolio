import footerStyle from './footer.module.scss'
import { contactData } from '../../types'

import { MotionGitHubIcon, MotionLinkendinIcon } from "../../svgImports"

const contactsData: contactData[] = [
  {
    name: "Github",
    link: "https://google.com",
    iconSvg: MotionGitHubIcon
  },
  {
    name: "Linkedin",
    link: "https://google.com",
    iconSvg: MotionLinkendinIcon
  },

]

const Footer = () => {
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
                      fill: 'rgb(222, 222, 222)'
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