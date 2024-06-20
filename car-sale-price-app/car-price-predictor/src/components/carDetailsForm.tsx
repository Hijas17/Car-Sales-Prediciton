import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { predictPrice } from './api';

const CarDetailsForm: React.FC = () => {
  const [carDetails, setCarDetails] = useState({
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

  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCarDetails({
      ...carDetails,
      [e.target.name]: e.target.value
    });
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

  return (
    <div className="h-full mx-40 p-4 bg-[#09213b9a] rounded-lg shadow-md">
      <h2 className="text-xl lg:text-md xl:text-lg 2xl:text-xl text-white font-semibold mb-4">Car Valuation</h2>
      <form onSubmit={handleSubmit} className="space-y-4 h-full w-full">
        <div className='flex flex-col max-w-md h-auto'>
          <label className="block text-sm lg:text-xs xl:text-sm font-medium text-white">Make and Model</label>
            <div className='flex gap-1'>
          <input type="text" name="brand" value={carDetails.brand} onChange={handleChange} placeholder="Enter brand" className="mt-1 block text-md lg:text-sm xl:text-md w-full p-2 border border-gray-300 rounded-md h-9 lg:h-7 xl:h-8 2xl:h-9" required />
          <input type="text" name="model" value={carDetails.model} onChange={handleChange} placeholder="Enter model" className="mt-1 block text-md lg:text-sm xl:text-md w-full p-2 border border-gray-300 rounded-md h-9 lg:h-7 xl:h-8 2xl:h-9" required />
            </div>
        </div>
        <div>
          <label className="block text-sm lg:text-xs xl:text-sm font-medium text-white">Trim</label>
          <input type="text" name="trim" value={carDetails.trim} onChange={handleChange} placeholder="Enter trim" className="mt-1 block text-md lg:text-sm xl:text-md w-full p-2 border border-gray-300 rounded-md h-9 lg:h-7 xl:h-8 2xl:h-9" required />
        </div>
        <div className='flex flex-col'>
          <label className="block text-sm lg:text-xs xl:text-sm font-medium text-white">Year and Mileage</label>
            <div className='flex gap-1'>
            <input type="number" name="year" value={carDetails.year} onChange={handleChange} placeholder="Enter year" className="mt-1 block text-md lg:text-sm xl:text-md w-full p-2 border border-gray-300 rounded-md h-9 lg:h-7 xl:h-8 2xl:h-9" required />
            <input type="number" name="kilometers" value={carDetails.kilometers} onChange={handleChange} placeholder="Enter mileage" className="mt-1 block text-md lg:text-sm xl:text-md w-full p-2 border border-gray-300 rounded-md h-9 lg:h-7 xl:h-8 2xl:h-9" required />
            </div>
        </div>
        <div>
          <label className="block text-sm lg:text-xs xl:text-sm font-medium text-white">Specification</label>
          <input type="text" name="regional spec" value={carDetails.regional_specs} onChange={handleChange} placeholder="Enter specification" className="mt-1 block text-md lg:text-sm xl:text-md w-full p-2 border border-gray-300 rounded-md h-9 lg:h-7 xl:h-8 2xl:h-9" required />
        </div>
        <div className='flex flex-col'>
          <label className="block text-sm lg:text-xs xl:text-sm font-medium text-white">Fuel and Transmission Type</label>
            <div className='flex gap-1'>
          <input type="text" name="fuel type" value={carDetails.fuel_type} onChange={handleChange} placeholder="Enter Fuel Type" className="mt-1 block text-md lg:text-sm xl:text-md w-full p-2 border border-gray-300 rounded-md h-9 lg:h-7 xl:h-8 2xl:h-9" required />
          <input type="text" name="transmission type" value={carDetails.transmission_type} onChange={handleChange} placeholder="Enter Transmission Type" className="mt-1 block text-md lg:text-sm xl:text-md w-full p-2 border border-gray-300 rounded-md h-9 lg:h-7 xl:h-8 2xl:h-9" required />
            </div>
        </div>
        <div>
          <label className="block text-sm lg:text-xs xl:text-sm font-medium text-white">Cylinders</label>
          <input type="text" name="cylinders" value={carDetails.no_of_cylinders} onChange={handleChange} placeholder="Enter Cylinders" className="mt-1 block text-md lg:text-sm xl:text-md w-full p-2 border border-gray-300 rounded-md h-9 lg:h-7 xl:h-8 2xl:h-9" required />
        </div>
        <div className='flex flex-col'>
          <label className="block text-sm lg:text-xs xl:text-sm font-medium text-white">Doors and Seating Capacity</label>
            <div className='flex gap-1'>
          <input type="text" name="doors" value={carDetails.doors} onChange={handleChange} placeholder="Number of Doors" className="mt-1 block text-md lg:text-sm xl:text-md w-full p-2 border border-gray-300 rounded-md h-9 lg:h-7 xl:h-8 2xl:h-9" required />
          <input type="text" name="seating capacity" value={carDetails.seating_capacity} onChange={handleChange} placeholder="Enter Seating Capacity" className="mt-1 block text-md lg:text-sm xl:text-md w-full p-2 border border-gray-300 rounded-md h-9 lg:h-7 xl:h-8 2xl:h-9" required />
            </div>
        </div>
        <div className='flex flex-col'>
          <label className="block text-sm lg:text-xs xl:text-sm font-medium text-white">Waranty and Seller type</label>
            <div className='flex gap-1'>
          <input type="text" name="doors" value={carDetails.warranty} onChange={handleChange} placeholder="Warranty?" className="mt-1 block text-md lg:text-sm xl:text-md w-full p-2 border border-gray-300 rounded-md h-9 lg:h-7 xl:h-8 2xl:h-9" required />
          <input type="text" name="seating capacity" value={carDetails.seller_type} onChange={handleChange} placeholder="Enter Seller Type" className="mt-1 block text-md lg:text-sm xl:text-md w-full p-2 border border-gray-300 rounded-md h-9 lg:h-7 xl:h-8 2xl:h-9" required />
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
