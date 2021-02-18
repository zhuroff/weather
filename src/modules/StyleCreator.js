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

export default StyleCreator