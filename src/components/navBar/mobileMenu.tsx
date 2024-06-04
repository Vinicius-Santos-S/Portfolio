import react, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import navBarStyle from "./navBar.module.scss";
import { routeData } from "../../types";


interface IProps {
  data: routeData[];
  currentPath: string;
  setToCloseMenu: () => void;
}

const MobileMenu: react.FC<IProps> = ({ data, currentPath, setToCloseMenu }) => {
  const boxRef = useRef<HTMLUListElement>(null);


  const handleClickOutside = (event: MouseEvent) => {
    if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
      setToCloseMenu();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <motion.ul
      ref={boxRef}
      className={navBarStyle.mobileMenu}
      initial={{
        right: -200
      }}
      animate={{
        right: 0
      }}
      exit={{
        right: -200
      }}
      transition={{ 
        ease: "easeOut", 
      }}
    >
      {data.map((route, index: any) => (
        <Link key={index} to={route.link}>
          <motion.li
            onClick={setToCloseMenu}
            animate={{
              backgroundColor:
                currentPath === route.link ? "rgba(222, 222, 222, 1)" : "rgba(222, 222, 222, 0.1)",
              color:
                currentPath === route.link ? "rgb(27, 27, 27)" : "rgb(222, 222, 222)",
            }}
          >
            <route.iconSvg
              animate={{
                fill: currentPath === route.link ? "rgb(27, 27, 27)" : "rgb(222, 222, 222)", 
              }}
            />
            {route.name}
          </motion.li>
        </Link>
      ))}
    </motion.ul>
  );
};
export default MobileMenu;
