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
    var train3 = moment($("#trainT").val().trim(), "hh:mm a").format("hh:mm a");
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
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    var train1 = childSnapshot.val().trainName;
    var train2 = childSnapshot.val().destination;
    var train3 = childSnapshot.val().firstTrain;
    var train4 = childSnapshot.val().frequency;
    var nextArrival = moment().add(train3, 'minutes');
    var minutes = nextArrival - train3;

    var newRow = $("<tr>").append(
        $("<td>").text(train1),
        $("<td>").text(train2),
        $("<td>").text(train4),
        $("<td>").text(empMonths),
        $("<td>").text(nextArrival),
        $("<td>").text(minutes)
    );

        $("#train-table > tbody").append(newRow);
});