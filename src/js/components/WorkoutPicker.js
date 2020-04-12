import React, { Component } from "react";
import {Dropdown} from 'primereact/dropdown';
import Button from '@material-ui/core/Button';
import {Calendar} from 'primereact/calendar';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { connect } from "react-redux";
import { setWorkoutConfiguration } from "../actions/index";
import Modal from "react-bootstrap/Modal";



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
	}

	setWorkout(){
		this.props.setWorkoutConfiguration({
			selectedDate: this.state.selectedDate,
			selectedWorkout: this.state.selectedWorkout
		});
		this.hideModal()
	}

	showModal = () => {
		this.setState({ isOpen: true });
  };

  hideModal = () => {
		this.setState({ isOpen: false });
  };

	render() {
		return (
			<>
			<button onClick={this.showModal}>Display Modal</button>
			<h1>{this.props.selectedWorkout} </h1>
			<Modal show={this.state.isOpen} onHide={this.hideModal}>
					<Modal.Header>Hi</Modal.Header>
					<Modal.Body>
						<Dropdown
							style={{ width: 220 }}
							value={this.state.max30Workout}
							options={this.state.max30ItemsMonth1}
							onChange={e => {
								this.setState({ selectedWorkout: e.target.value });
							}}
							placeholder='Select a Max 30 Workout'
						/>
						<br /><br />
						<Calendar
							showIcon={true}
							onChange={e => {
								this.setState({ selectedDate: e.target.value });
							}}
						 />
						<br /><br />
					</Modal.Body>
					<Modal.Footer>
						<Button variant="outlined" color="primary" onClick={this.hideModal}>Cancel</Button>
						<Button variant="outlined" color="primary" onClick={this.setWorkout}> Save </Button>
					</Modal.Footer>
				</Modal>

			</>
		);
	}
}

const mapStateToProps = state => {
  return {
		selectedDate: state.selectedDate,
		selectedWorkout: state.selectedWorkout,
		workoutConfigSet: state.workoutConfigSet,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setWorkoutConfiguration: workout => dispatch(setWorkoutConfiguration(workout)),
  };
}

const WorkoutPicker = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedWorkoutPicker);

export default WorkoutPicker;
