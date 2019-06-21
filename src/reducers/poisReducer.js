const initialState = {
  zoom: 16,
  geolocCoordonnees: [],
  defaultCoordonnees: [49.260096, 4.030293],
  poiSampleDisplay: [],
  specificPoiInfos: [],
  isCreateFormDisplayed: false,
  InformationPoiInfos: false,
  searchBarValueInput: '',
  filteredPoiByKeyword: [],
  poiKeywordsDisplay: [],
  name: '',
  keywordOne: '',
  keywordOneId: '',
  keywordTwo: '',
};

const poisReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CURRENT_POSITION':
      return {
        ...state,
        geolocCoordonnees: action.geolocCoordonnees,
      };
    case 'GET_POIS_SAMPLE':
      return {
        ...state,
        poiSampleDisplay: action.poiSampleDisplay,
      };
    case 'GET_POIS_KEYWORDS':
      return {
        ...state,
        poiKeywordsDisplay: action.poiKeywordsDisplay,
      };
    case 'SHOW_POI_INFOS':
      return {
        ...state,
        specificPoiInfos: action.specificPoiInfos,
      };
    case 'TOGGLE_POI_CREATION_FORM':
      return {
        ...state,
        isCreateFormDisplayed: !state.isCreateFormDisplayed,
      };
    case 'CLOSE_POI_INFOS':
      if (state.InformationPoiInfos === true) {
        return {
          ...state,
          specificPoiInfos: action.specificPoiInfos,
          InformationPoiInfos: false,
        };
      }
      return {
        ...state,
        specificPoiInfos: action.specificPoiInfos,
      };
    case 'TRANSITION_POI_INFOS':
      return {
        ...state,
        InformationPoiInfos: action.InformationPoiInfos,
      };
    case 'HANDLE_SEARCHBAR_INPUT':
      return {
        ...state,
        searchBarValueInput: action.searchBarValueInput,
      };
    case 'HANDLE_SUBMIT_SEARCHBAR':
      return {
        ...state,
        filteredPoiByKeyword: action.filteredPoiByKeyword,
        poiSampleDisplay: action.poiSampleDisplay,
      };
    case 'HANDLE_FORM_NAME_CHANGE':
      return {
        ...state,
        name: action.name,
      };
    case 'HANDLE_FORM_K1_CHANGE':
      return {
        ...state,
        keywordOne: action.keywordOne,
        keywordOneId: action.keywordOneId,
      };
    case 'HANDLE_FORM_K2_CHANGE':
      return {
        ...state,
        keywordTwo: action.keywordTwo,
      };
    default:
      return state;
  }
};

export default poisReducer;
