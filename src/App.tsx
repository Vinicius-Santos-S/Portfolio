import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import NavBar from './components/NavBar';
import Footer from './components/Footer';

import Home from './pages/home/Home'
import About from './pages/about/About'
import Projects from './pages/projects/Projects'

import AppStyle from "./App.module.scss"

const App = () => {
    const location = useLocation()
    return (
        <div className={AppStyle.container}>
            <NavBar currentPath={location.pathname}/>
            <AnimatePresence mode='wait'>
                <Routes key={location.pathname} location={location}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/projects" element={<Projects/>}/>
                </Routes>
            </AnimatePresence>
            <Footer/>
        </div>
    )
}
export default App