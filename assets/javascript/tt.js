// Initialize Firebase
var config = {
  apiKey: "AIzaSyAZSzspS6TxDU9jAUPR3-VfMQXfjZ-D2sQ",
  authDomain: "train-times-b83d1.firebaseapp.com",
  databaseURL: "https://train-times-b83d1.firebaseio.com",
  projectId: "train-times-b83d1",
  storageBucket: "train-times-b83d1.appspot.com",
  messagingSenderId: "814100864272"
};

firebase.initializeApp(config);

//Variable to reference the Database
var database = firebase.database();

//Initial Variables 
var trainName = "";
var trainDestination = "";
var trainFrequency = "";
var nextArrival = "";
var minutesAway = "";

//Clicking on the "Submit" button pushes new data to Firebase
$("#submitButton").on("click", function (){
	//Prevent the page from refreshing
	event.preventDefault();

	//Get User Input
	trainName = $("#trainName").val().trim();
	trainDestination = $("#trainDestination").val().trim();
	trainTime = $("#trainTime").val().trim();
	trainFrequency = $("#trainFrequency").val().trim();
		// console.log(trainName);
		// console.log(trainDestination);	
		// console.log(trainTime);
		// console.log(trainFrequency);
	
	//Calculate the time of next arrival and how many minutes away the next train is using moments.js
	
	//Getting one number string to work with
	var oGConverstion = moment(trainTime, "HH:mm").subtract(1, "years");
  	// console.log(oGConverstion);
 	//Figuring out the difference in time
 	var stillConverting = moment.duration(moment().diff(moment(trainTime, "HH:mm")), 'milliseconds').asMinutes();
    // console.log(stillConverting);
  //Figuring out the time remaining
  var evenMoreConverting = trainFrequency - (Math.floor(stillConverting) % trainFrequency);
  	// console.log(evenMoreConverting);
  //Figuring out the next train to arrive
  nextArrival = stillConverting > 0 ? moment().add(evenMoreConverting, 'minutes' ) : moment(trainTime, "HH:mm") ;
  	// console.log(moment(nextArrival).format("HH:mm"));
  //Figuring out how many minutes away that is from right now
  minutesAway = Math.ceil(moment.duration(moment(nextArrival).diff(moment()), 'milliseconds').asMinutes());
  	// console.log(minutesAway);

	//Push the new data to Firebase
	database.ref().push({
		trainName: trainName,
		trainDestination: trainDestination,
		trainFrequency: trainFrequency,
		nextArrival: moment(nextArrival).format("HH:mm"),
		minutesAway: minutesAway
	});

	//Clear the input fields
	$("#trainName").val("");
	$("#trainDestination").val("");
	$("#trainTime").val("");
	$("#trainFrequency").val("");
});

//On a value change in Firebase, that value will be pushed into the table
database.ref().on("child_added", function (childSnapshot){
	// console.log(childSnapshot.val().trainName);
	// console.log(childSnapshot.val().trainDestination);
	// console.log(childSnapshot.val().trainFrequency);
	// console.log(childSnapshot.val().nextArrival);
	// console.log(childSnapshot.val().minutesAway);

	//Add these items to the table, after the last items using .after()
	$("#trainTable tr:last").after("<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().trainDestination + "</td><td>" + childSnapshot.val().trainFrequency + "</td><td>" + childSnapshot.val().nextArrival + "</td><td>" + childSnapshot.val().minutesAway + "</td></tr>");

	//Function to handle any errors that may occur
},function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
});

