import React, { Component } from 'react';
import { Container, Row, Col,Alert } from 'reactstrap';
import ProductCategoryForm from './productcategoryform';
import ProductCategoryTable from './productcategorytable';

// Student id :IT18045840
//Name :S.D.S.L Dissanayake

export default class Createcategory extends Component {
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
                    <Row  >
                        <Col  style={colStyleheder}>
                            <h1>Product Category</h1>
                        </Col>
                    </Row>
                    <Row  >
                        <Col  style={colStyle}>
                             <ProductCategoryForm/>
                        </Col>
                        <Col xs="auto" style={colStyle}>
                             <ProductCategoryTable/>
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