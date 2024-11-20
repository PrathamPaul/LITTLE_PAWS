const Pet = require('../models/pets.model');
const Shelter = require('../models/shelter.model')
const {imageUploadUtil} = require('../helpers/cloudinary')


const reportStray =  async (req, res) => {
    try {
      const { name, type, breed, description, age, city } = req.body;
  
      
      if (!name || !type || !breed || !city || !age) {
        return res.status(400).json({ message: "All required fields must be filled" });
      }
  
     
      const validCities = ["Chandigarh", "Mohali", "Panchkula"];
      if (!validCities.includes(city)) {
        return res.status(400).json({ message: "Invalid city selected" });
      }
  
      
      const shelter = await Shelter.findOne({ city });
      if (!shelter) {
        return res.status(404).json({ message: "Shelter not found for the selected city" });
      }
  
      
      const uploadedPictures = [];
      if (req.files) {
        for (const file of req.files) {
          const fileData = file.buffer.toString("base64");
          const uploadResult = await imageUploadUtil(`data:${file.mimetype};base64,${fileData}`);
          uploadedPictures.push(uploadResult.secure_url);
        }
      }
  
      
      const newPet = new Pet({
        name,
        type,
        breed,
        description,
        age,
        region: city,
        pictures: uploadedPictures,
        shelter: shelter._id, 
        foster: req.user.id, 
      });
  
      
      await newPet.save();
  
    
      res.status(201).json({
        message: "Stray animal reported successfully",
        pet: newPet,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error reporting stray animal", error: error.message });
    }
  }

module.exports = {reportStray}  
