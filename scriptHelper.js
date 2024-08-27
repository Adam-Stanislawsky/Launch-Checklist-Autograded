// Write your helper functions here!

require('cross-fetch/polyfill');                 

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    /*
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: </li>
                     <li>Diameter: </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: </li>
                     <li>Number of Moons: </li>
                 </ol>
                 <img src="">
    */
   
    document.getElementById("missionTarget").innerHTML = 
        `<h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name}</li>
                     <li>Diameter: ${diameter}</li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance}</li>
                     <li>Number of Moons: ${moons}</li>
                 </ol>
                 <img src="${imageUrl}">
        `
    

 }
 

 //VALIDATE INPUT FUNCTION
 function validateInput(testInput) {

    if (testInput === "" || testInput === null){
        return "Empty"
    }else if(isNaN(Number(testInput))){
        return "Not a Number"
    }else {
        return "Is a Number"
    };

 }
 
 //FORMSUBMISSION FUNCTION
 function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");

    let launchStatus = document.getElementById("launchStatus");
    

    
    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || 
        validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert("All fields are required!");
        return;
        }
    
    if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number") {
        alert("Names should be strings!");
        return;
    }
    
    if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
        alert("Fuel Level and Cargo Mass should be numbers!");
        return;
    }

    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    
    
    list.style.visibility = "visible";

    if (Number(fuelLevel) < 10000) {
        fuelStatus.innerHTML = "Fuel level too low for launch";
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";
        launchStatus.style.color = "red";
    } else {
        fuelStatus.innerHTML = "Fuel level high enough for launch";
    }

    if (Number(cargoLevel) > 10000) {
        cargoStatus.innerHTML = "Cargo mass too heavy for launch";
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";
        launchStatus.style.color = "red";
    } else {
        cargoStatus.innerHTML = "Cargo mass low enough for launch";
    }

    if (Number(fuelLevel) >= 10000 && Number(cargoLevel) <= 10000) {
        launchStatus.innerHTML = "Shuttle is Ready for Launch";
        launchStatus.style.color = "green";
    }


 }
 
 async function myFetch() {
     let planetsReturned;
 
     planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
        return response.json();     
    });
 
     return planetsReturned;
 }
 
 function pickPlanet(planets) {
    let planetIndex = Math.floor(Math.random() * planets.length);
    return planets[planetIndex];
 }
 
 module.exports.addDestinationInfo = addDestinationInfo;
 module.exports.validateInput = validateInput;
 module.exports.formSubmission = formSubmission;
 module.exports.pickPlanet = pickPlanet; 
 module.exports.myFetch = myFetch;