import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { fetchingProjects } from '../../service/firebaseConfig';

import Template from '../template'
import ProjectList from "./projectList";
import Filter from './projectFilter';

import projectStyle from './projects.module.scss'

import projectDataType from '../../types'



const Projects = () => {
  const [projectsData, setProjectsData] = useState<projectDataType[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>("");

  useEffect(() => {
    // Função assíncrona para buscar e definir os dados dos projetos
    const fetchProjectsData = async () => {
      try {
        const data = await fetchingProjects();
        console.log(data)
        setProjectsData(data);
      } catch (error) {
        console.error('Erro ao buscar os projetos:', error);
      }
    };
    fetchProjectsData(); // Chama a função de busca ao montar o componente
  }, []); // O segundo argumento vazio garante que o efeito seja executado apenas uma vez

  const updateFilter = (language: string) => {
    setCurrentFilter(language);
  };

  return (
    <Template>
      <main className={projectStyle.projectContainer}>
        <div className={projectStyle.projectWrapper}>
          <h1>Projects</h1>
          <Filter data={projectsData} filter={currentFilter} onUpdateFilter={updateFilter}/>
          <AnimatePresence mode='wait'>
            <ProjectList data={projectsData} filter={currentFilter}/>
          </AnimatePresence>
        </div>
      </main>
    </Template>
  )
}

export default Projects
