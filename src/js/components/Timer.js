import React, { Component } from "react";
import { connect } from "react-redux";
import Timer from 'react-compound-timer'
import { setStartTime, setMaxOutElapsed } from "../actions/index";

export class TimerComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startTime: "",
      maxOutElapsed: "",
    };
  }

  setStartTime() {
    const lDate = Date.now()
    this.setState({ startTime: lDate });
    this.props.setStartTime(lDate);
  }

  setMaxOutElapsed(elapsed) {
    this.setState({ maxOutElapsed: elapsed });
    this.props.setMaxOutElapsed(elapsed);
  }

  render() {
    return (
      <Timer
        formatValue={value => `${value < 10 ? `0${value}` : value}`}
        initialTime={0}
        startImmediately={false}
        onStart={() => this.setStartTime()}
      >
          {({ start, resume, pause, stop, reset, timerState, getTime }) => (
              <React.Fragment>
                  <div>
                      <Timer.Hours/>:
                      <Timer.Minutes/>:
                      <Timer.Seconds/>
                  </div>
                  <br />
                  <div>
                      <button onClick={start}>Start</button>
                      <button onClick={pause}>Pause</button>
                      <button onClick={resume}>Resume</button>
                      <button onClick={stop}>Stop</button>
                      <button onClick={reset}>Reset</button>
                      <button onClick={() => this.setMaxOutElapsed( getTime() )}>MaxOut!</button>
                  </div>
              </React.Fragment>
          )}
      </Timer>

    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setStartTime: startTime => dispatch(setStartTime(startTime)),
    setMaxOutElapsed: maxOutElapsed => dispatch(setMaxOutElapsed(maxOutElapsed))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(TimerComponent);
