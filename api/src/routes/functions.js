const axios = require('axios')

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
        lifeExp: dog.life_span
    }))
    return dogs;
}

// --- DBDOGS ---

const getDBDogs = async () => {
    return await Dog.findAll({
        include: Temperament
    })
}

// All Dogs 
const getAllDogs = async () => {
    const apiDogs = await getApiDogs(); 
    const dbDogs = await getDBDogs();  
    const allDogs = [...apiDogs, ...dbDogs]  
    return allDogs;
}
// All moods

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

//Moods 

const setTemps = async () =>{
    let moods = await getTemperaments();
    const cleaning = new Set(moods) 
    let clear = [...cleaning].filter(Boolean) 
    return clear
}


module.exports = {
    getAllDogs,
    setTemps
}
