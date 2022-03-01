import React from "react";
import { Link } from 'react-router-dom'

const NavBar = () => {
    return <div>
        <Link to='/'>
            <p>LANDING</p>
        </Link>
        <Link to='/home'>
            <p>HOME</p>
        </Link>
    </div>
}

export default NavBar;