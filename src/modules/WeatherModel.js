import WeatherView from './WeatherView'

class WeatherModel {
	constructor(query, el) {
		this.query = query
		this.el = el
		this.view = WeatherView
	}

	fetchData() {
		return fetch(this.query)
			.then(response => {
				if (response.ok) return response.json()
				else return { error_message: 'Что-то пошло не так...' }
			}).then(data => this.setData(data))
	}

	setData(data) {
		this.data = data
		new this.view(data).init()
	}
}

export default WeatherModel