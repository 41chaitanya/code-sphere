import React from "react";
import EventCard from "./EventCard";
import Loading from "./Loading";

const EventList = ({ events, loading, error, filterLocation, filterMonth, startDate, endDate }) => {
  const today = new Date(); // Get today's date without time
  today.setHours(0, 0, 0, 0); 

  let filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0); // Normalize time for comparison

    const eventMonth = eventDate.toLocaleString("en-US", { month: "long" });

    // Apply filters
    if (filterLocation && event.location !== filterLocation) return false;
    if (filterMonth && eventMonth !== filterMonth) return false;

    // Apply start and end date range filtering
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999); // Include full day
      
      if (eventDate < start || eventDate > end) return false;
    } else if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      if (eventDate < start) return false;
    } else if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      if (eventDate > end) return false;
    }

    // Exclude past events
    if (eventDate < today) return false;

    return true;
  });

  if (loading) return <Loading />;
  
  if (error) return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md">
      <p>{error}</p>
    </div>
  );

  if (filteredEvents.length === 0) return (
    <div className="text-center py-12">
      <h3 className="text-xl text-gray-600">No events found</h3>
      <p className="mt-2 text-gray-500">Try adjusting your filters!</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredEvents.map(event => (
        <div 
          key={event.id} 
          className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-100 hover:shadow-lg rounded-lg p-4"
        >
          <EventCard event={event} />
        </div>
      ))}
    </div>
  );
};

export default EventList;
