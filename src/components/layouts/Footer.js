import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="">
      <p>Copyright ⓒ {currentYear} Keeper App</p>
    </footer>
  );
};

export default Footer;