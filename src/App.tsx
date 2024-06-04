import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import NavBar from './components/navBar/NavBar';
import Footer from './components/footer/Footer';

import Home from './pages/home/Home'
import About from './pages/about/About'
import Projects from './pages/projects/Projects'

import "./App.scss"
import { useEffect } from 'react';

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

    return (
        <>
            <NavBar currentPath={location.pathname}/>
            <AnimatePresence mode='wait'>
                <Routes key={location.pathname} location={location}>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/projects" element={<Projects/>}/>
                </Routes>
            </AnimatePresence>
            <Footer/>
        </>
    )
}
export default App