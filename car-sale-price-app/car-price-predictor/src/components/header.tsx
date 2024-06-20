import SportsCar from "../assets/sedan.png";
export const Header = () => {
  return (
    <div className="w-full h-16 bg-[#00000031] shadow-sm">
      <div className="flex w-full h-full px-3">
        <div className="flex justify-center items-center">
        <img src={SportsCar} className="w-12 h-12"></img>
        </div>
        <div className="flex items-center justify-center px-1">
          <h1 className="text-2xl font-extrabold italic text-transparent bg-clip-text bg-[#ffffff85]">
            FindYourCarValue
          </h1>
        </div>
        {/* <img src={Logo}></img> */}
      </div>
    </div>
  );
};
