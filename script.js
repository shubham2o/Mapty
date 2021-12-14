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


// Managing Workout Data : Creating Classes
class Workout {
    date = new Date();
    id = (Date.now() + "").slice(-10);

    constructor (coords, distance, duration) {
        // this.date = ... 
        // this.id = ...
        this.coords = coords;       // [lat, lng]
        this.distance = distance;   // in km
        this.distance = duration;   // in min
    }
}


class Running extends Workout {
    constructor (coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
    }

    calcPace() {
        // min/km
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}


class Cycling extends Workout {
    constructor (coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
    }

    calcSpeed() {
        // km/hr
        this.speed = this.distance / (this.duration / 60)
        return this.speed;
    }
}


const run1 = new Running([39, -12], 5.2, 24, 178)
const cycling1 = new Cycling([39, -12], 27, 95, 523);


// APPLICATION ARCHITECTURE
class App {
    #map;
    #mapEvent;

    constructor() {
        this._getPosition()
        form.addEventListener("submit", this._newWorkout.bind(this));
        inputType.addEventListener("change", this._toggleElevationField);
    }

    _getPosition() {
        // Using the Geolocation API
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function() {
                alert(`Sorry! Could not get your location`);
            });
        }
    }

    _loadMap(position) {
        const {latitude} = position.coords;
        const {longitude} = position.coords;
        console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
        
        // Displaying a Map Using Leaflet Library
        const coords = [latitude, longitude];
        
        this.#map = L.map('map').setView(coords, 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.#map);
        
        // Rendering Workout Input Form - Handling clicks on map
        this.#map.on("click", this._showForm.bind(this));
    }

    _showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove("hidden");
        inputDistance.focus();
    }

    _toggleElevationField() {
        inputElevation
            .closest(".form__row")
            .classList.toggle("form__row--hidden");
        inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
    }

    _newWorkout(e) {
        e.preventDefault();
    }
}


const app = new App();
app._getPosition();


form.addEventListener("submit", function(e) {
    e.preventDefault();

    // Clear input fields
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = " ";

    // Displaying a Map Marker
    const { lat, lng } = this.#mapEvent.latlng;
    L
        .marker([lat, lng])
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


inputType.addEventListener("change", function() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
})

// Project Architecture

// Refractoring for Project Architecture