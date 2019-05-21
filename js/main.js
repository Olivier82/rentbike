import Slider from './slider';
import VeloMap from './map';
import Canvas from './canvas';

window.initMap = () => {
    VeloMap.init();
}

window.addEventListener('load', () => {
    Slider.init();
    // Initialisation du Canvas
    const canvas = new Canvas();
    // Récupération des informations SessionStorage
    const stationName = sessionStorage.getItem('stationName');

});
