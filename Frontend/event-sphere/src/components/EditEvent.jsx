import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import EventService from "../services/event.service";
import { useAuth } from "../contexts/AuthContext";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (!isAuthenticated()) {
          toast.error("You must be logged in to edit events");
          navigate("/login");
          return;
        }

        const eventData = await EventService.getEventById(id);

        // Check if user is the organizer
        if (currentUser.id !== eventData.organizerId?._id) {
          toast.error("You are not authorized to edit this event");
          navigate(`/events/${id}`);
          return;
        }

        // Format date for the date input (YYYY-MM-DDThh:mm)
        const formattedDate = eventData.date
          ? new Date(eventData.date).toISOString().slice(0, 16)
          : "";

        setFormData({
          name: eventData.name || "",
          date: formattedDate,
          location: eventData.location || "",
          description: eventData.description || "",
        });
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Failed to load event details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, currentUser, isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await EventService.updateEvent(id, formData);
      toast.success("Event updated successfully");
      navigate(`/events/${id}`);
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Failed to update event. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md">
          <p>{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-primary-600 py-6 px-8">
          <h1 className="text-3xl font-bold text-white">Edit Event</h1>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Event Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date and Time
              </label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate(`/events/${id}`)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {submitting ? "Updating..." : "Update Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditEvent;
