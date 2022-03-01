import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  getAll, getTemps, orderA, orderD, orderHeavy, orderLight, filterBy, bringDogDetails} from "../redux/actions";
import DogCard from "./DogCard";
import OnSearch from "./OnSearch";
import Pagination from "./Pagination";


const Cards = () => {
    
    const dispatch = useDispatch()
    const [current, setCurrent] = useState(1); //We set the page the user want to see
    const [postsPerPage] = useState(8); // The amount of dogs the user see. Not change

    const dogs = useSelector((state) => state.dogs) // like setPosts
    const temps = useSelector((state) => state.temperaments)
    const idxLast = current * postsPerPage;
    const idxFirst = idxLast - postsPerPage;
    const page = dogs.slice(idxFirst, idxLast);


    useEffect(()=>{
        dispatch(getTemps())
        dispatch(getAll())
        dispatch(bringDogDetails(null))
    },[dispatch])

    
    const handleClick = e => {
        e.preventDefault()
        dispatch(getAll())
    
    }
    const handleSortAZ = e => {
        const { value } = e.target;
        e.preventDefault()
        if( value === 'A-Z' ) dispatch(orderD())
        if( value === 'Z-A' ) dispatch(orderA())
        setCurrent(1)
    }

    const handleSortWeight = e => {
        const { value } = e.target;
        e.preventDefault()
        if(value === 'lighter') dispatch(orderLight())
        if(value === 'heavier') dispatch(orderHeavy())
        setCurrent(1)
    }

    const handleSortCustom = e => {
        e.preventDefault()
        const { value } = e.target;
        dispatch(filterBy(value));
        setCurrent(1)
    }
    
    return (
        <div>
            <div>
                <button onClick={handleClick}>Reload</button>
                <label htmlFor="select">Fiter By:</label>
                    <select onChange={handleSortAZ}>
                        <option value='A-Z'>A-Z</option>
                        <option value='Z-A'>Z-A</option>
                    </select>
                    <select onChange={handleSortWeight}>
                        <option value='lighter'>LIGHT TO HEAVY</option>
                        <option value='heavier'>HEAVY TO LIGHT</option>
                    </select>
                    <select onChange={handleSortCustom}>
                        <option value='all'>ALL</option>
                        <option value='api'>API</option>
                        <option value='data base'>DATABASE</option>
                    </select>
                    <select onChange={handleSortCustom}>
                        {
                            temps.map((temp, id) => {
                                return <option value={temp} key={id}>{temp}</option> 
                            })
                        }
                    </select>
            </div>
                <OnSearch/>
                <DogCard dogs={page} />
                <Pagination paginate={setCurrent} postsPerPage={postsPerPage} totalPosts={dogs.length}/>
            
        </div>
    )
}

export default Cards;