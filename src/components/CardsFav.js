import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export class CardsFav extends Component {
    render() {
        return (
            <div>
                <Card key={this.props.key} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={this.props.imageUrl} />
                    <Card.Body>
                        <Card.Title>Title:{this.props.title}</Card.Title>
                    </Card.Body>
                    <Button onClick={()=>{this.props.deleteFunc(this.props.id)}} >Delete Item!</Button>
                    <Button onClick={()=>{this.props.updateFunc(this.props.id)}} >update Item!</Button>
                </Card>
            </div>
        )
    }
}

export default CardsFav
