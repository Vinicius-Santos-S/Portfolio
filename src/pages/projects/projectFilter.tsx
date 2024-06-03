import { motion } from "framer-motion";

import projectStyle from "./projects.module.scss";

import {projectDataType} from "../../types";

interface IProps {
  data: projectDataType[];
  filter: string;
  onUpdateFilter: (language: string) => void;
}

const getFields = <T,>(input: Array<T>, field: keyof T): Array<T[keyof T]> => {
  const output: Array<T[keyof T]> = [];
  for (let i = 0; i < input.length; ++i) {
    output.push(input[i][field]);
  }
  return output;
};

const Filter: React.FC<IProps> = ({ data, filter, onUpdateFilter }) => {
  const programmingLanguages: string[] = getFields(
    data,
    "proLanguage"
  ) as string[];
  const TreatedLanguages: string[] = [...new Set(programmingLanguages)];

  const handleClick = (language: string) => {
    if (filter === language) {
      onUpdateFilter("");
    } else {
      onUpdateFilter(language);
    }
  };
  return (
    <div className={projectStyle.filterBar}>
      {TreatedLanguages.map((language, index) => (
        <motion.div
          className={projectStyle.filterButton}
          key={index}
          onClick={() => handleClick(language)}
          animate={{
            backgroundColor:
              filter === language
                ? "rgba(222, 222, 222, 1)"
                : "rgba(222, 222, 222, 0.1)",
            color:
              filter === language ? "rgb(27, 27, 27)" : "rgb(222, 222, 222)",
          }}
          whileHover={{
            backgroundColor: "rgba(222, 222, 222, 1)",
            color: "rgb(27, 27, 27)",
          }}
        >
          {language}
        </motion.div>
      ))}
    </div>
  );
};

export default Filter;
