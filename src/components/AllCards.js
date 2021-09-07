import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export class AllCards extends Component {
    render() {
        return (
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={this.props.imageUrl} />
                    <Card.Body>
                        <Card.Title>Title:{this.props.title}</Card.Title>
                        <Button onClick={()=>{this.props.postFunc(this.props.id)}} variant="primary">Add to Favs!</Button>
                    </Card.Body>
                </Card>

            </div>
        )
    }
}

export default AllCards
