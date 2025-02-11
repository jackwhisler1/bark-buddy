import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Fireworks } from "@fireworks-js/react";
import type { FireworksHandlers } from "@fireworks-js/react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const MatchPage = () => {
  const location = useLocation();
  const { matchedDog } = location.state;
  const ref = useRef<FireworksHandlers>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.start();
      const stopTimer = setTimeout(() => {
        ref.current?.stop();
      }, 5000);

      return () => {
        clearTimeout(stopTimer);
      };
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar showFavoritesButton={false} />
      <Fireworks
        ref={ref}
        options={{
          autoresize: true,
          opacity: 0.3,
          acceleration: 1.05,
          friction: 0.97,
          gravity: 1.5,
          particles: 50,
          traceLength: 3,
          traceSpeed: 10,
          explosion: 5,
          intensity: 30,
          flickering: 50,
          lineStyle: "round",
          hue: {
            min: 0,
            max: 360,
          },
          delay: {
            min: 30,
            max: 60,
          },
          rocketsPoint: {
            min: 50,
            max: 50,
          },
          lineWidth: {
            explosion: {
              min: 1,
              max: 3,
            },
            trace: {
              min: 1,
              max: 2,
            },
          },
          brightness: {
            min: 50,
            max: 80,
          },
          decay: {
            min: 0.015,
            max: 0.03,
          },
          mouse: {
            click: false,
            move: false,
            max: 1,
          },
        }}
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          position: "fixed",
          background: "transparent",
          zIndex: 20,
        }}
      />
      <div className="flex-grow bg-gray-100 flex items-center justify-center p-6 relative z-10">
        <div className="max-w-md w-full bg-white p-4 rounded-md shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Your Bark Buddy Match
          </h1>
          {matchedDog ? (
            <div>
              <h2 className="text-xl font-semibold text-center">
                {matchedDog.name}
              </h2>
              <img
                src={matchedDog.img}
                alt={matchedDog.name}
                className="w-full object-cover rounded-md mb-4"
              />
              <p className="text-center">Breed: {matchedDog.breed}</p>
              <p className="text-center">Age: {matchedDog.age}</p>
              <p className="text-center">Zip Code: {matchedDog.zip_code}</p>
            </div>
          ) : (
            <p className="text-center">No match found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MatchPage;
