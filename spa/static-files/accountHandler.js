
document.addEventListener("DOMContentLoaded", function(){

    if(localStorage.accessToken){
		login(localStorage.accessToken)
	}else{
		logout()
	}

    document.querySelector("#login-page form").addEventListener("submit", function(event){
		event.preventDefault()
		
		const username = document.querySelector("#login-page .username").value
		const password = document.querySelector("#login-page .password").value
		
		fetch(
			"http://localhost:8080/tokens", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}, // TODO: Escape username and password in case they contained reserved characters in the x-www-form-urlencoded format.
				body: "grant_type=password&username="+username+"&password="+password
			}
			).then(function(response){
				// TODO: Check status code to see if it succeeded. Display errors if it failed.
				return response.json()
			}).then(function(body){
				// TODO: Read out information about the user account from the id_token.
				login(body.access_token)
				console.log(accessToken)
		}).catch(function(error){
			console.log(error)
		})
		
    })
    
    document.querySelector("#create-pet-page form").addEventListener("submit", function(event){
		event.preventDefault()
		
		const name = document.querySelector("#create-pet-page .name").value
		
		const pet = {
			name
		}
		
		// TODO: Build an SDK (e.g. a separate JS file)
		// handling the communication with the backend.
		fetch(
			"http://localhost:8080/pets", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer "+localStorage.accessToken
				},
				body: JSON.stringify(pet)
			}
		).then(function(response){
			// TODO: Check status code to see if it succeeded. Display errors if it failed.
			// TODO: Update the view somehow.
			console.log(response)
		}).catch(function(error){
			// TODO: Update the view and display error.
			console.log(error)
		})
		
	})

})

function login(accessToken){
	localStorage.accessToken = accessToken
	document.body.classList.remove("isLoggedOut")
	document.body.classList.add("isLoggedIn")
}

function logout(){
	localStorage.accessToken = ""
	document.body.classList.remove("isLoggedIn")
	document.body.classList.add("isLoggedOut")
}

function fetchAllAccounts(){
	
	fetch(
		"http://localhost:8080/accounts"
	).then(function(response){
		// TODO: Check status code to see if it succeeded. Display errors if it failed.
		return response.json()
	}).then(function(accounts){
		const ul = document.querySelector("#accounts-page ul")
		ul.innerText = ""
		for(const account of accounts){
			const li = document.createElement("li")
			const anchor = document.createElement("a")
			anchor.innerText = account.name
			anchor.setAttribute("href", '/accounts/'+account.id)
			li.appendChild(anchor)
			ul.append(li)
		}
	}).catch(function(error){
		console.log(error)
	})
	
}

function fetchAccount(id){
	
	fetch(
		"http://localhost:8080/accounts/"+id
	).then(function(response){
		// TODO: Check status code to see if it succeeded. Display errors if it failed.
		return response.json()
	}).then(function(account){
		const nameSpan = document.querySelector("#account-page .name")
		const idSpan = document.querySelector("#account-page .id")
		nameSpan.innerText = account.name
		idSpan.innerText = account.id
	}).catch(function(error){
		console.log(error)
	})
	
}