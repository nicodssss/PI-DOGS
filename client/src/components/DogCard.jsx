import React from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { bringDogDetails } from "../redux/actions";
import Styles from '../styles/DogCard.module.css';


const DogCard = ({ dogs }) => { 
    const dispatch = useDispatch()
   
    return dogs.map(dog=>{
        const bringDog = () => {
            dispatch(bringDogDetails(dog.id))
        }
        return (
        <div className={Styles.container2}>
            <Link onClick={bringDog} to={`/home/${dog.id}`} className={Styles.Link}>
                <div className={Styles.container} >
                    <h2 className={Styles.h3} >{dog.name}</h2>
                    <div className={Styles.spancontainer}>
                        <p className={Styles.p} >Weight: {dog.weight} </p>
                        <p className={Styles.p} >Temperament: {dog.temperament}</p>
                    </div>
                    <div>
                        <img className={Styles.img} src={dog.img} alt={dog.name} />
                    </div>
                </div>
            </Link>
        </div>
        )
    })
}

export default DogCard