
// layers
import VectorLayer from 'ol/layer/Vector';
import TileLayer from 'ol/layer/Tile';
import Image from 'ol/layer/Image';

// sources
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/OSM';

// formats
import GeoJSON from 'ol/format/GeoJSON';

// style
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';


// Layers
var adm0 = new VectorSource({
    url: '/mapSwazi/assets/data/adm0_eSwatini.geojson',
    format: new GeoJSON()
});

var lyrs = {
    hotosm: new TileLayer({
        source: new XYZ({
            url: "https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        })
    }),
    bounds_clip: new VectorLayer({
        source: adm0,
        renderMode: 'image',
        style: new Style({
            fill: new Fill({
                color: 'white'
            })
        })
    }),
    swazi_bounds: new VectorLayer({
        source: adm0
    })
};


// https://gis.stackexchange.com/questions/185881/clipping-tilelayer-with-georeferenced-polygon-clipping-mask/239136
lyrs['bounds_clip'].on('precompose', function(e) {
    e.context.globalCompositeOperation = 'destination-in';
});

lyrs['bounds_clip'].on('postcompose', function(e) {
    e.context.globalCompositeOperation = 'source-over';
});

export default lyrs;
