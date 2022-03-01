import React from 'react';
import {  useSelector } from 'react-redux';
import Styles from '../styles/CardDetail.module.css'

const DogDetail = () => {
    
    const dog = useSelector((state)=> state.dog);
    

    return (      
        <div>
        <h2 className={Styles.title}  >{dog.name}</h2>
        <div className={Styles.container} >
            <div className={Styles.imgContainer} >
                <img className={Styles.img} src={dog.img} alt={dog.name} width='100%' />
            </div>
            <div className={Styles.box} >
                <h3>Temperament:</h3><br />
                <p className={Styles.p} >{dog.temperament}</p>
                <h3>Weight:</h3><br />
                <p className={Styles.p} >{dog.weight}</p>
                <h3>Height:</h3><br />
                <p className={Styles.p} > {dog.height}</p>
                <h3>life Expectancy:</h3><br /> 
                <p className={Styles.p} > {dog.lifeExp}</p>
            </div>
        </div>
    </div>
    )

}


export default DogDetail;