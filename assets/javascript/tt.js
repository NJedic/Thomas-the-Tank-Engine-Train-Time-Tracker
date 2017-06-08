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
		console.log(trainName);
		console.log(trainDestination);
		console.log(trainFrequency);
		
	//Push the new data to Firebase
	database.ref().push({
		trainName: trainName,
		trainDestination: trainDestination,
		trainFrequency: trainFrequency
	});

});