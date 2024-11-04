import axios from 'axios';
import React, { useState } from 'react';

const Header = () => {

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();

    try {
      axios.post('/logout');
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-primary">
      <div className="flex items-center">

        <div className="relative mx-4 lg:mx-0">
          <h3 className='font-medium text-gray-700'>
            CMS
          </h3>
        </div>
      </div>

      <div className="flex items-center">
        <div className="relative">
          <button
            className="flex mx-4 text-gray-600 focus:outline-none"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

        </div>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="relative block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none"
          >
            <img className="object-cover w-full h-full" src="/images/profile.png" alt="Your avatar" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 z-10 w-48 mt-2 overflow-hidden bg-white rounded-md shadow-xl">
              <form onSubmit={handleLogout}>
                <button type='submit' className="block w-full px-4 py-2 text-lg text-left text-gray-700 hover:bg-primary hover:text-white">Logout</button>
              </form>

            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
