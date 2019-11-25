var BASE_URL = "https://immense-wildwood-37077.herokuapp.com"

var insertUser = function() {

  var createUser = document.querySelector("#create_user");

  createUser.onclick = function() {

    var newUserFirstName = document.querySelector("#first_name_field").value;
    if (newUserFirstName == '') {
      confirm("Must fill out all fields or account will not be created! ");
      return;
    };    
    var newUserLastName = document.querySelector("#last_name_field").value;
    if (newUserLastName == '') {
      confirm("Must fill out all fields or account will not be created! ");
      return;
    };       
    var newUserPassword = document.querySelector("#enc_password_field").value;
    if (newUserPassword == '') {
      confirm("Must fill out all fields or account will not be created! ");
      return;
    };    
    var newUserEmail = document.querySelector("#email_field").value;
    if (newUserEmail == '') {
      confirm("Must fill out all fields or account will not be created! ");
      return;
    };       
    
    var bodyStr = "first_name=" + encodeURIComponent(newUserFirstName);
    bodyStr += "&last_name=" + encodeURIComponent(newUserLastName);
    bodyStr += "&email=" + encodeURIComponent(newUserEmail);
    bodyStr += "&enc_password=" + encodeURIComponent(newUserPassword);

    fetch(BASE_URL + "/users", {
      method: "POST",
      body: bodyStr,
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(function(response){
      var Status = response.status;
      console.log("insert user status code is:", Status);
      if (Status == 422) {
        var duplicateEmail = document.querySelector("#duplicate_email");
        duplicateEmail.style.display = "block";
        return;
      }
      console.log("server responded");
      clearUserInputInsert();
      var insertUserContainer = document.querySelector("#insert_user_container");
      insertUserContainer.style.display = "none";
      var homeContainer = document.querySelector("#display_insert_user_box_button_container");
      $(document).ready(function(){
  
        $("#display_insert_user_box_button_container").fadeIn(2500);
     
      });
    });
  };
};

insertUser();

var verifyUserSignIn = function() {

  var signInSubmitButton = document.querySelector("#sign_in_submit_button");
  
  signInSubmitButton.onclick = function() {

    var oldUserEmail = document.querySelector("#sign_in_email_field").value;
  
    var oldUserPassword = document.querySelector("#sign_in_password_field").value;
 
    var bodyStr = "email=" + encodeURIComponent(oldUserEmail);
    bodyStr += "&enc_password=" + encodeURIComponent(oldUserPassword);

    fetch(BASE_URL + "/sessions", {
      method: "POST",
      body: bodyStr,
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(function(response){
      //getAssignments();
      var Status = response.status;
      console.log("this is your status code for sign in:", Status);
      if (Status == 401) {
        console.log("unauthorized have to try signing in again");
        var signInFailure = document.querySelector("#sign_in_failure");
        signInFailure.style.display = "block";
        return;
      };
      getAssignments();
      console.log("server responded, you are logged in as: ", oldUserEmail);
      clearUserSignIn();
      var signInFailure = document.querySelector("#sign_in_failure");
      signInFailure.style.display = "none";
      var loginGreeting = document.querySelector("#login_greeting");
      loginGreeting.style.display = "block";
      loginGreeting.innerHTML = "Welcome " + oldUserEmail + "!";
      var userSignOutButton = document.querySelector("#user_sign_out_button");
      userSignOutButton.style.display = "inline-block";
      var insertUserContainer = document.querySelector("#insert_user_container");
      insertUserContainer.style.display = "none";
      var signInContainer = document.querySelector("#sign_in_container");
      signInContainer.style.display = "none";
      var displayInsertUserBoxButton = document.querySelector("#display_insert_user_box_button");
      //var displayUserSignInButton = document.querySelector("#display_user_sign_in_button");
      var listContainer = document.querySelector("#list_container");
      //listContainer.style.display = "block";
      $(document).ready(function(){
  
        $("#list_container").fadeIn(2500);
        $("#display_insert_box_button").fadeIn(2500);
        $("#display_insert_user_box_button").fadeIn(2500);
        //$("#display_user_sign_in_button").fadeIn(2500);
    
      });
    }); 
  };
};

verifyUserSignIn();

var userSignOut = function() {

  var userSignOutButton = document.querySelector("#user_sign_out_button");
  userSignOutButton.onclick = function() {
    console.log("sign out button was clicked");

    fetch(BASE_URL + "/sessions", {
      method: "DELETE",
      credentials: "include"

    }).then(function(response) {
        var Status = response.status;
        console.log("your status code for sign out is:", Status);
        console.log("you are now signed out");
        
        var userSignOutButton = document.querySelector("#user_sign_out_button");
        userSignOutButton.style.display = "none";
        var listContainer = document.querySelector("#list_container");
        listContainer.style.display = "none";
        var insertContainer = document.querySelector("#insert_container");
        insertContainer.style.display = "none";
        var editContainer = document.querySelector("#edit_container");
        editContainer.style.dislplay = "none";
        var homeContainer = document.querySelector("#display_insert_user_box_button_container");
        homeContainer.style.display = "block";
        var loginGreeting = document.querySelector("#login_greeting");
        loginGreeting.style.display = "none";
        
    });
    //userSignOutButton.style.display = "block";
  };
  
};

userSignOut();

var displayInsertUserBoxButton = document.querySelector("#display_insert_user_box_button");
displayInsertUserBoxButton.onclick = function() {
  
  $(document).ready(function(){
  
    $("#insert_user_container").fadeIn(2500);
    
  });
  var homeContainer = document.querySelector("#display_insert_user_box_button_container");
  homeContainer.style.display = "none";
  
};

var displayUserSignInButton = document.querySelector("#display_user_sign_in_button");
displayUserSignInButton.onclick = function() {
	
  $(document).ready(function(){
  
    $("#sign_in_container").fadeIn(2500);
    
  });
  var homeContainer = document.querySelector("#display_insert_user_box_button_container");
  homeContainer.style.display = "none";
};

var backFromInsertUser = document.querySelector("#back_from_insert_user");
backFromInsertUser.onclick = function() {
 
  var insertUserContainer = document.querySelector("#insert_user_container");
  insertUserContainer.style.display = "none";
  var homeContainer = document.querySelector("#display_insert_user_box_button_container");
  homeContainer.style.display = "block";  
};

var backFromSignInButton = document.querySelector("#back_from_sign_in_button");
backFromSignInButton.onclick = function() {

  var signInContainer = document.querySelector("#sign_in_container"); 
  signInContainer.style.display = "none";
  var homeContainer = document.querySelector("#display_insert_user_box_button_container");
  homeContainer.style.display = "block";
};

var clearUserInputInsert = function() {
  document.querySelector("#first_name_field").value = '';
  document.querySelector("#last_name_field").value = '';
  document.querySelector("#email_field").value = '';
  document.querySelector("#enc_password_field").value = '';
};

var clearUserSignIn = function() {
  document.querySelector("#sign_in_email_field").value = '';
  document.querySelector("#sign_in_password_field").value = '';
};