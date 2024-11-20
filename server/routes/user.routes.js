const {Router} = require('express');
const Pet = require('../models/pets.model');
const { upload } = require('../helpers/cloudinary');
const { verifyUser } = require('../middlewares/auth.middleware');
const Shelter = require('../models/shelter.model')
const {imageUploadUtil} = require('../helpers/cloudinary');
const { reportStray } = require('../controllers/user.controller');
const router = Router();

router.post('/report-stray', verifyUser, upload.array("pictures", 5), reportStray);
  

  
  module.exports = router;