import react, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import navBarStyle from "./navBar.module.scss";
import { routeData } from "../types";

interface IProps {
  data: routeData[];
  currentPath: string;
  onMouseOut: () => void;
}


const MobileMenu: react.FC<IProps> = ({ data, currentPath, onMouseOut }) => {
  const boxRef = useRef<HTMLUListElement>(null);


  const handleClickOutside = (event: MouseEvent) => {
    if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
      onMouseOut();
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
        right: -100
      }}
      animate={{
        right: 0
      }}
      exit={{
        right: -100
      }}
    >
      {data.map((route, index: any) => (
        <Link key={index} to={route.link}>
          <motion.li
            animate={{
              backgroundColor:
                currentPath === route.link ? "rgba(222, 222, 222, 1)" : "rgba(222, 222, 222, 0.1)",
              color:
                currentPath === route.link ? "rgb(27, 27, 27)" : "rgb(222, 222, 222)",
            }}
            whileHover={{
              backgroundColor: "rgba(222, 222, 222, 1)",
              color: "rgb(27, 27, 27)",
            }}
          >
          </motion.li>
        </Link>
      ))}
    </motion.ul>
  );
};
export default MobileMenu;
