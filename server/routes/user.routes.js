const {Router} = require('express');
const Pet = require('../models/pets.model');
const { upload } = require('../helpers/cloudinary');
const { verifyUser } = require('../middlewares/auth.middleware');
const Shelter = require('../models/shelter.model')
const {imageUploadUtil} = require('../helpers/cloudinary');
const { reportStray } = require('../controllers/user.controller');
const AdoptionForm = require('../models/adoptionForm.model')
const router = Router();

router.post('/report-stray', verifyUser, upload.array("pictures", 5), reportStray);
  
router.post('/adopt/:petId', verifyUser, async (req, res) => {
  try {
    const { petId } = req.params;
    const { id: userId } = req.user; 

    
    const { 
      city, 
      personalInfo, 
      livingConditions, 
      petExperience, 
      adoptionDetails 
    } = req.body;

   
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ success: false, message: "Pet not found" });
    }


    console.log(userId);
    
    const existingForm = await AdoptionForm.findOne({ user: userId });
    if (existingForm) {
      return res.status(400).json({ success: false, message: "You have already submitted an adoption form for this pet." });
    }

    
    const adoptionForm = new AdoptionForm({
      user: userId,
      city,
      personalInfo,
      livingConditions,
      petExperience,
      adoptionDetails,
    });

    
    const savedForm = await adoptionForm.save();

    
    res.status(201).json({
      success: true,
      message: "Adoption form submitted successfully.",
      adoptionForm: savedForm,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error submitting adoption form.", error: error.message });
  }
});
  
  module.exports = router;