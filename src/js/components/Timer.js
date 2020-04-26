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
          { true ? null: null}
          <h1 style={{fontSize: '7rem'}}> {minutes}:{seconds} </h1>
          </div>


          <div>


              <br /><br />
              <Button
                style={{width: '180px', height: '63px'}}
                disabled={!(this.state.timerOn === true)}
                size="large"
                variant="contained"
                color="primary"
                onClick={() => this.setMaxOutElapsed()}>
                  <span style={{fontSize: '1.5rem'}}>Max Out!</span>
              </Button >
              <br /><br />
              { this.state.timerOn === false ?
                <>
                <Button disabled={!(this.state.timerOn === false && this.state.timerTime === 0)} variant="outlined" onClick={() => this.startTimer()}> Start </Button> &nbsp;&nbsp;
                </> : null
              }
              <Button disabled={!(this.state.timerOn === true)} variant="outlined" size="small"  onClick={this.stopTimer}> Pause </Button> &nbsp;&nbsp;
              <Button disabled={!(this.state.timerOn === false && this.state.timerTime > 0)} variant="outlined" size="small" onClick={this.startTimer}> Resume </Button> &nbsp;&nbsp;
              <Button disabled={!(this.state.timerOn === false && this.state.timerTime > 0)} variant="outlined" size="small" onClick={this.resetTimer}>  Reset  </Button> &nbsp;&nbsp;

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
