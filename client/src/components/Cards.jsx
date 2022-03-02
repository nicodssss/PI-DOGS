import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  filterTemp, setPage, getAll, getTemps, orderA, orderD, orderHeavy, orderLight, filterBy, bringDogDetails} from "../redux/actions";
import DogCard from "./DogCard";
import OnSearch from "./OnSearch";
import Pagination from "./Pagination";
import Styles from '../styles/Cards.module.css'

const Cards = () => {
    
    const dispatch = useDispatch()
    
    const [postsPerPage] = useState(8); // The amount of dogs the user see. Not change
    const p = useSelector((state)=> state.page)
    const dogs = useSelector((state) => state.dogs) // like setPosts
    const temps = useSelector((state) => state.temperaments)
    
    const idxLast = p * postsPerPage;
    const idxFirst = idxLast - postsPerPage;
    const page = dogs.slice(idxFirst, idxLast);
   
    //We set the page the user want to see
    
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
        dispatch(setPage(1))
    }

    const handleSortWeight = e => {
        const { value } = e.target;
        e.preventDefault()
        if(value === 'lighter') dispatch(orderLight())
        if(value === 'heavier') dispatch(orderHeavy())
        dispatch(setPage(1))
    }

    const handleSortCustom = e => {
        e.preventDefault()
        const { value } = e.target;
        dispatch(filterBy(value));
        dispatch(setPage(1))
    }

    const handleSortTemp = e => {
        e.preventDefault()
        const { value } = e.target;
        dispatch(filterTemp(value));
        dispatch(setPage(1))
    }
 
    const paginate = n => {
        dispatch(setPage(n))
    }
    
    return (
        <div className={Styles.box1} >
            <div className={Styles.box4}>
                <button onClick={handleClick}>Reload</button>
                <label htmlFor="select">Fiter By:</label>
                    <select className={Styles.minimal} onChange={handleSortAZ}>
                        <option value='A-Z'>A-Z</option>
                        <option value='Z-A'>Z-A</option>
                    </select>
                    <select className={Styles.minimal} onChange={handleSortWeight}>
                        <option value='lighter'>LIGHT TO HEAVY</option>
                        <option value='heavier'>HEAVY TO LIGHT</option>
                    </select>
                    <select className={Styles.minimal} onChange={handleSortCustom}>
                        <option value='all'>ALL</option>
                        <option value='api'>API</option>
                        <option value='data base'>DATABASE</option>
                    </select>
                    <select className={Styles.minimal} onChange={handleSortTemp}>
                        {
                            temps.map((temp, id) => {
                                return <option value={temp} key={id}>{temp}</option> 
                            })
                        }
                    </select>
                    <OnSearch/>
            </div>
                
               
                <DogCard dogs={page} />
                
                <Pagination paginate={paginate} postsPerPage={postsPerPage} totalPosts={dogs.length}/>
            
        </div>
    )
}

export default Cards;