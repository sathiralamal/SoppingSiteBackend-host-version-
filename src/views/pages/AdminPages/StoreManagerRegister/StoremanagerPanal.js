import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import StoreManagerForm from './storemanagerform';
import StoreManagerTable from './storemanagertable'

// Student id :IT18045840
//Name :S.D.S.L Dissanayake
export default class StoremanagerPanal extends Component {

constructor(props){
    super()
}

componentDidMount(){
    
    if(!(localStorage.getItem('type')=="admin")){
        window.location.href="/"
    }
}



    render() {
        return (
    <Container style={divStyle}>
            <Row>
                <Col  style={colStyleheder}>
                    <h2>StoreManager Controler</h2>
                </Col>
            </Row>
            <Row xs="auto">
                <Col  style={colStyle}>
                    <StoreManagerForm/>
                </Col>
                
            </Row>
            <Row>
            <   Col  style={colStyle}>
                    <StoreManagerTable/>
                </Col>
            </Row>
          
    </Container>
        )
    }
}


const divStyle={
    width:'100%',
    backgroundColor:'#F6F6F6'
}

const colStyle={
    padding:'5px'
}

const colStyleheder={
    backgroundColor:"white",
    padding: '10px',
    borderRadius:'10px'
}