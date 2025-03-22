

// 
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import EventList from "../components/EventList";
import EventService from "../services/event.service";

const Userpage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterLocation, setFilterLocation] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await EventService.getAllEvents();
        setEvents(data);
      } catch (err) {
        setError("Failed to load events. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const uniqueLocations = [...new Set(events.map(event => event.location))];
  const uniqueMonths = [...new Set(events.map(event => new Date(event.date).toLocaleString("en-US", { month: "long" })) )];

  const handleClearFilters = () => {
    setFilterLocation("");
    setFilterMonth("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-6 bg-gradient-to-r from-[#05445e] to-[#189ab4] rounded-2xl shadow-lg text-white">
        <select
          className="p-3 border border-transparent rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-400 hover:shadow-md transition duration-300"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          {uniqueLocations.map((location, index) => (
            <option key={index} value={location}>{location}</option>
          ))}
        </select>

        <select
          className="p-3 border border-transparent rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-400 hover:shadow-md transition duration-300"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
        >
          <option value="">All Months</option>
          {uniqueMonths.map((month, index) => (
            <option key={index} value={month}>{month}</option>
          ))}
        </select>

        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium">Start Date</label>
            <input
              type="date"
              className="border border-gray-300 rounded-lg p-3 bg-white text-gray-700 focus:ring-2 focus:ring-blue-400 hover:shadow-md transition duration-300"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium">End Date</label>
            <input
              type="date"
              className="border border-gray-300 rounded-lg p-3 bg-white text-gray-700 focus:ring-2 focus:ring-blue-400 hover:shadow-md transition duration-300"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={handleClearFilters}
          className="bg-red-600 text-white font-semibold py-1 px-2 w-30 h-10 ml-20 rounded-md text-xs hover:bg-red-400 transition duration-300 hover:shadow-md"
        >
          Clear Filters
        </button>
      </div>

      <section className="bg-white p-6 rounded-2xl shadow-[10px_10px_0px_#b0d9e8] border border-[#189ab4]">
        <h2 className="text-3xl font-extrabold text-[#05445e] mb-6 border-b-4 border-[#189ab4] pb-2">
          Upcoming Events
        </h2>
        <EventList 
          events={events} 
          loading={loading} 
          error={error} 
          filterLocation={filterLocation} 
          filterMonth={filterMonth} 
          startDate={startDate} 
          endDate={endDate} 
        />
      </section>
    </Layout>
  );
};

export default Userpage;
