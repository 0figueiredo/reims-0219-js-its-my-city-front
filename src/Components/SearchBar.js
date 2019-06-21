import React from 'react';
import { connect } from 'react-redux';
import './ComponentsCSS/searchBar.scss';
import axios from 'axios';
import { ReactComponent as Logo } from './pictos/search.svg';

const mapStateToProps = state => ({
  searchBarValueInput: state.searchBarValueInput,
  filteredPoiByKeyword: state.filteredPoiByKeyword,
  poiKeywordsDisplay: state.poiKeywordsDisplay,
});


// Filter all keywords where the index is different from -1,
// and lower case them all to be case insensitive
const filterKeywords = (keyword, userInput) => keyword.filter(el => el.name
  .toLowerCase().indexOf(userInput.toLowerCase()) !== -1);

const SearchBar = ({ dispatch, searchBarValueInput, poiKeywordsDisplay }) => (
  <div>
    <div className="search-box">
      <form onSubmit={(e) => {
        axios.get(`http://localhost:3001/pois/filter/${searchBarValueInput}`)
          .then(res => dispatch({ type: 'HANDLE_KEYWORD_FILTERING', filteredPoiByKeyword: res.data, poiSampleDisplay: [] }));
        e.preventDefault();
      }
      }
      >
        <input
          className="search-text"
          type="text"
          placeholder="Rechercher"
          onChange={e => dispatch({ type: 'HANDLE_SEARCHBAR_INPUT', searchBarValueInput: e.target.value })}
          list="keywords"
        />
        {searchBarValueInput
      && (
      <datalist id="keywords">
        {filterKeywords(poiKeywordsDisplay, searchBarValueInput).map(word => (
          <option value={word.name} />
        ))}
      </datalist>
      )}
      </form>
      <Logo className="search-logo" />
    </div>
  </div>
);

export default connect(mapStateToProps)(SearchBar);
