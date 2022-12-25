import React from "react";
import { Sidebar, Footer } from "./";

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
