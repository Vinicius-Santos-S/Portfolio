import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface gridDiv {
    classToReceive: { cssModule: any, class:string}
    variants: {}
    children: React.ReactNode
}

const divInView: React.FC<gridDiv> = ({classToReceive, variants, children}) => {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: "0px 0px -200px 0px"})

    return (
        <motion.div
            ref={ref}
            className={`${classToReceive.cssModule[classToReceive.class]}`}
            variants={variants}
            initial={"initial"}
            animate={inView ? "animate" : "initial"}
        >
            {children}
        </motion.div>
    )
}
export default divInView