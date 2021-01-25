import React from 'react';
import * as StringConstant from './String';
import axios from 'axios';
import Typography from "@material-ui/core/Typography";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import { Button, ButtonGroup } from '@material-ui/core';

const useStyles = theme => ({
    table: {
      minWidth: 650,
    },
  });
class UserDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            role: '',
            profile : [],
            categories: [],
            posts: [],
        }
    }

    componentDidMount() {
        // axios({
        //     method: 'GET',
        //     url: 'https://mighty-retreat-21374.herokuapp.com/api/admin/user' + localStorage.getItem("token") + '&user_id=' + localStorage.getItem("admin_user"),
        //     data: null
        // }).then((response) => {
        //     // handle success
        //     console.log(response.data);
        //     // this.state.name = response.name;
        //     // this.state.email = response.email;
        //     this.setState({
        //         user: response.data.user,
        //         role: response.data.role.name
        //     }
        //     )
        // }).catch((error) => {
        //     // handle error
        //     console.log(error);
        // });
        axios({
            method:'GET',
            url: '/api/admin/user/show',
            headers : {
                Authorization: "Bearer" + localStorage.getItem("token")
            },
            params: {
                id : localStorage.getItem("admin_user")
            },
      }).then(res => {
          console.log(res.data)
          if(res.status === 200){
              this.setState({
                  user:res.data.user,
                  profile: res.data.user.profile,
                  skill : res.data.user.skills,
                  categories : res.data.user.categories,
                  posts : res.data.user.sets
              })
              console.log(this.state.user)
          }
      }).catch(errors => {
        console.log(errors.response);
        alert(errors.response.data.errors)
      })
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onClickBan=(event) =>{
        axios({
          method : 'DELETE',
          url : '/api/admin/user/delete',
          data : {
            "id" : event
          },
          headers : {
            Authorization: "Bearer" + localStorage.getItem("token")
          },
        }).then(res =>{
          window.location.reload()
        })
      }
    
      onClickUnBan=(event) =>{
        axios({
          method : 'POST',
          url : '/api/admin/user/restore',
          data : {
            "id" : event
          },
          headers : {
            Authorization: "Bearer" + localStorage.getItem("token")
          },
        }).then(res =>{
          window.location.reload()
        })
      }

    render() {
        const classes = useStyles();
        if (this.state === null) return null;

        return (
            <div>
                {/* <div className="banner" style={{ backgroundImage: "url(" + StringConstant.IMAGE_PATH + this.state.profile.cover + ")" }}></div> */}
                <img className="avatar" alt="avatar" src={this.state.profile.avatar} />
                <div >
                    <div variant="row mt-5">
                        <div variant="col-6">
                            <br></br>
                            <Typography variant="h6" id="tableTitle">
                              User Informations     
                              <ButtonGroup size="small" aria-label="small outlined button group">
                              {this.state.user.deleted_at ? 
                              <>
                              <Button variant="contained" color="primary" onClick={()=>this.onClickUnBan(this.state.user.id)}>  UnBan</Button>
                                </>
                            :
                            <>
                              <Button variant="contained" color="secondary" onClick={()=>this.onClickBan(this.state.user.id)}>   Ban</Button>
                            </> 
                              }
                            </ButtonGroup>
                              
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Name</TableCell>
                                            <TableCell>{this.state.user.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Email</TableCell>
                                            <TableCell>{this.state.user.email}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Subject</TableCell>
                                            <TableCell>{this.state.profile.subject} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Github</TableCell>
                                            <TableCell>{this.state.profile.github}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Facebok</TableCell>
                                            <TableCell>{this.state.profile.facebook}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Twitter</TableCell>
                                            <TableCell>{this.state.profile.twitter}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">website</TableCell>
                                            <TableCell>{this.state.profile.website}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">status</TableCell>
                                            <TableCell>{this.state.profile.status}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        
                        </div>
    
                    </div>
                    <br></br>
                    
                    <Typography variant="h6" id="tableTitle">
                        Sets {this.state.user.sets_count}
                    </Typography>
                    {
                        this.state.posts ? 
                        this.state.posts.map(post => {
                            return <>
                                    <h2>
                                        <a href={'/admin/home/category/'+post.id}>
                                            {post.name}
                                        </a>
                                        </h2> 
                                    </>
                        })
                        
                        :
                        <>
                        </>
                    }
                </div>
            </div>
        )
    }

}

export default UserDetail;