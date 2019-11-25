var BASE_URL = "https://immense-wildwood-37077.herokuapp.com"

var getAssignments = function() {
  fetch(BASE_URL + "/assignments", {
    credentials: "include"
  }).then(function (response) {

    var Status = response.status;
    if (Status == 200) {
      var listContainer = document.querySelector("#list_container");
      listContainer.style.display = "block";
      var signOut = document.querySelector("#sign_out_container");
      signOut.style.display = "block";
      var logInGreeting = document.querySelector("#login_greeting");
      logInGreeting.style.display = "block";
      var userSignOutButton = document.querySelector("#user_sign_out_button");
      userSignOutButton.style.display = "block";
      var home = document.querySelector("#display_insert_user_box_button_container");
      home.style.display = "none";
      var insertContainer = document.querySelector("#insert_container");
      insertContainer.style.display = "none";
    };
    console.log("get assignments status code is:", Status);
    if (Status == 401) {
      var home = document.querySelector("#display_insert_user_box_button_container");
      home.style.display = "block";      
      return;
    };
    console.log("server responded.");
    response.json().then(function (data) {
      console.log("data received from server:", data);

        var placeDB = document.querySelector("#db");
        placeDB.innerHTML = "";
        data.forEach(function (assignment) {
          
        var listItem = document.createElement("li");
          
        var assignmentHeading = document.createElement("h3");
          
        listItem.innerHTML = assignment.title + " -- " + assignment.due + " -- " + assignment.status + " - ";
         //update
        var editButton = document.createElement("button");
        editButton.innerHTML = "EDIT";

        editButton.onclick = function(assignmentID) {
          console.log(assignment.title, "edit button was clicked");
          updateAssignment(assignment.id, assignment.course, assignment.title, assignment.description, assignment.assigned, assignment.due, assignment.estimate, assignment.status);
          var listContainer = document.querySelector("#list_container");
          listContainer.style.display = "none";
          $(document).ready(function(){
  
            $("#edit_container").fadeIn(2500);
            
          });
        };

          //delete
        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "DELETE";
        deleteButton.onclick = function(assignmentID) {
          console.log("delete button clicked", assignment.title);
          
          if(confirm("Are you sure you want to delete " + assignment.title + "?")) {
            deleteAssignment(assignment.id);
          };
            
        };
        placeDB.appendChild(assignmentHeading);
          
        assignmentHeading.appendChild(listItem);
        
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        
      });

      
    });

  });
};
getAssignments();

var deleteAssignment = function(assignmentID) {

  fetch(BASE_URL + "/assignments/" + assignmentID, {
    method: "DELETE",
    credentials: "include"

  }).then(function(response) {
            // reload assignments
    getAssignments();
  });
  //getAssignments();
};

var updateAssignment = function(id, course, title, description, assigned, due, estimate, status) {

  document.querySelector("#course_field_edit").value = course;
  document.querySelector("#title_field_edit").value = title;
  document.querySelector("#description_field_edit").value = description;
  document.querySelector("#assigned_field_edit").value = assigned;
  document.querySelector("#due_field_edit").value = due;
  document.querySelector("#estimate_field_edit").value = estimate;
  document.querySelector("#status_field_edit").value = status;

  var saveButton = document.querySelector("#save");
  saveButton.onclick = function() {
    console.log("save button was clicked");

    var courseEdited = document.querySelector("#course_field_edit").value;
    var titleEdited = document.querySelector("#title_field_edit").value;
    var descriptionEdited = document.querySelector("#description_field_edit").value;
    var assignedEdited = document.querySelector("#assigned_field_edit").value;
    var dueEdited = document.querySelector("#due_field_edit").value;
    var estimateEdited = document.querySelector("#estimate_field_edit").value;
    var statusEdited = document.querySelector("#status_field_edit").value;

    console.log("new title is:", titleEdited);
    
    var bodyStr = "course=" + encodeURIComponent(courseEdited);
    bodyStr += "&title=" + encodeURIComponent(titleEdited);
    bodyStr += "&description=" + encodeURIComponent(descriptionEdited);
    bodyStr += "&assigned=" + encodeURIComponent(assignedEdited);
    bodyStr += "&due=" + encodeURIComponent(dueEdited);
    bodyStr += "&estimate=" + encodeURIComponent(estimateEdited);
    bodyStr += "&status=" + encodeURIComponent(statusEdited);

    fetch(BASE_URL + "/assignments/" + id, {
      method: "PUT",
      body: bodyStr,
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }

    }).then(function(response) {
        // reload assignments
        var Status = response.status;
        console.log("status for updated assignment is:", Status);
        getAssignments();
        clearInputUpdate();
        var editContainer = document.querySelector("#edit_container");
        editContainer.style.display = "none";
        $(document).ready(function(){
  
          $("#list_container").fadeIn(2500);
          $("#display_insert_box_button").fadeIn(2500);

        });
        //return;
    });
    //return;
    //getAssignments();
  };

};

var displayInsertBoxButton = document.querySelector("#display_insert_box_button");
displayInsertBoxButton.onclick = function() {
  
  $(document).ready(function(){
  
    $("#insert_container").fadeIn(2500);
    
  });
  displayInsertBoxButton.style.display = "none";
  var listContainer = document.querySelector("#list_container");
  listContainer.style.display = "none";
};

var insertAssignment = function() {

  var addButton = document.querySelector("#add");

  addButton.onclick = function() {

    var newAssignmentCourse = document.querySelector("#course_field").value;
    if (newAssignmentCourse == '') {
      confirm("Are you sure you want to put in an empty course? ");
      newAssignmentCourse = ' ';
    };
    var newAssignmentTitle = document.querySelector("#title_field").value;
    if (newAssignmentTitle == '') {
      confirm("Are you sure you want to put in an empty title? ");
      newAssignmentTitle = ' ';
    };
    var newAssignmentDescription = document.querySelector("#description_field").value;
    if (newAssignmentDescription == '') {
      newAssignmentDescription = ' ';
    };
    var newAssignmentAssigned = document.querySelector("#assigned_field").value;
    if (newAssignmentAssigned == '') {
      newAssignmentAssigned = ' ';
    };
    var newAssignmentDue = document.querySelector("#due_field").value;
    if (newAssignmentDue == '') {
      newAssignmentDue = ' ';
    };
    var newAssignmentEstimate = document.querySelector("#estimate_field").value;
    if (newAssignmentEstimate == '') {
      newAssignmentEstimate = ' ';
    };
    var newAssignmentStatus = document.querySelector("#status_field").value;
    if (newAssignmentStatus == '') {
      newAssignmentStatus = ' ';
    };

    clearInputInsert();

    var bodyStr = "course=" + encodeURIComponent(newAssignmentCourse);
    bodyStr += "&title=" + encodeURIComponent(newAssignmentTitle);
    bodyStr += "&description=" + encodeURIComponent(newAssignmentDescription);
    bodyStr += "&assigned=" + encodeURIComponent(newAssignmentAssigned);
    bodyStr += "&due=" + encodeURIComponent(newAssignmentDue);
    bodyStr += "&estimate=" + encodeURIComponent(newAssignmentEstimate);
    bodyStr += "&status=" + encodeURIComponent(newAssignmentStatus);

    fetch(BASE_URL + "/assignments", {
      method: "POST",
      body: bodyStr,
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(function(response){
      console.log("server responded");
      getAssignments();
      var insertContainer = document.querySelector("#insert_container");
      insertContainer.style.display = "none";
      var listContainer = document.querySelector("#list_container");
      $(document).ready(function(){
    
        $("#list_container").fadeIn(2500);
        $("#display_insert_box_button").fadeIn(2500);
      
      });
    });
  };
};

insertAssignment();

var backFromInsert = document.querySelector("#back_from_insert");
backFromInsert.onclick = function() {
  var listContainer = document.querySelector("#list_container");
  listContainer.style.display = "block";
  var insertContainer = document.querySelector("#insert_container");
  insertContainer.style.display = "none";
  var displayInsertBoxButton = document.querySelector("#display_insert_box_button");
  displayInsertBoxButton.style.display = "block"; 
};

var backFromEdit = document.querySelector("#back_from_edit");
backFromEdit.onclick = function() {
  var listContainer = document.querySelector("#list_container");
  listContainer.style.display = "block";
  var editContainer = document.querySelector("#edit_container");
  editContainer.style.display = "none";
  var displayInsertBoxButton = document.querySelector("#display_insert_box_button");
  displayInsertBoxButton.style.display = "block"; 
};

var clearInputInsert = function() {
  document.querySelector("#course_field").value = '';
  document.querySelector("#title_field").value = '';
  document.querySelector("#description_field").value = '';
  document.querySelector("#assigned_field").value = '';
  document.querySelector("#due_field").value = '';
  document.querySelector("#estimate_field").value = '';
  document.querySelector("#status_field").value = '';
};

var clearInputUpdate = function() {
  document.querySelector("#course_field_edit").value = '';
  document.querySelector("#title_field_edit").value = '';
  document.querySelector("#description_field_edit").value = '';
  document.querySelector("#assigned_field_edit").value = '';
  document.querySelector("#due_field_edit").value = '';
  document.querySelector("#estimate_field_edit").value = '';
  document.querySelector("#status_field_edit").value = '';
};