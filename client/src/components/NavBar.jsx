import React from "react";
import { Link } from 'react-router-dom';
import Styles from '../styles/NavBar.module.css';


const NavBar = () => {
    return  <div className={Styles.divContainer}>
                <nav className={Styles.navMenu}>
                        <Link to='/'>
                            <p className={Styles.p1} key='landing' >MAIN</p>
                        </Link>
                        <Link to='/home'>
                            <p className={Styles.p2} key='home' >HOME</p>
                        </Link>
                        <Link to='/dog'>
                            <p className={Styles.p3} key='dog' >CREATE DOG</p>
                        </Link>  
                        <div className={Styles.dot}></div>                      
                    
                </nav>
            </div>
}

export default NavBar;