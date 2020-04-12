import React from "react";
import TimerComponent from "./Timer";
import MaxOutComponent from "./MaxOutComponent";
import WorkoutPicker from "./WorkoutPicker";
import {Calendar} from 'primereact/calendar';
import 'react-calendar/dist/Calendar.css';

const App = () => (
  <>
    <div>
      <h2>WorkoutPicker</h2>
      <WorkoutPicker />
    </div>
    <div>
      <h2>Calendar</h2>
      <Calendar />
    </div>
    <div>
      <h2>Timer</h2>
      <TimerComponent />
    </div>
    <div>
      <h2>Maxout</h2>
      <MaxOutComponent />
    </div>
  </>
);

export default App;
