import {uiStartLoading, uiStopLoading} from './index';


export const addPlace = (placeName, location, image) => {
  return dispatch => {
    dispatch(uiStartLoading());
    fetch('https://us-central1-shareplaces-208010.cloudfunctions.net/storeImage', {
      method: 'POST',
      body: JSON.stringify({
        image: image.base64
      })
    })
    .catch(e => {
      console.log(e);
      alert("Something went wrong, please try again!");
      dispatch(uiStopLoading());
    })
    .then(res => res.json())
    .then(parsedResultImage => {
      const placeData = {
        name: placeName,
        location: location,
        image: parsedResultImage.imageUrl
      };
      return fetch('https://shareplaces-208010.firebaseio.com/places.json', {
        method: 'POST',
        body: JSON.stringify(placeData)
      })
    })
    .catch((e) => {
      console.log(e);
      alert("Something went wrong, please try again!");
      dispatch(uiStopLoading());
    })
    .then(res => res.json())
    .then(parsedRes => {
      console.log(parsedRes);
      dispatch(uiStopLoading());
    });
  };
};

export const getPlaces = () => {
  return dispatch => {
    fetch('https://shareplaces-208010.firebaseio.com/places.json')
    .catch(e => alert("Unable to fetch data! Please, try again"))
    .then(res => res.json())
    .then(parsedRes => {
      const places = [];

      for(let key in parsedRes) {
        places.push({
          ...parsedRes[key],
          image: {
            uri: parsedRes[key].image
          },
          key: key
        });
      }

      dispatch({
      type: 'GET_PLACES',
      payload: places
      })
    })
  };
};

export const deletePlace = key => {
  return dispatch => {
      dispatch({
          type: 'REMOVE_PLACE',
          payload: key
      });
      fetch("https://shareplaces-208010.firebaseio.com/places/" + key + ".json", {
          method: "DELETE"
      })
      .catch(err => {
          alert("Something went wrong, sorry :/");
          console.log(err);
      })
      .then(res => res.json())
      .then(parsedRes => {
          console.log("Done!");
      });
  };
};
