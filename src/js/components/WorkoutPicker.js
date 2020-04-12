import React, { Component } from "react";
import {Dropdown} from 'primereact/dropdown';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { connect } from "react-redux";
import { setWorkout } from "../actions/index";



export class WorkoutPicker extends Component {
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
			max30Workout: ''
		};
	}

	setWorkout(workout){
		this.setState({ max30Workout: workout });
		this.props.setWorkout(workout)
	}

	render() {
		return (
			<div>
				<Dropdown
					style={{ width: 220 }}
					value={this.state.max30Workout}
					options={this.state.max30ItemsMonth1}
					onChange={e => {
						this.setWorkout(e.value)
					}}
					placeholder='Select a Max 30 Workout'
				/>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
  return {
    setWorkout: workout => dispatch(setWorkout(workout)),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(WorkoutPicker);
