import React from 'react';
import * as StringConstant from './String';
import axios from 'axios';
import ListComment from './Comment/ListComment';
import Typography from "@material-ui/core/Typography";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';

const useStyles = theme => ({
    table: {
      minWidth: 650,
    },
  });
class ViewTrip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trip: '',
            date: '',
            participants: 0,
            post : [],
            owner : [],
            categories: [],
            comments : [],
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        axios({
            method: 'GET',
            url: '/api/set/show',
            headers : {
                Authorization: "Bearer" + localStorage.getItem("token")
              },
            params : {
                'id' : this.props.match.params.id
            }
        }).then((response) => {
            this.setState({
                post: response.data.sets,
                owner : response.data.owner,
                comments : response.data.sets.comments,
            }
            )
            console.log(this.state.post)
        }).catch((error) => {
            // handle error
            console.log(error);
        });
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const classes = useStyles();
        if (this.state === null) return null;

        return (
            <div>
                <div >
                    <div variant="row mt-5">
                        <div variant="col-6">
                            <br></br>
                            <Typography variant="h6" id="tableTitle">
                              SETS
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableBody>
                                    <TableRow>
                                            <TableCell component="th" scope="row">Name</TableCell>
                                            <TableCell>{this.state.post.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Intro</TableCell>
                                            <TableCell>{this.state.post.intro}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Cards</TableCell>
                                            <TableCell>{this.state.post.cards_count}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Comments</TableCell>
                                            <TableCell>{this.state.post.comments_count}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Created_at</TableCell>
                                            <TableCell>{this.state.post.created_at}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Update last</TableCell>
                                            <TableCell>{this.state.post.updated_at}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">deleted_at</TableCell>
                                            <TableCell>{this.state.post.deleted_at}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Categories</TableCell>
                                            <TableCell>{this.state.categories ? this.state.categories.map(category=>{
                                                return category.name+', '
                                                }) : ''}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        
                        </div>
    
                    </div>
                    <br></br>
                    <Typography variant="h6" id="tableTitle">
                        Comment  {this.state.post.comments_count}
                    </Typography>
                    <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableBody>
                            <ListComment trip_id={this.props.match.params.id} />
                        </TableBody>
                    
                    </Table>
                    </TableContainer>
                </div>
            </div>
        )
    }

}

export default ViewTrip;