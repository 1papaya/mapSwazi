// layers
import VectorLayer from 'ol/layer/Vector';
import TileLayer from 'ol/layer/Tile';

// sources
import taskMgrSource from './ol_source_taskMgr';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';

// formats
import GeoJSON from 'ol/format/GeoJSON';


var layers = {
    osm: new TileLayer({
        source: new OSM()
    }),
    swazi_bounds: new VectorLayer({
        source: new VectorSource({
            url: '/assets/data/adm0_eSwatini.geojson',
            format: new GeoJSON()
        })
    }),
    taskMgr: new VectorLayer({
        source: new taskMgrSource({})
    })
};

module.exports = layers;
