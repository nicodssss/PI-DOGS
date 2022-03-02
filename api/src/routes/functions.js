const axios = require('axios');
const db = require('../db');

// API + APIKEY
const api = 'https://api.thedogapi.com/v1/breeds?api_key='
const { API_KEY } = process.env;
const { Dog, Temperament } = require('../db');


// --- APIDOGS ---

const getApiDogs = async ()=> {
    const response = await axios(`${api}${API_KEY}`);
    const dogs = response.data.map(dog => ({
        id: dog.id,
        name: dog.name,
        img: dog.image.url,
        temperament: dog.temperament,
        weight: dog.weight.metric,
        height: dog.height.metric,
        lifeExp: dog.life_span,
        createdInDB: false
    }))
    return dogs;
}

// --- DBDOGS ---

const getDBDogs = async () => {
    const dbDogs = await Dog.findAll({
        include: Temperament
    })
    return dbDogs.map(dog=>{ 
            let newTemp = dog.temperaments[0].name
            for(let i = 1; i < dog.temperaments.length; i++ ){
                newTemp = newTemp + ', ' + dog.temperaments[i].name 
            }
            return {
                id: dog.id,
                name: dog.name,
                img: dog.img,
                temperament: newTemp,
                weight: `${dog.minWeight} - ${dog.maxWeight}`, //  I made like this for the form, more practic
                height: `${dog.minHeight} - ${dog.maxHeight}`,
                lifeExp: `${dog.minLifeExp} - ${dog.maxLifeExp} years`,
                createdInDB: dog.createdInDB
            
        }
    })
}

// All Dogs 
const getAllDogs = async () => {
    const apiDogs = await getApiDogs(); 
    const dbDogs = await getDBDogs();  
    const allDogs = [...apiDogs, ...dbDogs]  
    return allDogs;
}
// All moods - include repeated and undefineds

const getTemperaments = async () => {
    const getDogs = await getApiDogs(); 
    const getTemps = getDogs.map(dog => {
        if(!dog.temperament){ 
            return dog.temperament 
        }
        const aux = dog.temperament.split(', ')
        return aux 
    })
    const finalTemps = getTemps.flat()
    return finalTemps 
}

// All moods - without repeated and undefineds

const setTemps = async () =>{
    let moods = await getTemperaments(); 
    const cleaning = new Set(moods) // clean reapeated moods
    let clear = [...cleaning].filter(Boolean) // cleaning undefineds 
    return clear // return temperaments
}


module.exports = {
    getAllDogs,
    setTemps
}
