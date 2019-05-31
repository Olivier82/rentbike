import Slider from './slider';
import VeloMap from './map';
import Countdown from './countdown';

window.initMap = () => {
    VeloMap.init();
}

window.addEventListener('load', () => {
    Slider.init();
    //Récupération des valeurs du storage
    VeloMap.loadValues();
    Countdown.loadValues();
});
