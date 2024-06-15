import React from 'react'
import { motion } from "framer-motion"

// const stylesModules {
//   homeStyles: homeStyles,

// }

interface IProps {
  classToReceive: { cssModule: any, class:string}
  variants: {}
  useAnimation: object
  children: React.ReactNode
}

const awaitAnimationDiv: React.FC<IProps> = ({classToReceive, variants, useAnimation, children}) => {
  
  return (
    <motion.div
      className={`${classToReceive.cssModule[classToReceive.class]} ${classToReceive.cssModule.awaitAnimationDivContainer}`}
      variants={variants}
      initial="initial"
      animate={useAnimation}
      exit="exit"
      transition={variants}
    >
      {children}
    </motion.div>
  )
}

export default awaitAnimationDiv