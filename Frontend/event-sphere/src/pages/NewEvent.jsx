// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Layout from '../components/Layout';
// import EventForm from '../components/EventForm';
// import EventService from '../services/event.service';
// import { toast } from 'react-toastify';

// const NewEvent = () => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleCreateEvent = async (data) => {
//     setLoading(true);
//     try {
//       const createdEvent = await EventService.createEvent(data);
//       toast.success('Event created successfully!');
//       navigate(`/events/${createdEvent._id}`);
//     } catch (error) {
//       const message = error.response?.data?.error || 'Failed to create event';
//       toast.error(message);
//       console.error('Create event error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Layout>
//       <div className="max-w-2xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-6">Create a New Event</h1>
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <EventForm
//             onSubmit={handleCreateEvent}
//             loading={loading}
//             buttonClass="bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition"
//           />
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default NewEvent;

// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import Layout from '../components/Layout';
// // import EventForm from '../components/EventForm';
// // import EventService from '../services/event.service';
// // import { toast } from 'react-toastify';

// // const NewEvent = () => {
// //   const [loading, setLoading] = useState(false);
// //   const navigate = useNavigate();

// //   const handleCreateEvent = async (data) => {
// //     setLoading(true);
// //     try {
// //       const createdEvent = await EventService.createEvent(data);
// //       toast.success('Event created successfully!');
// //       navigate(`/events/${createdEvent._id}`);
// //     } catch (error) {
// //       const message = error.response?.data?.error || 'Failed to create event';
// //       toast.error(message);
// //       console.error('Create event error:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <Layout>
// //       <div className="max-w-2xl mx-auto">
// //         <h1 className="text-3xl font-bold text-gray-800 mb-6">Create a New Event</h1>
// //         <div className="bg-white rounded-lg shadow-md p-6">
// //           <EventForm onSubmit={handleCreateEvent} loading={loading} />
// //         </div>
// //       </div>
// //     </Layout>
// //   );
// // };

// // export default NewEvent;

import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import EventForm from "../components/EventForm";
import EventService from "../services/event.service";
import { toast } from "react-toastify";

const NewEvent = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateEvent = async (data) => {
    setLoading(true);
    try {
      const createdEvent = await EventService.createEvent(data);
      toast.success("Event created successfully!");
      navigate(`/events/${createdEvent._id}`);
    } catch (error) {
      const message = error.response?.data?.error || "Failed to create event";
      toast.error(message);
      console.error("Create event error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-12 px-8">
        <section className="bg-white p-6 rounded-2xl shadow-[10px_10px_0px_#b0d9e8] border border-[#189ab4]">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-extrabold text-[#05445e] mb-6 border-b-4 border-[#189ab4] pb-2">
              Create a New Event
            </h1>
          </div>
          {/* <p className="text-lg text-gray-700 text-center mb-6 font-light">Fill in the following details .</p> */}
          <div className="flex justify-center pb-2">
            <Link to="/create-event/custom">
              <button className="justify- py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-red-500 to-orange-500 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50">
                Create You template
              </button>
            </Link>
          </div>
          <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-200">
            <EventForm
              onSubmit={handleCreateEvent}
              loading={loading}
              buttonClass="bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
            />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default NewEvent;
