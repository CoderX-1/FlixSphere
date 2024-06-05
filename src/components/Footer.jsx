import React from 'react';
import { Link, ScrollRestoration } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="container mx-auto text-white py-8">
      <div className="px-4">
        <div className="flex flex-wrap justify-between items-center gap-2 md:gap-0">
          <div className="w-full md:w-1/3 text-center md:text-left">
            <Link className='flex justify-center md:justify-normal' to="/">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-24 md:w-24 lg:w-28 object-contain"
              />
            </Link>
            <p className="text-gray-400 mt-2">&copy; 2024 FlixSphere. All rights reserved.</p>
          </div>
          <div className="w-full md:w-1/3 text-center">
            <Link to="/"  className="text-gray-400 hover:text-white mx-2 transition-colors duration-300">Home</Link>
            <Link to="/Explore" className="text-gray-400 hover:text-white mx-2 transition-colors duration-300">Explore</Link>
            <Link to="/privacypolicy" className="text-gray-400 hover:text-white mx-2 transition-colors duration-300">Privacy Policy</Link>
            <Link to="/dmca" className="text-gray-400 hover:text-white mx-2 transition-colors duration-300">DMCA</Link>
          </div>
          <div className="w-full md:w-1/3 text-center md:text-right">
            <p className="text-gray-400">Follow us on:</p>
            <div className="flex justify-center md:justify-end space-x-4 mt-2">
              <a href="https://twitter.com" className="flex gap-1 text-gray-400 hover:text-white transition-colors duration-300">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.951.555-2.005.959-3.127 1.184-.897-.959-2.178-1.555-3.594-1.555-2.717 0-4.917 2.2-4.917 4.917 0 .386.045.763.127 1.124-4.084-.205-7.702-2.159-10.126-5.127-.422.722-.664 1.561-.664 2.475 0 1.708.87 3.213 2.188 4.096-.807-.026-1.566-.247-2.228-.616v.062c0 2.385 1.697 4.374 3.946 4.827-.413.112-.849.171-1.296.171-.314 0-.624-.03-.927-.086.626 1.956 2.444 3.379 4.604 3.419-1.68 1.319-3.809 2.107-6.114 2.107-.398 0-.79-.023-1.175-.067 2.179 1.396 4.768 2.212 7.557 2.212 9.054 0 14.002-7.496 14.002-13.986 0-.213-.005-.425-.015-.637.964-.695 1.797-1.562 2.457-2.549z"/>
                </svg> 
                Telegram
              </a>
              <a href="https://discord.com" className="flex gap-1 text-gray-400 hover:text-white transition-colors duration-300">
              <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 24 24" ><path fill="currentColor" d="M19.73 4.87a18.2 18.2 0 0 0-4.6-1.44c-.21.4-.4.8-.58 1.21-1.69-.25-3.4-.25-5.1 0-.18-.41-.37-.82-.59-1.2-1.6.27-3.14.75-4.6 1.43A19.04 19.04 0 0 0 .96 17.7a18.43 18.43 0 0 0 5.63 2.87c.46-.62.86-1.28 1.2-1.98-.65-.25-1.29-.55-1.9-.92.17-.12.32-.24.47-.37 3.58 1.7 7.7 1.7 11.28 0l.46.37c-.6.36-1.25.67-1.9.92.35.7.75 1.35 1.2 1.98 2.03-.63 3.94-1.6 5.64-2.87.47-4.87-.78-9.09-3.3-12.83ZM8.3 15.12c-1.1 0-2-1.02-2-2.27 0-1.24.88-2.26 2-2.26s2.02 1.02 2 2.26c0 1.25-.89 2.27-2 2.27Zm7.4 0c-1.1 0-2-1.02-2-2.27 0-1.24.88-2.26 2-2.26s2.02 1.02 2 2.26c0 1.25-.88 2.27-2 2.27Z"></path></svg>
              Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
