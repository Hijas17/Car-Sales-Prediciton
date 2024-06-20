// src/App.tsx
import React from "react";
import CarDetailsForm from "./components/carDetailsForm";
import { Header } from "./components/header";
import VideoBackground from "./components/VideoBackground";

const App: React.FC = () => {
  return (
    <div className="relative z-10">
      <VideoBackground />
      <div className="w-full min-h-screen flex flex-col">
      <Header />
        <h1 className="text-white text-[50px] xl:text-[70px] w-[40%] font-extrabold flex absolute top-56 left-20">Know The Price Of Your Dream Car!!</h1>
      <div className="flex-grow w-full flex items-center justify-end">
        <CarDetailsForm />
      </div>
    </div>
    </div>
  );
};

export default App;
