import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Dropdown} from 'primereact/dropdown';
import {Calendar} from 'primereact/calendar';
import { setWorkoutConfiguration } from "../actions/index";
import { connect } from "react-redux";



export class ConnectedHorizontalLabelPositionBelowStepper extends Component {

  constructor(props) {
		super(props);
    //const [activeStep, setActiveStep] = React.useState(0);

		this.state = {
			max30ItemsMonth1: [
				{ label: 'Cardio Challenge', value: 'cardio-challenge-1' },
				{ label: 'Tabata Power', value: 'tabata-power-1' },
				{ label: 'Sweat Intervals', value: 'sweat-intervals-1' },
				{ label: 'Friday Fight: Round 1', value: 'friday-fight-1' },
				{ label: 'Tabata Strength', value: 'tabata-strength-1' },
				{ label: 'Pulse', value: 'pulse-1' }
			],
			selectedDate: new Date(),
			selectedWorkout: undefined,
			selectedWorkoutText: undefined,
			max30Workout: '',
			isOpen: false,
      activeStep: 0,
		};
    this.setWorkout = this.setWorkout.bind(this);
	}

  useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }));

  getSteps() {
    //return ['Select workout', 'Select date', 'Ready to go'];
    return ['Select workout', 'Ready to go'];
  }

  getStepContent = () => {
    let selectedWorkoutText = undefined;
    const max30ItemsMonth1 = [
      { label: 'Cardio Challenge', value: 'cardio-challenge-1' },
      { label: 'Tabata Power', value: 'tabata-power-1' },
      { label: 'Sweat Intervals', value: 'sweat-intervals-1' },
      { label: 'Friday Fight: Round 1', value: 'friday-fight-1' },
      { label: 'Tabata Strength', value: 'tabata-strength-1' },
      { label: 'Pulse', value: 'pulse-1' }
    ];
    switch(this.state.activeStep)
    {
      case 0:
        return (
          <>
            <Dropdown
              style={{ width: 220 }}
              value={this.state.selectedWorkout}
              options={this.state.max30ItemsMonth1}
              onChange={e => {
                this.setState({ selectedWorkout: e.target.value });
              }}
              placeholder='Select a Max 30 Workout'
            />
          </>
         );
      case 4  :
        return (
          <>
            <Calendar
              value={new Date()}
              inline={true}
              showButtonBar={true}
              onChange={e => {
                this.setState({ selectedDate: e.target.value});
              }}
            />
          </>
         );
      case 1  :
        return (
          <>
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={this.setWorkout}>
                START WORKOUT
            </Button >
          </>
         );
      default:
        return "default";
    }
  };

  setWorkout(){
    this.props.setWorkoutConfiguration({
      selectedDate: this.state.selectedDate,
      selectedWorkout: this.state.selectedWorkout
    });
  }




  handleNext = () => {
    this.setState({activeStep: this.state.activeStep + 1})
    //this.setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  handleBack = () => {
    this.setState({activeStep: this.state.activeStep - 1})
    //this.setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  handleReset = () => {
    this.setState({activeStep: 0})
    //this.setActiveStep(0);
  };

  render() {
    const steps = this.getSteps();
    const classes = this.useStyles;
    return (
      <>
        <div className={classes.root}>
          <Stepper activeStep={this.state.activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            <div>
              <this.getStepContent/>
              <br/><br/>

                <div>
                  <Button
                    disabled={this.state.activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  { this.state.activeStep !== steps.length - 1 ?
                    <Button display="none" variant="contained" color="primary" onClick={this.handleNext}>
                      {this.state.activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button> :
                        null
                  }
                </div>
            </div>
          </div>
        </div>
        <br/><br/>
      </>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    setWorkoutConfiguration: workout => dispatch(setWorkoutConfiguration(workout)),
  };
}

const HorizontalLabelPositionBelowStepper = connect(
  null,
  mapDispatchToProps
)(ConnectedHorizontalLabelPositionBelowStepper);


export default HorizontalLabelPositionBelowStepper;
