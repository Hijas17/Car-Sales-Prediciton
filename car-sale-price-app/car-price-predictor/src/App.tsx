// src/App.tsx
import React from "react";
import CarDetailsForm from "./components/carDetailsForm";
import { Header } from "./components/header";

const App: React.FC = () => {
  return (
    <div className="overflow-hidden w-screen h-screen">
      <Header></Header>
      <div className="h-full bg-gray-100 flex items-center justify-center">
        <CarDetailsForm />
      </div>
    </div>
  );
};

export default App;
