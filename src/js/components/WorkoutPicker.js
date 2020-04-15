import React, { Component } from "react";
import {Dropdown} from 'primereact/dropdown';
import Button from '@material-ui/core/Button';
import {Calendar} from 'primereact/calendar';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { connect } from "react-redux";
import { setWorkoutConfiguration, saveWorkout } from "../actions/index";
import Modal from "react-bootstrap/Modal";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';



export class ConnectedWorkoutPicker extends Component {
	constructor(props) {
		super(props);

		this.state = {
			max30ItemsMonth1: [
				{ label: 'Cardio Challenge', value: 'cardio-challenge-1' },
				{ label: 'Tabata Power', value: 'tabata-power-1' },
				{ label: 'Sweat Intervals', value: 'sweat-intervals-1' },
				{ label: 'Friday Fight: Round 1', value: 'friday-fight-1' },
				{ label: 'Tabata Strength', value: 'tabata-strength-1' },
				{ label: 'Pulse', value: 'pulse-1' }
			],
			selectedDate: undefined,
			selectedWorkout: undefined,
			max30Workout: '',
			isOpen: false,
		};

		this.setWorkout = this.setWorkout.bind(this);
		this.finishWorkout = this.finishWorkout.bind(this);

	}

	setWorkout(){
		this.props.setWorkoutConfiguration({
			selectedDate: this.state.selectedDate,
			selectedWorkout: this.state.selectedWorkout
		});
		this.hideModal()
	}

	finishWorkout(){
		this.props.saveWorkout({
			userId: this.props.userId,
			maxOutElapsed: this.props.maxOutElapsed,
			selectedDate: this.props.selectedDate,
			selectedWorkout: this.props.selectedWorkout
		});
	}

	showModal = () => {
		this.setState({ isOpen: true });
  };

  hideModal = () => {
		this.setState({ isOpen: false });
  };

	useStyles = makeStyles((theme) => ({
	  root: {
	    flexGrow: 1,
	  },
	  paper: {
	    padding: theme.spacing(2),
	    textAlign: 'center',
	    color: theme.palette.text.secondary,
	  },
	}));

	ModalWorkoutConfig = () => {
		const classes = this.useStyles;

	  return (
	  <>
			<Modal show={this.state.isOpen} onHide={this.hideModal}>
				<Modal.Header>Workout configuration</Modal.Header>
				<Modal.Body>
					<div className={classes.root}>
						<Grid container spacing={3} direction="column" alignItems="center" justify="center">
							<Grid item xs={12}>
								<h5 class="d-inline-block"> Workout: </h5> &nbsp;&nbsp;&nbsp;
								<Dropdown
									style={{ width: 220 }}
									value={this.state.selectedWorkout}
									options={this.state.max30ItemsMonth1}
									onChange={e => {
										this.setState({ selectedWorkout: e.target.value });
									}}
									placeholder='Select a Max 30 Workout'
								/>
							</Grid>
							<Grid item xs={12}>
								<h5 class="d-inline-block"> Date: </h5	> &nbsp;&nbsp;&nbsp;
								<Calendar
									value={new Date()}
									showButtonBar={true}
									onChange={e => {
										this.setState({ selectedDate: e.target.value });
									}}
								/>
							</Grid>
						</Grid>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outlined" color="secondary" onClick={this.hideModal}>Cancel</Button>
					&nbsp;&nbsp;&nbsp;
					<Button variant="outlined" color="primary" onClick={this.setWorkout}> Save </Button>
				</Modal.Footer>
			</Modal>

			<br/><br/>
			<Button
				size="large"
				variant="contained"
				color="primary"
				onClick={this.finishWorkout}>
					Save!
			</Button >

	  </>
	);
	}

	render() {
		return (
			<>
			<Button variant="outlined" color="primary" onClick={this.showModal}>Configure Workout</Button>
			<h1>{this.props.selectedWorkout} </h1>
			<this.ModalWorkoutConfig/>

			</>
		);
	}
}

const mapStateToProps = state => {
  return {
		userId: state.userId,
		selectedDate: state.selectedDate,
		selectedWorkout: state.selectedWorkout,
		workoutConfigSet: state.workoutConfigSet,
		maxOutElapsed: state.maxOutElapsed,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setWorkoutConfiguration: workout => dispatch(setWorkoutConfiguration(workout)),
    saveWorkout: dataWorkout => dispatch(saveWorkout(dataWorkout)),
  };
}

const WorkoutPicker = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedWorkoutPicker);

export default WorkoutPicker;
