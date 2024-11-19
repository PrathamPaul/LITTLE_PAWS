const mongoose = require('mongoose');

const AdoptionFormSchema = new mongoose.Schema({
  user : {
    type : mongoose.Schema.ObjectId,
    ref : 'User'
  },
  personalInfo: {
    fullName: { type: String, required: true },
    email: { type: String, required: true,  },
    phone: { type: String, required: true,},
    altPhone: { type: String, required: false,},
    address: { type: String, required: true },
    occupation: { type: String, required: true },
    workingHours: { type: String, required: true },
  },
  livingConditions: {
    residenceType: { type: String, required: true },
    ownershipStatus: { type: String, required: true },
    hasYard: { type: Boolean, default: false },
    yardFenced: { type: Boolean, default: false },
    householdMembers: { type: String, required: true },
    childrenAges: { type: String, required: false },
    landlordContact: { type: String, required: function () { return this.livingConditions.ownershipStatus === 'Rent'; } },
    moveFrequency: { type: String, required: true },
  },
  petExperience: {
    currentPets: { type: String, required: false },
    previousPets: { type: String, required: true },
    vetName: { type: String, required: false },
    vetContact: { type: String, required: false,},
    petAllergies: { type: String, required: false },
    trainingExperience: { type: String, required: true },
  },
  adoptionDetails: {
    petName: { type: String, required: true },
    reasonToAdopt: { type: String, required: true },
    timeWithPet: { type: String, required: true },
    exercisePlan: { type: String, required: true },
    emergencyPlan: { type: String, required: false },
    adjustmentPlan: { type: String, required: false },
    petExpenses: { type: String, required: true },
    vacationPlan: { type: String, required: true },
  },
  isApproved: {
    type: Boolean,
    default: false
},
  submissionDate: { type: Date, default: Date.now },
  
});


module.exports = mongoose.model('AdoptionForm', AdoptionFormSchema);
