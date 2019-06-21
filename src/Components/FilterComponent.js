import React from 'react';
import './ComponentsCSS/FilterComponent.scss';
import { connect } from 'react-redux';
import axios from 'axios';

const mapStateToProps = state => ({
  specificPoiInfos: state.specificPoiInfos,
  poiKeywordsDisplay: state.poiKeywordsDisplay,
  filterKeywordPageDisplay: state.filterKeywordPageDisplay,
});

const onlyKeywords1 = keywords => keywords.filter(keyword => keyword.importance === 1);

const FilterComponent = ({ dispatch, poiKeywordsDisplay }) => (
  <div className="filterComponent">
    <button onClick={() => dispatch({ type: 'CLOSE_FILTER_COMPONENT', filterKeywordPageDisplay: false })} type="button">X</button>
    <h1>Catégories</h1>
    <button type="button">Points d'intérêts</button>
    <button type="button">évenements</button>
    <h1>Thèmes</h1>
    {onlyKeywords1(poiKeywordsDisplay).map(keyword => (
      <button
        type="button"
        key={keyword.name}
        onClick={() => axios.get(`http://localhost:3001/pois/filter/${keyword.name}`)
          .then(res => dispatch({ type: 'HANDLE_KEYWORD_FILTERING', filteredPoiByKeyword: res.data }),
            dispatch({ type: 'CLOSE_FILTER_COMPONENT', filterKeywordPageDisplay: false }))
      }
      >
        {keyword.name}

      </button>
    ))}
  </div>
);


export default connect(mapStateToProps)(FilterComponent);
