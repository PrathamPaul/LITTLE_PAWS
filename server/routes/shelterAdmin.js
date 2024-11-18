const {Router} = require('express');
const router = Router();
const Applications = require('../models/adoptionForm.model')

router.get('/applications' , async(req,res) => {
  try{ 

    const applications = await Applications.find().populate('user');

    if (!applications.length) {
        return res.status(404).json({ message: 'No applications found' });
      }

    res.status(200).json(applications);

} catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Internal Server Error' });
}
})
router.put('/applications/:appId', async (req, res) => {
    const applicationId = req.params.appId;

    try {
        const updatedApplication = await Applications.findByIdAndUpdate(
            applicationId,
            { isApproved: true },
            { new: true } 
        );

        if (!updatedApplication) {
            return res.status(404).json({
                message: "Application not found.",
            });
        }

        res.status(200).json({
            message: "Application approved!",
            application: updatedApplication,
        });
    } catch (error) {
        console.error('Error approving application:', error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
router.put('/applications/reject/:appId', async (req, res) => {
    const applicationId = req.params.appId;

    try {
        
        const updatedApplication = await Applications.findByIdAndUpdate(
            applicationId,
            { isApproved: false }, 
            { new: true } 
        );

        if (!updatedApplication) {
            return res.status(404).json({
                message: "Application not found.",
            });
        }

        res.status(200).json({
            message: "Application has been rejected!",
            application: updatedApplication,
        });
    } catch (error) {
        console.error('Error rejecting application:', error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});

module.exports = router;