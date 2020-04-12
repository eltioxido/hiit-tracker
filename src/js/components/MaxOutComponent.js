import React from "react";
import { connect } from "react-redux";


const convertHMS = value => {
    let sec = parseInt(value) / 1000;
    let hours   = Math.floor(sec / 3600)
    let minutes = Math.floor((sec - (hours * 3600)) / 60)
    let seconds = parseInt(sec - (hours * 3600) - (minutes * 60))
    if (minutes < 10) { minutes = "0" + minutes }
    if (seconds < 10) { seconds = "0" + seconds }
    return minutes + ':' + seconds
};

const mapStateToProps = state => {
  return {
    maxOutTime: state.maxOutElapsed,
  };
};

const ConnectedMaxOut = ({ maxOutTime }) => (
  <div>
    <div>
      <h2> Maxed Out at </h2> <h1> <b>{convertHMS(maxOutTime)}</b> </h1>
    </div>
  </div>
);

const MaxOutComponent = connect(mapStateToProps)(ConnectedMaxOut);

export default MaxOutComponent;
