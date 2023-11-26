import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your sign-in logic here
    console.log('Sign-in data:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Sign In</h1>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-4 rounded-full hover:bg-gradient-to-r hover:from-purple-700 hover:to-indigo-700 mr-2"
          >
            Sign In
          </button>

          {/* Sign Up Link */}
          <Link to="/signup" className="text-blue-500 hover:underline focus:outline-none text-sm">
            Sign Up
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
