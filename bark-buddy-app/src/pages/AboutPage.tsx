import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        viewFavorites={false}
        setViewFavorites={() => {}}
        favorites={[]}
        showFavoritesButton={false}
      />
      <div className="flex-grow bg-gray-100 flex flex-col items-center justify-center p-6">
        <div className="max-w-3xl w-full bg-white p-8 rounded-md shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center">About</h1>
          <p className="mb-4">
            Welcome to Bark Buddy! This app is designed to help you find your
            new best friend by matching you with dogs that fit your preferences.
            Whether you're looking for a playful puppy or a calm older dog, Bark
            Buddy makes it easy to find the perfect companion.
          </p>
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <p className="mb-4">
            Bark Buddy uses a sophisticated matching algorithm to pair you with
            dogs that meet your criteria. Here's how it works:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              Browse through a list of available dogs and mark your favorites.
            </li>
            <li>
              Click the "Match My Bark Buddy" button to generate a match based
              on your favorites.
            </li>
            <li>
              View the details of your matched dog and decide if it's the right
              fit for you.
            </li>
          </ul>
          <h2 className="text-2xl font-semibold mb-4">How It Was Made</h2>
          <p className="mb-4">
            Bark Buddy was created as a demo project to showcase the
            capabilities of modern web development technologies. The app was
            built using the following technologies:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <strong>React:</strong> A JavaScript library for building user
              interfaces.
            </li>
            <li>
              <strong>TypeScript:</strong> A typed superset of JavaScript that
              compiles to plain JavaScript.
            </li>
            <li>
              <strong>Tailwind CSS:</strong> A utility-first CSS framework for
              rapid UI development.
            </li>
            <li>
              <strong>Fireworks.js:</strong> A library for creating fireworks
              animations, used to celebrate successful matches.
            </li>
            <li>
              <strong>React Router:</strong> A library for handling routing in
              React applications.
            </li>
          </ul>
          <p className="mb-4">
            This project was developed to demonstrate the integration of various
            technologies and libraries to create a seamless and interactive user
            experience. We hope you enjoy using Bark Buddy as much as we enjoyed
            building it!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
