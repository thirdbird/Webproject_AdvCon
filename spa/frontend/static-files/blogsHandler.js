var blogPost_ID = 0
var blogPost_ACCOUNT = ""

document.addEventListener("DOMContentLoaded", function () {

    document.querySelector("#create-blog-page form").addEventListener("submit", function (event) {
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
                "Authorization": "Bearer " + localStorage.accessToken
            }, // TODO: Escape username and password in case they contained reserved characters in the x-www-form-urlencoded format.
            body: JSON.stringify(blogPost)
        }
        ).then(function (response) {
            if (response.ok) {
                resetCreateBlogPostForm()
                const url = "/blogposts"
                goToPage(url)

            }
            else {
                return response.json()
            }
        }).then(function (body) {
            console.log(body)
            const errorMessage = document.getElementById("createAblogError")
            errorMessage.innerText = [body]

        }).catch(function (error) {
            console.log(error)
        })

    })

    document.querySelector("#update-blog-page form").addEventListener("submit", function (event) {
        event.preventDefault()

        const title = document.querySelector("#update-blog-page .title").value
        const post = document.querySelector("#update-blog-page .post").value

        const blogPost = {
            title,
            post
        }

        fetch(
            "http://localhost:8080/api/blogPosts/" + idValue, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.accessToken
            },
            body: JSON.stringify(blogPost)
        }
        ).then(function (response) {
            if (response.ok) {
                resetUpdateBlogPostForm()
                const url = "/blogposts"
                goToPage(url)
            }
            else {
                return response.json()
            }
        }).then(function (errors) {
            const errorMessage = document.getElementById("updateABlogPostError")
            errorMessage.innerText = [errors]

        }).catch(function (error) {
            console.log(error)
        })

    })

})

function fetchAllBlogPosts() {


    fetch(
        "http://localhost:8080/api/blogPosts", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.accessToken
        }
    }
    ).then(function (response) {
        if(response.ok){
            return response.json()
        }
        else{
            const errorMessage = document.getElementById("blogPostError")
            errorMessage.innerText = "something wrong, come back later"
        }
    }).then(function (blogPosts) {
        const ul = document.querySelector("#blogposts-page ul")
        ul.innerText = ""
        for (const blogPost of blogPosts) {
            const li = document.createElement("li")
            const anchor = document.createElement("a")
            anchor.innerText = blogPost.title
            anchor.setAttribute("href", '/blogposts/' + blogPost.id)
            li.appendChild(anchor)
            ul.append(li)
        }
    }).catch(function (error) {
        console.log(error)
    })

}

function fetchBlogPost(id) {

    fetch(
        "http://localhost:8080/api/blogPosts/" + id, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.accessToken
        }
    }
    ).then(function (response) {
        // TODO: Check status code to see if it succeeded. Display errors if it failed.
        console.log(response)
        return response.json()
    }).then(function (blogPost) {
        const titleSpan = document.querySelector("#blogpost-page .title")
        const nameSpan = document.querySelector("#blogpost-page .by")
        const postSpan = document.querySelector("#blogpost-page .post")
        titleSpan.innerText = blogPost.title
        nameSpan.innerText = blogPost.account_user
        postSpan.innerText = blogPost.post
        blogPost_ID = blogPost.id
        blogPost_ACCOUNT = blogPost.account_user
    }).catch(function (error) {
        console.log(error)
    })

}

function deleteBlogPost(id) {

    fetch(
        "http://localhost:8080/api/blogPosts/" + id, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + localStorage.accessToken
        }
    }
    ).then(function (response) {
        if (response.ok) {
            const url = "/blogposts"
            goToPage(url)
        }
    }).catch(function (error) {
        console.log(error)
    })

}

function resetCreateBlogPostForm() {
    document.getElementById("createblogPostForm").reset();
}

function resetUpdateBlogPostForm() {
    document.getElementById("updateblogPostForm").reset();
}

function deleteButton() {
    const loggedInUser = parseJwt(localStorage.accessToken)
	if (loggedInUser.username == blogPost_ACCOUNT) {
		deleteBlogPost(blogPost_ID)
	}
	else {
		const errorMessage = document.getElementById("errorMessage")
		errorMessage.innerText = "You can't delete that"
	}
}

function updateButton() {
	const loggedInUser = parseJwt(localStorage.accessToken)
	if (loggedInUser.username == blogPost_ACCOUNT) {
		const url = "/blogposts/update"
		goToPage(url)
	}
	else {
		const errorMessage = document.getElementById("errorMessage")
		errorMessage.innerText = "You can't update that that"
	}
}