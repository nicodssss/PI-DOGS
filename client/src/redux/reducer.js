const initialState = {
    temperaments: [], // useEffect ---> bring all temps
    dogs: [], // useEffect ---> bring all dgos
    aux: [], // to help me not modif initialState.dogs
    dog: {}, // specific dog ---> when need an specific dog from an ID
    page: 1,
    filterDog: []
}

export default function mainReducer (state = initialState, {type, payload}){
    let dogAux = state.dogs.map(d=> d);

    switch(type){
        case '@get/dogs': return {
            ...state,
            dogs: payload,
            aux: payload
        }
        case '@get/temps': return {
            ...state,
            temperaments: payload
        }
        case '@set/page': return {
            ...state,
            page: payload
        }  
        case '@filter/dog': // CardDetail
            let match = dogAux.find(dog => dog.id === payload)
            if(payload === null) match = {}
            return {
                ...state,
                dog: match
            }
        case '@filter/name' : 
            const dogsName = state.aux.filter(dog => {
                if(payload === '') return dog
                if(payload && dog.name.toLowerCase().includes(payload.toLowerCase())) return dog
                return null
            }).filter(Boolean)

            return {
                ...state,
                dogs: dogsName,
                filterDog: dogsName,
                aux: dogsName
            }
        case '@filter/condition': // will be 3 conditions 'api' 'data base' 
            const dogs = state.aux.filter(dog=> {
                if(payload.toLowerCase() === 'all') return dog;
                if(payload.toLowerCase() === 'api' && !dog.createdInDB) return dog;
                if(payload.toLowerCase() === 'data base' && dog.createdInDB) return dog;
                return null
            }).filter(Boolean) // to clear the null's 
            return {
                ...state,
                dogs: dogs,
                filterDog: dogs
            }
        case '@filter/temps':
            const dogui = state.filterDog.filter(dog => dog.temperament && dog.temperament.toLowerCase().includes(payload.toLowerCase()))
            return {
                ...state,
                dogs: dogui
            }
        case '@filter/AZ':
            const orderA = dogAux.sort((prev, post) => {
                if (prev.name.toLowerCase() < post.name.toLowerCase()) return -1;
                else if (prev.name.toLowerCase() > post.name.toLowerCase()) return 1;
                else return 0
            });
            return {
                ...state,
                dogs: orderA,
            }
        case '@filter/ZA': // order from Z to A
            const orderZ = dogAux.sort((prev, post) => {
                if (prev.name.toLowerCase() < post.name.toLowerCase()) return 1;
                else if (prev.name.toLowerCase() > post.name.toLowerCase()) return -1;
                else return 0
            });
            return {
                ...state,
                dogs: orderZ,
            }
        case '@filter/lighter': 
            const orderLighter = dogAux.sort((prev, post) => {
                let lighterL = Math.round(prev.weight.split('-')[0])
                let heavierL = Math.round(post.weight.split('-')[0])
                return lighterL - heavierL
            })
            return {
                ...state,
                dogs: orderLighter,
            }
        case '@filter/heavier': 
            const orderHeavier = dogAux.sort((prev, post) => {
                let lighterH = Math.round(prev.weight.split('-').reduce((previ, poste) => parseInt(previ) + parseInt(poste) / 2))
                let heavierH = Math.round(post.weight.split('-').reduce((previ, poste) => parseInt(previ) + parseInt(poste) / 2))
                return heavierH - lighterH
            })
            return {
                ...state,
                dogs: orderHeavier,
            }
          
        default: return state
    }
}