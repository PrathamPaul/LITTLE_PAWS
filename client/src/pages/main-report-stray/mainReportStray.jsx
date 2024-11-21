//MainReportStray
import React, { useState } from 'react';
import { Heart, User, ChevronDown,Check, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const MainReportStray = () => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formData, setFormData] = useState({
      pictures: [{ type: String }],
      name: '',
      type: '',
      breed: '',
      description: '',
      age: '',
      region: '',
      foster: '',
    });
    const [images, setImages] = useState([]); // State to hold multiple images

    const handleImageChange = (e) => {
        const files = e.target.files; // Get the list of files selected
    
        if (files.length > 0) {
          // Convert files to an array and push them to the state
          const newImages = Array.from(files); // Converts FileList to array
          setImages((prevImages) => [...prevImages, ...newImages]); // Push the new images into the state
        }
    };

  const validateField = (value, rules = {}) => {
    if (rules.required && !value) return 'This field is required';
    if (rules.email && !/\S+@\S+\.\S+/.test(value)) return 'Invalid email address';
    if (rules.phone && !/^\+?[\d\s-]{10,}$/.test(value)) return 'Invalid phone number';
    return '';
  };

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev, 
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));

    setTouched(prev => ({
      ...prev,
      [`${section}.${field}`]: true
    }));

    validateField(value);
  };

  const handleBlur = (section, field, rules) => {
    const error = validateField(formData[section][field], rules);
    setErrors(prev => ({
      ...prev,
      [`${section}.${field}`]: error
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasErrors = false;
    let newErrors = {};

    // Validate all required fields
    Object.entries(formData).forEach(([section, fields]) => {
      Object.entries(fields).forEach(([field, value]) => {
        const error = validateField(value, { required: true });
        if (error) {
          hasErrors = true;
          newErrors[`${section}.${field}`] = error;
        }
      });
    });

    setErrors(newErrors);

    if (!hasErrors) {
      console.log('Form submitted:', formData);
    } else {
      alert('Please fill in all required fields correctly.');
    }
  };

  const FormSection = ({ title, children }) => (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-indigo-400 mb-4">{title}</h2>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );

  const InputField = ({ 
    label, 
    type = "text", 
    value, 
    onChange, 
    onBlur,
    placeholder = "", 
    required = true,
    error,
    touched,
    hint,
    onFileChange
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          className={`w-full px-3 py-2 border ${error && touched ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 min-h-[100px]`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          type={type}
          className={`w-full px-3 py-2 border ${error && touched ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
        />
      )}
      {hint && <p className="mt-1 text-sm text-gray-500">{hint}</p>}
      {error && touched && (
        <p className="mt-1 text-sm text-red-500 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );

  return (
    <div>
        <nav className="bg-indigo-900 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">🐾 LilPaws</Link>
          <div className="flex items-center gap-6">
          <Link to="/search" className="hover:text-gray-200 font-semibold">Continue Search</Link>
            <Heart className="w-6 h-6 hover:text-indigo-200 cursor-pointer" />
            <User className="w-6 h-6 hover:text-indigo-200 cursor-pointer" />
          </div>
        </div>
      </nav>
      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-20">
  <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Pet Details Form</h1>

  <FormSection title="Basic Information">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField
        label="Pet Name"
        value={formData.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
        onBlur={() => handleBlur('name', { required: true })}
        placeholder="Enter pet's name"
        error={errors.name}
        touched={touched.name}
      />
      <InputField
        label="Type of Pet"
        value={formData.type}
        onChange={(e) => handleInputChange('type', e.target.value)}
        onBlur={() => handleBlur('type', { required: true })}
        placeholder="e.g., Dog, Cat, Bird"
        error={errors.type}
        touched={touched.type}
      />
    </div>
    <InputField
      label="Breed"
      value={formData.breed}
      onChange={(e) => handleInputChange('breed', e.target.value)}
      onBlur={() => handleBlur('breed', { required: true })}
      placeholder="e.g., Golden Retriever, Persian Cat"
      error={errors.breed}
      touched={touched.breed}
    />
    <InputField
      label="Description"
      type="textarea"
      value={formData.description}
      onChange={(e) => handleInputChange('description', e.target.value)}
      placeholder="Brief description about the pet"
      error={errors.description}
      touched={touched.description}
    />
  </FormSection>

  <FormSection title="Age and Region">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField
        label="Age (in years)"
        type="number"
        value={formData.age}
        onChange={(e) => handleInputChange('age', e.target.value)}
        onBlur={() => handleBlur('age', { required: true, min: 0 })}
        placeholder="e.g., 3"
        error={errors.age}
        touched={touched.age}
      />
      <InputField
        label="Region"
        value={formData.region}
        onChange={(e) => handleInputChange('region', e.target.value)}
        onBlur={() => handleBlur('region', { required: true })}
        placeholder="e.g., California, Texas"
        error={errors.region}
        touched={touched.region}
      />
    </div>
  </FormSection>

  <FormSection title="Foster Details">
    <InputField
      label="Foster User ID"
      value={formData.foster}
      onChange={(e) => handleInputChange('foster', e.target.value)}
      placeholder="Optional: User ID of the foster"
      error={errors.foster}
      touched={touched.foster}
      hint="Leave blank if not applicable"
    />
  </FormSection>

  <FormSection title="Upload Pictures">
    {/* <InputField
      label="Pictures (URLs)"
      type="textarea"
      value={formData.pictures.join(', ')}
      onChange={(e) => handleInputChange('pictures', e.target.value.split(',').map((url) => url.trim()))}
      placeholder="Add picture URLs separated by commas"
      error={errors.pictures}
      touched={touched.pictures}
      hint="Paste URLs of pet pictures"
    /> */}
    <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      
      {/* Render all uploaded images */}
      <div className="image-previews">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Uploaded Preview ${index}`} style={{ width: "200px", height: "auto" }} />
        ))}
        </div>
  </FormSection>

  <button
    type="submit"
    className="w-full bg-indigo-900 text-white py-3 px-6 rounded-md hover:bg-indigo-500 transition-colors duration-200 font-medium"
  >
    Submit Pet Details
  </button>
</form>

    </div>
  );
};

export default MainReportStray;