import React, { useEffect, useState } from "react";
import { createDog, getTemps } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from 'react-router-dom';
import '../styles/dogcreate.css'

const CreateDog = () => {

    const [state, setState] = useState({
        name: '',
        img: 'https://www.mundoperro.net/wp-content/uploads/Beagle1.jpg',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        minLifeExp: '',
        maxLifeExp: '',
        temperament: []
    })

    /* bring Temps / dispatch and navigate to use history  */
    const dispatch = useDispatch()
    let navigate = useNavigate()
    
    useEffect(() => {
        dispatch(getTemps())
    }, [dispatch])

    const temps = useSelector(state => state.temperaments)
    
    // functions to change my state 

    const handleChange = ({ target: { name, value } }) => { // destructuring to get name and values from event.target --> works on every input
        setState({ ...state, [name]: value })
    }
    // function to add temps to my array 
    const pushValues = ({ target: { value } }) => { // to get only the value
        if (!state.temperament.includes(value)) { // check if state includes the temps --> if we add before
            setState({
                ...state,
                temperament: [...state.temperament, value] // we make a copy of the state and modify only temps with their copy and the new value 
            })
        }
    }
   
    const cleanTemps = ({ target: { name } }) => {  // it works on div where we can see the temps we have add but now we delete if we dont want the temp anymore
        let newTemps = state.temperament.filter(temp => temp !== name) // filter clean the temp that we 'X' from the array 
        setState({
            ...state,
            temperament: newTemps
        })
    }
    const submitDog = () => {
        if (!state.name || !state.minHeight || !state.maxHeight || !state.minWeight || !state.maxWeight || !state.minLifeExp || !state.maxLifeExp || state.temperament.length < 1) {
            return alert('There are empty fields required')
        } else {
            let tempState = state.temperament.join(', ')
            
            setState({
                ...state,
                temperament: tempState
            })
            navigate('/home')
            createDog(state)
            
        }
        
    }
    return (
        <div  className='container' >
            
            <div >
                <h2 className="title">CREATE YOUR DOG</h2>
                <div  >
                    <div  className="form">
                        {/* Name */}
                        <span>Name</span>
                        {!state.name ? (<span className="message" >Name is empty</span>) 
                            : !state.name.match(/^[A-Za-z ]+$/) ? (<span className="message">Name should not have numbers</span>) // /^[A-Za-z ]+$/ --> contains only strings from A-Z and a-z
                            : null}
                        <label>

                            <input  id='name'  type='text' name='name' placeholder='Insert your dog name' value={state.name} onChange={handleChange} />

                        </label>
                        <span>Image</span>
                        <span className="message">You can use your own image or left default image</span>
                        <label>

                            <input id='img' type='text' name='img' placeholder='Insert your image url' value={state.img} onChange={handleChange}/>

                        </label>
                        {/* Min/Max height */}
                        <span>Min/Max Height</span>
                        {!state.minHeight && !state.maxHeight ? (<span className="message">Min and Max Height are empty</span>) 
                            : !state.minHeight ? (<span className="message">Min Height is empty</span>)
                            : !state.maxHeight ? (<span className="message" >Max Height is empty</span>)
                            : state.minHeight > state.maxHeight ? (<span className="message" >Max height must be better than Min height</span>)
                            : <span className="message" >{state.minHeight} - {state.maxHeight}</span>}
                        <label>

                            <input id='minH' type='number' name='minHeight' min='0' placeholder='Insert your dog min Height' value={state.minH} onChange={handleChange} />

                        </label>
                        <label>

                            <input id='maxH' type='number' name='maxHeight' min='0' placeholder='Insert your dog max Height' value={state.maxH} onChange={handleChange} />

                        </label>
                        {/* Min/Max Weight */}
                        <span>Min/Max Weight</span>
                        {!state.minWeight && !state.maxWeight ? (<span className="message">Min and Max Weight are empty</span>) 
                            : !state.minWeight ? (<span className="message">Min Weight is empty</span>)
                            : !state.maxWeight ? (<span className="message"  >Max Weight is empty</span>)
                            : state.minWeight > state.maxWeight ? (<span  className="message">Max Weight must be better than Min Weight</span>)
                            : <span className="message" >{state.minWeight} - {state.maxWeight}</span>}
                        <label>
                            <input  id='minW' type='number' name='minWeight' min='0' placeholder='Insert your dog min Weight' value={state.minW} onChange={handleChange} />
                        </label>
                        <label>
                            <input id='maxW' name='maxWeight' type='number' placeholder='Insert your dog max Weight' min='0' value={state.maxW} onChange={handleChange} />
                        </label>
                        {/* Life Expectancy */}
                        <span>Min/Max Life Expectancy</span>
                        {!state.minLifeExp && !state.maxLifeExp ? (<span className="message" >Min and Max Expectanc are empty</span>) 
                            : !state.minLifeExp ? (<span className="message" >Min Weight is empty</span>)
                            : !state.maxLifeExp ? (<span className="message" >Max Weight is empty</span>)
                            : state.minLifeExp > state.maxLifeExp ? (<span className="message" >Max Weight must be better than Min Weight</span>)
                            : <span className="message" >{state.minLifeExp} - {state.maxLifeExp}</span>}
                        <label>

                            <input id='minLifeExp' name='minLifeExp' type='number' min='0' placeholder='Insert your dog min Life Expectancy' value={state.minLifeExp} onChange={handleChange} />

                        </label>
                        <label>

                            <input id='maxLifeExp' name='maxLifeExp' type='number' placeholder='Insert your dog max Life Expectancy' min='0' value={state.maxLifeExp} onChange={handleChange} />

                        </label><br />
                        <span>Add Temperament</span>
                        {state.temperament.lenght ? (<span className="message">{`${state.temperament.lenght} are good`}</span>)
                            : (<span className="message" >Include at least one temperament</span>)}
                        <select onChange={pushValues} defaultValue='addTemp' name='temperament' placeholder='Add Temperament'>
                            <option value='addTemp' disabled>Add Temperament</option> 
                            {temps.map((temp, idx) => (<option value={temp} name={temp} key={idx+1} >{temp}</option>))}
                        </select>
                        <button className="summitbutton" onClick={submitDog} >
                            Create
                        </button>
                    </div>
                    <div className="tempsBox">
                        <span>TEMPERAMENTS YOU ADDED</span>
                        <span className="message">Click on 'X' button to delete</span>
                        <div >
                            {state.temperament.map(temp => (<div className='tempAdd' >
                                <button onClick={cleanTemps} name={temp}>X</button>
                                <span>{temp}</span>
                            </div>))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateDog;