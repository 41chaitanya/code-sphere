import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import { useAuth } from "../contexts/AuthContext";

const UserProfile = () => {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    bio: "",
    location: "",
    interests: "",
    phoneNumber: "",
    dateOfBirth: "",
    profilePicture: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!isAuthenticated()) {
          toast.error("You must be logged in to view your profile");
          navigate("/login");
          return;
        }

        // In a real app, you might fetch additional user data from an API
        // For now, we'll use what's in the auth context
        setProfileData({
          name: currentUser.name || "",
          email: currentUser.email || "",
          bio: currentUser.bio || "",
          location: currentUser.location || "",
          interests: currentUser.interests || "",
          phoneNumber: currentUser.phoneNumber || "",
          dateOfBirth: currentUser.dateOfBirth || "",
          profilePicture: currentUser.profilePicture || "",
        });
      } catch (err) {
        console.error("Error fetching user profile:", err);
        toast.error("Failed to load profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [currentUser, isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // In a real app, this would call an API to update the user profile
      // For now, we'll just show a success message
      // await updateUserProfile(profileData);

      setTimeout(() => {
        toast.success("Profile updated successfully");
        setSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Failed to update profile. Please try again.");
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

  return (
    <Layout>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-primary-600 py-6 px-8">
          <h1 className="text-3xl font-bold text-white">User Profile</h1>
        </div>

        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 overflow-hidden">
                  {profileData.profilePicture ? (
                    <img
                      src={profileData.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-12 h-12"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
                  Change Photo
                </button>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Account Info</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Member since</p>
                  <p className="font-medium">January 15, 2024</p>

                  <p className="text-sm text-gray-500 mt-4">Last login</p>
                  <p className="font-medium">March 22, 2025</p>

                  <p className="text-sm text-gray-500 mt-4">Events attended</p>
                  <p className="font-medium">12</p>

                  <p className="text-sm text-gray-500 mt-4">Events organized</p>
                  <p className="font-medium">5</p>
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={profileData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      disabled
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Email cannot be changed
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={profileData.phoneNumber}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="dateOfBirth"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={profileData.dateOfBirth}
                      onChange={handleChange}
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
                      value={profileData.location}
                      onChange={handleChange}
                      placeholder="City, Country"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="interests"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Interests
                    </label>
                    <input
                      type="text"
                      id="interests"
                      name="interests"
                      value={profileData.interests}
                      onChange={handleChange}
                      placeholder="e.g. Hiking, Photography, Cooking"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700"
                  >
                    About Me
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us a bit about yourself..."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  ></textarea>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium t bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                  >
                    {submitting ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
