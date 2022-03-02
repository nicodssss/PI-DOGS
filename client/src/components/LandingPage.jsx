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
                
                    <Link to = '/home'>
                        <button className={Styles.divBttn}>HOME</button>
                    </Link>
                    <Link to = '/dog'>
                        <button className={Styles.divBttn2}>CREATE</button>
                    </Link>
                    
                </div>
        
    )
}