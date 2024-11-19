const {Router} = require('express');
const router = Router();
const Pet = require('../models/pets.model');

//fetch all pets
router.get('/', async (req, res) => {
    try {
        const allPets = await Pet.find(); 
        res.status(200).json(allPets); 
    } catch (error) {
        console.error('Error fetching pets:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//fetch specific
router.get('/:petId', async (req, res) => {
    const petId = req.params.petId;

    try {
        const animal = await Pet.findById(petId); 
        if (!animal) {
            return res.status(404).json({ message: 'Pet not found' }); 
        }
        res.status(200).json(animal);
    } catch (error) {
        console.error('Error fetching pet by ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;