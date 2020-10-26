const app = document.getElementById('root')

const logo = document.createElement('img')
logo.src = './images/logo.png'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)

// Assign a new XMLHttpRequest object to a variable
var xhr = new XMLHttpRequest()

// Open a new connection
xhr.open('GET', 'https://ghibliapi.herokuapp.com/films', true)

xhr.onload = function () {
	var data = JSON.parse(this.response)

	if (xhr.status >= 200 && xhr.status < 300) {

		data.forEach((movie) => {
			// Create a div with a card class
			const card = document.createElement('div')
			card.setAttribute('class', 'card')

			// Create an h1 and set the text content to the film's title
			const h1 = document.createElement('h1')
			h1.textContent = movie.title

			// Create a p and set the text content to the film's description
			const p = document.createElement('p')
			movie.description = movie.description.substring(0, 300) // Limiting to 300 chars
			p.textContent = `${movie.description}...` // End with an ellipses

			container.appendChild(card)

			card.appendChild(h1)
			card.appendChild(p)
		})

	} else {
		const errorMessage = document.createElement('marquee')
		errorMessage.textContent = `Gah, it's not working!`
		app.appendChild(errorMessage)
	}
}

// Send request
xhr.send()