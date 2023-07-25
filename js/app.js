// make variables
const row = document.querySelector(".row");
const post = document.querySelector(".post");
const comment = document.querySelector(".comment");
let userId;
let userName;
row.addEventListener("click",showUsersPosts)
post.addEventListener("click" , showPostsComment)
showUsers();

function showUsers() {
   httpAjaxRequest("https://jsonplaceholder.typicode.com/users" , usersList) ;
  
 
}

function usersList(users) {
    users.map(function(item){
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
       })
}

function showUsersPosts(e) {

    if (e.target.nodeName === "BUTTON") {
           httpAjaxRequest("https://jsonplaceholder.typicode.com/posts" , postsList)
    }
      userId= e.target.dataset.id;
      userName= e.target.dataset.name;
}

function postsList(posts) {
    post.innerHTML = "";
    posts.map(function(item){

        if ( item.userId == userId ) {
            post.innerHTML += ` <div class="list">
                                 <h2>${userName}'s post</h2>
                                    <p>${item.id}</p>
                                    <h4>${item.title}</h4>
                                    <p>${item.body}</p>
                                    <button data-id="${item.id}" >comments</button>
                                </div>
                                <div class="comment"></div>`;
        }
       
    })
   
}

function showPostsComment(e) {

    if (e.target.nodeName === "BUTTON") {
           httpAjaxRequest("https://jsonplaceholder.typicode.com/comments" , commentsList)
    }
}

function commentsList(comments) {
    // comment.innerHTML = "";
    comments.map(function(item){

        // if ( item.postId == userId && item.Id == userId  ) {
            post.lastChild.innerHTML += ` <div class="list">
                                    <p>${item.id} comment of post ${userId} </p>
                                    <h4>${item.name}</h4>
                                    <p>${item.body}</p>
                                    <p>${item.email}</p>
                                </div>`;
        // }
       
    })
   
}

function httpAjaxRequest(address , targetFunc) {
    let xhr = new XMLHttpRequest();

xhr.onreadystatechange = function(){
    if (xhr.readyState == 4 && xhr.status == 200) {
   
         var result  = JSON.parse(xhr.responseText);
        
         targetFunc(result);
       
    }
}

xhr.open("GET" , address);
xhr.send();
}
