import React, { useState, useEffect } from 'react';
import{ TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Container, Form } from 'reactstrap';
import StoreManagerPanal from './StoreManagerRegister/StoremanagerPanal';
import ProductCategoryPanal from './ProductCategory/createcategoryPanal';
import AdminChrats from './admincart/stormanagerchart'
import CartCharts from './Graphs/CartGraphs'
import OrderTable from './Order/orderTable'
import classnames from 'classnames';
import { GiTShirt } from "react-icons/gi";
import {GrUserManager} from "react-icons/gr";
import {GoPackage} from "react-icons/go"
// Student id :IT18045840
//Name :S.D.S.L Dissanayake




//redirect to storemanager
const handleStoreManager=()=>{
  window.location='/storeManager';

}
//redirect to product category

const handleProductCategory=()=>{
  window.location='/productcategory';

}
//redirect to ordermanager

const handleOrderManagemet=()=>{
  window.location='/orderDashbord';

}








export default function Admindashbord() {

  useEffect(() => {
    if(!(localStorage.getItem('type')=='admin')){
        window.location.href="/"
    }
  });
    
    return (
      <Container>
        <Row>
        <Col><h3>Admin Dashbord</h3></Col>
      </Row>
      <Row style={iconpanalStyle}>
        <Col style={storeManagerColor} onClick={handleStoreManager}>
          <h2>Store Manager</h2>
          <GrUserManager size="3em" color="black" />
        </Col>
        <Col style={productCategoryanagerColor} onClick={handleProductCategory}>
          <h2>Product Category </h2>
          <GiTShirt size="3em" color="black"/>
        </Col>
        <Col style={col3} onClick={handleOrderManagemet}>
          <h2>Order Managment</h2>
          <GoPackage size="3em" color="black"/>
        </Col>
        
      </Row>
       <Row>
          <Col><AdminChrats></AdminChrats></Col>
            <Col> <CartCharts/> </Col>     
      </Row> 

      </Container>
     
    )
  }




const iconpanalStyle={
    padding: '10px',
    borderRadius: '8px',
    minHeight: '80px'
}

const storeManagerColor={
  backgroundImage: 'linear-gradient(to right top, #ee35ee, #cf2ff3, #aa2ff7, #7c32fa, #2d36fd)',
  borderRadius: '8px',
  margin: '4px',
  padding: '10px',
  boxShadow: '-1px 0px 5px black'

}

const productCategoryanagerColor={
  backgroundImage: 'linear-gradient(to right top, #ee3535, #ff1158, #ff0080, #ff00ab, #fd2dd9)',
  borderRadius: '8px',
  margin: '4px',
  padding: '10px',
  boxShadow: '-1px 0px 5px black'
}

const col3={
  backgroundImage: 'linear-gradient(to right top, #eec635, #f6a819, #fc870f, #fe621c, #fd2d2d)',
  borderRadius: '8px',
  margin: '4px',
  padding: '10px',
  boxShadow: '-1px 0px 5px black'

}

const col4={
  backgroundImage: 'linear-gradient(to right top, #35ee8d, #6cf477, #95f860, #bcfc48, #e2fd2d)',
  borderRadius: '8px',
  margin: '4px',
  padding: '10px'
}




