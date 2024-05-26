import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DMCA = () => {
  return (
    <div className="bg-[#111111] text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        <div className="bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg p-8 mt-10">
          <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">DMCA Takedown Notice</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Our streaming website provides links to content hosted by third-party sites. We do not host any of the movies or other content ourselves, and we do not have control over the content hosted on these third-party sites. We simply provide links to these sites as a service to our users.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We take the intellectual property rights of others seriously and require that our users do the same. The Digital Millennium Copyright Act (DMCA) established a process for addressing claims of copyright infringement. If you own a copyright or have authority to act on behalf of a copyright owner and want to report a claim that a third party is infringing that material, please submit a DMCA report via Discord or email and we will take appropriate action.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-6 mb-4">DMCA Report Requirements</h2>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-6">
            <li className="mb-2">A description of the copyrighted work that you claim is being infringed.</li>
            <li className="mb-2">A description of the material you claim is infringing and that you want removed or access to which you want disabled with a URL and proof you are the original owner or other location of that material.</li>
            <li className="mb-2">Your name, title (if acting as an agent), address, telephone number, and email address.</li>
            <li className="mb-2">The following statement: "I have a good faith belief that the use of the copyrighted material I am complaining of is not authorized by the copyright owner, its agent, or the law (e.g., as a fair use)".</li>
            <li className="mb-2">The following statement: "The information in this notice is accurate and, under penalty of perjury, I am the owner, or authorized to act on behalf of the owner, of the copyright or of an exclusive right that is allegedly infringed".</li>
            <li className="mb-2">The following statement: "I understand that I am subject to legal action upon submitting a DMCA request without solid proof".</li>
            <li>An electronic or physical signature of the owner of the copyright or a person authorized to act on the owner’s behalf.</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Please send your DMCA takedown notice to <a href="mailto:dmca@binged.live" className="text-blue-500 dark:text-blue-400 underline">dmca@binged.live</a>. We will promptly investigate and take appropriate action in accordance with the DMCA.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">Thank you for your cooperation.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DMCA;
