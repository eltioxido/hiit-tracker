import React, { Component } from "react";
import { connect } from "react-redux";
import { getWorkouts, setHome } from "../actions/index";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';



export class ListComponent extends Component {

  StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);


  StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);

  useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });


  componentDidMount() {
      this.props.getWorkouts()
  }

  handleClick(){
    this.props.setHome(false)
  }

  render() {

    const classes = this.useStyles;

    return (
      <>

        <br/><br/><br/>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={this.handleClick.bind(this)}>
            I want to MaxOut!
        </Button >
        <br/><br/><br/>

        <TableContainer>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <this.StyledTableCell>Date</this.StyledTableCell>
                <this.StyledTableCell>Workout</this.StyledTableCell>
                <this.StyledTableCell>Max out time</this.StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.workouts.map((row) => (
                <TableRow key={row._id}>
                  <this.StyledTableCell>{row.selectedDate}</this.StyledTableCell>
                  <this.StyledTableCell>{row.selectedWorkout}</this.StyledTableCell>
                  <this.StyledTableCell>{row.maxOutElapsed}</this.StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </TableContainer>
    </>
    );
  }
}

function mapStateToProps (state) {
  return {
		workouts: state.workouts
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getWorkouts: () => dispatch(getWorkouts()),
    setHome: home => dispatch(setHome(home))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListComponent);
