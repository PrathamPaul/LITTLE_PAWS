import React, { useState } from 'react';
import { 
  Heart,  
  Users,
  PawPrint,
  HandHelping, 
  Home, 
  CheckCircle2, 
  Award, 
  Share2 
} from 'lucide-react';



const teamMembers = [
  {
    name: "Emma Rodriguez",
    role: "Founder & Lead Rescuer",
    image: "/api/placeholder/300/300",
    bio: "A lifelong animal advocate with 15 years of experience in animal welfare."
  },
  {
    name: "Michael Chen",
    role: "Veterinary Coordinator",
    image: "/api/placeholder/300/300",
    bio: "Dedicated veterinarian passionate about animal health and rehabilitation."
  },
  {
    name: "Sarah Johnson",
    role: "Adoption Specialist",
    image: "/api/placeholder/300/300",
    bio: "Expert in matching pets with their perfect forever families."
  }
];

const petImages = [
  "/api/placeholder/400/300",
  "/api/placeholder/400/300",
  "/api/placeholder/400/300",
  "/api/placeholder/400/300",
  "/api/placeholder/400/300",
  "/api/placeholder/400/300"
];

const AboutUs = () => {
  const [activeSection, setActiveSection] = useState('mission');

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://i.pinimg.com/564x/ec/2c/3b/ec2c3b671df9dd4a28513f823b71333f.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        
        <div className="relative z-20 container mx-auto px-6 flex items-center justify-center h-full text-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-5xl font-bold mb-6 flex items-center justify-center gap-4">
              PawConnect <Heart className="text-red-500" size={56} />
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Connecting hearts, saving lives. We believe every animal deserves a loving home and a second chance.
            </p>
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
              Adopt a Friend
            </button>
          </div>
        </div>
      </div>

      
      <div className="container mx-auto px-6 py-16">
      
        <section className="grid md:grid-cols-4 gap-6 mb-16 text-center">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
            <PawPrint className="mx-auto text-red-500 mb-4" size={48} />
            <h3 className="text-3xl font-bold text-gray-800">1,500+</h3>
            <p className="text-gray-600">Animals Rescued</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
            <Home className="mx-auto text-blue-500 mb-4" size={48} />
            <h3 className="text-3xl font-bold text-gray-800">800+</h3>
            <p className="text-gray-600">Successful Adoptions</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
            <Users className="mx-auto text-green-500 mb-4" size={48} />
            <h3 className="text-3xl font-bold text-gray-800">250+</h3>
            <p className="text-gray-600">Volunteers</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
            <Award className="mx-auto text-yellow-500 mb-4" size={48} />
            <h3 className="text-3xl font-bold text-gray-800">5+</h3>
            <p className="text-gray-600">Years of Service</p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">Our Dedicated Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-gray-600 mb-4">{member.role}</p>
                  <p className="text-gray-700">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">Our Rescue Stories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {petImages.map((image, index) => (
              <div 
                key={index} 
                className="rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300"
              >
                <img 
                  src={image} 
                  alt={`Rescue story ${index + 1}`} 
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8 space-x-4">
              {['mission', 'values', 'approach'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-6 py-3 rounded-full transition ${
                    activeSection === section 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>

            {activeSection === 'mission' && (
              <div className="text-center">
                <HandHelping className="mx-auto text-red-500 mb-6" size={64} />
                <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
                <p className="text-xl text-gray-700">
                  To rescue, rehabilitate, and rehome stray and abandoned animals, ensuring they receive the love and care they deserve. We simplify the adoption process while promoting responsible pet ownership.
                </p>
              </div>
            )}

            {activeSection === 'values' && (
              <div className="text-center">
                <CheckCircle2 className="mx-auto text-green-500 mb-6" size={64} />
                <h3 className="text-3xl font-bold mb-6">Our Core Values</h3>
                <ul className="text-xl text-gray-700 space-y-4">
                  <li>Compassion for all living beings</li>
                  <li>Commitment to animal welfare</li>
                  <li>Transparency in our operations</li>
                  <li>Community engagement and education</li>
                </ul>
              </div>
            )}

            {activeSection === 'approach' && (
              <div className="text-center">
                <Share2 className="mx-auto text-blue-500 mb-6" size={64} />
                <h3 className="text-3xl font-bold mb-6">Our Approach</h3>
                <p className="text-xl text-gray-700">
                  We collaborate with shelters, foster homes, and animal welfare organizations to find the perfect match between pets and adopters. Our comprehensive support ensures successful, lifelong connections.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      <div className="bg-red-500 text-white py-16 text-center">
        <h2 className="text-4xl font-bold mb-6">Make a Difference Today</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Whether you adopt, volunteer, or donate, your support creates lasting change in an animal's life.
        </p>
        <div className="space-x-4">
          <button className="bg-white text-red-500 hover:bg-gray-100 font-bold py-3 px-8 rounded-full">
            Adopt Now
          </button>
          <button className="border-2 border-white hover:bg-white hover:text-red-500 font-bold py-3 px-8 rounded-full">
            Support Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;