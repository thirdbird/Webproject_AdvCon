document.addEventListener("DOMContentLoaded", function () {

	changeToPage(location.pathname)

	if (localStorage.accessToken) {
		login(localStorage.accessToken)
	} else {
		logout()
	}

	document.querySelector("#signin-page form").addEventListener("submit", function (event) {
		event.preventDefault()

		const username = document.querySelector("#signin-page .username").value
		const password = document.querySelector("#signin-page .password").value

		const account = {
			username,
			password
		}

		fetch(
			"http://localhost:8080/api/accounts/tokens", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(account)
		}
		).then(function (response) {
			return response.json()
		}).then(function (body) {
			if (typeof body.accessToken !== 'undefined') {
				login(body.accessToken)
				resetSignInForm()
				const url = "/"
				goToPage(url)
			}
			else {
				const errorMessage = document.getElementById("signInError")
				errorMessage.innerText = [body]
			}
		}).catch(function (error) {
			console.log(error)
		})

	})

	document.querySelector("#signup-page form").addEventListener("submit", function (event) {
		event.preventDefault()

		const username = document.querySelector("#signup-page  .username").value
		const password = document.querySelector("#signup-page .password").value
		const confirmPassword = document.querySelector("#signup-page  .confirmPassword").value

		const account = {
			username,
			password,
			confirmPassword
		}

		fetch(
			"http://localhost:8080/api/accounts/tokens/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",

			}, 
			body: JSON.stringify(account)
		}
		).then(function (response) {
			if (response.ok) {
				resetSignUpForm()
				const url = "/signin"
				goToPage(url)
			}
			else {
				return response.json()
			}
		}).then(function (body) {
			const errorMessage = document.getElementById("signUpError")
			errorMessage.innerText = [body]
		}).catch(function (error) {
			console.log(error)
		})

	})
})

function fetchAllAccounts() {

	fetch(
		"http://localhost:8080/api/accounts", {
		method: "GET",
		headers: {
			"Authorization": "Bearer " + localStorage.accessToken
		}
	}
	).then(function (response) {

		return response.json()
	}).then(function (accounts) {
		const ul = document.querySelector("#accounts-page ul")
		ul.innerText = ""
		for (const account of accounts) {
			const li = document.createElement("li")
			const anchor = document.createElement("a")
			anchor.innerText = account.username
			anchor.setAttribute("href", '/accounts/' + account.id)
			li.appendChild(anchor)
			ul.append(li)
		}
	}).catch(function (error) {
		console.log(error)
	})
}

function login(accessToken) {
	localStorage.accessToken = accessToken
	document.body.classList.remove("isLoggedOut")
	document.body.classList.add("isLoggedIn")
}

function logout() {
	localStorage.accessToken = ""
	document.body.classList.remove("isLoggedIn")
	document.body.classList.add("isLoggedOut")
}

function resetSignUpForm() {
	document.getElementById("signUpForm").reset();
}

function resetSignInForm() {
	document.getElementById("signInForm").reset();
}

