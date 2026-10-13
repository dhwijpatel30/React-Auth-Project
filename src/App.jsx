import React from "react";
import { RouterProvider } from "react-router-dom";
import { Router } from "../src/routes/Router";

const App = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <RouterProvider router={Router} />
    </div>
  );
};

export default App;
