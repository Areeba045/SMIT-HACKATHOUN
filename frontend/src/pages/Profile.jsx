import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Button from "../components/common/Button";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <Header title="Profile" />

        <div className="p-6 grid grid-cols-[1fr,300px] gap-6 max-w-7xl md:grid-cols-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary-500 text-white flex items-center justify-center text-2xl font-semibold">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-1">{user?.name}</h2>
                <p className="text-gray-600 text-sm">{user?.email}</p>
              </div>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-200 focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
                  />
                </div>

                <div className="flex gap-3">
                  <Button type="submit" primary>
                    Save Changes
                  </Button>
                  <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="py-4 border-b border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Member Since</p>
                  <p className="text-gray-900">
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div className="py-4">
                  <p className="text-sm text-gray-600 mb-2">Account Type</p>
                  <p className="text-gray-900">Standard User</p>
                </div>

                <Button onClick={() => setIsEditing(true)} className="mt-6">
                  Edit Profile
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
