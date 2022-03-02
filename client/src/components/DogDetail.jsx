import React from 'react';
import {  useSelector } from 'react-redux';

import Styles from '../styles/DogDetail.module.css'

const DogDetail = () => {

    const dog = useSelector((state)=> state.dog);
    return (      
        <div className={Styles.mainDiv}>
        <h2 className={Styles.title} >{dog.name.toUpperCase()}</h2>
        <div className={Styles.container} >
            <div className={Styles.imgContainer} >
                <img className={Styles.imgdog} src={dog.img} alt={dog.name} width='100%' />
            </div>
            <div className={Styles.box} >
                <h3>TEMPERAMENTS:</h3><br />
                <p className={Styles.p} >{dog.temperament}</p>
                <h3>WEIGHT:</h3><br />
                <p className={Styles.p} >{dog.weight}</p>
                <h3>HEIGHT:</h3><br />
                <p className={Styles.p} > {dog.height}</p>
                <h3>LIFE EXPECTANCY:</h3><br /> 
                <p className={Styles.p} > {dog.lifeExp}</p>
            </div>
        </div>
    </div>
    )

}


export default DogDetail;