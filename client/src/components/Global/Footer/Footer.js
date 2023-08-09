import React from "react";
import { FaCode, FaLinkedin, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-100 py-4  bottom-0">
      <div className="max-w-md mx-auto text-center">
        <p className="text-gray-600">
        PostMan &copy; 2023. All rights reserved.
        </p>
        <div className="mt-4">
          <p className="inline-block text-gray-600 mr-2"> <FaCode className="inline-block mr-1" /> Developed by RaJ</p>
          <a
            href="https://www.linkedin.com/"
            className="text-blue-500 hover:text-blue-700 mr-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="inline-block mr-1" />
            LinkedIn
          </a>
          <a
            href="https://github.com/"
            className="text-blue-500 hover:text-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="inline-block mr-1" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
