async function fetchUnsplashPhoto() {
	try {
		const [unsplashRes, coingeckoRes] = await Promise.all([
			fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"),
			fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
		]);

		const unsplashData = await unsplashRes.json();
		const coingeckoData = await coingeckoRes.json();

		const { urls, user } = unsplashData;
		const { image, name, market_data } = coingeckoData;

		document.body.style.backgroundImage = `url(${urls.regular})`;
		document.getElementById("author").textContent = `By: ${user.first_name} ${user.last_name}`;
		document.getElementById("crypto-top").innerHTML = `
			<img src=${image.small} />
			<span>${name}</span>
		`;
		document.getElementById("crypto").innerHTML += `
			<p>🎯: $${market_data.current_price.usd}</p>
			<p>👆: $${market_data.high_24h.usd}</p>
			<p>👇: $${market_data.low_24h.usd}</p>
		`;
		} catch (error) {
		console.error(error);
	}
}

fetchUnsplashPhoto();

setInterval(() => {
	const currentTime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
	document.getElementById("time").textContent = currentTime;
}, 1000);

async function fetchWeather() {
	try {
		const position = await new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject);
		});
		
		const { latitude, longitude } = position.coords;
		const apiKey = "ee44b7b76c61e766d8c3a8eb33d6e2a2";
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

		const response = await fetch(url);
		if (!response.ok) {
			throw new Error("Weather data not available");
		}

		const data = await response.json();
		const { weather, main, name } = data;
		const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

		document.getElementById("weather").innerHTML = `
			<img src=${iconUrl} />
			<p class="weather-temp">${Math.round(main.temp)}º</p>
			<p class="weather-city">${name}</p>
		`;
		} catch (error) {
		console.error(error);
	}
}

fetchWeather();