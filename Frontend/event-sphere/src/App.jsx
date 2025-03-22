import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import NewEvent from "./pages/NewEvent";
import EventDetail from "./pages/EventDetail";
import EventTypeSelector from "./components/Template/EventTypeSelector"; // Added new page
import EventTemplateSelector from "./components/Template/EventTemplateSelector"; // Added new page
import CustomTemplate from "./components/Template/CustomTemplate"; // Added new page
import PrivateRoute from "./components/PrivateRoute";
import Userpage from "./pages/Userpage";
import EditEvent from "./components/EditEvent";
import UserProfile from "./pages/UserProfile";
// Components
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* byme */}
          <Route path="/userpage" element={<Userpage />} />
          <Route path="/events/:id" element={<EventDetail />} />
          {/* Event Creation Routes */}
          <Route path="/create-event" element={<EventTypeSelector />} />{" "}
          {/* Event Type Selection */}
          <Route
            path="/create-event/:eventType"
            element={<EventTemplateSelector />}
          />{" "}
          {/* Template Selector */}
          <Route
            path="/create-event/custom"
            element={<CustomTemplate />}
          />{" "}
          {/* Custom Template */}
          // Add this route to your existing router configuration
          <Route path="/events/:id" element={<EditEvent />} />
          <Route path="/profile" element={<UserProfile/>} />
          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new-event" element={<NewEvent />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
