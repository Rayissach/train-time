$(document).ready(function() {

  var config = {
    apiKey: "AIzaSyDi20WZXWiBqQAuLmSM-V0moDZ6mso27LU",
    authDomain: "fir-time-3ee33.firebaseapp.com",
    databaseURL: "https://fir-time-3ee33.firebaseio.com",
    projectId: "fir-time-3ee33",
    storageBucket: "fir-time-3ee33.appspot.com",
    messagingSenderId: "1020632751391"
  };

  firebase.initializeApp(config);
 
  var database = firebase.database();

  var name = "";
  var destination = "";
  var time = "";
  var frequency = "";

  $("#btns").on("click", function(event) {
    event.preventDefault();

    name = $("#trainName").val().trim();
    destination = $("#trainDestination").val().trim();
    time = $("#trainInterval").val().trim();
    frequency = $("#trainInterval").val().trim();

    database.ref().push({

        name: name,
        destination: destination,
        time: time,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
  })
});
  database.ref().on("child_added",function(snapshot) {
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().time);
    console.log(snaspshot.val().frequency);

    $("#input").append("<td>" + snapshot.val().name + "</td>" +
"<td>" + snapshot.val().destination + "</td>" +
"<td>" + snapshot.val().time + "</td>" + "<td>" + snapshot.val().frequency + "</td>") 
  })

moment("#startTime").format('HH, mm');
});