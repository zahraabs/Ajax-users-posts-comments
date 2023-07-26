// make variables
const row = document.querySelector(".row");
const post = document.querySelector(".post");
const comment = document.querySelector(".comment");
let userId = null;
let userName = null;
let postId = null;

// events
row.addEventListener("click", showUsersPosts);
post.addEventListener("click", showPostsComment);

showUsers();

// users
function showUsers() {
    httpAjaxRequest("https://jsonplaceholder.typicode.com/users", usersList);
}

function usersList(users) {
    users.map(function (item) {
        row.innerHTML += ` <div class="list">
                            <div>
                                <p><strong>Id:</strong>  ${item.id}</p>
                                <h3><strong> name:</strong> ${item.name}</h3>
                                <p><strong>username: </strong>${item.username}</p>
                                <p><strong>email:</strong> ${item.email}</p>
                                <p><strong>address :</strong> ${item.address.street}</p>
                                <p><strong>website:</strong> ${item.website}</p>
                                <p><strong>company name:</strong> ${item.company.name}</p>
                                <button data-id="${item.id}" data-name="${item.name}"><strong>phone:</strong> ${item.phone}</button>
                            </div>
                           </div>`;
    });
}
// posts
function showUsersPosts(e) {
    if (e.target.nodeName === "BUTTON") {
<<<<<<< Updated upstream
        userId = e.target.dataset.id;
        userName = e.target.dataset.name;
=======
>>>>>>> Stashed changes
        httpAjaxRequest("https://jsonplaceholder.typicode.com/posts", postsList);
    }
}

function postsList(posts) {
    post.innerHTML = "";
<<<<<<< Updated upstream
    let result = posts.filter(function (item) {
        return item.userId == userId;
    })

    for (const item of result) {
        post.innerHTML += ` <div class="list">
=======
    posts.map(function (item) {
        if (item.userId == userId) {
            post.innerHTML += ` <div class="list">
>>>>>>> Stashed changes
                                    <h2><strong>Username:</strong>${userName}'s post</h2>
                                    <p><strong>Id:</strong>${item.id}</p>
                                    <p><strong>Title:</strong>${item.title}</p>
                                    <p><strong>Body:</strong>${item.body}</p>
                                    <button data-id="${item.id}" >comments</button>
<<<<<<< Updated upstream
                            </div>`;
    }

}

=======
                          </div>`;
        }
    });
}
>>>>>>> Stashed changes
// post's comments
function showPostsComment(e) {
    if (e.target.nodeName === "BUTTON") {
        postId = e.target.dataset.id;
        httpAjaxRequest(
            `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
            commentsList
        );
    }
}

function commentsList(comments) {
    comment.innerHTML = "";
    comments.map(function (item) {
        comment.innerHTML += ` <div class="list">
                                    <p>comment ${item.id} of post ${postId} ${userName} </p>
                                    <h4> <strong>name:</strong>${item.name}</h4>
                                    <p><strong>body :</strong>${item.body}</p>
                                    <p><strong>email :</strong>${item.email}</p>
                           </div>`;
    });
}

function httpAjaxRequest(address, targetFunc) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = JSON.parse(xhr.responseText);

            targetFunc(result);
        }
    };

    xhr.open("GET", address);
    xhr.send();
}
