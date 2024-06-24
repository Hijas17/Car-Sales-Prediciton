// src/App.tsx
import React from "react";
import CarDetailsForm from "./components/carDetailsForm/carDetailsForm";
import { Header } from "./components/header";
import VideoBackground from "./components/VideoBackground";

const App: React.FC = () => {
  const description =
    "A state-of-the-art platform has been meticulously crafted to evaluate the resale value of cars in the UAE. Leveraging the comprehensive Dubizzle Cars dataset, the project entailed rigorous preprocessing to ensure unparalleled data quality and accuracy. At its core, the XGBoost model was employed for its superior performance and precision in handling intricate tabular data, training on pivotal car features to predict accurate pricing. This robust model was seamlessly deployed through APIs created with FastAPI and strategically hosted on AWS EC2 to ensure optimal scalability and reliability. The frontend, elegantly designed using React, features an intuitive form where users can input car details. The data is then processed through the APIs to deliver precise resale value predictions, providing an insightful and reliable valuation experience.";
  return (
    <div className="relative z-10">
      <VideoBackground />
      <div className="w-full min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-col absolute justify-center h-full top-56 left-20">
          <h1 className="text-white text-[45px] xl:text-[60px] w-[40%] font-extrabold top-56 left-20">
          Discover the True Value of Your Dream Car..
          </h1>
          <span className="text-white text-md xl:text-md w-[40%] italic  h-full left-20 top-14">
            {description}
          </span>
        </div>
        <div className="flex-grow w-full flex items-center justify-end">
          <CarDetailsForm />
        </div>
      </div>
    </div>
  );
};

export default App;
