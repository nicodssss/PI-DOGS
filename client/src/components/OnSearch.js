import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { search } from "../redux/actions";


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
    }

    return (
        <div>
            <input type='text' placeholder='Type a dog name...' onChange={handleInputChange}></input>
            <button type='submit' onClick={handleSummit}></button>
        </div>
    )
}