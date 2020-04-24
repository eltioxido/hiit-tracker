import React, { Component } from "react";
import { connect } from "react-redux";
import { getBestLastWorkout, setHome } from "../actions/index";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';



export class BestLastComponent extends Component {

  componentDidMount() {
      this.props.getBestLastWorkout({
        parameters:{
          workout: this.props.selectedWorkout,
          isBestWorkout: true
        }})
  }


  render() {

    return (
      <>
        { this.props.bestWorkout !== undefined ? 
        <>
          <br/>
          <h5> Best time ({this.props.bestWorkout.selectedDate})  </h5>
          <h2> {this.props.bestWorkout.maxOutElapsed} </h2>
        </> : null }
      </>
    );
  }
}

function mapStateToProps (state) {
  return {
    bestWorkout: state.bestWorkout,
    selectedWorkout: state.selectedWorkout
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getBestLastWorkout: parameters => dispatch(getBestLastWorkout(parameters))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BestLastComponent);
