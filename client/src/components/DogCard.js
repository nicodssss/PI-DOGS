import React from "react";

const DogCard = ({ dogs }) => { 
    return dogs.map(dog=>{
        return (
            <div>
                <h2>{dog.name}</h2>
                <span>{dog.temperament}</span>
                <span>{dog.weight}</span>
                <img src={dog.img} alt={dog.name} width='120px' height='100px'></img>
            </div>
        )
    })
}

export default DogCard