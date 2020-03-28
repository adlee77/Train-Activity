var firebaseConfig = {
    apiKey: "AIzaSyC0MPqgBEWyP4t721OY2MIAazFxxL5ita0",
    authDomain: "cool-project-81445.firebaseapp.com",
    databaseURL: "https://cool-project-81445.firebaseio.com",
    projectId: "cool-project-81445",
    storageBucket: "cool-project-81445.appspot.com",
    messagingSenderId: "1010852977343",
    appId: "1:1010852977343:web:a35d01b82b58cdac5b840a"
};

firebase.initializeApp(firebaseConfig);


var database = firebase.database();

$("#search-button").on("click", function (event) {

    var train1 = $("#trainN").val().trim();
    var train2 = $("#dest").val().trim();
    var train3 = moment($("#trainT").val().trim(), "HH:mm").format("HH:mm");
    var train4 = $("#freq").val().trim();

    var trainInfo = {
        trainName: train1,
        destination: train2,
        firstTrain: train3,
        frequency: train4
    };

    console.log(trainInfo.trainName)
    console.log(trainInfo.destination)
    console.log(trainInfo.firstTrain)
    console.log(trainInfo.frequency)

    database.ref().push(trainInfo);
});


function loadTable() {
    $("tbody").empty()

    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());


        var train1 = childSnapshot.val().trainName;
        var train2 = childSnapshot.val().destination;
        // var train3 = childSnapshot.val().firstTrain;


        var tFrequency = childSnapshot.val().frequency;

        // Time is 3:30 AM
        var firstTime = childSnapshot.val().firstTrain;

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;


        // Minute Until Train
        var minutesAway = tFrequency - tRemainder;

        // Next Train
        var nextTrain = moment().add(minutesAway, "minutes");

        nextTrain = moment(nextTrain).format("hh:mm a")

        var newRow = $("<tr>").append(
            $("<td>").text(train1),
            $("<td>").text(train2),
            $("<td>").text(tFrequency),
            $("<td>").text(nextTrain),
            $("<td>").text(minutesAway)
        );

        $("tbody").append(newRow);
    });
}
loadTable()
setInterval(loadTable, 60000);
