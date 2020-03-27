var config = {
    apiKey: "AIzaSyC0MPqgBEWyP4t721OY2MIAazFxxL5ita0",
    authDomain: "time-sheet-55009.firebaseapp.com",
    databaseURL: "https://time-sheet-55009.firebaseio.com",
    storageBucket: "time-sheet-55009.appspot.com"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();

  $("#search-button").on("click", function(event) {

    var train1= $("#trainN").val().trim();
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


  })