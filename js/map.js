import axios from 'axios';
import Countdown from './countdown';
import Canvas from './canvas';

const VeloMap = {
  veloApi: 'https://api.jcdecaux.com/vls/v1/stations?contract=Marseille&apiKey=33c5267bc2c91d31e6bab65c8ac5859ebc6fcfcb',
  map: null,
  marker: null,
  stationName: undefined,
  stationAdress: undefined,
  bikeStands: undefined,
  availableBikes: undefined,
  name: undefined,
  firstName: undefined,
  reserveButton : undefined,
  sessionStation: undefined,
  infoReserve: undefined,
  errorReserveElt: undefined,

  // Initialisation de la carte
  init: function () {
    this.stationName = document.getElementById('name_station');
    this.stationAdress = document.getElementById('adress_station');
    this.bikeStands = document.getElementById('bike_stands');
    this.availableBikes = document.getElementById('available_bikes');
    this.reserveButton = document.getElementById('reserveButton');
    this.name = document.getElementById('name');
    this.firstName = document.getElementById('firstName');
    this.reserveSection = document.getElementById('timer');
    this.infoReserve = document.getElementById('inforeserve');
    this.errorReserveElt = document.getElementById('error-reserve');

    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 43.274352269730755,
        lng: 5.390405906592448,
      },
      zoom: 13,
      scrollwheel: false
    });

    // Réservation des vélos
    this.reserveButton.addEventListener('click', () => {
      if (this.stationName.textContent === 'Aucun élément') {
        this.errorReserveElt.textContent = 'Veuillez sélectionner une station';
        return;
      } else if (this.availableBikes.textContent === '0 vélo(s) disponible(s)') {
        this.errorReserveElt.textContent = 'Aucun vélo de disponible. Veuillez choisir une autre station.';
        return;
      }

      // Sauvegarde les informations noms prénoms dans LocalStorage
      localStorage.setItem('name', this.name.value);
      localStorage.setItem('firstName', this.firstName.value);

      // Sauvegarde des informations de location dans SessionStorage
      sessionStorage.setItem('station', this.stationName.textContent);
      sessionStorage.setItem('name', this.name.value);
      sessionStorage.setItem('firstName', this.firstName.value);

      // Affichage de la partie Réservation
      this.reserveSection.style.display = 'block';

      // Affichage des informations de location
      this.infoReserve.textContent = `Vélo reservé à la station ${sessionStorage.getItem('station')} par ${sessionStorage.getItem('name')} ${sessionStorage.getItem('firstName')}`;

      // Démarage du compte à rebours
      Countdown.init();
    });

    this.markerVelo();
  },

  // Marker des stations de vélos
  markerVelo: function () {
    //Récupération des informations
    axios.get(this.veloApi)
      .then(({ data }) => {
        const stations = data;

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
            this.bikeStands.innerHTML = ` ${e.bike_stands} places`;
            this.availableBikes.innerHTML = `${e.available_bikes} vélo(s) disponible(s) `;
          });
        });

        setTimeout(() => new Canvas(), 2000);
      });
  },
  // Afficher les valeurs du stockage
  loadValues: function() {
    if (sessionStorage.getItem('station')) {
      this.infoReserve.textContent = `Vélo reservé à la station ${sessionStorage.getItem('station')} par ${sessionStorage.getItem('name')} ${sessionStorage.getItem('firstName')}`;
      this.reserveSection.style.display = 'block';
    }

    // Afficher les informations du localStorage
    this.name.value = localStorage.getItem('name');
    this.firstName.value = localStorage.getItem('firstName');
  },
};

export default VeloMap;
