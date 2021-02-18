class WeatherView {
	constructor(data) {
		this.data = data
		this.root = document.getElementById('weather') || document.createElement('div')
	}

	init() {
		console.log(this.data)
		if (this.data.error_message) {
			return this.errorRenderHandler()
		}

		if (!this.root.hasAttribute('id')) {
			this.root.setAttribute('id', 'weather')
			document.body.appendChild(this.root)
		}

		this.render()
	}

	render() {
		this.root.innerHTML  = `
			<header class="w_header">
				<img class="w_logo" src="https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png"/>
				<p class="w_location">${this.data.name}, ${this.data.sys.country}</p>
			</header>
			<section class="w_section">
				<div class="w_screen">
					<img class="w_icon" src="http://openweathermap.org/img/wn/${this.data.weather[0].icon}@4x.png" />
					<div class="w_temp">
						${this.data.main.temp}&#176;C
					</div>
				</div>
				<div class="w_description">${this.data.weather[0].description}</div>
				<div class="w_details">
					<p>Feels like ${this.data.main.feels_like}&#176;C</p>
					<p>Wind ${(this.data.wind.speed).toFixed(1)}m/s</p>
					<p>Humidity ${this.data.main.humidity}%</p>
					<p>Pressure ${this.data.main.humidity} inHg.</p>
					<p>Visibility ${(this.data.visibility / 1000).toFixed(1)}km</p>
					<p>Sunrise ${this.msInTime(this.data.sys.sunrise)}</p>
					<p>Sunset ${this.msInTime(this.data.sys.sunset)}</p>
					<p>Cloudness ${this.data.clouds.all}%</p>
				</div>
			</section>
		`
	}

	msInTime(unix_time) {
		const date = new Date(unix_time * 1000)
		const hours = date.getHours()
		const minutes = `0${date.getMinutes()}`
		const seconds = `0${date.getSeconds()}`
		
		return `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`
	}

	errorRenderHandler() {
		console.log(this.data.error_message)
	}
}

export default WeatherView