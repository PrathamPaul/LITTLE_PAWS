const Applications = require('../models/adoptionForm.model')
const User = require('../models/User')

// const viewApplications =  async(req,res) => {
//     try{ 
        
//       const applications = await Applications.find().populate('user');
  
//       if (!applications.length) {
//           return res.status(404).json({ message: 'No applications found' });
//         }
  
//       res.status(200).json(applications);
  
//   } catch (error) {
//       console.error('Error fetching applications:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//   }
//   }





const viewApplications = async (req, res) => {
    try {
      const { id: shelterAdminId } = req.user;
  
      console.log("Shelter Admin ID:", shelterAdminId);
  
      // Fetch the shelter admin's details to get the city
      const shelterAdmin = await User.findById(shelterAdminId);
      console.log(shelterAdmin);
      console.log(shelterAdmin.city)
      if (!shelterAdmin) {
        return res.status(404).json({ message: "Shelter admin not found." });
      }
  
      const adminCity = shelterAdmin.city;
      console.log("Shelter Admin City:", adminCity);
  
      if (!adminCity) {
        return res.status(400).json({ message: "City is not associated with this admin." });
      }
  
      // Find applications for the admin's city
      const applications = await Applications.find({ city: adminCity }).populate("user");
  
      console.log("Applications found:", applications);
  
      if (!applications.length) {
        return res.status(404).json({ message: "No applications found for your city." });
      }
  
      res.status(200).json({
        success: true,
        message: `Applications for city: ${adminCity}`,
        applications,
      });
    } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };



const acceptApplication = async (req, res) => {
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
}  

const rejectApplication =  async (req, res) => {
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
}

module.exports = {viewApplications , acceptApplication , rejectApplication};