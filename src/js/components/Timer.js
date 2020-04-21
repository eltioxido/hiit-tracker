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
      maxOutElapsed: 0,

      timerOn: false,
      timerStart: 0,
      timerTime: 0
    };
    this.startTimer = this.startTimer.bind(this);
  }
  componentWillUnmount() {
    //this.startTimer.unbind(this);
  }

  componentDidMount() {
    if (this.props.workoutConfigSet) {
      this.startTimer()
    }
  }


  startTimer () {
    const lDate = Date.now()
    this.setState({ startTime: lDate });
    this.props.setStartTime(lDate);

    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart
      });
    }, 10);
  }

  stopTimer = () => {
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  };
  resetTimer = () => {
    this.setState({
      timerStart: 0,
      timerTime: 0
    });
  };


  setStartTime() {
    const lDate = Date.now()
    this.setState({ startTime: lDate });
    this.props.setStartTime(lDate);
  }

  setMaxOutElapsed() {
    this.setState({ maxOutElapsed: this.timerTime });
    this.props.setMaxOutElapsed(this.state.timerTime);
  }



  render() {

    //if(this.props.workoutConfigSet) { this.startTimer() }

    const { timerTime } = this.state;
    let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);


    return (


        <React.Fragment>
          <div>
          <br /><br />

          { true ? null:
            <Button disabled={!(this.state.timerOn === false && this.state.timerTime === 0)} variant="outlined" color="primary" onClick={() => this.startTimer()}> Start </Button>
          }
          <br /><br />
            <h1> {minutes}:{seconds} </h1>
          </div>


          <div>


              <br /><br />
              <Button
                disabled={!(this.state.timerOn === true)}
                size="large"
                variant="contained"
                color="primary"
                onClick={() => this.setMaxOutElapsed()}>
                  Max Out!
              </Button >
              <br /><br />
              <Button disabled={!(this.state.timerOn === true)} variant="outlined" color="primary" size="small"  onClick={this.stopTimer}> Pause </Button> &nbsp;&nbsp;&nbsp;
              <Button disabled={!(this.state.timerOn === false && this.state.timerTime > 0)} variant="outlined" color="primary" size="small" onClick={this.startTimer}> Resume </Button> &nbsp;&nbsp;&nbsp;
              <Button disabled={!(this.state.timerOn === false && this.state.timerTime > 0)} variant="outlined" color="primary" size="small" onClick={this.resetTimer}>  Reset  </Button> &nbsp;&nbsp;&nbsp;

          </div>
        </React.Fragment>







    );
  }
}

function mapStateToProps (state) {
  return {
		workoutConfigSet: state.workoutConfigSet
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setStartTime: startTime => dispatch(setStartTime(startTime)),
    setMaxOutElapsed: maxOutElapsed => dispatch(setMaxOutElapsed(maxOutElapsed))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerComponent);
