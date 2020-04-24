import { ADD_ARTICLE, DATA_LOADED, API_ERRORED, BEST_WORKOUT_LOADED } from "../constants/action-types";

import {
  TIME_STARTED,
  TIME_MAXOUT_SET,
  WORKOUT_CONFIGURATION_SET,
  USER_SET,
  WORKOUTS_LOADED,
  HOME_SET,
  TOKEN_SET
} from "../constants/action-types";

const initialState = {
  articles: [],
  remoteArticles: [],
  error: '',

  workouts: [],

  selectedWorkout: undefined,
  selectedDate: undefined,
  workoutConfigSet: false,
  workOutStarted: false,

  workout:'',
  startTime: undefined,
  maxOutElapsed: undefined,
  userId:undefined,
  user: undefined,

  insertedWorkout: false,
  message: undefined,

  onHomePage: true,
  token: undefined,
  bestWorkout: undefined
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }

  if (action.type === DATA_LOADED) {
    return Object.assign({}, state, {
      insertedWorkout: true,
      onHomePage: true,
      message: action.payload.message
    });
  }
  if (action.type === WORKOUTS_LOADED) {
    return Object.assign({}, state, {
      workouts: action.payload
    });
  }
  if (action.type === BEST_WORKOUT_LOADED) {
    return Object.assign({}, state, {
      bestWorkout: action.payload.length ? action.payload[0]: undefined
    });
  }

  if (action.type === API_ERRORED) {
    return Object.assign({}, state, {
        error: state.error.concat(action.payload)
    });
  }

  if (action.type === TIME_STARTED) {
    return Object.assign({}, state, {
        startTime: action.payload,
        workOutStarted:true
    });
  }
  if (action.type === TIME_MAXOUT_SET) {
    return Object.assign({}, state, {
        maxOutElapsed: action.payload
    });
  }
  if (action.type === WORKOUT_CONFIGURATION_SET) {
    return Object.assign({}, state, {
      selectedWorkout: action.payload.selectedWorkout,
      selectedDate: action.payload.selectedDate,
      workoutConfigSet: true,
    });
  }
  if (action.type === USER_SET) {
    return Object.assign({}, state, {
        user: action.payload
    });
  }
  if (action.type === HOME_SET) {
    return Object.assign({}, state, {
        onHomePage: action.payload
    });
  }
  if (action.type === TOKEN_SET) {
    return Object.assign({}, state, {
        token: action.payload
    });
  }

  return state;
}

export default rootReducer;
