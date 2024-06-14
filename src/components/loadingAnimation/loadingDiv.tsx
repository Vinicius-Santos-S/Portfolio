import loadingDivStyle  from './loadingDiv.module.scss'
import { MotionLoadingIcon } from '../../svgImports'

interface Iprops {
  currentColor: string
}

const loadingDiv: React.FC<Iprops> = ({currentColor}) => {

  return (
    <div className={loadingDivStyle.loadingContainer}>
      <MotionLoadingIcon
        fill={currentColor}
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