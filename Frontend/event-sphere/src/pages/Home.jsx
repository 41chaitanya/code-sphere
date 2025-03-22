import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import EventList from "../components/EventList";
import EventService from "../services/event.service";
import FAQ from "../components/FAQ";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userData));
      }
    };

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

    checkLoginStatus();
    fetchEvents();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  return (
    <Layout>
      <nav className="bg-[#05445e] rounded-full mb-12 px-6 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-4">
          <span className="font-bold text-white text-xl">EventCatcher</span>
          <div className="bg-white p-1 rounded-full shadow-md">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#189ab4] to-[#75e6da]"></div>
          </div>
        </div>

        <div className="flex space-x-8">
          <a
            href="#benefits"
            className="text-white hover:text-gray-300 transition"
          >
            Home
          </a>
          <Link
            to="/dashboard"
            className="text-white hover:text-gray-300 transition"
          >
            Dashboard
          </Link>
        </div>

        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <span className="text-white">Welcome, {user?.name || "User"}</span>
            <Link to="/profile" className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#05445e] font-bold">
                {user?.name?.charAt(0) || "U"}
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link
              to="/login"
              className="bg-[#189ab4] px-5 py-2 rounded-full text-white font-medium hover:bg-[#75e6da] transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white px-5 py-2 rounded-full text-gray-800 font-medium hover:bg-[#d4f1f4] transition"
            >
              Sign Up
            </Link>
          </div>
        )}
      </nav>
      <div className="text-center mb-16 relative">
        <h1 className="text-5xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight">
          Organize, Manage, and{" "}
          <span className="bg-gradient-to-r from-[#189ab4] to-[#75e6da] text-transparent bg-clip-text">
            Discover Events
          </span>{" "}
          Seamlessly
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Empower event organizers and attendees with tools for effortless event
          creation, RSVP tracking, and real-time notifications.
        </p>

        <div className="flex justify-center space-x-4">
          <Link
            to="/new-event"
            className="px-6 py-3 bg-gradient-to-r from-[#189ab4] to-[#75e6da] text-white font-medium rounded-full shadow-lg hover:scale-105 transition transform"
          >
            Create an Event
          </Link>
          <Link
            to="userpage"
            className="px-6 py-3 bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-white font-medium rounded-full shadow-lg hover:scale-105 transition transform"
          >
            Search Events
          </Link>
        </div>
      </div>

      <section className="bg-white p-6 rounded-2xl shadow-[10px_10px_0px_#b0d9e8] border border-[#189ab4]">
        <h2 className="text-3xl font-extrabold text-[#05445e] mb-6 border-b-4 border-[#189ab4] pb-2">Upcoming Events</h2>
        <EventList events={events.slice(0,3)} loading={loading} error={error} />
        <div className="text-center mt-6">
          <button 
            onClick={() => navigate("/userpage")} 
            className="px-6 py-3 bg-blue-500 text-white font-medium rounded-full shadow-lg hover:bg-blue-600 transition"
          >
            Load More Events
          </button>
        </div>
      </section>
      {/* <section className="bg-white p-6 rounded-2xl shadow-[10px_10px_0px_#b0d9e8] border border-[#189ab4]">
        <h2 className="text-3xl font-extrabold text-[#05445e] mb-6 border-b-4 border-[#189ab4] pb-2">
          Upcoming Events
        </h2>
        <EventList events={events} loading={loading} error={error} />
      </section> */}
      <FAQ/>
    </Layout>
  );
};

export default Home;

