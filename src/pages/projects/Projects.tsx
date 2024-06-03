import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { fetchingProjects } from '../../service/firebaseConfig';

import Template from '../template'
import ProjectList from "./projectList/projectList";
import Filter from './projectFilter';

import projectStyle from './projects.module.scss'

import { projectDataType}  from '../../types'

import testeImage from  '../../1.jpg'

const Projects = () => {
  const [projectsData, setProjectsData] = useState<projectDataType[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>("");

  const TestData : projectDataType[] = [
    {
      name: 'nomeprojeto',
      info: 'infoo',
      proLanguage: 'infoo',
      imageId: 'infoo',
      imageUrl: testeImage,
      iconUrl: testeImage,
      link: 'infoo'
    },
    {
      name: 'nomeprojeto',
      info: 'infoo',
      proLanguage: 'infoo',
      imageId: 'infoo',
      imageUrl: 'infoo',
      iconUrl: 'infoo',
      link: 'infoo'
    },
    {
      name: 'nomeprojeto',
      info: 'infoo',
      proLanguage: 'infoo',
      imageId: 'infoo',
      imageUrl: 'infoo',
      iconUrl: 'infoo',
      link: 'infoo'
    },
    {
      name: 'nomeprojeto',
      info: 'infoo',
      proLanguage: 'infoo2',
      imageId: 'infoo',
      imageUrl: 'infoo',
      iconUrl: 'infoo',
      link: 'infoo'
    },
  ]

  // useEffect(() => {
  //   // Função assíncrona para buscar e definir os dados dos projetos
  //   const fetchProjectsData = async () => {
  //     try {
  //       const data = await fetchingProjects();
  //       setProjectsData(data);
  //     } catch (error) {
  //       console.error('Erro ao buscar os projetos:', error);
  //     }
  //   };
  //   fetchProjectsData(); // Chama a função de busca ao montar o componente
  // }, []); // O segundo argumento vazio garante que o efeito seja executado apenas uma vez

  const updateFilter = (language: string) => {
    setCurrentFilter(language);
  };

  return (
    <Template>
      <main className={projectStyle.projectContainer}>
        <div className={projectStyle.projectWrapper}>
          <h1>Projects</h1>
          <Filter data={TestData} filter={currentFilter} onUpdateFilter={updateFilter}/>
          <AnimatePresence mode='wait'>
            <ProjectList data={TestData} filter={currentFilter}/>
          </AnimatePresence>
        </div>
      </main>
    </Template>
  )
}

export default Projects
