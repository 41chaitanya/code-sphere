import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated for React Router v6

const EventTypeSelector = ({ setSelectedEvent }) => {
  const navigate = useNavigate();

  const handleSelection = (type) => {
    setSelectedEvent(type);
    navigate(`/create-event/${type}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h2 className="text-3xl font-bold text-gray-700 mb-6">Select Event Type</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: 'Concert', color: 'bg-blue-500', image: 'https://imgs.search.brave.com/aD86grPrsuMenm35M-zYz37oBFXEjaVXIegrsiJnHco/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQ2/NjM0ODg3L3Bob3Rv/L3JvY2stY29uY2Vy/dC5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9NTU3ZmVHYU1v/eG1VcGRnOHdaQ0J2/T3pQcXlMaC01c1ZI/TW9sRlZDeU9PYz0' },
          { name: 'Standup', color: 'bg-green-500', image: 'https://imgs.search.brave.com/UAqAt0mrLh9GDL1uEBDuLUFn79OczRappRUguR6ULy4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzIyLzYwLzgx/LzM2MF9GXzEyMjYw/ODE5Nl9wc2JwUVRx/T2pYZDBSN2MyRGFY/SlpFNm9Id0FCMUtH/Zy5qcGc' },
          { name: 'Hackathon', color: 'bg-red-500', image: 'https://imgs.search.brave.com/mtpXYAhuWt2gJnhkNuupJHrPG3aO0QsoxamRdn9e818/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTc4/ODE1OTk2NS9waG90/by9kZXZlbG9wZXJz/LWluLWEtY293b3Jr/aW5nLXNwYWNlLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz00/MDVkTThpa2NweC1v/OWlTMnhzOVJMcGVq/Vjk3WVNWQi1qcEdo/LXgtYlFNPQ' },
          { name: 'Fest', color: 'bg-yellow-500', image: 'https://imgs.search.brave.com/iAfNzYah-oOv2AccyQQgp8UppS3Wp-z51-Cj3UmnwzM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvODc0/NzQ3MDY2L3Bob3Rv/L211c2ljLWZlc3Rp/dmFsLWNyb3dkLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1V/bmREdUY5bkJNS3Yy/MVh5UWhOeXpoYW0z/dmFTa09sR2lvdTAy/TUZPd2ZVPQ' }
        ].map((event) => (
          <button
            key={event.name}
            onClick={() => handleSelection(event.name.toLowerCase())}
            className={`flex flex-col items-center ${event.color} hover:opacity-90 text-white p-4 rounded-lg shadow-lg transition duration-300`}
          >
            <img src={event.image} alt={event.name} className="h-24 w-24 object-cover mb-4 rounded-full" />
            <p className="text-lg font-semibold">{event.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventTypeSelector;
