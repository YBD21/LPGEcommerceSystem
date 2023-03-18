import React, { useState } from "react";
import Confetti from "react-confetti";


const ConfettiAnimation = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const handleButtonClick = () => {
    setShowConfetti(true);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <button onClick={handleButtonClick} className="bg-black text-white mb-4">
        Show Confetti
      </button>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
          friction={0.98}
          wind={0.01}
          colors={["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"]}
        />
      )}
      {showConfetti && (
        <h1 className="text-3xl text-center font-bold text-green-500">
          Thank You!
        </h1>
      )}
    </div>
  );
};

export default ConfettiAnimation;
