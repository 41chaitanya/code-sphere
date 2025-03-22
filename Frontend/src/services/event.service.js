import api from "./api";

const EventService = {
  getAllEvents: async () => {
    const response = await api.get("/events/");
    return response.data;
  },

  getEventById: async (id) => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  createEvent: async (eventData) => {
    const response = await api.post("/events", eventData);
    return response.data;
  },

  rsvpToEvent: async (eventId) => {
    const response = await api.post(`/events/${eventId}/rsvp`);
    return response.data;
  },
  updateEvent: async (eventId, eventData) => {
    try {
      const response = await fetch(`${API_URL}/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update event");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  },

  // Additional methods can be added for updating or deleting events if needed
};

export default EventService;
