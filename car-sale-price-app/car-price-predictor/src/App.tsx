// src/App.tsx
import React from "react";
import CarDetailsForm from "./components/carDetailsForm/carDetailsForm";
import { Header } from "./components/header";
import VideoBackground from "./components/VideoBackground";
import classNames from "classnames";
import CarDetailsFormMobile from "./components/carDetailsForm/carDetailsFormMobile";

const App: React.FC = () => {
  const description =
    "A state-of-the-art platform has been meticulously crafted to evaluate the resale value of cars in the UAE. Leveraging the comprehensive Dubizzle Cars dataset, the project entailed rigorous preprocessing to ensure unparalleled data quality and accuracy. At its core, the XGBoost model was employed for its superior performance and precision in handling intricate tabular data, training on pivotal car features to predict accurate pricing. This robust model was seamlessly deployed through APIs created with FastAPI and strategically hosted on AWS EC2 to ensure optimal scalability and reliability. The frontend, elegantly designed using React, features an intuitive form where users can input car details. The data is then processed through the APIs to deliver precise resale value predictions, providing an insightful and reliable valuation experience.";
  return (
    <div
      className={classNames(
        "relative z-10",
        window.innerWidth <= 768 ? "h-fit" : ""
      )}
    >
      <VideoBackground />
      <div className="w-full min-h-screen flex flex-col">
        <Header />
        <div
          className={classNames(
            "flex flex-col justify-center",
            window.innerWidth > 768
              ? "absolute top-56 left-20"
              : "items-center mx-auto text-center max-w-[375px] p-[20px]"
          )}
        >
          <h1
            className={classNames(
              "text-[#a7b9e0] xs:text-[24px] lg:text-[40px] leading-tight 2xl:leading-normal italic xl:text-[60px] font-extrabold",
              window.innerWidth > 768 ? " top-56 left-20 w-[40%]" : ""
            )}
          >
            Discover the True Value of Your Dream Car
          </h1>
          <span
            className={classNames(
              "text-[#d5e1fc] xl:text-lg xs:text-sm italic",
              window.innerWidth > 768 ? "w-[40%] h-full left-20 top-14" : "mt-2"
            )}
          >
            {description}
          </span>
        </div>
        {window.innerWidth > 768 ? (
          <div className="flex-grow w-full flex items-center justify-end z-30">
            <CarDetailsForm />
          </div>
        ) : (
          <div className="flex-grow w-full z-30 py-5 px-2">
            <CarDetailsFormMobile />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
