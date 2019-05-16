import axios from 'axios';
import Canvas from './canvas';
import Countdown from './countdown';


const VeloMap = {
  veloApi: 'https://api.jcdecaux.com/vls/v1/stations?contract=Marseille&apiKey=33c5267bc2c91d31e6bab65c8ac5859ebc6fcfcb',
  map: null,
  marker: null,
  stationName: undefined,
  stationAdress: undefined,
  stationStatus: undefined,
  bikeStands: undefined,
  avaiblesBikes: undefined,
  canvas: undefined,
  name: undefined,
  firstName: undefined,
  reserveButton : undefined,
  sessionStation: undefined,
  infoReserve: undefined,

  // Initialisation de la carte
  init: function () {
    this.stationName = document.getElementById('name_station');
    this.stationAdress = document.getElementById('adress_station');
    this.stationStatus = document.getElementById('status_station');
    this.bikeStands = document.getElementById('bike_stands');
    this.avaiblesBikes = document.getElementById('avaibles_bikes');
    this.reserveButton = document.querySelector('#reserveButton');
    this.name = document.getElementById('name');
    this.firstName = document.getElementById('firstName');
    this.reserveSection = document.querySelector('#timer');
    this.infoReserve = document.getElementById('inforeserve');

    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 43.274352269730755,
        lng: 5.390405906592448,
      },
      zoom: 14,
      minZoom: 12,
      scrollwheel: false
    });

    // Affichage du Canvas
    this.canvas = new Canvas();

    this.markerVelo();

  },

  // Marker des stations de vélos
  markerVelo: function () {
    //Récupération des informations
    axios.get(this.veloApi)
      .then(reponse => {
        const stations = reponse.data;
        stations.forEach(e => {
          //Affichage des stations
          this.marker = new google.maps.Marker ({
            position: {lat: e.position.lat, lng: e.position.lng},
            map: this.map,
            icon: 'img/marker/cyclesmarker.png'
          });

          // Affichage des informations
          this.marker.addListener('click', () => {
            this.stationName.innerHTML = e.name;
            this.stationAdress.innerHTML = e.address;
            this.stationStatus.innerHTML = e.status;
            this.bikeStands.innerHTML = e.bike_stands + ' places';
            this.avaiblesBikes.innerHTML = e.available_bikes + ' vélo(s) disponible(s)';
          });
        });
      });

        // Réservation des vélos
        VeloMap.reserveButton.addEventListener('click', function () {

        // Sauvegarde les informations noms prénoms dans LocalStorage
          localStorage.setItem('name', VeloMap.name.value);
          localStorage.setItem('firstName', VeloMap.firstName.value);

        // Sauvegarde des informations de location dans SessionStorage
          sessionStorage.setItem('station', VeloMap.stationName.value);

        //Récupération des informations noms prénoms
          VeloMap.name = localStorage.getItem(VeloMap.name);
          VeloMap.firstName = localStorage.getItem(VeloMap.firstName);

        // Affichage des informations de location
          VeloMap.sessionStation = sessionStorage.getItem('station');
          VeloMap.infoReserve.textContent = "Vélo reservé à la station " + sessionStorage.station + " par " +  localStorage.name +  "  " + localStorage.firstName;

        // Démarage du compte à rebours
          Countdown.init();

    });

  },

};

export default VeloMap;
