import React, { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Data from './brand_model_dict.json'
import classNames from 'classnames';
import { cylinders, doors, fueltype, seating_capacity, sellertype, spec, transmissiontype, warranty, years } from './formOptions';
import { predict } from '../../api/predict';

const CarDetailsForm: React.FC = () => {
  type CarDetails = {
    brand: string;
    model: string;
    trim: string;
    year: number;
    kilometers: number;
    regional_specs: string;
    doors: string;
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
    year: 2015,
    kilometers: 0,
    regional_specs: '',
    doors: '',
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

  function toTitleCase(str: string): string {
    return str
      .split(/(\s|-)/)  // Split by space or hyphen, but keep the delimiters
      .map(word => {
        if (word.match(/(\s|-)/)) {
          // Return delimiters as is
          return word;
        } else {
          // Capitalize the first character and lowercase the rest
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
      })
      .join('');  // Join the array back into a string
  }
  

  const handleChange = (name: string, value: string) => {
    if (name==='brand'){
      setModels(Object.keys(carData[value] || []));
      setTrims([]);
      setCarDetails({
        ...carDetails,
        brand:toTitleCase(value),
        model: '',
        trim:''
      });
    }
    else if (name==="model"){
      setTrims(carData[carDetails.brand]?.[value] || []);
      setCarDetails({
        ...carDetails,
        model:toTitleCase(value),
        trim:''
      });
    }
    else if (name === "year"){
      setCarDetails({
        ...carDetails,
        year:+value,
      });
    }
    else{
      setCarDetails({
        ...carDetails,
        [name]: toTitleCase(value)
      });
    }
  };

  // const handleKmChange = (value:any) =>{
  //   setCarDetails({
  //     ...carDetails,
  //     kilometers:value
  //   });
  // }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await predict(carDetails);
      setPredictedPrice(result.predicted_price);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleKilometersChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCarDetails({
      ...carDetails,
      kilometers: +e.target.value,
    });
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
        <DropdownMenu.Trigger ref={triggerRef} className={classNames("mt-1 block text-md lg:text-sm xl:text-md w-full p-2 text-[#FFFFFF] border border-gray-300 rounded-md h-9 lg:h-7 xl:h-8 2xl:h-9 bg-[#ffffff9f] text-left", !carDetails[name]?"italic":"")}>{carDetails[name] || placeholder}</DropdownMenu.Trigger>
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
    <div className="h-full min-w-[30%] mx-40 p-4 bg-[#09213b9a] rounded-lg shadow-md">
      <h2 className="text-xl lg:text-md xl:text-lg 2xl:text-xl text-white font-semibold mb-4">Car Valuation</h2>
      <form onSubmit={handleSubmit} className="space-y-4 h-full w-full">
      <div className='flex flex-col'>
          <label className="block text-sm lg:text-xs xl:text-sm font-medium text-white">Brand and Model</label>
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
            <Dropdown name="year" placeholder="Enter year" options={years} />
            <input onChange={handleKilometersChange} placeholder="Enter mileage" className='mt-1 block text-md lg:text-sm xl:text-md w-full p-2 text-[#FFFFFF] border border-gray-300 rounded-md h-9 lg:h-7 xl:h-8 2xl:h-9 bg-[#ffffff9f] text-left placeholder:text-[#FFFFFF] placeholder:italic' />
          </div>
        </div>
        <div>
          <label className="block text-sm lg:text-xs xl:text-sm font-medium text-white">Specification</label>
          <Dropdown name="regional_specs" placeholder="Enter specification" options={spec} />
        </div>
        <div className='flex flex-col'>
          <label className="block text-sm lg:text-xs xl:text-sm font-medium text-white">Fuel and Transmission Type</label>
          <div className='flex gap-1'>
            <Dropdown name="fuel_type" placeholder="Enter Fuel Type" options={fueltype} />
            <Dropdown name="transmission_type" placeholder="Enter Transmission Type" options={transmissiontype} />
          </div>
        </div>
        <div>
          <label className="block text-sm lg:text-xs xl:text-sm font-medium text-white">Cylinders</label>
          <Dropdown name="no_of_cylinders" placeholder="Enter Cylinders" options={cylinders} />
        </div>
        <div className='flex flex-col'>
          <label className="block text-sm lg:text-xs xl:text-sm font-medium text-white">Doors and Seating Capacity</label>
          <div className='flex gap-1'>
            <Dropdown name="doors" placeholder="Number of Doors" options={doors} />
            <Dropdown name="seating_capacity" placeholder="Enter Seating Capacity" options={seating_capacity} />
          </div>
        </div>
        <div className='flex flex-col'>
          <label className="block text-sm lg:text-xs xl:text-sm font-medium text-white">Warranty and Seller Type</label>
          <div className='flex gap-1'>
            <Dropdown name="warranty" placeholder="Warranty?" options={warranty} />
            <Dropdown name="seller_type" placeholder="Enter Seller Type" options={sellertype} />
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
