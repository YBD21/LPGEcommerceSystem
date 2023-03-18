import Confetti from "react-confetti";

const ConfettiAnimation = () => {
  return (
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
  );
};

export default ConfettiAnimation;
