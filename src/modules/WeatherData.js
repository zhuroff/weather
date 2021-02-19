import WeatherModel from './modules/WeatherModel'

class WeatherData {
	constructor() {
		this.api = 'api.openweathermap.org/data/2.5'
		this.lang = 'en'
		this.api_key = '0a13228fcfc0cfe9d21ea6d97a99c7fe'
		this.presets = []
		this.latitude = 55.7497086
		this.longitude = 37.6145138
	}

	get query() {
		return `
			http://${this.api}/weather
			?lat=${this.latitude}
			&lon=${this.longitude}
			&units=metric
			&lang=${this.lang}
			&appid=${this.api_key}
		`
	}

	call() {
		const presets = JSON.parse(localStorage.getItem('weather_presets'))
		this.presets = presets || navigator.geolocation.getCurrentPosition(this.setPosition.bind(this))
		new WeatherModel(this.query)
	}

	setPosition(pos) {
		this.latitude = pos.coords.latitude
		this.longitude = pos.coords.longitude
	}
}

export default WeatherData