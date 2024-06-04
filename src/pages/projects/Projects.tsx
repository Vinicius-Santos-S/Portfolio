import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { fetchingProjects } from '../../service/firebaseConfig';

import Template from '../template'
import ProjectList from "./projectList/projectList";
import Filter from './projectFilter';

import projectStyle from './projects.module.scss'

import { projectDataType}  from '../../types'

import testeImage from  '../../1.jpg'
import testeImageReact from  '../../ReactIcon.png'

const Projects = () => {
  const [projectsData, setProjectsData] = useState<projectDataType[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>("");

  const TestData : projectDataType[] = [
    {
      name: 'nomeprojeto',
      info: 'infoo',
      proLanguage: 'React',
      prolanguageColor: 'rgb(97, 219, 251)',
      imageId: 'infoo',
      imageUrl: testeImage,
      iconUrl: testeImageReact,
      link: 'infoo'
    },
    {
      name: 'nomeprojeto',
      info: 'infoo',
      proLanguage: 'infoo',
      prolanguageColor: 'rgb(97, 219, 251)',
      imageId: 'infoo',
      imageUrl: testeImage,
      iconUrl: testeImageReact,
      link: 'infoo'
    },
    {
      name: 'nomeprojeto',
      info: 'infoo',
      proLanguage: 'infoo',
      prolanguageColor: 'rgb(97, 219, 251)',
      imageId: 'infoo',
      imageUrl: testeImage,
      iconUrl: testeImageReact,
      link: 'infoo'
    },
    {
      name: 'nomeprojeto',
      info: 'infoo',
      proLanguage: 'infoo',
      prolanguageColor: 'rgb(97, 219, 251)',
      imageId: 'infoo',
      imageUrl: testeImage,
      iconUrl: testeImageReact,
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
      <h1>Projects</h1>
      <Filter data={TestData} filter={currentFilter} onUpdateFilter={updateFilter}/>
      <ProjectList data={TestData} filter={currentFilter}/>
    </Template>
  )
}

export default Projects
