import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import AllCards from './AllCards';
import MyFavorites from './MyFavorites';
const axios = require('axios');



class AllDataAPI extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mainArr: [],
            favItem:{},
            favArrSelected:[]
        }
    }


    componentDidMount = async () => {

        let allData= await axios.get(`https://ltuc-asac-api.herokuapp.com/allChocolateData`)

        this.setState({
            mainArr:allData.data,
        })
        console.log(this.state.mainArr)

    }


    postFunc=async(itemID)=>{
        const {user}=this.props.auth0
        let emailAd=user.email

        let selectedItem=this.state.mainArr.find(element=>{
            return element.id===itemID
        })

        await this.setState({
            favItem:selectedItem,
        })

        let cardInfo={
            id:this.state.favItem.id,
            title:this.state.favItem.title,
            imageUrl:this.state.favItem.imageUrl,
            email:emailAd,
        }

    

        let postReq= await axios.post(`http://localhost:3001/postFunc/${itemID}/${emailAd}`, cardInfo)

        await this.setState({
            favArrSelected:postReq.data
        })
    }

    

    render() {
        return (
            <>
            <div>
                <h1>All Data from the API</h1>
                <h3>Select your favorites :)</h3>
            </div>

            {this.state.mainArr.map((element,idx)=>{
                return (
                    <AllCards
                    key={idx}
                    title={element.title}
                    imageUrl={element.imageUrl}
                    id={element.id}
                    postFunc={this.postFunc}
                    />
                )

            })}
            </>
        )
    }
}

export default withAuth0(AllDataAPI);
