
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

        var name = $("#train-name").val().trim();
        var destination = $("#train-destination").val().trim();
        var time = $("#train-time").val().trim();
        var frequency = $("#train-interval").val().trim();

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


          // CONVERTED TIMES USING MOMENT JS
         //////////////////////////////////////////////////////////

    var frequency = parseInt(frequency);

    var currentTime = moment();


    var subCon = moment(childSnapshot.val().time, "HH:mm").subtract(1, "years");

    var timeArrival = moment(subCon).format("HH:mm");


    var timeCon = moment(timeArrival, "HH:mm").subtract(1,"years"); 

    var timeDiff = moment().diff(moment(timeCon), "minutes");


    var timeRem = timeDiff % frequency;

    var timeAway = frequency - timeRem;

    var nextArrival = moment().add(timeAway, "minutes");

    // var giveTrainArrival = moment(nextArrival).format("HH:mm");

    //////////////////////////////////////////////////////////


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
            moment(nextArrival).format("HH:mm") + 
            "</td>" +
            "<td>" +
            timeAway + " min away " 
            +
            "</td></tr>");


    });
   