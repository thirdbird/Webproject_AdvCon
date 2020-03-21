

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};

document.addEventListener("DOMContentLoaded", function () {

    changeToPage(location.pathname)

    document.body.addEventListener("click", function (event) {
        if (event.target.tagName == "A") {
            event.preventDefault()
            const url = event.target.getAttribute("href")
            goToPage(url)
        }
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
    } else if (new RegExp("^/blogposts/[0-9]+$").test(url)) {
        document.getElementById("blogpost-page").classList.add("current-page")
        const id = url.split("/")[2]
        fetchBlogPost(id)
    } else if (url == "/blogposts/create") {
        document.getElementById("create-blog-page").classList.add("current-page")
    } else if (url == "/blogposts/update") {
        document.getElementById("update-blog-page").classList.add("current-page")
    } else {
        document.getElementById("error-page").classList.add("current-page")
    }
}
