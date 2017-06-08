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
	trainFrequency = $("#trainFrequency").val().trim();
		// console.log(trainName);
		// console.log(trainDestination);
		// console.log(trainFrequency);
	//This is where the minutes.js thing that you don't understand yet comes into play
	//User input gets converted!!!!!!!!!

	//Push the new data to Firebase
	database.ref().push({
		trainName: trainName,
		trainDestination: trainDestination,
		trainFrequency: trainFrequency
	});

	//Clear the input fields
	$("#trainName").val("");
	$("#trainDestination").val("");
	// $("#trainTime").val("");
	$("#trainFrequency").val("");
});

//On a value change in Firebase, that value will be pushed into the table
database.ref().on("child_added", function (childSnapshot){
	console.log(childSnapshot.val().trainName);
	console.log(childSnapshot.val().trainDestination);
	console.log(childSnapshot.val().trainFrequency);


	//Add these items to the table, after the last items using .after()
	$("#trainTable tr:last").after("<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().trainDestination + "</td><td>" + childSnapshot.val().trainFrequency + "</td></tr>");

	//Function to handle any errors that may occur
},function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
});

