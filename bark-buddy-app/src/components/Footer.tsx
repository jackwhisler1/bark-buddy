import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-[#1b2538] text-white mt-8 p-4 text-center">
      <p>Created by Jack Whisler</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a
          href="https://www.linkedin.com/in/jackwhisler"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faLinkedin}
            className="text-white text-2xl hover:text-blue-500"
          />
        </a>
        <a
          href="https://www.jackwhisler.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faGlobe}
            className="text-white text-2xl hover:text-blue-500"
          />
        </a>
        <a
          href="https://github.com/jackwhisler1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faGithub}
            className="text-white text-2xl hover:text-blue-500"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
