const {
    getAllDogs,
    setTemps
} = require('./functions.js')
/* Get db Models */
const { Dog, Temperament } = require('../db');

/*
Únicos Endpoints/Flags que pueden utilizar
GET https://api.thedogapi.com/v1/breeds
GET https://api.thedogapi.com/v1/breeds/search?q={raza_perro}

 GET /dogs:
Obtener un listado de las razas de perro
Debe devolver solo los datos necesarios para la ruta principal : Imagen - Nombre - Temperamento - Peso
 GET /dogs?name="...":
Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
Si no existe ninguna raza de perro mostrar un mensaje adecuado
 GET /dogs/{idRaza}:
Obtener el detalle de una raza de perro en particular
Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
Incluir los temperamentos asociados
 GET /temperament:
Obtener todos los temperamentos posibles
En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
 POST /dog:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
Crea una raza de perro en la base de datos
*/

const getDogs = async (req,res) => { // dogs with the data for main route: image, name, temps, weight and if byname necessay
    try {
        const dogs = await getAllDogs();
        const data = dogs.map(dog => dog)
        const { name } = req.query;
            
        if(name){ 
                let match = data.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
                if(match){
                    return res.status(200).json(match);
                } else {
                    console.log('asdasdasdasdasdasdasdasd')
                    return res.status(200).send({message: 'Not found'})
                }
            } 
        else {
            return res.send(data)
        }
    } 
    catch (e){
        res.send(e)
    }
}

const getDogById = async (req, res) => {
    try {
        const { id } = req.params;
        const dogs = await getAllDogs();
        let filter = dogs.filter(dog=> dog.id == id);
        if(filter){
            return res.send(filter)
        } 
        else {
            return res.status(404).send('notfound')
        }
    }
    catch (e) {
        res.send(e)
    }
}

const getTemps = async (req,res) => {
    try {
        const temps = await setTemps();
        temps.forEach(t => {
            let aux = t.toLowerCase();
            Temperament.findOrCreate(
                {
                where: { name: aux }
                }
            )
        })
        const allTemperaments = await Temperament.findAll();
        res.status(200).send(allTemperaments)
    }
    catch(e){
        res.send(400).json(e)
    }
}

const createDog = async (req, res) => {
    try {
        const { name, img, minHeight, maxHeight, minWeight, maxWeight, minLifeExp, maxLifeExp, temperament } = req.body;
        const newDog = await Dog.create({
            name,
            img,
            minHeight,
            maxHeight,
            minWeight,
            maxWeight,
            minLifeExp,
            maxLifeExp
        })
        for (let i = 0; i < temperament.length; i++) {
            let a = await Temperament.findOne({ where:{ name: temperament[i]}})
            console.log(a)
            newDog.addTemperament(a)      
        }
        res.send(newDog)
    }
    catch (err) {
        res.send(err)
    }
}

module.exports = {
    getDogs,
    getDogById,
    getTemps,
    createDog
}