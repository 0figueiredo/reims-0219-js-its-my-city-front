import React, { Component } from 'react';
import axios from 'axios';
import './App.scss';
import { connect } from 'react-redux';
import AppMap from './Components/AppMap';
import SearchBar from './Components/SearchBar';
import FilterBar from './Components/filterBar';
import PoiInformation from './Components/PoiInformations';
import FilterComponent from './Components/FilterComponent';
import WizardForm from './Components/WizardForm/WizardForm';

const mapStateToProps = state => ({
  geolocCoordonnees: state.geolocCoordonnees,
  poiSampleDisplay: state.poiSampleDisplay,
  specificPoiInfos: state.specificPoiInfos,
  filterKeywordPageDisplay: state.filterKeywordPageDisplay,
  poiKeywordsDisplay: state.poiKeywordsDisplay,
  isCreateFormDisplayed: state.isCreateFormDisplayed,
  defaultCoordonnees: state.defaultCoordonnees,
});


class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    navigator.geolocation.watchPosition((position) => {
      dispatch({ type: 'GET_CURRENT_POSITION', geolocCoordonnees: [position.coords.latitude, position.coords.longitude] });
    });
    axios.get('http://localhost:3001/pois/keywords')
      .then(response => dispatch({ type: 'GET_POIS_KEYWORDS', poiKeywordsDisplay: response.data }))
      .catch(err => console.log(err));
  }

  componentDidUpdate(prevProps) {
    const { dispatch, geolocCoordonnees } = this.props;
    if (geolocCoordonnees !== prevProps.geolocCoordonnees) {
      axios.get(`http://localhost:3001/pois/sample/${geolocCoordonnees[0]}/${geolocCoordonnees[1]}`)
        .then(response => dispatch({ type: 'GET_POIS_SAMPLE', poiSampleDisplay: response.data }))
        .catch(err => console.log(err));
    }
  }

  render() {
    const {
      specificPoiInfos,
      filterKeywordPageDisplay,
      isCreateFormDisplayed,
    } = this.props;
    return (
      <div>
        <SearchBar />
        <AppMap showPoiInfos={this.showPoiInfos} />
        {Object.keys(specificPoiInfos).length && <PoiInformation />}
        {!Object.keys(specificPoiInfos).length && <FilterBar />}
        {filterKeywordPageDisplay && <FilterComponent />}
        <FilterBar />
        {isCreateFormDisplayed && <WizardForm />}
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
