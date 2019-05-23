import Slider from './slider';
import VeloMap from './map';

window.initMap = () => {
    VeloMap.init();
}

window.addEventListener('load', () => {
    Slider.init();
    //Récupération des valeurs de localstorage
    VeloMap.loadValues();
});
