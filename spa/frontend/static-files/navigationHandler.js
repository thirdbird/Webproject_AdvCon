var idValue = 0
var userValue = ""
var loggedInUser = ""

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};

// TODO: Don't write all JS code in the same file.
document.addEventListener("DOMContentLoaded", function () {

    changeToPage(location.pathname)

    if(localStorage.accessToken){
		login(localStorage.accessToken)
	}else{
		logout()
	}

    document.body.addEventListener("click", function (event) {
        if (event.target.tagName == "A") {
            event.preventDefault()
            const url = event.target.getAttribute("href")
            goToPage(url)
        }
    })

    document.querySelector("#create-blog-page form").addEventListener("submit", function(event){
        event.preventDefault()
        
        const title = document.querySelector("#create-blog-page .title").value
        const post = document.querySelector("#create-blog-page .post").value

        const blogPost = {
            title,
            post
        }
        fetch(
            "http://localhost:8080/api/blogPosts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+localStorage.accessToken
                }, // TODO: Escape username and password in case they contained reserved characters in the x-www-form-urlencoded format.
                body: JSON.stringify(blogPost)
            }
            ).then(function(response){
                if(response.ok){
                    const url = "/blogposts"
                    goToPage(url)
                }
                else{
                    return response.json()
                }
            }).then(function(body){
                console.log(body)
                const errorMessage = document.getElementById("createAblogError")
                errorMessage.innerText = [body]
    
        }).catch(function(error){
            console.log(error)
        })
        
    })

    document.querySelector("#signin-page form").addEventListener("submit", function(event){
        event.preventDefault()
        
        const username = document.querySelector("#signin-page .username").value
        const password = document.querySelector("#signin-page .password").value
        
        fetch(
            "http://localhost:8080/api/accounts/tokens", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }, // TODO: Escape username and password in case they contained reserved characters in the x-www-form-urlencoded format.
                body: "grant_type=password&username="+username+"&password="+password
            }
            ).then(function(response){
                return response.json()
            }).then(function(body){
                if(typeof body.accessToken !== 'undefined'){
                    login(body.accessToken)
                    loggedInUser = parseJwt(body.idToken)
                    const url = "/"
                    goToPage(url)
                }
                else{
                    const errorMessage = document.getElementById("signInError")
                    errorMessage.innerText = [body]
                }
        }).catch(function(error){
            console.log(error)
        })
        
    })

    document.querySelector("#signup-page form").addEventListener("submit", function(event){
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
                    
                }, // TODO: Escape username and password in case they contained reserved characters in the x-www-form-urlencoded format.
                body: JSON.stringify(account)
            }
            ).then(function(response){
                if(response.ok){
                    const url = "/signin"
                    goToPage(url)
                }
                else{
                    return response.json()
                }
            }).then(function(body){
                const errorMessage = document.getElementById("signUpError")
                errorMessage.innerText = [body]
        }).catch(function(error){
            console.log(error)
        })
        
    })
})

window.addEventListener("popstate", function (event) {
    const url = location.pathname
    changeToPage(url)
})

function goToPage(url) {
    changeToPage(url)
    history.pushState({}, "", url)
}

function changeToPage(url) {

    const currentPageDiv = document.getElementsByClassName("current-page")[0]
    if (currentPageDiv) {
        currentPageDiv.classList.remove("current-page")
    }
	/*var divElements = document.querySelectorAll('div')
    document.getElementById("home-page").classList.add("current-page")
    for (let i = 0; i < divElements.length; i++) {
        li.addEventListener('click', () => {
            var div = document.querySelectorAll('div')[i]
            var visibleDiv = document.querySelector("div.current-page")
            if (visibleDiv) {
                visibleDiv.classList.remove("current-page")
            }
            div.classList.add("current-page")
        })
    }*/


    if (url == "/") {
        document.getElementById("home-page").classList.add("current-page")
    } else if (url == "/about") {
        document.getElementById("about-page").classList.add("current-page")
    } else if (url == "/contact") {
        document.getElementById("contact-page").classList.add("current-page")
    } else if (url == "/signin") {
        document.getElementById("signin-page").classList.add("current-page")
    } else if (url == "/signup") {
        document.getElementById("signup-page").classList.add("current-page")
    } else if (url == "/accounts") {
        document.getElementById("accounts-page").classList.add("current-page")
        fetchAllAccounts()
    } else if (url == "/account") {
        document.getElementById("account-page").classList.add("current-page")
    } else if (url == "/blogposts") {
        document.getElementById("blogposts-page").classList.add("current-page")
        fetchAllBlogPosts()
    }else if(new RegExp("^/blogposts/[0-9]+$").test(url)){
		document.getElementById("blogpost-page").classList.add("current-page")
		const id = url.split("/")[2]
        fetchBlogPost(id)
    } else if (url == "/blogposts/create") {
        document.getElementById("create-blog-page").classList.add("current-page")
    } else {
        document.getElementById("error-page").classList.add("current-page")
    }
}

function fetchAllAccounts() {

    fetch(
        "http://localhost:8080/api/accounts",{
        method: "GET",
            headers: {
                "Authorization": "Bearer "+localStorage.accessToken   
            }
        }
	).then(function(response){
		// TODO: Check status code to see if it succeeded. Display errors if it failed.
		return response.json()
	}).then(function(accounts){
		const ul = document.querySelector("#accounts-page ul")
		ul.innerText = ""
		for(const account of accounts){
			const li = document.createElement("li")
			const anchor = document.createElement("a")
			anchor.innerText = account.username
			anchor.setAttribute("href", '/accounts/'+account.id)
			li.appendChild(anchor)
			ul.append(li)
		}
	}).catch(function(error){
		console.log(error)
	})
}

function fetchAllBlogPosts() {

    fetch(
        "http://localhost:8080/api/blogPosts", {
            method: "GET",
            headers: {
                "Authorization": "Bearer "+localStorage.accessToken   
            }
        }
	).then(function(response){
		// TODO: Check status code to see if it succeeded. Display errors if it failed.
		return response.json()
	}).then(function(blogPosts){
		const ul = document.querySelector("#blogposts-page ul")
		ul.innerText = ""
		for(const blogPost of blogPosts){
			const li = document.createElement("li")
			const anchor = document.createElement("a")
			anchor.innerText = blogPost.title
			anchor.setAttribute("href", '/blogposts/'+blogPost.id)
			li.appendChild(anchor)
			ul.append(li)
		}
	}).catch(function(error){
		console.log(error)
	})
}

function fetchBlogPost(id){

	fetch(
        "http://localhost:8080/api/blogPosts/"+id,{
        method: "GET",
            headers: {
                "Authorization": "Bearer "+localStorage.accessToken   
            }
        }
	).then(function(response){
        // TODO: Check status code to see if it succeeded. Display errors if it failed.
        console.log(response)
		return response.json()
	}).then(function(blogPost){
        const titleSpan = document.querySelector("#blogpost-page .title")
        const nameSpan = document.querySelector("#blogpost-page .by")
        const postSpan = document.querySelector("#blogpost-page .post")
        titleSpan.innerText = blogPost.title
        nameSpan.innerText = blogPost.account_user
        postSpan.innerText = blogPost.post
        idValue = blogPost.id
        userValue = blogPost.account_user
	}).catch(function(error){
		console.log(error)
	})
	
}

function deleteBlogPost(id){

	fetch(
        "http://localhost:8080/api/blogPosts/"+id,{
        method: "DELETE",
            headers: {
                "Authorization": "Bearer "+localStorage.accessToken   
            }
        }
	).then(function(response){
        if(response.ok){
            const url = "/blogposts"
            goToPage(url)
        }
	}).catch(function(error){
		console.log(error)
	})
	
}

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

function deleteButton(){
    if(loggedInUser.username == userValue){
        deleteBlogPost(idValue)
    }
    else{
        const errorMessage = document.getElementById("errorMessage")
        errorMessage.innerText = "You cant delete that"
    }
}

function updateButton(){
    
}

