'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// Using the Geolocation API
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
    function(position) {
        const {latitude} = position.coords;
        const {longitude} = position.coords;
        console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

        // Displaying a Map Using Leaflet Library
        const coords = [latitude, longitude];

        const map = L.map('map').setView(coords, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Displaying a Map Marker
        map.on("click", function(mapEvent) {
            console.log(mapEvent);
            const { lat, lng } = mapEvent.latlng;

            L.marker([lat, lng]) 
            .addTo(map)
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoclose: false,
                closeOnClick: false,
                className: "running-popup",
            }))
            .setPopupContent(`Workout`)
            .openPopup();
        });
    }, 
    function() {
        alert(`Sorry! Could not get your location`);
    });
}


// Rendering Workout Input Form

// Project Architecture

// Refractoring for Project Architecture