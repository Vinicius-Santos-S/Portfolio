import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import aboutStyles from '../about.module.scss';

interface gridDiv {
    classToReceive: string
    variants: {}
    children: React.ReactNode
}

const divInView: React.FC<gridDiv> = ({classToReceive, variants, children}) => {
    const ref = useRef(null)
    const inView = useInView(ref, {margin: "0px 0px -200px 0px"})

    return (
        <motion.div
            ref={ref}
            className={aboutStyles[classToReceive]}
            variants={variants}
            initial={"initial"}
            animate={inView ? "animate" : "initial"}
        >
            {children}
        </motion.div>
    )
}
export default divInView