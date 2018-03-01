function getGithubInfo(user) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it. The function should finally return the object(it now contains the response!)

    var request = new XMLHttpRequest();

    request.open('GET', 'https://api.github.com/users/' + user, false);
    request.onload = function (e) {
        if (request.readyState === 4) {
            if (request.status === 200) {
                console.log(request.responseText);
            } else {
                console.error(request.statusText);
            }
        }
    };
    request.send();
    return request;


 /*   $.get("https://api.github.com/users/" + user, function(data, status){
        console.log(status);
        console.log(data);
        return data;
    });*/
}

function showUser(user) {

    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
    if(user.name == null) {
        document.getElementById("username").innerHTML = user.login;
        document.getElementById("realname").innerHTML = "(Actual name not given!)";
        document.getElementById("realname").style.fontStyle = "italic";
        document.getElementById("userid").innerHTML = "User ID: " + user.id;
        document.getElementById("avatar").innerHTML = "";
        document.getElementById("information").innerHTML = "<a href=" + user.html_url + ">Link to user profile</a>";
    }
    else {
        document.getElementById("realname").innerHTML = user.name;
        document.getElementById("realname").style.fontStyle = "normal";
        document.getElementById("userid").innerHTML = "User ID: " + user.id;
        document.getElementById("avatar").innerHTML = "<img src=" + user.avatar_url + ">";
        document.getElementById("information").innerHTML = "<a href=" + user.html_url + ">Link to user profile</a>";
    }




}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed


}


$(document).ready(function(){
    $(document).on('keypress', '#username', function(e){
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            //get what the user enters
            username = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            //get the user's information and store the respsonse
            response = getGithubInfo(username);
            //if the response is successful show the user's details
            console.log(response.status);
            if (response.status == 200) {
                showUser(JSON.parse(response.responseText));
                //else display suitable message
            } else {
                noSuchUser(username);
            }
        }
    })
});
