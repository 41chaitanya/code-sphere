import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import EventList from "../components/EventList";
import Loading from "../components/Loading";
import EventService from "../services/event.service";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const allEvents = await EventService.getAllEvents();
        const userEvents = allEvents.filter(
          (event) =>
            event.organizerId._id === currentUser.id ||
            event.attendees.includes(currentUser.id)
        );
        setEvents(userEvents);
      } catch (err) {
        setError("Failed to load your events. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentUser]);

  if (loading)
    return (
      <Layout>
        <Loading />
      </Layout>
    );

  const createdEvents = events.filter(
    (event) => event.organizerId._id === currentUser.id
  );
  const attendingEvents = events.filter(
    (event) =>
      event.attendees.includes(currentUser.id) &&
      event.organizerId._id !== currentUser.id
  );

  return (
    <Layout>
      <div className="bg-gradient-to-r from-[#05445e] to-[#189ab4] text-white p-8 rounded-lg shadow-lg mb-10">
        <div className="flex justify-between items-center">

        <h1 className="text-4xl font-bold">Welcome, {currentUser?.name}!</h1>
        <Link to="/" className="text-2xl font-bold">
         HOME
        </Link>
        </div>
        <p className="text-lg mt-2 opacity-90">
          Manage your created events or check the ones you're attending.
        </p>
      </div>

      {/* Events Organized by User */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[#05445e] mb-6">
          Your Organized Events
        </h2>
        {createdEvents.length === 0 ? (
          <div className="text-center py-8 bg-gray-100 rounded-lg shadow">
            <p className="text-gray-600 mb-4">No events created yet.</p>
            <Link
              to="/new-event"
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#ff4e00] to-[#ec9f05] text-white font-medium rounded-lg shadow-md hover:shadow-xl transition duration-300"
            >
              Create an Event
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <EventList events={createdEvents} loading={false} error={null} />
          </div>
        )}
      </section>

      {/* Events User is Attending */}
      <section>
        <h2 className="text-2xl font-semibold text-[#05445e] mb-6">
          Events You’re Attending
        </h2>
        {attendingEvents.length === 0 ? (
          <div className="text-center py-8 bg-gray-100 rounded-lg shadow">
            <p className="text-gray-600 mb-4">No RSVP’d events yet.</p>
            <Link
              to="/Userpage"
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#ff4e00] to-[#ec9f05] text-white font-medium rounded-lg shadow-md hover:shadow-xl transition duration-300"
            >
              Explore Events
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <EventList events={attendingEvents} loading={false} error={null} />
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Layout from '../components/Layout';
// import EventList from '../components/EventList';
// import Loading from '../components/Loading';
// import EventService from '../services/event.service';
// import { useAuth } from '../contexts/AuthContext';

// const Dashboard = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { currentUser } = useAuth();

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const allEvents = await EventService.getAllEvents();

//         // Filter events created by the current user or events the user is attending
//         const userEvents = allEvents.filter(event =>
//           event.organizerId._id === currentUser.id ||
//           event.attendees.includes(currentUser.id)
//         );

//         setEvents(userEvents);
//       } catch (err) {
//         setError('Failed to load your events. Please try again later.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, [currentUser]);

//   if (loading) return (
//     <Layout>
//       <Loading />
//     </Layout>
//   );

//   // Separate events by type
//   const createdEvents = events.filter(event => event.organizerId._id === currentUser.id);
//   const attendingEvents = events.filter(event =>
//     event.attendees.includes(currentUser.id) && event.organizerId._id !== currentUser.id
//   );

//   return (
//     <Layout>
//       <div className="mb-10">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome, {currentUser?.name}</h1>
//         <p className="text-gray-600">
//           Here's an overview of your events. Manage your created events or check the ones you're attending.
//         </p>
//       </div>

//       <section className="mb-12">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-6">Events You're Organizing</h2>
//         {createdEvents.length === 0 ? (
//           <div className="text-center py-8 bg-gray-50 rounded-lg">
//             <p className="text-gray-600 mb-4">You haven't created any events yet.</p>
//             <Link
//               to="/new-event"
//               className="inline-block px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition"
//             >
//               Create an Event
//             </Link>
//           </div>
//         ) : (
//           <EventList events={createdEvents} loading={false} error={null} />
//         )}
//       </section>

//       <section>
//         <h2 className="text-2xl font-semibold text-gray-800 mb-6">Events You're Attending</h2>
//         {attendingEvents.length === 0 ? (
//           <div className="text-center py-8 bg-gray-50 rounded-lg">
//             <p className="text-gray-600 mb-4">You haven't RSVP'd to any events yet.</p>
//             <Link
//               to="/"
//               className="inline-block px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition"
//             >
//               Explore Events
//             </Link>
//           </div>
//         ) : (
//           <EventList events={attendingEvents} loading={false} error={null} />
//         )}
//       </section>
//     </Layout>
//   );
// };

// export default Dashboard;

// // import React, { useState, useEffect } from 'react';
// // import Layout from '../components/Layout';
// // import EventList from '../components/EventList';
// // import Loading from '../components/Loading';
// // import EventService from '../services/event.service';
// // import { useAuth } from '../contexts/AuthContext';

// // const Dashboard = () => {
// //   const [events, setEvents] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const { currentUser } = useAuth();

// //   useEffect(() => {
// //     const fetchEvents = async () => {
// //       try {
// //         const allEvents = await EventService.getAllEvents();

// //         // Filter events created by the current user or events the user is attending
// //         const userEvents = allEvents.filter(event =>
// //           event.organizerId._id === currentUser.id ||
// //           event.attendees.includes(currentUser.id)
// //         );

// //         setEvents(userEvents);
// //       } catch (err) {
// //         setError('Failed to load your events. Please try again later.');
// //         console.error(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchEvents();
// //   }, [currentUser]);

// //   if (loading) return (
// //     <Layout>
// //       <Loading />
// //     </Layout>
// //   );

// //   // Separate events by type
// //   const createdEvents = events.filter(event => event.organizerId._id === currentUser.id);
// //   const attendingEvents = events.filter(event =>
// //     event.attendees.includes(currentUser.id) && event.organizerId._id !== currentUser.id
// //   );

// //   return (
// //     <Layout>
// //       <div className="mb-10">
// //         <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome, {currentUser?.name}</h1>
// //         <p className="text-gray-600">
// //           Here's an overview of your events. Manage your created events or check the ones you're attending.
// //         </p>
// //       </div>

// //       <section className="mb-12">
// //         <h2 className="text-2xl font-semibold text-gray-800 mb-6">Events You're Organizing</h2>
// //         {createdEvents.length === 0 ? (
// //           <div className="text-center py-8 bg-gray-50 rounded-lg">
// //             <p className="text-gray-600 mb-4">You haven't created any events yet.</p>
// //             <a
// //               href="/new-event"
// //               className="inline-block px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
// //             >
// //               Create an Event
// //             </a>
// //           </div>
// //         ) : (
// //           <EventList events={createdEvents} loading={false} error={null} />
// //         )}
// //       </section>

// //       <section>
// //         <h2 className="text-2xl font-semibold text-gray-800 mb-6">Events You're Attending</h2>
// //         {attendingEvents.length === 0 ? (
// //           <div className="text-center py-8 bg-gray-50 rounded-lg">
// //             <p className="text-gray-600 mb-4">You haven't RSVP'd to any events yet.</p>
// //             <a
// //               href="/"
// //               className="inline-block px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
// //             >
// //               Explore Events
// //             </a>
// //           </div>
// //         ) : (
// //           <EventList events={attendingEvents} loading={false} error={null} />
// //         )}
// //       </section>
// //     </Layout>
// //   );
// // };

// // export default Dashboard;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Layout from "../components/Layout";
// import EventList from "../components/EventList";
// import Loading from "../components/Loading";
// import EventService from "../services/event.service";
// import { useAuth } from "../contexts/AuthContext";

// const Dashboard = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { currentUser } = useAuth();

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const allEvents = await EventService.getAllEvents();
//         const userEvents = allEvents.filter(
//           (event) =>
//             event.organizerId._id === currentUser.id ||
//             event.attendees.includes(currentUser.id)
//         );
//         setEvents(userEvents);
//       } catch (err) {
//         setError("Failed to load your events. Please try again later.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, [currentUser]);

//   if (loading)
//     return (
//       <Layout>
//         <Loading />
//       </Layout>
//     );

//   const createdEvents = events.filter(
//     (event) => event.organizerId._id === currentUser.id
//   );
//   const attendingEvents = events.filter(
//     (event) =>
//       event.attendees.includes(currentUser.id) &&
//       event.organizerId._id !== currentUser.id
//   );

//   return (
//     <Layout>
//       <div className="bg-gradient-to-r from-[#05445e] to-[#189ab4] text-white p-8 rounded-lg shadow-lg mb-10">
//         <h1 className="text-4xl font-bold">Welcome, {currentUser?.name}!</h1>
//         <p className="text-lg mt-2 opacity-90">
//           Manage your created events or check the ones you're attending.
//         </p>
//       </div>

//       {/* Events Organized by User */}
//       <section className="mb-12">
//         <h2 className="text-2xl font-semibold text-[#05445e] mb-6">
//           Your Organized Events
//         </h2>
//         {createdEvents.length === 0 ? (
//           <div className="text-center py-8 bg-gray-100 rounded-lg shadow">
//             <p className="text-gray-600 mb-4">No events created yet.</p>
//             <Link
//               to="/new-event"
//               className="inline-block px-6 py-3 bg-gradient-to-r from-[#ff4e00] to-[#ec9f05] text-white font-medium rounded-lg shadow-md hover:shadow-xl transition duration-300"
//             >
//               Create an Event
//             </Link>
//           </div>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             <EventList events={createdEvents} loading={false} error={null} />
//           </div>
//         )}
//       </section>

//       {/* Events User is Attending */}
//       <section>
//         <h2 className="text-2xl font-semibold text-[#05445e] mb-6">
//           Events You’re Attending
//         </h2>
//         {attendingEvents.length === 0 ? (
//           <div className="text-center py-8 bg-gray-100 rounded-lg shadow">
//             <p className="text-gray-600 mb-4">No RSVP’d events yet.</p>
//             <Link
//               to="/Userpage"
//               className="inline-block px-6 py-3 bg-gradient-to-r from-[#ff4e00] to-[#ec9f05] text-white font-medium rounded-lg shadow-md hover:shadow-xl transition duration-300"
//             >
//               Explore Events
//             </Link>
//           </div>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             <EventList events={attendingEvents} loading={false} error={null} />
//           </div>
//         )}
//       </section>
//     </Layout>
//   );
// };

// export default Dashboard;
