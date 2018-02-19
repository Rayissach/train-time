$(document).ready(function() {

  // var queryURL = "http://transportapi.com/v3/us/places.json?query=euston&type=train_station&app_id=YOUR_APP_ID&app_key=70f975a928310d6f5167e5f4a255939e"

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

    $("#btns-add").on("click", function(event) {
        event.preventDefault();
        // var randomTime = "04:45"
        // randomFormat = "HH:mm"

        var name = $("#train-name").val().trim();
        var destination = $("#train-destination").val().trim();
        // var time = moment($("#train-time").val().trim(), "DD/MM/YY").format("X");
        var frequency = moment($("#train-interval").val().trim()).startOf('hour').fromNow(); 

        database.ref().push({

            name: name,
            destination: destination,
            time: time,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

        $("#train-name").val("");
        $("#train-destination").val("");
        $("#train-time").val("");
        $("#train-interval").val("");
    });

    database.ref().on("child_added", function(childSnapshot) {
        var cd = childSnapshot.val();

        var name = cd.name;
        var destination = cd.destination;
        var time = cd.time;
        var frequency = cd.frequency;

        console.log(name);
        console.log(destination);
        console.log(time);
        console.log(frequency);

        // var startTime = moment.unix(time).format("MM/DD/YY");
        // var nextArrival = moment(randomDate).format("HH:mm");

        $("#stationTable > tbody").append(
            "<tr><td>" +
            cd.name +
            "</td>" +
            "<td>" +
            cd.destination +
            "</td>" +
            "<td>" + 
            cd.frequency + 
            "</td>" + 
            "<td>" + 
            cd.nextArrival+ 
            "</td></tr>")


    });
});