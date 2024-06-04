import { motion } from "framer-motion"
import templateStyle from "./template.module.scss"

const Template = (props: any) => {
  return (
    <motion.main
      className={templateStyle.templateContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <section className={templateStyle.templateWrapper}>
        <div className={templateStyle.templateBase}>
          { props.children }
        </div>
      </section>
    </motion.main>
  )
}

export default Template