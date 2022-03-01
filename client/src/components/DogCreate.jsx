import React, { useEffect, useState } from "react";
import { createDog, getTemps } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const CreateDog = () => {
    const [state, setState] = useState({
        name: '',
        img: 'https://fondosmil.com/fondo/17538.jpg',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        minLifeExp: '',
        maxLifeExp: '',
        temperament: []
    })
    /* bring Temps */
    const dispatch = useDispatch()
    let navigate = useNavigate()

    useEffect(() => {
        dispatch(getTemps())
    }, [dispatch])

    const temps = useSelector(state => state.temperaments)
    
    /* Change the state */
    const handleChange = ({ target: { name, value } }) => {
        setState({ ...state, [name]: value })
    }
    const pushValues = ({ target: { value } }) => {
        if (!state.temperament.includes(value)) {
            setState({
                ...state,
                temperament: [...state.temperament, value]
            })
        }
    }
    const cleanTemps = ({ target: { name } }) => {
        let newTemps = state.temperament.filter(temp => temp !== name)
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
        <div  >
            
            <div >
                <h2>CREATE DOG</h2>
                <div  >
                    <div  >
                        {/* Name */}
                        <span>Name</span>
                        {!state.name ? (<span  >Name is required</span>) 
                            : !state.name.match(/^[A-Za-z ]+$/) ? (<span  >Name can not contains Numbers</span>)
                            : null}
                        <label>
                            <input
                               
                                id='name'
                                type='text'
                                name='name'
                                placeholder='Name'
                                value={state.name}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            <input
                                id='img'
                                type='text'
                                name='img'
                                placeholder='Url imagen'
                                value={state.img}
                                onChange={handleChange}
                            />
                        </label>
                        {/* Min/Max height */}
                        <span>Min/Max height</span>
                        {!state.minHeight && !state.maxHeight ? (<span >Min and Max Height is required</span>) 
                            : !state.minHeight ? (<span >Min Height is required</span>)
                            : !state.maxHeight ? (<span  >Max Height is required</span>)
                            : state.minHeight > state.maxHeight ? (<span  >Max height should be greater than Min height</span>)
                            : <span  >{state.minHeight} - {state.maxHeight}</span>}
                        <label>
                            <input
                                id='minH'
                                type='number'
                                name='minHeight'
                                min='0'
                                placeholder='Min Height'
                                value={state.minH}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            <input
                                id='maxH'
                                type='number'
                                name='maxHeight'
                                min='0'
                                placeholder='Max Height'
                                value={state.maxH}
                                onChange={handleChange}
                            />
                        </label>
                        {/* Min/Max Weight */}
                        <span>Min/Max weight</span>
                        {!state.minWeight && !state.maxWeight ? (<span  >Min and Max Weight is required</span>) 
                            : !state.minWeight ? (<span >Min Weight is required</span>)
                            : !state.maxWeight ? (<span  >Max Weight is required</span>)
                            : state.minWeight > state.maxWeight ? (<span  >Max Weight should be greater than Min Weight</span>)
                            : <span  >{state.minWeight} - {state.maxWeight}</span>}
                        <label>
                            <input
                                id='minW'
                                type='number'
                                name='minWeight'
                                min='0'
                                placeholder='Min Weight'
                                value={state.minW}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            <input
                                id='maxW'
                                name='maxWeight'
                                type='number'
                                placeholder='Max Weight'
                                min='0'
                                value={state.maxW}
                                onChange={handleChange}
                            />
                        </label>
                        {/* Life Expectancy */}
                        <span>Min/Max Life Expectancy</span>
                        {!state.minLifeExp && !state.maxLifeExp ? (<span  >Min and Max Expectanc is required</span>) 
                            : !state.minLifeExp ? (<span  >Min Weight is required</span>)
                            : !state.maxLifeExp ? (<span  >Max Weight is required</span>)
                            : state.minLifeExp > state.maxLifeExp ? (<span  >Max Weight should be greater than Min Weight</span>)
                            : <span  >{state.minLifeExp} - {state.maxLifeExp}</span>}
                        <label>
                            <input
                                id='minLifeExp'
                                name='minLifeExp'
                                type='number'
                                min='0'
                                placeholder='Min Life Expectancy'
                                value={state.minLifeExp}
                                onChange={handleChange} />
                        </label>
                        <label>
                            <input
                                id='maxLifeExp'
                                name='maxLifeExp'
                                type='number'
                                placeholder='Max Life Expectancy'
                                min='0'
                                value={state.maxLifeExp}
                                onChange={handleChange}
                            />
                        </label><br />
                        <span>Add Temperament</span>
                        {state.temperament.lenght ? (<span></span>)
                            : (<span  >Should have at least one temperament</span>)}
                        <select onChange={pushValues} defaultValue='addTemp' name='temperament' placeholder='Add Temperament'>
                            <option value='addTemp' disabled>Add Temperament</option>
                            {temps.map((temp, idx) => (<option value={temp} name={temp} key={idx+1} >{temp}</option>))}
                        </select>
                        <button  onClick={submitDog} >
                            Create
                        </button>
                    </div>
                    <div  >
                        <div >
                            {state.temperament.map(temp => (<div>
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