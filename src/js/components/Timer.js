import React, { Component } from "react";
import { connect } from "react-redux";
import Timer from 'react-compound-timer'
import { setStartTime, setMaxOutElapsed } from "../actions/index";

import Button from '@material-ui/core/Button';


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
        initialTime={123400}
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
                    <Button variant="outlined" color="primary" onClick={start}> Start </Button> <br /><br />
                    <Button variant="outlined" color="primary" button onClick={stop}> Stop </Button> <br /><br />
                    <Button
                      size="large"
                      variant="contained"
                      color="primary"
                      onClick={() => this.setMaxOutElapsed( getTime() )}>
                        Max Out!
                    </Button >

                     <br /><br />


                    <button onClick={pause}>Pause</button>
                    <button onClick={resume}>Resume</button>
                    <button onClick={reset}>Reset</button>


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
