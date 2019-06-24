/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { connect } from 'react-redux';
import '../ComponentsCSS/createPoiForm.css';
import axios from 'axios';

const mapStateToProps = state => ({
  name: state.name,
  keywordOne: state.keywordOne,
  keywordOneId: state.keywordOneId,
  keywordTwo: state.keywordTwo,
  geolocCoordonnees: state.geolocCoordonnees,
  poiKeywordsDisplay: state.poiKeywordsDisplay,
});

// get date and time to fill creation_date field in database
const poiCreationDate = new Date().toISOString().slice(0, 19).replace('T', ' ');


// get first level keyword Id to filter second level keywords in form
const getFirstKeywordId = (input, poiKeywordsDisplay) => {
  let idLevelOne;
  for (let i = 0; i < poiKeywordsDisplay.length; i += 1) {
    if (poiKeywordsDisplay[i].name === input) {
      idLevelOne = poiKeywordsDisplay[i].id;
    }
  }
  return idLevelOne;
};
const CreatePoiForm = ({
  dispatch, name, geolocCoordonnees, poiKeywordsDisplay, keywordOneId,
}) => (
  // eslint-disable-next-line no-unused-expressions
  <div>
    <form
      className="poi-create"
      method="POST"
      encType="multipart/form-data"
      onSubmit={(e) => {
        axios.post('http://localhost:3001/pois', {
          name,
          latitude: geolocCoordonnees[0],
          longitude: geolocCoordonnees[1],
          creation_date: poiCreationDate,
          author_id: 1,
        })
          .then(res => console.log(`${res} has been properly sent`))
          .catch(err => console.log(err));
        e.preventDefault();
      }
    }
    >

      <legend>Ajoutez un point d'intérêt</legend>
      <div className="poi-address">
        <p>
          Adresse:
          <span> en fonction des coordonnées gps</span>
        </p>
      </div>


      <div className="poi-name">
        <label htmlFor="name">Nom</label>

        <input
          type="text"
          id="name"
          name="name"
          onChange={e => dispatch({ type: 'HANDLE_FORM_NAME_CHANGE', name: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="keywordOne">Catégorie:</label>

        <select
          id="keywordOne"
          name="keywordOne"
          onChange={
          e => dispatch({
            type: 'HANDLE_FORM_K1_CHANGE',
            keywordOne: e.target.value,
            keywordOneId: getFirstKeywordId(e.target.value, poiKeywordsDisplay),
          })}
          required
        >
          <option>
            Choissisez une catégorie
          </option>
          {poiKeywordsDisplay.filter(keyword => keyword.importance === 1)
            .map(keyword => (
              <option key={keyword.name} id={keyword.name} value={keyword.name}>
                {(keyword.name)}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label htmlFor="keywordTwo">Sous-catégorie (facultatif):</label>

        <select
          id="keywordTwo"
          name="keywordTwo"
          onChange={
          e => dispatch({
            type: 'HANDLE_FORM_K2_CHANGE',
            keywordTwo: e.target.value,
          })
        }
        >
          <option>
            Choisissez une sous-catégorie
          </option>
          {poiKeywordsDisplay.filter(keyword => keyword.importance === 2
          && keywordOneId === keyword.parent_id)
            .map(keyword => (
              <option key={keyword.name} id={keyword.name} value={keyword.name}>
                {keyword.name.replace('_', ' ')}
              </option>
            ))}
        </select>
      </div>

      <div className="poi-pic">
        <label htmlFor="poiPic">Ajouter une photo</label>

        <input id="poiPic" type="file" name="poiPic" />
      </div>
      <div className="submit-button">
        <input type="submit" value="Envoyer" />
      </div>

    </form>
  </div>
);

export default connect(mapStateToProps)(CreatePoiForm);
