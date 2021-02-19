import StyleCreator from './modules/StyleCreator'
import WeatherModel from './modules/WeatherModel'

class WeatherWidget {
	constructor(stylized) {
		this.stylized = stylized === true ? true : false
		this.api = 'api.openweathermap.org/data/2.5'
		this.lang = 'en'
		this.api_key = '0a13228fcfc0cfe9d21ea6d97a99c7fe'
		this.styles = StyleCreator
		this.model = WeatherModel
	}

	init() {
		navigator.geolocation.getCurrentPosition(this.setPosition.bind(this), this.setDefaultGeo.bind(this))

		if (this.stylized) {
			new this.styles().init()
		}
	}

	createQueryString() {
		return `
			http://${this.api}/weather
			?lat=${this.latitude}
			&lon=${this.longitude}
			&units=metric
			&lang=${this.lang}
			&appid=${this.api_key}
		`
	}

	setPosition(pos) {
		this.latitude = pos.coords.latitude
		this.longitude = pos.coords.longitude

		new this.model(this.createQueryString(), this.el).fetchData()
	}

	setDefaultGeo(error) {
		switch(error.code) {
			case 1:
				this.latitude = 55.7497086
				this.longitude = 37.6145138
				break
		}

		new this.model(this.createQueryString(),this.el).fetchData()
	}
}

console.log(WeatherWidget)