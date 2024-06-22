import React, { useState, useEffect, useRef, FormEvent } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Data from './brand_model_dict.json'

const CarDetailsForm: React.FC = () => {
  type CarDetails = {
    brand: string;
    model: string;
    trim: string;
    year: string;
    kilometers: string;
    regional_specs: string;
    doors: string;
    body_type: string;
    fuel_type: string;
    seating_capacity: string;
    transmission_type: string;
    no_of_cylinders: string;
    warranty: string;
    seller_type: string;
  };
  
  const [carDetails, setCarDetails] = useState<CarDetails>({
    brand: '',
    model: '',
    trim: '',
    year: '',
    kilometers: '',
    regional_specs: '',
    doors: '',
    body_type: '',
    fuel_type: '',
    seating_capacity: '',
    transmission_type: '',
    no_of_cylinders: '',
    warranty: '',
    seller_type: '',
  });

  type CarData = {
    [brand: string]: {
      [model: string]: string[];
    };
  };


  const carData:CarData=Data;

  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);

  const [Models, setModels] = useState<string[]>([]);
  const [Trims, setTrims] = useState<string[]>([]);

  

  // const handleBrandChange = (brand: string) => {
  //   setCarDetails({ ...carDetails, brand, model: '', trim: '' });
  //   console.log("models", Object.keys(carData[brand]));
  //   setModels(Object.keys(carData[brand] || {}));
  //   setTrims([]);
  // };

  // const handleModelChange = (model: string) => {
  //   setCarDetails(prevState => ({ ...prevState, model, trim: '' }));
  //   setTrims(carData[carDetails.brand]?.[model] || []);
  // };

  // const handleTrimChange = (trim: string) => {
  //   setCarDetails(prevState => ({ ...prevState, trim }));
  // };

  const handleChange = (name: string, value: string) => {
    if (name==='brand'){
      setModels(Object.keys(carData[value] || []));
      setTrims([]);
      setCarDetails({
        ...carDetails,
        brand:value,
        model: '',
        trim:''
      });
    }
    else if (name==="model"){
      console.log("trims",carData[carDetails.brand]?.[value] )
      setTrims(carData[carDetails.brand]?.[value] || []);
      setCarDetails({
        ...carDetails,
        model:value,
        trim:''
      });
    }
    else{
      setCarDetails({
        ...carDetails,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // try {
    //   const result = await predictPrice(carDetails);
    //   setPredictedPrice(result.predicted_price);
    // } catch (error) {
    //   console.error('Error submitting form:', error);
    // }
  };

  const Dropdown = ({ name, placeholder, options }: { name: keyof CarDetails, placeholder: string, options: string[] }) => {
    const [triggerWidth, setTriggerWidth] = useState<number>(0);
    const triggerRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      if (triggerRef.current) {
        setTriggerWidth(triggerRef.current.offsetWidth);
      }
    }, [carDetails]);

    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger ref={triggerRef} className="mt-1 block text-md lg:text-sm xl:text-md w-full p-2 border border-gray-300 rounded-md h-9 lg:h-7 xl:h-8 2xl:h-9 bg-white text-left">{carDetails[name] || placeholder}</DropdownMenu.Trigger>
        <DropdownMenu.Content style={{ width: triggerWidth }} className="bg-white border border-gray-300 rounded-md p-2 overflow-scroll h-fit max-h-[40vh]">
          {options.map(option => (
            <DropdownMenu.Item
              key={option}
              onSelect={() => handleChange(name, option)}
              className="cursor-pointer p-2 hover:bg-gray-200 rounded-md"
            >
              {option}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
  };

  return (
    <div className="h-full mx-40 p-4 bg-[#09213b9a] rounded-lg shadow-md">
      <h2 className="text-xl lg:text-md xl:text-lg 2xl:text-xl text-white font-semibold mb-4">Car Valuation</h2>
      <form onSubmit={handleSubmit} className="space-y-4 h-full w-full">
        <div className='flex flex-col max-w-md h-auto'>
          <label className="block text-sm lg:text-xs xl:text-sm font-medium text-white">Make and Model</label>
          <div className='flex gap-1'>
            <Dropdown name="brand" placeholder="Enter brand" options={Object.keys(carData)} />
            <Dropdown name="model" placeholder="Enter model" options={Models} />
          </div>
        </div>
        <div>
          <label className="block text-sm lg:text-xs xl:text-sm font-medium text-white">Trim</label>
          <Dropdown name="trim" placeholder="Enter trim" options={Trims} />
        </div>
        <div className='flex flex-col'>
          <label className="block text-sm lg:text-xs xl:text-sm font-medium text-white">Year and Mileage</label>
          <div className='flex gap-1'>
            <Dropdown name="year" placeholder="Enter year" options={['2020', '2021', '2022']} />
            <Dropdown name="kilometers" placeholder="Enter mileage" options={['10000', '20000', '30000']} />
          </div>
        </div>
        <div>
          <label className="block text-sm lg:text-xs xl:text-sm font-medium text-white">Specification</label>
          <Dropdown name="regional_specs" placeholder="Enter specification" options={['GCC', 'US', 'EU']} />
        </div>
        <div className='flex flex-col'>
          <label className="block text-sm lg:text-xs xl:text-sm font-medium text-white">Fuel and Transmission Type</label>
          <div className='flex gap-1'>
            <Dropdown name="fuel_type" placeholder="Enter Fuel Type" options={['Petrol', 'Diesel', 'Electric']} />
            <Dropdown name="transmission_type" placeholder="Enter Transmission Type" options={['Automatic', 'Manual']} />
          </div>
        </div>
        <div>
          <label className="block text-sm lg:text-xs xl:text-sm font-medium text-white">Cylinders</label>
          <Dropdown name="no_of_cylinders" placeholder="Enter Cylinders" options={['4', '6', '8']} />
        </div>
        <div className='flex flex-col'>
          <label className="block text-sm lg:text-xs xl:text-sm font-medium text-white">Doors and Seating Capacity</label>
          <div className='flex gap-1'>
            <Dropdown name="doors" placeholder="Number of Doors" options={['2', '4']} />
            <Dropdown name="seating_capacity" placeholder="Enter Seating Capacity" options={['4', '5', '7']} />
          </div>
        </div>
        <div className='flex flex-col'>
          <label className="block text-sm lg:text-xs xl:text-sm font-medium text-white">Warranty and Seller Type</label>
          <div className='flex gap-1'>
            <Dropdown name="warranty" placeholder="Warranty?" options={['Yes', 'No']} />
            <Dropdown name="seller_type" placeholder="Enter Seller Type" options={['Dealer', 'Individual']} />
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md">Value this car</button>
      </form>
      {predictedPrice !== null && (
        <div className="mt-4 p-4 bg-green-100 text-green-800">
          Predicted Price: {predictedPrice}
        </div>
      )}
    </div>
  );
};

export default CarDetailsForm;
