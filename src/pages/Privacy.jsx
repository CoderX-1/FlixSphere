import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#111111] text-white min-h-screen mt-8">
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        <div className="bg-white text-gray-900 shadow-lg rounded-lg p-8">
          <h1 className="text-5xl font-extrabold mb-12 text-center">Privacy Policy</h1>
          <p className="mb-6">
            At flixsphere.vercel.app, accessible from <a href="https://flixsphere.vercel.app" className="text-blue-500 hover:underline">https://flixsphere.vercel.app</a>, safeguarding the privacy of our visitors is one of our top priorities. This Privacy Policy outlines the types of information that are collected and recorded by flixsphere.vercel.app and how we use this information.
          </p>
          <p className="mb-6">
            If you have any questions or need further information about our Privacy Policy, please feel free to contact us.
          </p>

          <h2 className="text-3xl font-bold mt-10 mb-4">Log Files</h2>
          <p className="mb-6">
            flixsphere.vercel.app follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. This information is not linked to any personally identifiable information. The purpose of collecting this information is to analyze trends, administer the site, track users' movement on the website, and gather demographic information.
          </p>

          <h2 className="text-3xl font-bold mt-10 mb-4">Cookies and Web Beacons</h2>
          <p className="mb-6">
            Like many other websites, flixsphere.vercel.app uses "cookies" to store information about visitors' preferences and the pages on the site that the visitor accessed or visited. This information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
          </p>

          <h2 className="text-3xl font-bold mt-10 mb-4">Google DoubleClick DART Cookie</h2>
          <p className="mb-6">
            Google is a third-party vendor on our site and uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to flixsphere.vercel.app and other sites on the internet. Visitors can opt out of the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL: <a href="https://policies.google.com/technologies/ads" className="text-blue-500 hover:underline">https://policies.google.com/technologies/ads</a>.
          </p>

          <h2 className="text-3xl font-bold mt-10 mb-4">Our Advertising Partners</h2>
          <p className="mb-6">
            Some advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy detailing their policies on user data. For easier access, we have provided hyperlinks to their Privacy Policies below.
          </p>

          <ul className="list-disc ml-8 mb-6">
            <li>
              <a href="https://policies.google.com/technologies/ads" className="text-blue-500 hover:underline">Google</a>: <a href="https://policies.google.com/technologies/ads" className="text-blue-500 hover:underline">https://policies.google.com/technologies/ads</a>
            </li>
          </ul>

          <p className="mb-6">
            Thank you for visiting flixsphere.vercel.app. Your privacy is important to us, and we are committed to protecting the information you share with us.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
