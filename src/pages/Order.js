import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import axios from 'axios';

import Toolbar from '@material-ui/core/Toolbar';
import { Link } from "react-router-dom";
import { Button, Input, TextField } from '@material-ui/core';
import { Modal } from 'react-bootstrap';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const {row} = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  // onDeleteRequest
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
        <Link key={row.user} to={`/admin/home/userdetail/${row.user_id}`}onClick={() => localStorage.setItem("admin_user", String(row.user_id))}>{row.user}</Link>
        </TableCell>
        <TableCell align="right">
        <Link key={row.trip} to={`/admin/home/tripdetail/${row.trip_id}`}onClick={() => localStorage.setItem("admin_trip", row.trip_id)}>{row.trip}</Link>
        </TableCell>
        <TableCell align="right">
        <Link key={row.owner} to={`/admin/home/userdetail/${row.owner_id}`}onClick={() => localStorage.setItem("admin_user", String(row.owner_id))}>{row.owner}</Link>
        </TableCell>

        
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>

                <Typography variant="h6" gutterBottom component="div">
                Details
                </Typography>  

              
              <Table size="small" aria-label="purchases">
                <TableBody>
                  
                <TableRow>
                    
                    <TableCell>Participants</TableCell>
                    <TableCell>{row.participants}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>{row.date}</TableCell>
                  </TableRow>


                  <TableRow>
                    <TableCell>Create at</TableCell>
                    <TableCell>{row.created_at}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Update at</TableCell>
                    <TableCell>{row.updated_at}</TableCell>
                  </TableRow>
                  
                    
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    // userName: PropTypes.string.isRequired,
    // createAt: PropTypes.string.isRequired,
    // Language: PropTypes.string.isRequired,
    // id: PropTypes.number.isRequired,
  }).isRequired,
};

class OrderTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        comments : [],
        show :false,
        name: '',
        newName:''
    }
  } 


   useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  
  componentDidMount() {
    axios({
        method: 'GET',
        url: '/api/comment/all',
        headers : {
          Authorization: "Bearer" + localStorage.getItem("token")
        },
        data: null
    }).then((response) => {
        // handle success
        this.setState({
          comments : response.data.comments,
        })
    }).catch((error) => {
        // handle error
        console.log(error);
    });
    }

     handleOpen = () => {
      this.setState({
        show : true
      })
    };
  
     handleClose = () => {
      this.setState({
        show : false
      })
    };

    onClickEdit= (id,name) => {
      
      axios({
        method : 'POST',
        url: '/api/categories/update',
        data : {
          id : id,
          name : name,
        },
        headers : {
          Authorization: "Bearer" + localStorage.getItem("token")
        },
      }).then(res => {
        window.location.reload()
        console.log(res)
      }).catch(err => {
        console.log(err.response)
      })
    }

    onClickDelete= (event,id) =>{
      id = String(id)
      console.log("id")
      console.log(id)
      event.preventDefault();
      axios({
          method: 'DELETE',
          url: '/api/comment/delete/'+ "?token=" +  localStorage.getItem("token"),
          data: {
              id : id
          }
      }).then((response) => {
          // handle success
          console.log(response.data);
          // this.state.name = response.name;
          window.location.reload();
      }).catch((error) => {
          // handle error
          console.log(error);
      });
    }

    onClickSave = (name) => {
      axios({
        method : 'POST',
        url: '/api/categories',
        data : {
          name : name,
        },
        headers : {
          Authorization: "Bearer" + localStorage.getItem("token")
        },
      }).then(res => {
        window.location.reload()
      }).catch(err => {
        console.log(err)
      })
    }

  render() {
  return (
    <>
    <Paper>
    <Toolbar>
    <div>
        <Typography variant="h6" id="tableTitle">
          List Comments
        </Typography>
    </div>
    </Toolbar>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>user</TableCell>
            <TableCell>set</TableCell>
            <TableCell>content</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.comments.map(comment=>{
             return <TableRow> <TableCell>{comment.id}</TableCell>
              <TableCell>{comment.user.name}</TableCell>
              <TableCell>{comment.set.name}</TableCell>
              <TableCell>{comment.comment}</TableCell>

              <TableCell><Button variant="contained" color="secondary" onClick={(event)=>this.onClickDelete(event,comment.id)}>Delete</Button></TableCell>
              </TableRow>
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
    </>
  );
  }
}
export default OrderTable;