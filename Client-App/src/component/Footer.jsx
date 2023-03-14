import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full flex bg-gray-200 text-black py-4 max-lg:bottom-auto absolute bottom-0 ">
      <div className="container mx-auto text-center font-bold">
        <p>Copyright © {currentYear}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
