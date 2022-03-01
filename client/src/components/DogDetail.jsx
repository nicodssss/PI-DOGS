import React from 'react';
import {  useSelector } from 'react-redux';


const DogDetail = () => {
    
    const dog = useSelector((state)=> state.dog);
    

    return (      
               
                <div>
                        <img src={dog.img} alt={dog.name}/> 
                        <h1>{dog.name}</h1>
                        <p>{dog.temperament}</p>
                        <p>{dog.weight}</p>
                        <p>{dog.height}</p>
                        <p>{dog.lifeExp}</p>
                </div>
                

    )

}


export default DogDetail;