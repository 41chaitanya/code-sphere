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
  const [activeTab, setActiveTab] = useState("organized");

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
      <div className="flex h-screen">
        {/* Left Side Navigation */}
        <div className="w-1/4 bg-[#05445e] text-white p-6 rounded-lg shadow-lg flex flex-col space-y-4">
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
          <button
            className={`p-3 rounded-lg transition duration-300 ${
              activeTab === "organized" ? "bg-[#189ab4]" : "bg-gray-700"
            }`}
            onClick={() => setActiveTab("organized")}
          >
            Organized Events
          </button>
          <button
            className={`p-3 rounded-lg transition duration-300 ${
              activeTab === "attending" ? "bg-[#189ab4]" : "bg-gray-700"
            }`}
            onClick={() => setActiveTab("attending")}
          >
            Attending Events
          </button>
        </div>

        {/* Right Side Content */}
        <div className="w-3/4 p-8">
          <h1 className="text-4xl font-bold text-[#05445e] mb-6">
            Welcome, {currentUser?.name}!
          </h1>
          {activeTab === "organized" && (
            <section>
              <h2 className="text-2xl font-semibold text-[#05445e] mb-4">
                Your Organized Events
              </h2>
              {createdEvents.length === 0 ? (
                <div className="text-center py-8 bg-gray-100 rounded-lg shadow">
                  <p className="text-gray-600 mb-4">No events created yet.</p>
                  <Link
                    to="/new-event"
                    className="inline-block px-6 py-3 bg-[#ff4e00] text-white font-medium rounded-lg shadow-md hover:shadow-xl transition duration-300"
                  >
                    Create an Event
                  </Link>
                </div>
              ) : (
                <EventList events={createdEvents} loading={false} error={null} />
              )}
            </section>
          )}

          {activeTab === "attending" && (
            <section>
              <h2 className="text-2xl font-semibold text-[#05445e] mb-4">
                Events You’re Attending
              </h2>
              {attendingEvents.length === 0 ? (
                <div className="text-center py-8 bg-gray-100 rounded-lg shadow">
                  <p className="text-gray-600 mb-4">No RSVP’d events yet.</p>
                  <Link
                    to="/Userpage"
                    className="inline-block px-6 py-3 bg-[#ff4e00] text-white font-medium rounded-lg shadow-md hover:shadow-xl transition duration-300"
                  >
                    Explore Events
                  </Link>
                </div>
              ) : (
                <EventList events={attendingEvents} loading={false} error={null} />
              )}
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;





