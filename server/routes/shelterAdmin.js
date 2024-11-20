const {Router} = require('express');

const { viewApplications,
        acceptApplication,
        rejectApplication } = require('../controllers/applications.controller');
const { verifyShelterAdmin } = require('../middlewares/auth.middleware');


const router = Router();



router.get('/applications' , verifyShelterAdmin,viewApplications)

router.put('/applications/:appId', verifyShelterAdmin , acceptApplication);

router.put('/applications/reject/:appId', verifyShelterAdmin , rejectApplication);

module.exports = router;