import React, { useState } from 'react';
import EventTypeSelector from './EventTypeSelector';

const CustomTemplate = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Custom event "${eventName}" created!`);
  };

  return (
    <div className="custom-template">
      <EventTypeSelector setSelectedEvent={setSelectedEvent} />
      {selectedEvent && <h3 className="text-xl text-center font-semibold my-4">Selected Event Type: {selectedEvent}</h3>}

      <div className="bg-white p-6 shadow-md rounded-md max-w-lg mx-auto mt-6">
        <h2 className="text-2xl font-bold text-center mb-4">Create Your Custom Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Name</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Date</label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Description</label>
            <textarea
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomTemplate;
