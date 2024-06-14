import { motion } from "framer-motion";
import projectStyle from "./projects.module.scss";
import {projectDataType} from "../../types";
import styleVariables from '../../_variables.module.scss';

interface IProps {
  data: projectDataType[];
  filter: string;
  onUpdateFilter: (language: string) => void;
}

const getFields = (technologiesData:projectDataType []) => {
  const array = []
  for(const technologyData of technologiesData){
    array.push(technologyData.technology.techName)
  }
  return [...new Set(array)]
};

const Filter: React.FC<IProps> = ({ data, filter, onUpdateFilter }) => {

  const programmingLanguages: string[] = getFields(data);

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
                ? styleVariables.murrey
                : styleVariables.black,
            color:
              filter === language ? styleVariables.babyPowder : styleVariables.babyPowder,
          }}
          whileHover={{
            backgroundColor: styleVariables.murrey,
            color: styleVariables.babyPowder,
          }}
        >
          {language}
        </motion.div>
      ))}
    </div>
  );
};

export default Filter;
