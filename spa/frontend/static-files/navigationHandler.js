// TODO: Don't write all JS code in the same file.
document.addEventListener("DOMContentLoaded", function(){
	
	changeToPage(location.pathname)
		
	document.body.addEventListener("click", function(event){
		if(event.target.tagName == "A"){
			event.preventDefault()
			const url = event.target.getAttribute("href")
			goToPage(url)
		}
    })

})

window.addEventListener("popstate", function(event){
	const url = location.pathname
	changeToPage(url)
})

function goToPage(url){
	changeToPage(url)
	history.pushState({}, "", url)
}

function changeToPage(url){
	
	const currentPageDiv = document.getElementsByClassName("current-page")[0]
	if(currentPageDiv){
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
    } else if (url == "/account") {
        document.getElementById("account-page").classList.add("current-page")
    } else if (url == "/blogposts") {
        document.getElementById("blogposts-page").classList.add("current-page")
    } else if (url == "/blogposts/create") {
        document.getElementById("create-blog-page").classList.add("current-page")
    } else {
        document.getElementById("error-page").classList.add("current-page")
    }
}