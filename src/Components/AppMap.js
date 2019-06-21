import React from 'react';
import ReactDOMServer from 'react-dom/server';
import './ComponentsCSS/AppMap.scss';
import { connect } from 'react-redux';
import {
  Map, TileLayer, Marker, Popup,
} from 'react-leaflet';
import L from 'leaflet';
import userLocationUrl from '../pictoUser/pinnnUser.svg';
import Pins from './ComponentPins/Pins';

const myIcon = L.icon({
  iconUrl: userLocationUrl,
  iconSize: [25, 41],
});

const mapStateToProps = state => ({
  zoom: state.zoom,
  geolocCoordonnees: state.geolocCoordonnees,
  defaultCoordonnees: state.defaultCoordonnees,
  poiSampleDisplay: state.poiSampleDisplay,
  filteredPoiByKeyword: state.filteredPoiByKeyword,
});

const customPins = keyword => L.divIcon({
  html: ReactDOMServer.renderToString(<Pins currentKeyword={keyword} />),
  iconSize: [40, 65],
});


const AppMap = ({
  geolocCoordonnees,
  defaultCoordonnees,
  zoom,
  poiSampleDisplay,
  filteredPoiByKeyword,
  dispatch,
}) => (
  // eslint-disable-next-line max-len
  <Map center={geolocCoordonnees.length ? geolocCoordonnees : defaultCoordonnees} zoom={zoom} zoomControl={false}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <Marker
      position={geolocCoordonnees.length ? geolocCoordonnees : defaultCoordonnees}
      icon={myIcon}
    >
      <Popup>
        User
      </Popup>
    </Marker>
    {/* Poi sample at first render, if there's a filter applied, only show those pois, then none if no
    corresponding keywords from the research */}
    {!filteredPoiByKeyword.length
      ? poiSampleDisplay.map(poi => (
        <Marker
          icon={customPins(poi.keywordName)}
          key={poi.id}
          onClick={() => dispatch({ type: 'SHOW_POI_INFOS', specificPoiInfos: poi })}
          position={poi.localisation}
        />
      ))
      : filteredPoiByKeyword.map(poi => (
        <Marker
          icon={customPins(poi.keywordName)}
          key={poi.id}
          onClick={() => dispatch({ type: 'SHOW_POI_INFOS', specificPoiInfos: poi })}
          position={poi.localisation}
        />
      ))}
  </Map>
);

export default connect(mapStateToProps)(AppMap);
