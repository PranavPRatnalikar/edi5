import React, { useState } from 'react'
import Home from '../Pages/Home'
import Attendance from '../Pages/Attendance'
import Report from '../Pages/Report'
import Students from '../Pages/Students'
import './Navbar.css'
import { BrowserRouter as Router, NavLink, Routes, Route } from 'react-router-dom'
import StudentsGrid from '../Pages/StudentsGrid'

export default function HomeNavbar() {
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }
  return (
    <Router>
        <nav style = {{width: '100%'}}>
            <div className = 'navbar'>
                <div className = 'navbar-logo'>
                    Attendance System
                </div>

                <div className = 'menu' onClick={toggleMenu}>
                    <div className = 'menu-icon'></div>
                    <div className = 'menu-icon'></div>
                    <div className = 'menu-icon'></div>
                </div>

                <ul className = {isMenuOpen ? 'navbar-links active' : 'navbar-links'}>
                    <li><NavLink onClick={toggleMenu} to = '/home'>Home</NavLink></li>
                    <li><NavLink onClick={toggleMenu} to = '/takeattendance'>Attendance System</NavLink></li>
                    <li><NavLink onClick={toggleMenu} to = '/report'>Project Tracker</NavLink></li>
                    <li><NavLink onClick={toggleMenu} to = '/studentlist'>Course Planning</NavLink></li>
                </ul>
            </div>

        </nav>

        

    </Router>
  )
}
