import React from 'react';

interface WeatherCardProps {
  data: {
    main: {
      temp: number;
      humidity: number;
    };
    wind: {
      speed: number;
    };
    name: string;
  };
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const { main, wind, name } = data;
  return (
    <div className='w-72 h-auto border border-blue-300 p-8 flex flex-col rounded-lg shadow-sm'>
      <h2 className='pb-2 text-xl text-bold lg:text-2xl'>{name}</h2>
      <p className='text-md lg:text-lg'>Temperature: {main.temp} °C</p>
      <p className='text-md lg:text-lg'>Humidity: {main.humidity}%</p>
      <p className='text-md lg:text-lg'>Wind Speed: {wind.speed} m/s</p>
    </div>
  );
};

export default WeatherCard;
