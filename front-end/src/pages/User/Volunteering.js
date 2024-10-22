import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Volunteering({userId}) {
  const [skills, setSkills] = useState('');
  const [education, setEducation] = useState('');
  const [preferredAreas, setPreferredAreas] = useState('');
  const [previousExperience, setPreviousExperience] = useState('');
  const [availability, setAvailability] = useState('');
  const [languages, setLanguages] = useState('');
  const [location, setLocation] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [motivation, setMotivation] = useState('');
  const [certifications, setCertifications] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');


  useEffect(()=>{
    if(userId){
      const getApplication = async ()=>{
        const response = await axios.get(`http://localhost:4000/volunteer-application/${userId}`);
        console.log("application response", response);
      }
      getApplication();
    }
  },[userId])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const volunteerApplication = {
      userId,
      skills,
      education,
      preferredAreas,
      previousExperience,
      availability,
      languages,
      location,
      emergencyContact,
      motivation,
      certifications,
      notes,
    };

    try {
      const response = await fetch('http://localhost:4000/volunteer-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(volunteerApplication),
      });

      if (response.ok) {
        setMessage('Your application has been submitted successfully.');
        setAvailability("");
        setCertifications("");
        setEducation("");
        setEmergencyContact("");
        setLanguages('');
        setLocation('');
        setMotivation('');
        setNotes('');
        setPreviousExperience('');
        setPreferredAreas('');
        setSkills('');
      } else {
        setMessage('Failed to submit the application. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting the application:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-blue-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Volunteer Application Form</h2>
      {message && <p className="text-center text-blue-600 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="skills" className="block text-blue-700 font-medium mb-1">Skills (comma-separated):</label>
          <input
            type="text"
            id="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
            className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="education" className="block text-blue-700 font-medium mb-1">Education:</label>
          <input
            type="text"
            id="education"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            required
            className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="preferredAreas" className="block text-blue-700 font-medium mb-1">Preferred Areas (comma-separated):</label>
          <input
            type="text"
            id="preferredAreas"
            value={preferredAreas}
            onChange={(e) => setPreferredAreas(e.target.value)}
            className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="previousExperience" className="block text-blue-700 font-medium mb-1">Previous Experience:</label>
          <textarea
            id="previousExperience"
            value={previousExperience}
            onChange={(e) => setPreviousExperience(e.target.value)}
            className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="availability" className="block text-blue-700 font-medium mb-1">Availability:</label>
          <input
            type="text"
            id="availability"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="languages" className="block text-blue-700 font-medium mb-1">Languages (comma-separated):</label>
          <input
            type="text"
            id="languages"
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
            className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-blue-700 font-medium mb-1">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="emergencyContact" className="block text-blue-700 font-medium mb-1">Emergency Contact:</label>
          <input
            type="text"
            id="emergencyContact"
            value={emergencyContact}
            onChange={(e) => setEmergencyContact(e.target.value)}
            required
            className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="motivation" className="block text-blue-700 font-medium mb-1">Motivation:</label>
          <textarea
            id="motivation"
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="certifications" className="block text-blue-700 font-medium mb-1">Certifications (optional):</label>
          <input
            type="text"
            id="certifications"
            value={certifications}
            onChange={(e) => setCertifications(e.target.value)}
            className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="notes" className="block text-blue-700 font-medium mb-1">Additional Notes:</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default Volunteering;
