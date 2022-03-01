import React from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { bringDogDetails } from "../redux/actions";

const DogCard = ({ dogs }) => { 
    const dispatch = useDispatch()
   
    return dogs.map(dog=>{
        const bringDog = () => {
            dispatch(bringDogDetails(dog.id))
        }
        return (
        <div>
            <Link onClick={bringDog} to={`/home/${dog.id}`}>
                <div>
                    <h2>{dog.name}</h2>
                    <span>{dog.temperament}</span>
                    <span>{dog.weight}</span>
                    <img src={dog.img} alt={dog.name} width='120px' height='100px'></img>
                </div>
            </Link>
        </div>
        )
    })
}

export default DogCard