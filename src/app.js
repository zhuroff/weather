import StyleCreator from './modules/StyleCreator'

import EventHandler from './modules/EventHandler'
import WeatherData from './modules/WeatherData'

class WeatherWidget {
	constructor(props) {
		this.data = new WeatherData()
		// this.styles = StyleCreator // BAD
		// this.model = WeatherModel // BAD
		// this.evt = EventHandler // BAD
		this.styles = props.stylized
	}

	mount() {
		this.data.call()
	}

	init() {
		navigator.geolocation.getCurrentPosition(this.setPosition.bind(this), this.setDefaultGeo.bind(this))

		if (this.stylized) {
			new this.styles().init()
		}

		new this.evt().on()
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