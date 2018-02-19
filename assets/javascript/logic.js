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

    // var name = "";
    // var destination = "";
    // var time = 0;
    // var frequency = "";

    $("#btns-add").on("click", function(event) {
        event.preventDefault();

        var name = $("#train-name").val().trim();
        var destination = $("#train-destination").val().trim();
        // var time = moment($("#train-time") val().trim(), "DD/MM/YY").format("X");
        var frequency = $("#train-interval").val().trim();


        database.ref().push({

            name: name,
            destination: destination,
            // time: time,
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

        var startTime = moment.unix(time).format("MM/DD/YY");

        $("#stationTable > tbody").append(
            "<tr><td>" +
            cd.name +
            "</td>" +
            "<td>" +
            cd.destination +
            "</td>" +
            "<td>" + 
            cd.startDate + 
            "</td>" + 
            "<td>" + 
            cd.frequency + 
            "</td></tr>")

    });

    // database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {

    //     console.log(snapshot.val());
    //     console.log(snapshot.val().name);
    //     console.log(snapshot.val().destination);
    //     console.log(snapshot.val().time);
    //     console.log(snapshot.val().frequency);

    //     $("#train-name").html("<td>" + snapshot.val().name + "</td>");
    //     $("#train-destination").html("<td>" + snapshot.val().destination + "</td>");
    //     $("#start-time").text(snapshot.val().time);
    //     $("#train-intereval").text(snapshot.val().frequency);

    //     "<td>" + snapshot.val().name + "</td>"

    // }, function(errorObject) {
    //     console.log("Errors handled: " + errorObject.code);
    // });
});

// $("#trainName").append(snapshot.val().name);
// console.log("hello");

// "<td>" + snapshot.val().destination + "</td>" +
// "<td>" + snapshot.val().time + "</td>" + "<td>" + snapshot.val().frequency + "</td>" 
// },  
// function(errorObject) {

//     console.log("Errors handled: " + errorObject.code);

//   };
// });

// moment("#startTime").format('HH, mm');