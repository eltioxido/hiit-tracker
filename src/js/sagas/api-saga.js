import { takeEvery, call, put } from "redux-saga/effects";
import { 
  DATA_REQUESTED, 
  DATA_LOADED, 
  API_ERRORED, 
  WORKOUT_SAVE, 
  WORKOUTS_REQUESTED, 
  WORKOUTS_LOADED, 
  BEST_WORKOUT_REQUESTED, 
  BEST_WORKOUT_LOADED } from "../constants/action-types";

import { useAuth0, getTokenSilently } from "../react-auth0-spa";

//const URL = "https://vast-temple-83831.herokuapp.com/"
const URL = "http://localhost:5000/"
//const URL = "http://192.168.1.77:5000/"



// TODO: Move this to a utils function along MaxOutComponent
function convertHMS (value) {
    let sec = parseInt(value) / 1000;
    let hours   = Math.floor(sec / 3600)
    let minutes = Math.floor((sec - (hours * 3600)) / 60)
    let seconds = parseInt(sec - (hours * 3600) - (minutes * 60))
    if (minutes < 10) { minutes = "0" + minutes }
    if (seconds < 10) { seconds = "0" + seconds }
    return minutes + ':' + seconds
}

var h = new Object(); // or just {}
h['cardio-challenge-1'] = 'Cardio Challenge';
h['tabata-power-1'] = 'Tabata Power';
h['sweat-intervals-1'] = 'Sweat Intervals';
h['friday-fight-1'] = 'Friday Fight: Round 1';
h['tabata-strength-1'] = 'Tabata Strength';
h['pulse-1'] = 'Pulse';

export default function* watcherSaga() {
  yield takeEvery(DATA_REQUESTED, workerSaga);
  yield takeEvery(WORKOUTS_REQUESTED, workoutsRequestedSaga);
  yield takeEvery(WORKOUT_SAVE, workOutSaveSaga);
  yield takeEvery(BEST_WORKOUT_REQUESTED, getBestWorkoutSaga);
}

function* workerSaga(action) {
  try {
    const payload = yield call(setData, action.payload);
    yield put({ type: DATA_LOADED, payload});
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}
function* workoutsRequestedSaga(action) {
  try {

    const payload = yield call(getData, action.payload);

    payload.forEach(function(part, index) {
      this[index].selectedDate = this[index].selectedDate.substring(0, 10);
      this[index].maxOutElapsed = convertHMS(this[index].maxOutElapsed);
      this[index].selectedWorkout = h[this[index].selectedWorkout];
    }, payload); // use arr as this

    yield put({ type: WORKOUTS_LOADED, payload});
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

function* getBestWorkoutSaga(action) {
  try {

    let payload = yield call(getBestWorkout, action.payload);
    if(payload.length) {
        payload[0].selectedDate = payload[0].selectedDate.substring(0, 10);
        payload[0].maxOutElapsed= convertHMS(payload[0].maxOutElapsed);
        payload[0].selectedWorkout= h[payload[0].selectedWorkout];
    }

    yield put({ type: BEST_WORKOUT_LOADED, payload});
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

function* workOutSaveSaga(action) {
  try {
    const payload = yield call(setData, action.payload);
    yield put({ type: DATA_LOADED, payload });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

const setData = async (payload) => {

  //var request = new Request("https://vast-temple-83831.herokuapp.com/", {
  const token = await getTokenSilently();
  var request = new Request(URL, {
    method: 'POST',
    body:  JSON.stringify(payload),
    headers:{ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
});

  return fetch(request).then( response => response.json() );
}
const getData  = async (payload) => {
  const token = await getTokenSilently();
  //var request = new Request("https://vast-temple-83831.herokuapp.com/", {
  var request = new Request(URL, {
    method: 'GET',
    body:  JSON.stringify(payload),
    headers:{ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
    //headers:{ 'Content-Type': 'application/json', 'Authorization': 'Bearer BR22qmKl1E0wgCFmOcauEXwQEQ_3MDb0koa4gEve2VbDQXLlxvPA8weGUNsj2G9_e6PWN8dAaL8Qk57WDcHv1UnICX0VjZhQLbwhHe7Z7AMzSmHG3E_9lmf5T5oJvdxQYiHYUr_BOCkLtiWLS3CS6dZ8mhczwFoNXngPzlyxAVt2lgkFJzB5TTdHf1kfHFFD6o8s4rlk3OjKA88VcBFcH3o7oDGbPlCxlrJxW8NffLhPrjj7iONF_jQy6q_83gRvJk2WOJnJD1iTuEMZ8__xJs8fEw6bpJ8ckehsca0nTGVlOvxFpkAdAv5ypwUgg3F5sqo5dbUsjS0KeD8vhQj3SA' }
});

  return fetch(request).then( response => response.json() );
}

const getBestWorkout  = async (payload) => {
  const token = await getTokenSilently();
  //var request = new Request("https://vast-temple-83831.herokuapp.com/", {
  const URL_formed = URL +  "?workout=" + payload.parameters.workout + "&bestWorkout=" + payload.parameters.isBestWorkout;
  var request = new Request(URL_formed, {
    method: 'GET',
    headers:{ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
    //headers:{ 'Content-Type': 'application/json', 'Authorization': 'Bearer BR22qmKl1E0wgCFmOcauEXwQEQ_3MDb0koa4gEve2VbDQXLlxvPA8weGUNsj2G9_e6PWN8dAaL8Qk57WDcHv1UnICX0VjZhQLbwhHe7Z7AMzSmHG3E_9lmf5T5oJvdxQYiHYUr_BOCkLtiWLS3CS6dZ8mhczwFoNXngPzlyxAVt2lgkFJzB5TTdHf1kfHFFD6o8s4rlk3OjKA88VcBFcH3o7oDGbPlCxlrJxW8NffLhPrjj7iONF_jQy6q_83gRvJk2WOJnJD1iTuEMZ8__xJs8fEw6bpJ8ckehsca0nTGVlOvxFpkAdAv5ypwUgg3F5sqo5dbUsjS0KeD8vhQj3SA' }
});

  return fetch(request).then( response => response.json() );
}
