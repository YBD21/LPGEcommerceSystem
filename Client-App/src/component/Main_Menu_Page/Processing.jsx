import { useState, useEffect } from "react";
const Processing = () => {
  const [ellipsisPosition, setEllipsisPosition] = useState(1);

  useEffect(() => {
    // Move the ellipsis forward every 500ms
    const intervalId = setInterval(() => {
      setEllipsisPosition((prevPosition) => {
        if (prevPosition === 3) {
          return 1;
        } else {
          return prevPosition + 1;
        }
      });
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="flex items-center">
        <svg
          fill="none"
          className="w-10 h-10 animate-spin"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>

        <p className="text-lg font-semibold animate-pulse">
          Processing <span>{".".repeat(ellipsisPosition)}</span>
        </p>
      </div>
    </div>
  );
};

export default Processing;
