import { ADD_ARTICLE, DATA_REQUESTED } from "../constants/action-types";
import { TIME_STARTED, TIME_MAXOUT_SET, WORKOUT_SET } from "../constants/action-types";

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
}

export function getData(url) {
  return { type: DATA_REQUESTED, payload: { url } };
}


export function setStartTime(payload) {
  return { type: TIME_STARTED, payload };
}
export function setMaxOutElapsed(payload) {
  return { type: TIME_MAXOUT_SET, payload };
}
export function setWorkout(payload) {
  return { type: WORKOUT_SET, payload };
}
