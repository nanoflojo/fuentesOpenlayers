        //Visualización PNOA wms
        const projection_PNOA = ol.proj.get('EPSG:4326');
        const projectionExtent_PNOA = projection_PNOA.getExtent();
        const size_PNOA = ol.extent.getWidth(projectionExtent_PNOA) / 512;

        const resolutions_PNOA = Array.from({ length: 18 }, (_, z) => size_PNOA / Math.pow(2, z));
        const matrixIds_PNOA = Array.from({ length: 18 }, (_, z) => `EPSG:4326:${z}`);


        //constructor para el control de ubicación
        class PosicionActual extends ol.control.Control {
            constructor() {

                const boton = document.createElement('button');
                boton.innerHTML = 'L';

                const contenedor = document.createElement('div');
                contenedor.className = 'posicion-actual ol-control';
                contenedor.appendChild(boton);
                super({
                    element: contenedor,
                })

                boton.addEventListener('click', this.ubicar.bind(this));
            }
            ubicar() {
                geolocation.setTracking(true);
            }
        }

        // Creación del mapa, la vista, las capas, añadiendo el cluster Geojson de las fuentes y el control de ubicación
        var map = new ol.Map({
            layers: [
                new ol.layer.Group({
                    title: 'Otros mapas',
                    visible: true,
                    layers: [
                        new ol.layer.Tile({
                            title: 'Esri Topo',
                            opacity: 1.000000,
                            type: 'base',
                            visible: false,
                            source: new ol.source.XYZ({
                                attributions: '<a target="_blank" href="https://openlayers.org/">OpenLayers</a> Tiles © <a target="_blank" href="https://services.arcgisonline.com/ArcGIS/' +
                                    'rest/services/World_Topo_Map/MapServer">ArcGIS</a> Powered by <a target="_blank" href="https://www.esri.com/es-es/home/">ESRI</a>',
                                url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
                            })
                        }),
                        new ol.layer.Tile({
                            title: 'Esri Streets',
                            opacity: 1.000000,
                            type: 'base',
                            visible: false,
                            source: new ol.source.XYZ({
                                attributions: '<a target="_blank" href="https://openlayers.org/">OpenLayers</a> Tiles © <a target="_blank" href="https://www.esri.com/es-es/arcgis/products/arcgis-online/overview">ArcGIS</a> Powered by <a target="_blank" href="https://www.esri.com/es-es/home/">ESRI</a>',
                                url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
                                    'World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
                            })
                        }),
                        new ol.layer.Tile({
                            'title': 'OpenTopoMap',
                            'type': 'base',
                            'visible': 'false',
                            'opacity': 1.000000,
                            source: new ol.source.XYZ({
                                attributions: [
                                    '<a target="_blank" href="https://openlayers.org/">OpenLayers</a>  ©  <a target="_blank" href="https://opentopomap.org/#map=5/49.000/10.000">OpenTopoMap</a> CC-BY-SA',
                                    ol.source.OSM.ATTRIBUTION
                                ],
                                url: 'http://c.tile.opentopomap.org/{z}/{x}/{y}.png'
                            })
                        }),
                        new ol.layer.Tile({
                            title: 'Mapa transporte público',
                            type: 'base',
                            visible: false,
                            source: new ol.source.XYZ({
                                attributions: [
                                    'CC-BY-SA © <a target="_blank" href="https://memomaps.de/en/homepage/">MeMoMaps</a>',
                                    ol.source.OSM.ATTRIBUTION
                                ],
                                url: 'http://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png'
                            })
                        }),
                        new ol.layer.Group({
                            title: 'Callejero IGN',
                            type: 'base',
                            combine: true,
                            visible: false,
                            layers: [
                                new ol.layer.Tile({
                                    source: new ol.source.TileWMS(({
                                        preload: 4,
                                        url: "http://www.ign.es/wms-inspire/mapa-raster",
                                        attributions: '<a target="_blank" href="https://openlayers.org/">OpenLayers</a> Teselas cartográficas cedidas por © <a target="_blank" href="https://www.ign.es/web/ign/portal">Instituto Geográfico Nacional de España</a>',
                                        params: {
                                            "LAYERS": "Fondo",
                                            "TILED": "true",
                                            "VERSION": "1.3.0"
                                        },
                                    })),
                                    opacity: 1.000000,
                                }),
                                new ol.layer.Tile({
                                    source: new ol.source.TileWMS(({
                                        url: "http://www.ign.es/wms-inspire/ign-base",
                                        attributions: '<a target="_blank" href="https://openlayers.org/">OpenLayers</a> - CC BY 4.0 <a href="http://www.scne.es/">SCNE</a>',
                                        params: {
                                            "LAYERS": "IGNBaseTodo-nofondo",
                                            "TILED": "true",
                                            "VERSION": "1.0.0"
                                        },
                                    })),
                                    opacity: 1.000000,
                                }),
                            ]
                        }),
                        new ol.layer.Tile({
                            title: 'OpenCycleMap',
                            type: 'base',
                            visible: false,
                            source: new ol.source.XYZ({
                                attributions: [
                                    '<a target="_blank" href="https://openlayers.org/">OpenLayers</a> © <a target="_blank" href="https://www.opencyclemap.org/">OpenCycleMap</a>',
                                    ol.source.OSM.ATTRIBUTION
                                ],
                                url: 'https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png' +
                                    '?apikey=081ff7d83c0549c7a758fdd4df478f0f'
                            })
                        }),
                        new ol.layer.Group({
                            title: 'Mapa Raster del IGN',
                            type: 'base',
                            combine: true,
                            visible: false,
                            layers: [
                                new ol.layer.Tile({
                                    source: new ol.source.TileWMS(({
                                        preload: 4,
                                        url: "http://www.ign.es/wms-inspire/mapa-raster",
                                        attributions: '<a target="_blank" href="https://openlayers.org/">OpenLayers</a> Teselas cartográficas cedidas por © <a target="_blank" href="https://www.ign.es/web/ign/portal">Instituto Geográfico Nacional de España</a>',
                                        params: {
                                            "LAYERS": "Fondo",
                                            "TILED": "true",
                                            "VERSION": "1.3.0"
                                        },
                                    })),
                                    opacity: 1.000000,
                                }),
                                new ol.layer.Tile({
                                    source: new ol.source.TileWMS(({
                                        preload: 4,
                                        url: "http://www.ign.es/wms-inspire/mapa-raster",
                                        attributions: '<a target="_blank" href="https://openlayers.org/">OpenLayers</a> Teselas cartográficas cedidas por © <a target="_blank" href="https://www.ign.es/web/ign/portal">Instituto Geográfico Nacional de España</a>',
                                        params: {
                                            "LAYERS": "mtn_rasterizado",
                                            "TILED": "true",
                                            "VERSION": "1.3.0"
                                        },
                                    })),
                                    opacity: 1.000000,
                                }),

                            ]
                        }),
                        new ol.layer.Tile({
                            title: "OpenStreetMap",
                            opacity: 1.000000,
                            type: 'base',
                            visible: false,
                            source: new ol.source.XYZ({
                                attributions: [
                                    '<a target="_blank" href="https://openlayers.org/">OpenLayers</a>',
                                    ol.source.OSM.ATTRIBUTION,
                                ],
                                url: "http://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
                            }),
                        }),
                    ]
                }),
                new ol.layer.Group({
                    title: 'Mapa Base',
                    visible: true,
                    layers: [
                        new ol.layer.Tile({
                            source: new ol.source.WMTS(({
                                url: "http://www.ign.es/wmts/pnoa-ma",
                                attributions: '<a target="_blank" href="https://openlayers.org/">OpenLayers</a> Teselas de PNOA cedidas por © <a target="_blank" href="https://www.ign.es/web/ign/portal">Instituto Geográfico Nacional de España</a>',
                                "layer": "OI.OrthoimageCoverage",
                                "TILED": "true",
                                matrixSet: 'EPSG:4326',
                                format: 'image/jpeg',
                                projection: projection_PNOA,
                                tileGrid: new ol.tilegrid.WMTS({
                                    origin: ol.extent.getTopLeft(projectionExtent_PNOA),
                                    resolutions: resolutions_PNOA,
                                    matrixIds: matrixIds_PNOA
                                }),
                                style: 'default',
                                wrapX: true,
                                "VERSION": "1.0.0",
                            })),
                            title: "Satélite PNOA limpio",
                            type: 'base',
                            visible: true,
                            opacity: 1.0,
                        }),
                        new ol.layer.Group({
                            title: 'Satelite y callejero',
                            type: 'base',
                            combine: true,
                            visible: true,
                            layers: [
                                new ol.layer.Tile({
                                    source: new ol.source.WMTS(({
                                        url: "http://www.ign.es/wmts/pnoa-ma",
                                        attributions: '<a target="_blank" href="https://openlayers.org/">OpenLayers</a> Teselas de PNOA cedidas por © <a target="_blank" href="https://www.ign.es/web/ign/portal">Instituto Geográfico Nacional de España</a>',
                                        "layer": "OI.OrthoimageCoverage",
                                        matrixSet: 'EPSG:4326',
                                        format: 'image/jpeg',
                                        projection: projection_PNOA,
                                        tileGrid: new ol.tilegrid.WMTS({
                                            origin: ol.extent.getTopLeft(projectionExtent_PNOA),
                                            resolutions: resolutions_PNOA,
                                            matrixIds: matrixIds_PNOA
                                        }),
                                        style: 'default',
                                        wrapX: true,
                                        "VERSION": "1.0.0",
                                    })),
                                    opacity: 1.0,
                                }),
                                new ol.layer.Tile({
                                    source: new ol.source.TileWMS(({
                                        url: "http://www.ign.es/wms-inspire/ign-base",
                                        attributions: ' - CC BY 4.0 <a href="http://www.scne.es/">SCNE</a>',
                                        params: {
                                            "LAYERS": "IGNBaseOrto",
                                            "TILED": "true",
                                            "VERSION": "1.3.0"
                                        },
                                    })),
                                    opacity: 1.000000,
                                })
                            ]
                        })
                    ]
                }),
                clusterLayer
            ],
            target: 'map',
            view: new ol.View({
                center: ol.proj.fromLonLat([-3.8858333333333333, 39.7]),
                zoom: 6.8,
            })
        });

        // Elemento para mostrar mensajes de error o feedback
        const feedbackElement = document.createElement('div');
        feedbackElement.id = 'geolocation-feedback';
        feedbackElement.style.position = 'absolute';
        feedbackElement.style.bottom = '10px';
        feedbackElement.style.left = '10px';
        feedbackElement.style.padding = '10px';
        feedbackElement.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        feedbackElement.style.border = '1px solid #ccc';
        feedbackElement.style.borderRadius = '5px';
        feedbackElement.style.fontSize = '14px';
        feedbackElement.style.display = 'none';
        document.body.appendChild(feedbackElement);

        const showFeedback = (message, isError = false) => {
            feedbackElement.style.color = isError ? 'red' : 'green';
            feedbackElement.innerHTML = message;
            feedbackElement.style.display = 'block';
            setTimeout(() => {
                feedbackElement.style.display = 'none';
            }, 5000);
        };

        // carga el control de geolocalización
        map.addControl(new PosicionActual());

        // Estilo de la geolocalización
        const posicionFeature = new ol.Feature();
        posicionFeature.setStyle(
            new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 5,
                    fill: new ol.style.Fill({
                        color: '#fff',
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#ff0000',
                        width: 2
                    })
                })
            })
        );
        // Costrucción de la Geolocalización
        const exactitudFeature = new ol.Feature();

        const vectorLayerPosicion = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [posicionFeature, exactitudFeature]
            })
        });
        map.addLayer(vectorLayerPosicion);

        // Configuración de la geolocalización
        const geolocation = new ol.Geolocation({
            projection: map.getView().getProjection()
        });

        geolocation.on('change', function () {
            console.log(geolocation.getPosition());
            showFeedback('Geolocalización exitosa. Centrándose en su ubicación.');
            zoomFeature();
            geolocation.setTracking(false);
        });

        geolocation.on('error', function (evt) {
            console.error(evt.message);
            showFeedback(`Error en la geolocalización: ${evt.message}`, true);
        });

        geolocation.on('change:accuracyGeometry', function () {
            exactitudFeature.setGeometry(geolocation.getAccuracyGeometry());
        });

        geolocation.on('change:position', function () {
            const coordenadas = geolocation.getPosition();
            posicionFeature.setGeometry(new ol.geom.Point(coordenadas));
            map.getView().setCenter(coordenadas);
            map.setView(new ol.View({
                center: coordenadas,
                zoom: 13
            }));
        });

        // Función para mostrar las coordenadas al mover el ratón
        map.on('pointermove', (e) => {
            const pixel = map.getEventPixel(e.originalEvent);
            const hit = map.hasFeatureAtPixel(pixel);
            document.getElementById('map').style.cursor = hit ? 'pointer' : '';
        });


        // Se añade los controles que faltan
        var fullscreen = new ol.control.FullScreen();
        map.addControl(fullscreen);

        var scaleLine = new ol.control.ScaleLine({ units: 'metric' });
        map.addControl(scaleLine);

        var zoomslider = new ol.control.ZoomSlider();
        map.addControl(zoomslider);

        var mouse_position = new ol.control.MousePosition({
            coordinateFormat: ol.coordinate.createStringXY(4),
            projection: 'EPSG:4326'
        });
        map.addControl(mouse_position);

        var layerSwitcher = new ol.control.LayerSwitcher({
        });
        map.addControl(layerSwitcher);