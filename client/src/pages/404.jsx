import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">404 - Not Found</h1>
        <p className="text-gray-700 mb-6">Oops! The page you are looking for does not exist.</p>
        <Link
          to="/"
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-4 rounded-full hover:bg-gradient-to-r hover:from-purple-700 hover:to-indigo-700"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
