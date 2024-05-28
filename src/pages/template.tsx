import { motion } from "framer-motion"
import templateStyle from "./template.module.scss"

const Template = (props: any) => {
  return (
    <motion.div
        className={templateStyle.templateContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2}}
    >
        <div>{ props.children }</div>
    </motion.div>
  )
}

export default Template