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

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Layout from "../components/Layout";
// import EventList from "../components/EventList";
// import EventService from "../services/event.service";

// const Home = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkLoginStatus = () => {
//       const userData = localStorage.getItem("user");
//       if (userData) {
//         setIsLoggedIn(true);
//         setUser(JSON.parse(userData));
//       }
//     };

//     const fetchEvents = async () => {
//       try {
//         const data = await EventService.getAllEvents();
//         setEvents(data);
//       } catch (err) {
//         setError("Failed to load events. Please try again later.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkLoginStatus();
//     fetchEvents();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setIsLoggedIn(false);
//     setUser(null);
//     navigate("/");
//   };

//   return (
//     <Layout>
//       <nav className="bg-[#05445e] rounded-full mb-12 px-6 py-4 flex justify-between items-center shadow-lg">
//         <div className="flex items-center space-x-4">
//           <span className="font-bold text-white text-xl">EventCatcher</span>
//           <div className="bg-white p-1 rounded-full shadow-md">
//             <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#189ab4] to-[#75e6da]"></div>
//           </div>
//         </div>

//         <div className="flex space-x-8">
//           <a href="#benefits" className="text-white hover:text-gray-300 transition">Home</a>
//           <Link to="/dashboard" className="text-white hover:text-gray-300 transition">Dashboard</Link>
//         </div>

//         {isLoggedIn ? (
//           <div className="flex items-center gap-4">
//             <span className="text-white">Welcome, {user?.name || 'User'}</span>
//             <Link to="/profile" className="flex items-center">
//               <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#05445e] font-bold">
//                 {user?.name?.charAt(0) || 'U'}
//               </div>
//             </Link>
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
//             >
//               Logout
//             </button>
//           </div>
//         ) : (
//           <div className="flex gap-4">
//             <Link to="/login" className="bg-[#189ab4] px-5 py-2 rounded-full text-white font-medium hover:bg-[#75e6da] transition">
//               Login
//             </Link>
//             <Link to="/signup" className="bg-white px-5 py-2 rounded-full text-gray-800 font-medium hover:bg-[#d4f1f4] transition">
//               Sign Up
//             </Link>
//           </div>
//         )}
//       </nav>

//       <div className="text-center mb-16 relative">
//         <div className="inline-flex items-center px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm mb-8">
//           <span className="text-gray-700 font-medium">Join 1000+ Members</span>
//         </div>

//         <h1 className="text-5xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight">
//           Organize, Manage, and <span className="bg-gradient-to-r from-[#189ab4] to-[#75e6da] text-transparent bg-clip-text">Discover Events</span> Seamlessly
//         </h1>

//         <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
//           Empower event organizers and attendees with tools for effortless event creation, RSVP tracking, and real-time notifications.
//         </p>

//         <div className="flex justify-center">
//           <Link to="/new-event" className="px-6 py-3 bg-gradient-to-r from-[#189ab4] to-[#75e6da] text-white font-medium rounded-full shadow-lg hover:scale-105 transition transform">
//             Create an Event
//           </Link>
//         </div>
//       </div>

//       <section className="bg-white p-6 rounded-2xl shadow-[10px_10px_0px_#b0d9e8] border border-[#189ab4]">
//         <h2 className="text-3xl font-extrabold text-[#05445e] mb-6 border-b-4 border-[#189ab4] pb-2">Upcoming Events</h2>
//         <EventList events={events} loading={loading} error={error} />
//       </section>
//     </Layout>
//   );
// };

// export default Home;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Layout from "../components/Layout";
// import EventList from "../components/EventList";
// import EventService from "../services/event.service";

// const Home = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Check if user is logged in
//     const checkLoginStatus = () => {
//       const user = localStorage.getItem("user");
//       if (user) {
//         setIsLoggedIn(true);
//         setUser(JSON.parse(user));
//       }
//     };

//     const fetchEvents = async () => {
//       try {
//         const data = await EventService.getAllEvents();
//         setEvents(data);
//       } catch (err) {
//         setError("Failed to load events. Please try again later.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkLoginStatus();
//     fetchEvents();
//   }, []);

//   return (
//     <Layout>
//       {/* 🔹 Navigation Bar */}
//       <nav className="bg-[#05445e] rounded-full mb-12 px-6 py-4 flex justify-between items-center shadow-lg">
//         <div className="flex items-center space-x-4">
//           <span className="font-bold text-white text-xl">EventCatcher</span>
//           <div className="bg-white p-1 rounded-full shadow-md">
//             <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#189ab4] to-[#75e6da]"></div>
//           </div>
//         </div>

//         <div className="flex space-x-8">
//           <a href="#benefits" className="text-white hover:text-gray-300 transition">Home</a>
//           <Link to="/dashboard" className="text-white hover:text-gray-300 transition">Dashboard</Link>
//         </div>

//         {/* Conditional rendering based on login status */}
//         {isLoggedIn ? (
//           <div className="flex items-center gap-4">
//             <div className="text-white mr-2">
//               Welcome, {user?.name || 'User'}
//             </div>
//             <Link to="/profile" className="flex items-center">
//               <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#05445e] font-bold">
//                 {user?.name?.charAt(0) || 'U'}
//               </div>
//             </Link>
//           </div>
//         ) : (
//           <div className="flex gap-4">
//             <Link
//               to="/login"
//               className="bg-[#189ab4] px-5 py-2 rounded-full text-white font-medium hover:bg-[#75e6da] transition"
//             >
//               Login
//             </Link>
//             <Link
//               to="/signup"
//               className="bg-white px-5 py-2 rounded-full text-gray-800 font-medium hover:bg-[#d4f1f4] transition"
//             >
//               Sign Up
//             </Link>
//           </div>
//         )}
//       </nav>

//       {/* 🔹 Hero Section */}
//       <div className="text-center mb-16 relative">
//         {/* 🔹 Members Section */}
//         <div className="inline-flex items-center px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm mb-8">
//           <span className="text-gray-700 font-medium">Join 1000+ Members</span>
//         </div>

//         {/* 🔹 Headline */}
//         <h1 className="text-5xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight">
//           Organize, Manage, and <span className="bg-gradient-to-r from-[#189ab4] to-[#75e6da] text-transparent bg-clip-text">
//             Discover Events
//           </span> Seamlessly
//         </h1>

//         <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
//           Empower event organizers and attendees with tools for effortless event creation, RSVP tracking, and real-time notifications.
//         </p>

//         {/* 🔹 CTA Button */}
//         <div className="flex justify-center">
//           <Link
//             to="/new-event"
//             className="px-6 py-3 bg-gradient-to-r from-[#189ab4] to-[#75e6da] text-white font-medium rounded-full shadow-lg hover:scale-105 transition transform"
//           >
//             Create an Event
//           </Link>
//         </div>

//         {/* 🔹 Info text */}
//         <div className="flex justify-center items-center mt-8 text-gray-500 text-sm">
//           <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
//             <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//           </svg>
//           <span>Synchronization Across Devices Included.</span>
//         </div>
//       </div>

//       {/* 🔹 Events Section */}
//       <section className="bg-white p-6 rounded-2xl shadow-[10px_10px_0px_#b0d9e8] border border-[#189ab4]">
//         <div className="flex justify-between items-center mb-8">
//         <h2 className="text-3xl font-extrabold text-[#05445e] mb-6 border-b-4 border-[#189ab4] pb-2">Upcoming Events</h2>
//         </div>

//         <EventList events={events} loading={loading} error={error} />
//       </section>
//     </Layout>
//   );
// };

// export default Home;
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Layout from "../components/Layout";
// import EventList from "../components/EventList";
// import EventService from "../services/event.service";
// // import { useAuth } from '../contexts/AuthContext';

// const Home = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   // const { isAuthenticated } = useAuth();

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const data = await EventService.getAllEvents();
//         setEvents(data);
//       } catch (err) {
//         setError("Failed to load events. Please try again later.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   return (
//     <Layout>
//       {/* Dark navigation bar */}
//       <div className="bg-gray-900 rounded-full mb-12 px-4 py-3 flex justify-between items-center">
//         <div className="flex items-center">
//           <span className="font-bold text-white text-xl p-2">Event</span>
//           <div className="bg-white p-1 rounded-full mr-2">
//             <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-gray-300"></div>
//           </div>
//         </div>

//         <div className="flex items-center space-x-8">
//           <a href="#benefits" className="text-white hover:text-gray-300">
//             Home
//           </a>
//           <Link to="/dashboard" className="text-white hover:text-gray-300">
//             Dashboard
//           </Link>
//           {/* <a href="#testimonials" className="text-white hover:text-gray-300">
//             Testimonials
//           </a> */}
//         </div>
//         <div className="flex gap-3">
//           <Link
//             to="/login"
//             className="bg-blue-200  px-5 py-2 rounded-full text-gray-800 font-medium hover:bg-gray-100 transition"
//           >
//             Login
//           </Link>
//           <Link
//             to="/signup"
//             className="bg-white px-5 py-2 rounded-full text-gray-800 font-medium hover:bg-red-300 transition"
//           >
//             Sign Up
//           </Link>
//         </div>
//       </div>

//       {/* Hero Section */}
//       <div className="text-center mb-12 relative">
//         {/* Join members button */}
//         <div className="inline-flex items-center px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm mb-8">
//           <div className="flex -space-x-2 mr-2">
//             <img
//               src="https://imgs.search.brave.com/x7U9K2GljUZpBUO6JyymD-wsNb_N_YPF6SYfBRG2OkE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS82/M2ZkY2JlNDhhYTAy/MGMwYTU0OTM1MDcv/NjU2YjNjZTRkNWIy/ZDBmYThhZjRjYTJk/XzIwLndlYnA"
//               alt="Member"
//               className="w-8 h-8 rounded-full border-2 border-white"
//             />
//             <img
//               src="https://imgs.search.brave.com/_LdDFKfR6WUAH-b8UYA-27jRCWi0BPwgPi7TFSsvIAw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS82/M2ZkY2JlNDhhYTAy/MGMwYTU0OTM1MDcv/NjU2YjNjZDQwM2Rl/MTg3MWQyZDQyNmNi/XzA3LndlYnA"
//               alt="Member"
//               className="w-8 h-8 rounded-full border-2 border-white"
//             />
//             <img
//               src="https://imgs.search.brave.com/8DrQF7aeyxM7JLR1vSDuyd2xinlvJ15EMNW5ceraM8M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS82/M2ZkY2JlNDhhYTAy/MGMwYTU0OTM1MDcv/NjU2YjNjY2Y3ZGI3/ODAzMWNhN2M0YzJk/XzAxLndlYnA"
//               alt="Member"
//               className="w-8 h-8 rounded-full border-2 border-white"
//             />
//           </div>
//           <span className="text-gray-700">Join 1000+ Members</span>
//         </div>

//         <h1 className="text-5xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto">
//           Organize, Manage, and Discover Events Seamlessly with Our Platform
//         </h1>

//         <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
//           Empower Event Organizers and Attendees with Advanced Tools for
//           Effortless Event Creation, RSVP Tracking, and Real-Time Notifications.
//         </p>

//         {/* Join Waitlist Button with Arrow */}
//         <div className="flex justify-center items-center relative">
//           <Link
//             to="/new-event"
//             className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition"
//           >
//             {/* Using your link to create new events instead of waitlist */}
//             Create an Event
//           </Link>
//         </div>

//         {/* Info text */}
//         <div className="flex justify-center items-center mt-8 text-gray-500 text-sm">
//           <svg
//             className="w-4 h-4 mr-1"
//             viewBox="0 0 24 24"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <circle
//               cx="12"
//               cy="12"
//               r="10"
//               stroke="currentColor"
//               strokeWidth="2"
//             />
//             <path
//               d="M12 8V12M12 16H12.01"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//             />
//           </svg>
//           <span>Synchronization Across Devices Included.</span>
//         </div>
//       </div>

//       {/* Events Section - Integration from your original code */}
//       <section>
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-2xl font-bold text-gray-800">Upcoming Events</h2>
//         </div>
//         <div className="">
//           <EventList events={events} loading={loading} error={error} />
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default Home;
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Layout from "../components/Layout";
// import EventList from "../components/EventList";
// import EventService from "../services/event.service";
// // import { useAuth } from '../contexts/AuthContext';

// const Home = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   // const { isAuthenticated } = useAuth();

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const data = await EventService.getAllEvents();
//         setEvents(data);
//       } catch (err) {
//         setError("Failed to load events. Please try again later.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   return (
//     <Layout>
//       {/* Dark navigation bar */}
//       <div className="bg-gray-900 rounded-full mb-12 px-4 py-3 flex justify-between items-center">
//         <div className="flex items-center">
//           <div className="bg-white p-1 rounded-full mr-2">
//             <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-gray-300"></div>
//           </div>
//           <span className="font-bold text-white text-xl">Clever</span>
//         </div>

//         <div className="flex items-center space-x-8">
//           <a href="#benefits" className="text-white hover:text-gray-300">
//             Benefits
//           </a>
//           <a href="#pricing" className="text-white hover:text-gray-300">
//             Pricing
//           </a>
//           <a href="#testimonials" className="text-white hover:text-gray-300">
//             Testimonials
//           </a>
//         </div>
//         <div className="flex gap-5">
//           <Link
//             to="/login"
//             className="bg-white px-5 py-2 rounded-full text-gray-800 font-medium hover:bg-gray-100 transition"
//           >
//             Login
//           </Link>
//           <Link
//             to="/signup"
//             className="bg-white px-5 py-2 rounded-full text-gray-800 font-medium hover:bg-gray-100 transition"
//           >
//             Sign Up
//           </Link>
//         </div>
//       </div>

//       {/* Hero Section */}
//       <div className="text-center mb-12 relative">
//         {/* Join members button */}
//         <div className="inline-flex items-center px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm mb-8">
//           <div className="flex -space-x-2 mr-2">
//             <img
//               src="https://imgs.search.brave.com/R51bY9mE3mDt4Ossl1N9l7wvuIBYDh-d7uMvPi4T73c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS82/M2ZkY2JlNDhhYTAy/MGMwYTU0OTM1MDcv/NjU2YjNjZDRjMDg4/NjUxMmU2ZGMwOTJj/XzA1LndlYnA"
//               alt="Member"
//               className="w-8 h-8 rounded-full border-2 border-white"
//             />
//             <img
//               src="https://imgs.search.brave.com/R51bY9mE3mDt4Ossl1N9l7wvuIBYDh-d7uMvPi4T73c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS82/M2ZkY2JlNDhhYTAy/MGMwYTU0OTM1MDcv/NjU2YjNjZDRjMDg4/NjUxMmU2ZGMwOTJj/XzA1LndlYnA"
//               alt="Member"
//               className="w-8 h-8 rounded-full border-2 border-white"
//             />
//             <img
//               src="https://imgs.search.brave.com/R51bY9mE3mDt4Ossl1N9l7wvuIBYDh-d7uMvPi4T73c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS82/M2ZkY2JlNDhhYTAy/MGMwYTU0OTM1MDcv/NjU2YjNjZDRjMDg4/NjUxMmU2ZGMwOTJj/XzA1LndlYnA"
//               alt="Member"
//               className="w-8 h-8 rounded-full border-2 border-white"
//             />
//           </div>
//           <span className="text-gray-700">Join 1000+ Members</span>
//         </div>

//         <h1 className="text-5xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto">
//           Streamline Tasks with Clever's Productivity Solutions
//         </h1>

//         <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
//           Elevate Your Productivity with Clever's Intelligent Tools for Seamless
//           Task and Workflow Management.
//         </p>

//         {/* Join Waitlist Button with Arrow */}
//         <div className="flex justify-center items-center relative">
//           <svg
//             className="absolute -left-16 bottom-0 text-red-400 w-16 h-16 transform rotate-45"
//             viewBox="0 0 24 24"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M5 12H19M19 12L12 5M19 12L12 19"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//           <Link
//             to="/waitlist"
//             className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition"
//           >
//             Join Waitlist
//           </Link>
//         </div>

//         {/* Info text */}
//         <div className="flex justify-center items-center mt-8 text-gray-500 text-sm">
//           <svg
//             className="w-4 h-4 mr-1"
//             viewBox="0 0 24 24"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <circle
//               cx="12"
//               cy="12"
//               r="10"
//               stroke="currentColor"
//               strokeWidth="2"
//             />
//             <path
//               d="M12 8V12M12 16H12.01"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//             />
//           </svg>
//           <span>Synchronization Across Devices Included.</span>
//         </div>
//       </div>

//       {/* Events Section - Keeping your original functionality */}
//       <section>
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-2xl font-bold text-gray-800">Upcoming Events</h2>
//           {/* Add filters or search here if needed */}
//         </div>

//         <EventList events={events} loading={loading} error={error} />
//       </section>
//     </Layout>
//   );
// };

// export default Home;
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Layout from '../components/Layout';
// import EventList from '../components/EventList';
// import EventService from '../services/event.service';
// // import { useAuth } from '../contexts/AuthContext';

// const Home = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   // const { isAuthenticated } = useAuth();

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const data = await EventService.getAllEvents();
//         setEvents(data);
//       } catch (err) {
//         setError('Failed to load events. Please try again later.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   return (
//     <Layout>
//       <section className="text-center py-10 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg shadow-sm mb-10">
//         <h1 className="text-3xl font-bold text-red-500 mb-3">Welcome to EventSphere</h1>
//         <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
//           Discover exciting events in your area or create your own!
//         </p>
//         <Link
//           to="/new-event"
//           className="inline-block px-5 py-2.5 bg-red-500 text-white font-medium rounded-md shadow hover:bg-red-600 transition duration-200"
//         >
//           Create an Event
//         </Link>
//         {/* {isAuthenticated() ? (
//           <Link
//             to="/new-event"
//             className="inline-block px-5 py-2.5 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 transition duration-200"
//           >
//             Create an Event
//           </Link>
//         ) : (
//           <Link
//             to="/signup"
//             className="inline-block px-5 py-2.5 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 transition duration-200"
//           >
//             Get Started
//           </Link>
//         )} */}
//       </section>

//       <section>
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold text-gray-700">Upcoming Events</h2>
//           {/* Add filters or search here if needed */}
//         </div>

//         <EventList events={events} loading={loading} error={error} />
//       </section>
//     </Layout>
//   );
// };

// export default Home;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Layout from "../components/Layout";
// import EventList from "../components/EventList";
// import EventService from "../services/event.service";

// const Home = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const data = await EventService.getAllEvents();
//         setEvents(data);
//       } catch (err) {
//         setError("Failed to load events. Please try again later.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   return (
//     <Layout>
//       {/* 🔹 Navigation Bar */}
//       <nav className="bg-[#05445e] rounded-full mb-12 px-6 py-4 flex justify-between items-center shadow-lg">
//         <div className="flex items-center space-x-4">
//           <span className="font-bold text-white text-xl">EventCatcher</span>
//           <div className="bg-white p-1 rounded-full shadow-md">
//             <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#189ab4] to-[#75e6da]"></div>
//           </div>
//         </div>

//         <div className="flex space-x-8">
//           <a href="#benefits" className="text-white hover:text-gray-300 transition">Home</a>
//           <Link to="/dashboard" className="text-white hover:text-gray-300 transition">Dashboard</Link>
//         </div>

//         <div className="flex gap-4">
//           <Link
//             to="/login"
//             className="bg-[#189ab4] px-5 py-2 rounded-full text-white font-medium hover:bg-[#75e6da] transition"
//           >
//             Login
//           </Link>
//           <Link
//             to="/signup"
//             className="bg-white px-5 py-2 rounded-full text-gray-800 font-medium hover:bg-[#d4f1f4] transition"
//           >
//             Sign Up
//           </Link>
//         </div>
//       </nav>

//       {/* 🔹 Hero Section */}
//       <div className="text-center mb-16 relative">
//         {/* 🔹 Members Section */}
//         <div className="inline-flex items-center px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm mb-8">
//           <span className="text-gray-700 font-medium">Join 1000+ Members</span>
//         </div>

//         {/* 🔹 Headline */}
//         <h1 className="text-5xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight">
//           Organize, Manage, and <span className="bg-gradient-to-r from-[#189ab4] to-[#75e6da] text-transparent bg-clip-text">
//             Discover Events
//           </span> Seamlessly
//         </h1>

//         <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
//           Empower event organizers and attendees with tools for effortless event creation, RSVP tracking, and real-time notifications.
//         </p>

//         {/* 🔹 CTA Button */}
//         <div className="flex justify-center">
//           <Link
//             to="/new-event"
//             className="px-6 py-3 bg-gradient-to-r from-[#189ab4] to-[#75e6da] text-white font-medium rounded-full shadow-lg hover:scale-105 transition transform"
//           >
//             Create an Event
//           </Link>
//         </div>

//         {/* 🔹 Info text */}
//         <div className="flex justify-center items-center mt-8 text-gray-500 text-sm">
//           <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
//             <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//           </svg>
//           <span>Synchronization Across Devices Included.</span>
//         </div>
//       </div>

//       {/* 🔹 Events Section */}
//       <section className="bg-white p-6 rounded-2xl shadow-[10px_10px_0px_#b0d9e8] border border-[#189ab4]">
//         <div className="flex justify-between items-center mb-8">
//         <h2 className="text-3xl font-extrabold text-[#05445e] mb-6 border-b-4 border-[#189ab4] pb-2">Upcoming Events</h2>
//         </div>

//         <EventList events={events} loading={loading} error={error} />
//       </section>
//     </Layout>
//   );
// };

// export default Home;
