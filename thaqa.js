const button = document.querySelector("button");

button.addEventListener("click", () =>{
if(navigator.geolocation){   // if the browser supports the geolocation api
    //geolocation.getCurrentPosition method is used to get the device's current location
    //It takes 3 parameters (success, error, options), if everything succeeds the SUCCESS function will be called
    //Callback function will call else error
    button.innerText= "Allow location detection";
    
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    
}else{
    button.innerText = "Geolocation is not supported by this browser.";
}

});
function onSuccess(position){
    button.innerText = "Tracking your location...";
    let {latitude, longitude} = position.coords;
    console.log(latitude, longitude);
    // Fetch geolocation data (like city, country, etc.) from OpenCage API using the provided latitude, longitude, and API key
fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=0be62d2d48e94776b43b87111104c0b2`)// free API key
.then(response => response.json()).then(result => {
    let allDetails = result.results[0].components;
    let {country, postcode, city} = allDetails;
    button.innerText = `You are in ${city}, ${country}, ${postcode}.`;
});


}
function onError(error){
    if(error.code == 1){ // if user denies the request
        button.innerText = "You've denied the request for your location.";
    }else if(error.code == 2){ // if the location information is unavailable
        button.innerText = "Location information is unavailable.";
    }else{ //if any other error occurs
        button.innerText = "An unknown error occurred.";
    }

    button.setAttribute("disabled", true); //if user denies the request button will be disabled
}