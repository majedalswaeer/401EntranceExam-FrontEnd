import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '././MyFavorites.js';
import { withAuth0 } from '@auth0/auth0-react';
import Form from 'react-bootstrap/Form'
import CardsFav from './CardsFav.js';
import Button from 'react-bootstrap/Button';

const axios = require('axios');

class MyFavorites extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mainFavArr: [],
      desigredUpdateOb: {},
      showForm: false,
    }
  }



  componentDidMount = async () => {
    const { user, isAuthenticated } = this.props.auth0
    let emailAd = user.email

    let getFav = await axios.get(`http://localhost:3001/getFav/${emailAd}`)

    this.setState({
      mainFavArr: getFav.data
    })



  }

  deleteFunc = async (itemID) => {
    const { user, isAuthenticated } = this.props.auth0
    let emailAd = user.email

    let deleteReq = await axios.delete(`http://localhost:3001/deleteFunc/${itemID}/${emailAd}`)

    this.setState({
      mainFavArr: deleteReq.data
    })

  }

  updateFunc = async (itemID) => {
    const { user } = this.props.auth0
    let emailAd = user.email

    let updatedItem = this.state.mainFavArr.find(element => {
      return element._id === itemID
    })
    await this.setState({
      desigredUpdateOb: updatedItem,
      showForm: true
    })
  }

  updateFromDataBase=async(e)=>{
    e.preventDefault();
    const { user } = this.props.auth0
    let emailAd = user.email
    let id=this.state.desigredUpdateOb._id
    let itemInfo={
      title:e.target.title.value,
      imageUrl:e.target.imageUrl.value,
      _id:this.state.desigredUpdateOb._id,
      email:user.email
    }
    

    let updateReq=await axios.put(`http://localhost:3001/updateFunc/${emailAd}/${id}`,itemInfo)
    console.log('newwwwwData',updateReq)

    await this.setState({
      mainFavArr: updateReq.data,
      showForm: false
    })
  }

  render() {
    return (
      <>
        <h1>My Favorites</h1>
        <p>
          This is a collection of my favorites
        </p>

        {this.state.mainFavArr.map((element, idx) => {
          return (
            <CardsFav
              key={idx}
              imageUrl={element.imageUrl}
              title={element.title}
              id={element._id}
              deleteFunc={this.deleteFunc}
              updateFunc={this.updateFunc}
            />
          )

        })}

        {this.state.showForm && <Form onSubmit={this.updateFromDataBase} >
          <Form.Group className="mb-3" controlId="lInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" defaultValue={this.state.desigredUpdateOb.title} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="Textarea1">
            <Form.Label>Image Url</Form.Label>
            <Form.Control type="text" name="imageUrl" defaultValue={this.state.desigredUpdateOb.imageUrl} />
            <Button type="submit" >Update</Button>
          </Form.Group>
        </Form>}
      </>
    )
  }
}

export default withAuth0(MyFavorites);

