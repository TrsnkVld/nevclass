<template>
<section class="mapSection" :class="{expanded: toggle}" v-view.once="setMapVisible"> <!--  -->
    <!-- :class="{opened: itemClick}" -->
    <h2 ref="title" data-aos="fade-down" v-if="mapId=='map'" class="sectionTitle">Экскурсии на теплоходе</h2>

	 <!-- :style="($store.state.isMapLoading) ? `width: ${loadingMapSize}px` : null" -->
	<div class="previewMap" v-if="!$store.state.isMapLoading" :data-aos="mapId=='mapExcursion' ? 'bg-main': 'none'" @mouseenter="onMouseenter">
		<div class="previewMap__img" :style="`background-image: url('${previewMap}')`" />
		<!-- <div class="previewMap__loader" :class="{'visible': $store.state.isMapLoading}" /> -->
	</div>

	<mapbox v-if="$store.state.isMapLoading" class="mapboxgl-map" @click.native="onClick()" :class="{'hidden': toggle, touch: touchState, 'mapboxgl-map-loading': !$store.state.isMapLoaded}" access-token="pk.eyJ1IjoidmxhZHNtYWNrIiwiYSI6ImNrNDhtczJtOTA0MnozbWtma2ltNW1xemkifQ.Pg4Rgu94kIdHpusJVsk1yQ"
		:map-options="{
			container: mapId,
			style: 'mapbox://styles/vladsmack/ck48mzato437u1cmr409bx5k8/draft?optimize=true',
			center: mapCentered,
			offset: [2300, 0],
			maxZoom: 16,
			zoom: mapZoom,
			dragRotate: false,
			doubleClickZoom: true,
			scrollZoom: true,
		}" 
		@map-load="onLoad"
		@map-resize="onResizeTest"
		@map-click="onMapClick($event)"
		@map-wheel="onWheel"
		@map-contextmenu="onContextClick"
		
	>
    </mapbox>
    <el-container direction="vertical">
        <excursion-single v-if="mapId=='mapExcursion'" :data="mapData[0]" />
        <excursions v-if="mapId=='map'" :mapData="mapData" @cardClick="toggleDetails" @cardHover="onCardHover" :cardIndex="cardIndex" :cardHovered="cardHovered" />
        <contacts-block v-if="mapId=='mapContacts'" data-aos="fade-down" data-aos-delay="400" />
    </el-container>
</section>
</template>

<script>
import Mapbox from 'mapbox-gl-vue';
import mapboxgl from 'mapbox-gl';
import excursions from './excursions';
import excursionSingle from '../elements/excursion-single';
import contactsBlock from '../elements/contacts-block';
import {debounce} from "debounce";

export default {
    name: 'map-section',
    components: {
        Mapbox,
        excursions,
        contactsBlock,
        excursionSingle
    },
    props: {
        mapId: {
            type: String,
            default: "map",
        },
        mapCenter: {
            type: Array,
            default: function () {
                return [30.332272, 59.927722]
            },
        },
        mapZoom: {
            type: Number,
            default: 10.2
        },
        mapData: {
            type: Array,
            default: function () {
                return [{
                    coords: [30.325049, 59.924988],
                    pathCoords: []
                }]
            },
        },
        lines: {
            type: String,
            default: 'none',
        }
    },
    data() {
        return {
			grad: true,
            pointsCoords: [],
            mapCentered: this.mapCenter,
            currentMarkers: [],
            toggle: false,
            cardOpened: false,
            cardHovered: false,
            cardIndex: false,
            touchState: true,
            dragPan: false,
            routing: false,
            timeout: false,
            isMapDoubleRightClicked: false,
            timeout: 0,
            delta: 600,
			rtime: new Date(),
			currentMap: null,
			previewMap: require('../../assets/img/map_preview.png'),
			resizeMap: null,
            cardsHeight: 0,
            hideMenuIconTimeout: null,
        }
    },
	computed: {
		loadingMapSize() {
			return document.documentElement.clientWidth - document.querySelector('#mapExcursion').offsetWidth;
        },
        
	},
    created() {
        window.addEventListener("resize", this.onResize);
		// if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || document.documentElement.clientWidth < 1200) {
		// 	this.$store.state.isMapLoading = true;
		// } else {
		// 	return false
		// }
    },
    destroyed() {
        window.removeEventListener("resize", this.onResize);
    },
    mounted() {
        // console.warn(this.mapData);

		if (sessionStorage.test) {
			this.touchState = JSON.parse(sessionStorage.test);
		}
    },
    methods: {
        setMapVisible(e) {
          this.$store.state.isMapLoading = true;
        },

		onContextClick(map, e, handler) {
            /*
            e.preventDefault(); 
            
            return function(e) {
                if( this.clicked ) {
                    clearTimeout(this.timeout);
                    this.clicked = false;
                    return handler.apply( this, arguments );
                    console.log('X');
                }
                else {
                    this.clicked = true;
                    console.log('X');
                    this.timeout = setTimeout( function() {
                        this.clicked = false;
                    }, 300 );
                }
            }
            */
            /*
            let timeout = 0, clicked = false;

                e.preventDefault();

                if( clicked ) {
                    clearTimeout(timeout);
                    clicked = false;
                    return handler.apply( this, arguments );
                    console.log("true");
                }
                else {
                    console.log("false");
                    clicked = true;
                    timeout = setTimeout( function() {
                        clicked = false;
                    }, 300 );
                }
            setTimeout(() => {
                
            }, 1000)
            */
			map.zoomOut();
		},
        test(a, map) { 	
			if (map._container.id == 'map') {
				this.cardsHeight = document.querySelector('.cardsWrap').clientHeight;
			}

            const boundsa = a.reduce(function (bounds, coord) {
                return bounds.extend(coord);
            }, new mapboxgl.LngLatBounds(a[0], a[0]));

			setTimeout(() => {
				map.fitBounds(boundsa, {
					padding: {
						top: 50,
						right: 50,
						bottom: this.cardsHeight + 50,
						left: 50
					},
				});
			}, 1000);
		},
		
		onMouseenter() {
			// setTimeout(() => {
			// 	this.$store.state.isMapLoading = true;
			// }, 1000);
        },

        onClick() {
            const elems = document.querySelectorAll('.mapboxgl-map');
			
            this.touchState = false;
			sessionStorage.test = false;

            [].forEach.call(elems, function (el) {
                el.classList.remove('touch');
            });
        },

        onResize() {
            if (document.documentElement.clientWidth < 1200) {
                this.$store.state.isMapLoading = true;
            } 
        },

        coordinates() {
            let center = coords;
            let latLng = center.split(",");
        },

        toggleDetails(value, bool) {
            if (bool === false) {
                this.hideMenuToogleIcon(false);
                this.cardOpened = bool;
                this.cardIndex = bool;
                if (document.documentElement.clientWidth < 768) {
                    setTimeout(() => {
                        document.querySelector(`.cardsWrap`).scrollIntoView({
                            behavior: "smooth"
                        });
                    }, 800);
                }
            } else {
                this.cardOpened = value;
                this.hideMenuToogleIcon(true);
            }
            document.querySelector(`.marker-${value}`).click();
        },

        onCardHover(value, event) {
            if(this.$store.state.isMapLoaded) {

                if (event.type == 'mouseenter') {
                    document.querySelector(`.marker-${value}`).classList.add('invert');
                } else {
                    document.querySelector(`.marker-${value}`).classList.remove('invert');
                }
            }
        },

        onWheel(map) {
            map.on("wheel", event => {
                if (event.originalEvent.ctrlKey || event.originalEvent.metaKey || event.originalEvent.altKey) {
                    return;
                }
                event.preventDefault();
            });
		},

		onMapResize: debounce(function (map) {
			this.test(this.currentMarkers, map);
		}, 750),

		onResizeTest(map) {
			if (map._container.id == 'map' || map._container.id == 'mapExcursion') {
				this.onMapResize(map);
            }
            
			
			if (map._container.id == 'mapContacts') {
					const mapBounds = map.getBounds();
					const minus = this.mapCentered[0] - mapBounds._sw.lng;
					const minus2 = this.mapCentered[1] - mapBounds._ne.lat;
					const infoW = document.querySelector('.contactsInfo').offsetWidth;
					const infoH = document.querySelector('.contactsInfo').offsetHeight;
					const windowOnePer = window.innerWidth / 100;
					const mapOnePer = document.querySelector('.mapboxgl-map').offsetHeight / 100;
					const moveLat = infoW / windowOnePer / 100;
					const moveLng = infoH / mapOnePer / 100;
					let flyTo = [];

					if (document.documentElement.clientWidth < 1200) {
						flyTo = [this.mapCentered[0], this.mapCentered[1] + minus2 * moveLng];
					} else {
						flyTo = [this.mapCentered[0] + minus * moveLat, this.mapCentered[1]];
					}

					map.flyTo({
						center: flyTo,
						speed: 0.2,
						curve: 0.5,
						essential: true
					});
			}
		},

		scrollToMap() {
			document.querySelector(`#map`).scrollIntoView({
				behavior: "smooth"
			});
		},

		onMapClick( map) {
			if (document.documentElement.clientWidth > 1199 && map._container.id ==="map") {
				this.scrollToMap();
			}
		},

        onLoad(map) {
            let mapdata = this.mapData;
            let ind = 1;
            let self = this;

            map.touchZoomRotate.disableRotation();

            if (document.documentElement.clientWidth < 768) {
                map.dragPan.disable();
            }

            for (let i = 0; i < mapdata.length; i++) {
                map.addSource(`path${i}`, {
                    type: 'geojson',
                    data: {
                        "type": "Feature",
                        "properties": {},
                        "geometry": {
                            "coordinates": mapdata[i].pathCoords,
                            "type": "LineString"
                        },
                    }
                });

                this.currentMarkers.push(mapdata[i].coords);

                map.addLayer({
                    'id': `marker-${i+1}`,
                    'type': 'line',
                    'source': `path${i}`,
                    'layout': {
                        'visibility': self.lines,
                    },
                    'paint': {
                        'line-width': 2,
                        'line-color': '#0066FF'
                    }
                });

                let cont = document.querySelector('.mapboxgl-canvas-container');
                let wrapper = document.createElement('p');
                wrapper.className = `wrapper wrapper-${i+1}`;
                cont.appendChild(wrapper);

                for (let b = 0; b < mapdata[i].pathCoords.length; b++) {
                    const newel = document.createElement('span');
                    newel.className = `path-marker-${i+1} marker pathDot-${b}`;

                    new mapboxgl.Marker(newel)
                        .setLngLat(mapdata[i].pathCoords[b])
                        .addTo(map);
                    wrapper.appendChild(newel);
                }
            }

            mapdata.forEach(function (marker) {
                let coordinates = marker.coords;
                let middle = mapdata[ind - 1].pathCoords[Math.floor(mapdata[ind - 1].pathCoords.length / 2)];
                const el = document.createElement('div');
                el.innerHTML = marker.icon;
                el.className = `marker marker-${ind}`;
                el.id = `marker-${ind}`;
                el.setAttribute('index', ind);
                new mapboxgl.Marker(el)
                    .setLngLat(marker.coords)
                    .addTo(map);

                self.pointsCoords.push(marker.coords);

                el.onclick = function (e, ind) {
                    const btn = this;
                    const number = this.getAttribute('index');
					let thisCoords = mapdata[number - 1].pathCoords;
					document.querySelector(`.marker-${number}`).classList.remove('invert');
                    const boundsBig = self.pointsCoords.reduce(function (bounds, coord) {
                        return bounds.extend(coord);
                    }, new mapboxgl.LngLatBounds(self.pointsCoords[0], self.pointsCoords[0]));

                    const bounds = thisCoords.reduce(function (bounds, coord) {
                        return bounds.extend(coord);
                    }, new mapboxgl.LngLatBounds(thisCoords[0], thisCoords[0]));

                    let visibility = map.getLayoutProperty(`marker-${number}`, 'visibility');
                    let elements = document.querySelectorAll(`.path-marker-${number}`);


                    if (visibility === 'visible') {
                        self.toggle = false;
                        map.setLayoutProperty(`marker-${number}`, 'visibility', 'none');
                        for (let item = 0; item < elements.length; item++) {
                            elements[item].classList.remove('visible');
                        }
                        setTimeout(() => {
                            const cardsHeight = document.querySelector('.cardsWrap').clientHeight;

                            map.fitBounds(boundsBig, {
                                padding: {
                                    top: 50,
                                    right: 50,
                                    bottom: cardsHeight + 50,
                                    left: 50
                                },
                            });
                        }, 800);
                    } else {
                        self.toggle = true;
                        self.cardIndex = number;
                        map.setLayoutProperty(`marker-${number}`, 'visibility', 'visible');

                        for (let item = 0; item < elements.length; item++) {
                            elements[item].classList.add('visible');
                        }

                        setTimeout(() => {
                            const infoWidth = document.querySelector('.excursionInfo').clientWidth;
                            const infoHeight = document.querySelector('.excursionInfo').clientHeight;

                            if (document.documentElement.clientWidth < 1200) {
                                map.fitBounds(bounds, {
                                    padding: {
                                        top: 0,
                                        right: 50,
                                        bottom: infoHeight + 80,
                                        left: 50
                                    },
                                });
                            } else {
                                map.fitBounds(bounds, {
                                    padding: {
                                        top: 110,
                                        right: infoWidth + 110,
                                        bottom: 110,
                                        left: 110
                                    },
                                });
                            }
                        }, 800);

                        if (document.documentElement.clientWidth < 768) {
                            self.scrollToMap();
                        }
                    }
					self.scrollToMap();	
                };
                el.onmouseenter = function (e) {
                    self.onCardHover(this.getAttribute('index'), e);
                    self.cardHovered = Number.parseInt(this.getAttribute('index'));
                };
                el.onmouseleave = function (e) {
                    self.onCardHover(this.getAttribute('index'), e);
                    self.cardHovered = false;
				};
				
                ind++;
			});
			
			if (map._container.id == 'mapContacts') {
				setTimeout(() => {
					const mapBounds = map.getBounds();
					const minus = self.mapCentered[0] - mapBounds._sw.lng;
					const minus2 = self.mapCentered[1] - mapBounds._ne.lat;
					const infoW = document.querySelector('.contactsInfo').offsetWidth;
					const infoH = document.querySelector('.contactsInfo').offsetHeight;
					const windowOnePer = window.innerWidth / 100;
					const mapOnePer = document.querySelector('.mapboxgl-map').offsetHeight / 100;
					const moveLat = infoW / windowOnePer / 100;
					const moveLng = infoH / mapOnePer / 100;
					let flyTo = [];

					if (document.documentElement.clientWidth < 1200) {
						flyTo = [self.mapCentered[0], self.mapCentered[1] + minus2 * moveLng];
					} else {
						flyTo = [self.mapCentered[0] + minus * moveLat, self.mapCentered[1]];
					}

					map.flyTo({
						center: flyTo,
						speed: 0.2,
						curve: 0.5,
						essential: true
					});
				}, 700);
			}

			if (map._container.id == 'mapExcursion') {
				setTimeout(() => {
					map.resize();
					self.currentMarkers = [];
					mapdata[0].pathCoords.forEach(coord => self.currentMarkers.push(coord))
					self.test(self.currentMarkers, map);
				}, 700);
			}

			if (map._container.id == 'map') {
				setTimeout(() => {
					this.onResizeTest(map);
				}, 1000);
			}
			
            let event = new Event('OnMapLoad');

            document.addEventListener('OnMapLoad', function (e) {
                //console.log('Map loaded');
				//self.isMapLoaded = true;
				self.$store.state.isMapLoaded = true;
            }, false);
            setTimeout(() => {
                document.dispatchEvent(event);
            }, 2000);

            
			
        },
        
        hideMenuToogleIcon(val) {
            if (this.hideMenuIconTimeout) clearTimeout(this.hideMenuIconTimeout);
            this.hideMenuIconTimeout = setTimeout(() => {
                if (window.innerWidth <= 992) {
                    this.$store.state.showMenuToggleIcon = true;
                } else {
                    this.$store.state.showMenuToggleIcon = !val;
                }
            }, 600);            
        },
		
	},
}
</script>

<style lang="less">
@import "../../less/variables";


.previewMap {
	position: relative;
	height: 100vh;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 1;
	transition-property: opacity;

	&__img {
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center;
		overflow: hidden;
		//filter: blur(4px);
	}
	
	&__loader {
		content: url('../../assets/icons/loader.svg');
    	width: 80px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		opacity: 0;
		transition: opacity .3s;

		&.visible {
			opacity: 1;
		}
	}
	&-loading {
		height: 100%;
		position: absolute;
		
		&::before {
			display: none;
		}
	}

	.down(@md;{
		position: relative;
    	height: 100vh;
	});
}

span.mapboxgl-marker {
    display: block;
    transition-property: opacity;
    transition-duration: .3s;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;

    &.visible {
        opacity: 1;
        visibility: visible;
    }
}

.marker {
    background-image: url('../../assets/icons/map_marker_small.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    opacity: 1;
    animation: marker .3s ease-in;
    //transition: .3s;
    color: transparent;
}

.mapSection {
    position: relative;
    overflow: hidden;
    //overflow: visible;

    .sectionTitle {
        position: absolute;
        pointer-events: none;
        top: 0;
        left: 0;
        z-index: 10;
        width: 100%;
        transition: width 1s ease-in-out;
        //text-shadow: 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1, 0 0 4px #EFE9E1;

    }

    &.half {
        .up(@lg; {
                position: relative;
                display: flex;
                justify-content: flex-end;
				/*
					.mapboxgl-map {

						&::before {
							display: block;
							content: "";
							height: 100%;
							width: 100%;
							position: absolute;
							top: 0 !important;
							left: 0;
							background: white;
							transform: translateY(0%) translateX(0%);
							animation: unset;

						}

						&.aos-animate {
							&::before {
							}
						}
					}
				*/
            }

        );

        .up(@lg; {}

		);
		
		.previewMap {
			height: auto;

			&::before {
				display: block;
				content: "";
				height: 100%;
				width: 100%;
				position: absolute;
				top: 0 !important;
				left: 0;
				background: white;
				transform: translateY(0%) translateX(0%);
				animation: unset;
				z-index: 1;
			}

			&.aos-animate {
				&::before {
					animation: halfSection .6s ease-out;
					animation-delay: 2.6s;
					animation-fill-mode: forwards;
				}
			}


			&-loading {
				position: relative;
				//height: 100%;
				//width: 100%;
				//width: 50%;
			}
		}
    }

    &.expanded {
        .sectionTitle[data-aos^='fade'].aos-animate {
            transform: translateY(-40px);
            opacity: 0;
        }
    }

    &.mapContacts,
    &.half {
        .el-container {    
			z-index: 2;
			position: relative;
			left: 0;
			top: 0;
            transform: unset;
            width: auto;
            flex-shrink: 0;
        }
    }

    &.half {
        .el-container {
            .up(@lg; {
                    max-width: 50%;
                    //width: 50%;
                }

            );
        }
    }

    &.mapContacts {
		overflow: hidden;

        .el-container {
            margin-bottom: auto;
            margin-top: auto;
		}

		.previewMap {		
			height: 100%;
			position: absolute;
		}
    }

    .el-container {
        pointer-events: none;
        padding: 0;
        z-index: 11;

        .up(@lg; {
                position: absolute;
                top: 0;
                left: 50%;
                width: 100%;
                height: 100%;
                transform: translateX(-50%);
            }

        );
    }
}

#map {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    div.marker {
        width: 60px;
        height: 60px;
        box-shadow: none;
        background-size: 30px;
        background-repeat: no-repeat;
        background-position: center;
        transition-property: opacity, visibility, background-color;
        transition-duration: .3s;
        background: @white;
        display: flex;
        box-shadow: 0px 10px 10px rgba(0, 21, 53, 0.12);

        svg {
            margin: auto;
            height: 20px;

            path {
                transition: .3s;
                fill: @active;
            }
        }

        &:hover,
        &.invert {
            background: @active;

            path {
                fill: @white;
            }
        }
    }

    .up(@lg; {
            height: 100vh;
            position: relative;
        }

    );
}

#mapContacts {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    overflow: hidden;

    .marker {
		pointer-events: none;
		top: -30px;
        width: 42px;
        height: 60px;
        border-radius: 0;
        box-shadow: none;
        background-image: url('../../assets/icons/main_marker.svg');
    }

    &.touch {
        &::before {
            top: 25%;
        }
    }
}

#mapExcursion {
    height: 400px;
    width: 100%;

    span.mapboxgl-marker {
        opacity: 1;
        visibility: visible;
    }

    div.marker {
        display: none;
    }

    &.touch {
        &::before {
            top: 50%;
        }
	}


    .up(@sm; {
            height: 680px;
        }

    );

    .up(@lg; {
            height: auto;
        }

    );

}

.mapboxgl-map {
    background-color: #efe9e1;

    .marker {

        &:first-of-type,
        &:last-of-type {
            background-image: url('../../assets/icons/map_marker.svg');
            width: 30px;
            height: 30px;
        }
    }

    &.hidden {
        div.marker {
            opacity: 0;
            visibility: hidden;
        }
    }

    &::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        background: linear-gradient(0deg, #EFE9E1, #EFE9E1), #FFE485;
        opacity: 0;
        visibility: hidden;
        width: 100%;
        height: 100%;
        transition: .3s;
    }

    &.touch {
        position: relative;

        &::before {
            background-image: url("../../assets/icons/fingers.svg");
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
            width: 120px;
            height: 106px;
            content: '';
            display: block;
            z-index: 1;
            position: absolute;
            top: 19%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: hand_slide 1.8s linear infinite;

            .up(@sm; {
                    top: 32%;
                }

            );

            .up(@lg; {
                    display: none;
                }

            );
        }

        &::after {
            opacity: 0.75;
            visibility: visible;

            .up(@lg; {
                    display: none;
                }

            );
        }

	}
	&-loading {
		.mapboxgl-canvas-container {
			& > * {
				//filter: blur(6px);
			}

			&::after {
				background-image: url('../../assets/icons/loader.svg');
				width: 80px;
				height: 80px;
				display: block;
				content: '';
				background-size: contain;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
			}
		}
	}
}

.mapboxgl-ctrl-bottom-left,
.mapboxgl-ctrl-bottom-right,
.mapboxgl-ctrl-bottom-right,
.mapboxgl-ctrl-top-right {
    display: none;
}
</style>
