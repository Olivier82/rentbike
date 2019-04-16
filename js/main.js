import Slider from './slider';
import VeloMap from './map';

window.initMap = () => {
    VeloMap.init();
}

window.addEventListener('load', () => {
    Slider.init();
});
