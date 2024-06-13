import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import NavBar from './components/navBar/NavBar';
import Footer from './components/footer/Footer';
import Template from './pages/template';

import Home from './pages/home/Home'
import About from './pages/about/About'
import Projects from './pages/projects/Projects'

import "./App.scss"
import { useEffect } from 'react';

import variables from './_variables.module.scss';

const App = () => {
    const location = useLocation()

    const scrollToTop = () => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth'
        });
    };
    
    useEffect(() => {
        scrollToTop()
    },[location])

    function setCurretColor (currentPath:string) {
        if(currentPath === '/'){
          return variables.amaranthPpurple
        }
        else if(currentPath === '/about'){
          return variables.lapisLazuli
        }
        return variables.murrey
    }

    return (
        <>
            <NavBar currentPath={location.pathname} currentColor={setCurretColor(location.pathname)}/>
            <Template currentColor={setCurretColor(location.pathname)}>
                <AnimatePresence mode='wait'>
                    <Routes key={location.pathname} location={location}>
                        <Route path="/" element={<Home currentColor={setCurretColor(location.pathname)}/>}/>
                        <Route path="/about" element={<About currentColor={setCurretColor(location.pathname)}/>}/>
                        <Route path="/projects" element={<Projects currentColor={setCurretColor(location.pathname)}/>}/>
                    </Routes>
                </AnimatePresence>
            </Template>
            <Footer/>
        </>
    )
}
export default App