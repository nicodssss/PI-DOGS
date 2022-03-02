import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import Styles from '../styles/LandingPage.module.css'
import { setPage  } from "../redux/actions";
import { useDispatch } from "react-redux";

export default function LandingPage (){
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(setPage(1))
    },[dispatch])

    return(
                  
            <div className={Styles.linksContainer}>
            <h1 > DOGS </h1>
                <div className={Styles.divBttn}>
                    <Link to = '/home'>
                        <button>Enter</button>
                    </Link>
                    <Link to = '/dog'>
                        <button>Create</button>
                    </Link>
                </div>
            </div>
        
    )
}