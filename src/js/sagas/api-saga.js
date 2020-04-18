import { takeEvery, call, put } from "redux-saga/effects";
import { DATA_REQUESTED, DATA_LOADED, API_ERRORED, WORKOUT_SAVE } from "../constants/action-types";

export default function* watcherSaga() {
  yield takeEvery(DATA_REQUESTED, workerSaga);
  yield takeEvery(WORKOUT_SAVE, workOutSaveSaga);
}

function* workerSaga(action) {
  try {
    const payload = yield call(getData, action.payload);
    yield put({ type: DATA_LOADED, payload });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

function* workOutSaveSaga(action) {
  try {
    const payload = yield call(getData, action.payload);
    yield put({ type: DATA_LOADED, payload });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

function getData(payload) {
  let data = {
      name: 'Sara'
  }
     let headers2 = new Headers();
     headers2.append('Content-Type', 'application/x-www-form-urlencoded');

  var request = new Request("https://vast-temple-83831.herokuapp.com/", {
    method: 'POST',
    body:  JSON.stringify(payload),
    headers:{ 'Content-Type': 'application/json' }
});


    console.log(JSON.stringify(payload))
  return fetch(request).then( response => response.json() );
}
