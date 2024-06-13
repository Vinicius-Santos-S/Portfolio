import loadingDivStyle  from './loadingDiv.module.scss'
import { MotionLoadingIcon } from '../../svgImports'
const loadingDiv = ({}) => {

  return (
    <div className={loadingDivStyle.loadingContainer}>
      <MotionLoadingIcon
        fill='#7E1946'
        className={loadingDivStyle.spinner}
        animate={{ rotate: 360 }}
        exit={{ opacity: 0 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      />
    </div>
  )
}

export default loadingDiv