// layers
import VectorLayer from 'ol/layer/Vector';
import TileLayer from 'ol/layer/Tile';

// sources
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';

// formats
import GeoJSON from 'ol/format/GeoJSON';

// Swagger
import Swagger from 'swagger-client';
import taskmgr_api_spec from './taskmgr_spec_wicked_slim';

var layers = {
    osm: new TileLayer({
        source: new OSM()
    }),
    swazi_bounds: new VectorLayer({
        source: new VectorSource({
            url: '/assets/data/adm0_eSwatini.geojson',
            format: new GeoJSON()
        })
    })
};

module.exports = layers;
