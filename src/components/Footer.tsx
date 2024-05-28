import React from 'react'
import footerStyle from './footer.module.scss'

import githubIcon from '../icon/githubIcon.svg'
import linkedinIcon from '../icon/linkedinIcon.svg'

interface contactData {
    name: string
    link: string
    image: string
}

const contactsData :contactData [] = [
    {
        name: "Github",
        link: "https://google.com",
        image: githubIcon
    },
    {
        name: "Linkedin",
        link: "https://google.com",
        image: linkedinIcon
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
                                style={{
                                    backgroundImage: `url(${contact.image}`
                                }}
                            />
                        </li>
                    ) 
                }
            </ul>
        </address>
    </footer>
  )
}

export default Footer