import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { search } from "../redux/actions";
import Styles from '../styles/OnSearch.module.css'

export default function OnSearch() { 
    const dispatch = useDispatch()
    const [dog,setDog] = useState('');

    const handleInputChange = (e) => {
        e.preventDefault()
        const { value } = e.target;
        setDog(value) 
    }
    const handleSummit = (e) => {
        e.preventDefault()
        dispatch(search(dog))
        setDog('')
    }

    return (
        <div>
            <input className={Styles.searchbar} type='text' placeholder='Type a dog name...' value={dog} onChange={handleInputChange}></input>
            <button className={Styles.bttn} type='submit' onClick={handleSummit}>FIND</button>
        </div>
    )
}