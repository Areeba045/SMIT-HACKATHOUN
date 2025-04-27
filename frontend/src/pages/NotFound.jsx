import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-6">
      <div className="text-center max-w-lg animate-[fadeIn_0.5s_ease-in-out]">
        <h1 className="text-8xl font-bold text-primary-500 leading-none mb-4 md:text-6xl">
          404
        </h1>
        <h2 className="text-4xl font-semibold text-gray-900 mb-6 md:text-3xl">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8 md:text-base">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/">
            <Button primary>Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;