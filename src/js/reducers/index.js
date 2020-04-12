import { ADD_ARTICLE, DATA_LOADED, API_ERRORED } from "../constants/action-types";

import { TIME_STARTED, TIME_MAXOUT_SET, WORKOUT_SET} from "../constants/action-types";

const initialState = {
  articles: [],
  remoteArticles: [],
  error: '',


  startTime: 0,
  maxOutElapsed: 0,
  workout: '',
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }

  if (action.type === DATA_LOADED) {
    return Object.assign({}, state, {
      remoteArticles: state.remoteArticles.concat(action.payload)
    });
  }

  if (action.type === API_ERRORED) {
    return Object.assign({}, state, {
        error: state.error.concat(action.payload)
    });
  }

  if (action.type === TIME_STARTED) {
    return Object.assign({}, state, {
        startTime: action.payload
    });
  }
  if (action.type === TIME_MAXOUT_SET) {
    return Object.assign({}, state, {
        maxOutElapsed: action.payload
    });
  }
  if (action.type === WORKOUT_SET) {
    return Object.assign({}, state, {
        workout: action.payload
    });
  }

  return state;
}

export default rootReducer;
