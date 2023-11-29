import "./App.css";
import "./index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import WeatherIcon from "./assets/weather-forecast.png";

function App() {
	const MAX_HISTORY_LENGTH = 5;
	const [city, setCity] = useState<string>("");
	const [weatherData, setWeatherData] = useState<any | null>(null);
	const [isClicked, setIsClicked] = useState<boolean>(false);
	const [searchHistory, setSearchHistory] = useState<string[]>([]);
	const apiKey: string = "24f7445e03255a6bdee6a3a0c22ed354";

	const fetchWeatherData = async () => {
		try {
			const response = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
			);
			setWeatherData(response.data);
			updateSearchHistory(city);
			setIsClicked(!isClicked)
			
		} catch (error) {
			console.error("Error fetching weather data:", error);
		}
	};

	const updateSearchHistory = (newCity: string) => {
		const updatedHistory = [
			newCity,
			...searchHistory.slice(0, MAX_HISTORY_LENGTH - 1),
		];
		setSearchHistory(updatedHistory);
		localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
	};

	const handleHistoryClick = (clickedCity: string) => {
		setCity(clickedCity);
		fetchWeatherData();
	};


	useEffect(() => {
		const storedHistory = localStorage.getItem("searchHistory");
		if (storedHistory) {
			setSearchHistory(JSON.parse(storedHistory));
		}
	}, []);

	return (
		<div className="w-auto h-auto flex flex-col justify-center items-center space-y-6">
			<div className="p-8 flex flex-col justify-center content-center items-center lg:flex-row ">
				<img width="100px" src={WeatherIcon} alt="weather" />
				<h1 className="text-3xl text-blue-950 p-8 lg:text-5xl ">Weather App</h1>
			</div>
			<div className="flex justify-center items-center">
				<input
					className="w-72 border border-sm mr-2 p-2 rounded-md"
					type="text"
					placeholder="Enter city name"
					value={city}
					onChange={ (e) => setCity(e.target.value)}
					onClick={()=> setIsClicked(!isClicked)}
				/>
				<button className="w-auto" onClick={fetchWeatherData}>
					<FontAwesomeIcon className="h-6 text-gray-400" icon={faMagnifyingGlass} />
				</button>
			</div>
			<div className= {` ${isClicked ? 'flex' : 'hidden'} w-11/12 p-4 bg-gray-50 justify-center cursor-pointer pt-2 flex-col lg:w-1/2  `}>
				<h2 className="text-xl pt-2">Search History</h2>
				<ul>
					{searchHistory.map((item, index) => (
						<li className="focus hover:bg-gray-100" key={index} onClick={() => handleHistoryClick(item)}>
							{item}
						</li>
					))}
				</ul>
			</div>
			<div className="flex flex-col justify-center content-center items-center mt-10" >
				{weatherData && <WeatherCard data={weatherData} />}
			</div>
		</div>
	);
}

export default App;
