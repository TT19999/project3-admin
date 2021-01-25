import React from 'react';
import axios from 'axios';
import Comment from './Comment';
import TableRow from "@material-ui/core/TableRow";
import TableContainer from '@material-ui/core/TableContainer';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Paper from '@material-ui/core/Paper';
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { TableCell } from '@material-ui/core';

class ListComment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listComment: [],
        };
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: '/api/set/comment',
            params: {
                set_id : this.props.trip_id
            },
            headers : {
                Authorization: "Bearer" + localStorage.getItem("token")
              },
        }).then((response) => {
            // handle success
            console.log('a');
            // this.state.name = response.name;
            // this.state.email = response.email;
            this.setState({
                listComment: response.data.comments
            })
            
        }).catch((error) => {
            // handle error
            console.log(error);
        });
    }
    deleteComment = (event,id) =>{
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

    render() {
        let comments = this.state.listComment.map((comment, index) => {
            return (
                <TableRow>
                    <TableCell style={{width:"95%"}} size="medium">
                    <Comment comment={comment} />
                    </TableCell>
                    <IconButton style={{marginTop: 50}} aria-label="Delete">
                        <DeleteIcon onClick={event => this.deleteComment(event, comment.id)}/>
                    </IconButton>
                </TableRow>
                
            )
        })
        return (
            <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableBody>
                {comments}
                </TableBody>
            
            </Table>
            </TableContainer>
        )
    }
}
export default ListComment;