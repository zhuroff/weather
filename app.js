class StyleCreator {
	init() {
		const styles = document.createElement('style')		
		this.render(styles)
	}

	render(styles) {
		styles.innerHTML = `
			#weather {
				position: fixed;
				right: 2rem;
				bottom: 2rem;
				z-index: 5000;
				border-radius: 5px;
				width: 300px;
				overflow: hidden;
				color: #48484A;
				box-shadow: 0 0 8px 0 rgb(0 0 0 / 25%);
				font-family: BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif
			}

			.w_header {
				background-color: #48484A;
				display: flex;
				align-items: flex-end;
				justify-content: space-between;
				padding: 1rem;
			}

			.w_logo {
				width: 80px;
				height: auto;
				flex: none;
			}

			.w_location {
				font-size: 0.875rem;
				color: #fff;
				margin: 0;
			}

			.w_section {
				padding: 0 1rem 2rem;
				background-color: #fff;
			}

			.w_screen {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}

			.w_description {
				text-align: center;
				margin-bottom: 30px;
				font-weight: 600;
			}

			.w_icon {
				margin-bottom: -40px;
			}

			.w_temp {
				font-size: 1.75rem;
				font-weight: 600;
				letter-spacing: 1px;
			}

			.w_details {
				column-count: 2;
			}

			.w_details p {
				margin: 0 0 5px;
				font-size: 0.75rem;
				text-align: center;
			}
		`

		document.body.appendChild(styles)
	}
}

/**
 * Widget view
 */
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

/**
 * Widget model
 */
class WeatherModel {
	constructor(query, el) {
		this.query = query
		this.el = el
	}

	async fetchData() {
		return await fetch(this.query)
			.then(response => {
				if (response.ok) return response.json()
				else return { error_message: 'Что-то пошло не так...' }
			}).then(data => this.setData(data))
	}

	setData(data) {
		this.data = data
		new WeatherView(data).init()
	}
}

/**
 * Widget init class
 */
class WeatherWidget {
	constructor(stylized) {
		this.stylized = stylized === true ? true : false
		this.api = 'api.openweathermap.org/data/2.5'
		this.lang = 'en'
	}

	#api_key = '0a13228fcfc0cfe9d21ea6d97a99c7fe'

	init() {
		navigator.geolocation.getCurrentPosition(this.setPosition.bind(this), this.setDefaultGeo.bind(this))

		if (this.stylized) {
			new StyleCreator().init()
		}
	}

	createQueryString() {
		return `
			http://${this.api}/weather
			?lat=${this.latitude}
			&lon=${this.longitude}
			&units=metric
			&lang=${this.lang}
			&appid=${this.#api_key}
		`
	}

	setPosition(pos) {
		this.latitude = pos.coords.latitude
		this.longitude = pos.coords.longitude

		new WeatherModel(this.createQueryString(), this.el).fetchData()
	}

	setDefaultGeo(error) {
		switch(error.code) {
			case 1:
				this.latitude = 55.7497086
				this.longitude = 37.6145138
				break
		}

		new WeatherModel(this.createQueryString(),this.el).fetchData()
	}
}