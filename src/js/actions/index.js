import { ADD_ARTICLE, DATA_REQUESTED } from "../constants/action-types";
import { 
  TIME_STARTED, 
  TIME_MAXOUT_SET, 
  WORKOUT_CONFIGURATION_SET, 
  WORKOUT_SAVE, 
  USER_SET, 
  WORKOUTS_REQUESTED, 
  HOME_SET, 
  TOKEN_SET,
  BEST_WORKOUT_REQUESTED } from "../constants/action-types";

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
}

export function getData(url) {
  return { type: DATA_REQUESTED, payload: { url } };
}

export function getWorkouts(payload) {
  return { type: WORKOUTS_REQUESTED, payload };
}
export function getBestLastWorkout(payload) {
  return { type: BEST_WORKOUT_REQUESTED, payload };
}


export function setStartTime(payload) {
  return { type: TIME_STARTED, payload };
}
export function setMaxOutElapsed(payload) {
  return { type: TIME_MAXOUT_SET, payload };
}
export function setWorkoutConfiguration(payload) {
  return { type: WORKOUT_CONFIGURATION_SET, payload };
}
export function saveWorkout(payload) {
  return { type: WORKOUT_SAVE, payload };
}
export function setUser(payload) {
  return { type: USER_SET, payload };
}
export function setHome(payload) {
  return { type: HOME_SET, payload };
}
export function setToken(payload) {
  return { type: TOKEN_SET, payload };
}
