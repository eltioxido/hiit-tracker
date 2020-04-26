import React, { Component } from "react";
import { connect } from "react-redux";
import { saveWorkout } from "../actions/index";
import Button from '@material-ui/core/Button';




export class ConnectedMaxOut extends Component {

  constructor(props) {
		super(props);

		this.finishWorkout = this.finishWorkout.bind(this);


	}

  finishWorkout(){
    this.props.saveWorkout({
      userId: this.props.user.sub,
      email: this.props.user.email,
      maxOutElapsed: this.props.maxOutElapsed,
      selectedDate: this.props.selectedDate,
      selectedWorkout: this.props.selectedWorkout
    });
  }

  convertHMS (value) {
      let sec = parseInt(value) / 1000;
      let hours   = Math.floor(sec / 3600)
      let minutes = Math.floor((sec - (hours * 3600)) / 60)
      let seconds = parseInt(sec - (hours * 3600) - (minutes * 60))
      if (minutes < 10) { minutes = "0" + minutes }
      if (seconds < 10) { seconds = "0" + seconds }
      return minutes + ':' + seconds
  };


  render() {
		//const test = this.state.max30ItemsMonth1.find(item => item.value === this.state.selectedWorkout);
		return (
			<>
        <div>
          <div>
            <br/><br/>
            {this.props.maxOutTime !== undefined && !this.props.insertedWorkout?
              <>
                <h2> Maxed Out at </h2>
                <h1> <b>  {this.convertHMS(this.props.maxOutTime)} </b> </h1>
                <Button
          				size="large"
                  variant="outlined"
                  color="primary"
          				onClick={this.finishWorkout}>
          					Save
          			</Button >
              </> :
              null
            }
            { this.props.insertedWorkout ?
              <h2> {this.props.message} </h2> : null
            }
            <br/><br/><br/>
          </div>
        </div>
      </>
    );
  }
}


const mapStateToProps = state => {
  return {
		user: state.user,
		selectedDate: state.selectedDate,
		selectedWorkout: state.selectedWorkout,
		workoutConfigSet: state.workoutConfigSet,
		maxOutElapsed: state.maxOutElapsed,
    maxOutTime: state.maxOutElapsed,
    message: state.message,
    insertedWorkout: state.insertedWorkout,
    token: state.token,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    saveWorkout: dataWorkout => dispatch(saveWorkout(dataWorkout)),
  };
}


const MaxOutComponent = connect(mapStateToProps, mapDispatchToProps)(ConnectedMaxOut);

export default MaxOutComponent;
