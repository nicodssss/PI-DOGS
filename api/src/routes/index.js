const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
    getDogs,
    getDogById,
    getTemps,
    createDog
} = require('./handlers.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', getDogs)
router.get('/dogs/:id', getDogById)
router.get('/temperament', getTemps)
router.post('/dog', createDog)

module.exports = router;
