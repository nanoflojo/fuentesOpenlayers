// Estilo del vector drag and drop
var defaultStyle = {
    'Point': new ol.style.Style({
        image: new ol.style.Icon({ src: 'https://raw.githubusercontent.com/nanoflojo/MaparutasMTB/master//Red_flag_OK_24.png' })
    }),
    'MultiLineString': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#FF8B01',
            width: 3
        })
    }),
};

var styleFunction = function (feature, resolution) {
    var featureStyleFunction = feature.getStyleFunction();
    if (featureStyleFunction) {
        return featureStyleFunction.call(feature, resolution);
    } else {
        return defaultStyle[feature.getGeometry().getType()];
    }
};


// Importar las clases necesarias para Drag and Drop
const VectorSource = ol.source.Vector;
const VectorImageLayer = ol.layer.VectorImage;

const dragAndDropInteraction = new ol.interaction.DragAndDrop({
    sourceProjections: ['EPSG:4326', 'EPSG:3857'],
    formatConstructors: [
        ol.format.GeoJSON,
        ol.format.GML3,
        ol.format.KML,
        ol.format.WFS,
        ol.format.WKT,
        ol.format.GPX,
        ol.format.OSMXML,
    ],
});

// Agregar la interacción Drag an drop al mapa
map.addInteraction(dragAndDropInteraction);

// Construcción y funciones de Drag and drop
dragAndDropInteraction.on('addfeatures', function (event) {
    const vectorSource = new VectorSource({
        features: event.features,
    });
    map.addLayer(
        new VectorImageLayer({
            source: vectorSource,
            style: styleFunction
        }),
    );
    map.getView().fit(vectorSource.getExtent());
});

// Consolidar la lógica de mostrar información de características en un único listener
const displayFeatureInfo = (pixel) => {
    const features = [];
    map.forEachFeatureAtPixel(pixel, (feature) => {
        features.push(feature);
    });

    const info = features.map((feature) => feature.get('name')).filter(Boolean).join(', ');
    document.getElementById('info').innerHTML = info || '&nbsp;';
};

map.on('pointermove', (evt) => {
    if (evt.dragging) return;
    displayFeatureInfo(evt.pixel);
    const hit = map.hasFeatureAtPixel(evt.pixel);
    document.getElementById('map').style.cursor = hit ? 'pointer' : '';
});

map.on('click', (evt) => {
    const feature = map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {
        const features = feature.get('features');
        return features ? features[0] : feature;
    });

    if (feature) {
        const geometry = feature.getGeometry();
        const coord = geometry.getCoordinates();
        const content = feature.get("name");
        document.getElementById("popup-content").innerHTML = content;
        overlay.setPosition(coord);
        console.info(feature.getProperties());
    }
});