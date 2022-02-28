import axios from 'axios';
const sv = 'http://localhost:3001'

export const getAll = () => {
    return async (dispatch) => {     
        const server = `${sv}/dogs`
        const response = await axios(server)
        const data = response.data.map(dato => {
            if (dato.createdInDB === true) {
                let temperament = dato.temperaments.map(temp => temp.name)
                let joinTemps = temperament.join(', ')
                return {
                    id: dato.id,
                    temperament: joinTemps,
                    img: dato.img,
                    name: dato.name,
                    weight: `${dato.minWeight} - ${dato.maxWeight}`,
                    height: `${dato.minHeight} - ${dato.maxHeight}`,
                    createdInDB: true,
                    lifeExp: `${dato.lifeExp} years`
                }
            }
            if (!dato.weight.includes('NaN')) return dato
            return null
        }).filter(Boolean);
        return dispatch({
            type: '@get/dogs',
            payload: data
        })
}
}

export const getTemps = async (dispatch) => {
        let serverTemp = `${sv}/temperament`;
        const res = await axios(serverTemp);
        const data2 = res.data.map(temp => {
            return temp.name
        });
        return dispatch({
            type: '@get/temps',
            payload: data2
        })
}
    

export const createDog = async (state) => { // useState para crear dog desde el form, paso el dog completo cuando esten todos los campos llenos xd
    try{
        let newDogInServer = `${sv}/dogs`
        await axios.post(newDogInServer, state)
        return window.alert(`The dog ${state.name} has been created`)
    }
    catch{
        return window.alert('Error in the process')
    }
}
/* Bring dog details */
export const bringDogDetails = (id) => { 
    return { 
        type: '@filter/dog', 
        payload: id 
    } 
}
/* Search by Name */
export const search = (name) => { 
    return { 
        type: '@filter/name', 
        payload: name 
    } 
}
/* Filter by */
export const filterBy = (condition) => { 
    return { 
        type: '@filter/condition', 
        payload: condition 
    } 
}
/* Order AZ */
export const orderD = () => { 
    return { 
        type: '@filter/AZ'
    } 
}
/* Order ZA */
export const orderA = () => { 
    return { 
        type:  '@filter/ZA'
    }
}
/* Order heavy to light */
export const orderHeavy = () => { 
    return { 
        type: '@filter/heavier' 
    } 
}
/* Order light to heavy */
export const orderLight = () => { 
    return { 
        type: '@filter/lighter'
    } 
}