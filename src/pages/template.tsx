import { motion } from "framer-motion"
import templateStyle from "./template.module.scss"
import React from "react"

interface Iprops {
  currentColor: string
  children: React.ReactNode;
}


const Template: React.FC<Iprops> = ({ currentColor, children}) => {

  return (
    <motion.main
      className={templateStyle.templateContainer}
      animate={{ 
        opacity: 1,
        boxShadow: `inset 0px 32px 40px -24px ${currentColor}`
      }}
      transition={{ duration: 0.2 }}
    >
      <section className={templateStyle.templateWrapper}>
        <div className={templateStyle.templateBase}>
          { children }
        </div>
      </section>
    </motion.main>
  )
}

export default Template