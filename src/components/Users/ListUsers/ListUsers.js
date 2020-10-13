import React, { Component } from 'react'
import UserDataService from "../../../services/user.service";
import {useStyles, useStyles1} from './ListUsers.styles'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Container, Fab, IconButton, useTheme } from '@material-ui/core';
import { Add, Delete, Edit, FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@material-ui/icons';
import { Link, Redirect, Route } from 'react-router-dom';
import AddUser from '../AddUsers/AddUser';


const createData = (name, phone_number, address, email, options) => {
  return { name, phone_number, address, email, options }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


class ListUsers extends Component {
  state = {
    loading: true,
    users: [],    
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    UserDataService.getAllUsers()
      .then(response => {
        this.setState({
          users: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });

    // this.setState({ loading: false, users: (UserDataService.getAllUsers()) || [] });
    
  }

  

  savePost = async (post) => {
    if (post.id) {
      await this.fetch('put', `/posts/${post.id}`, post);
    } else {
      await this.fetch('post', '/posts', post);
    }

    this.props.history.goBack();
    this.getPosts();
  }

  renderAddUser = ({ match: { params: { id } } }) => {
    if (this.state.loading) return null;
    const post = find(this.state.posts, { id: Number(id) });

    if (!post && id !== 'new') return <Redirect to="/posts" />;

    return <AddUser post={post} onSave={this.savePost} />;
  };

  deleteUser(user) {
    if (window.confirm(`Are you sure you want to delete "${user.name}"`)) {
      UserDataService.deleteUser(user.id)
      .then(response => {
        console.log(response.data);
        this.getUsers();
        
      })
      .catch(e => {
        console.log(e);
      });
      this.getUsers();
    }
  }

  
  
  render() {
    const classes = useStyles;
    const {users} = this.state
    return (
      <Container>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Nombre</TableCell>
                <TableCell align="center">Telefono</TableCell>
                <TableCell align="center">Dirección</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.name}>
                  <TableCell align="center" component="th" scope="row">
                    {user.name}    
                  </TableCell>
                  <TableCell align="center">{user.phone_number}</TableCell>
                  <TableCell align="center">{user.address}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">
                  <IconButton aria-label="edit">
                    <Edit />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={this.deleteUser(user)}>
                    <Delete />
                  </IconButton>
                  
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fab}
          component={Link}
          to="/users/new"
        >
          <Add />
        </Fab>  
        <Route exact path="/users/:id" render={this.renderAddUser} />
    </Container>
    );
  }
}

export default ListUsers;