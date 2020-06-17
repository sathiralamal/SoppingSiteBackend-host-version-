import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Redirect, Route, Switch,BrowserRouter as Router } from "react-router-dom";
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import Register from "../Register"
import '../../../css/flaticon.css';
import '../../../css/font-awesome.min.css';
import fakeAuth from "../fakeAuth"
import axios from 'axios';
import UserProfile2 from "../UserProfile/Userprofile2"

import alertify from "alertifyjs/build/alertify";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.min.css";
class Login2 extends Component {
    constructor(props) {
		super(props);
		this.state = {
      large: false,
      large1: false,
      redirectToReferrer:false,
      Username:"",
    newPassword:"",

      
    };
	
	
    this.toggleLarge = this.toggleLarge.bind(this);
    
		
    }
    
componentDidMount=()=>{
  //localStorage.clear();
}

    //loggedIn: BehaviorSubject<boolean>

  

  //   login = () => {
  //     fakeAuth.authenticate(() => {
  //       this.setState(() => ({
  //         redirectToReferrer: true
  //       }))
  //     })
  //   }

	toggleLarge() {
		this.setState({
		  large: !this.state.large,
		});
    }

    toggleLarge1=()=> {
      this.setState({
        large1: !this.state.large1,
      });
      }
    
    onchangeHandler=(e)=>{
      this.setState({
        [e.target.name]:e.target.value
      })
    }

    submithandler=(e)=>{
e.preventDefault();
      const data={
        newPassword:this.state.newPassword,
        Username:this.state.Username,
       
      }
      try {
           axios.post(global.backend+"/login/login", data).then((res) => {
             if(res.data.success===true)
             {

             
localStorage.setItem("AccessToken",res.data.accessToken);
localStorage.setItem("type",res.data.type);
localStorage.setItem("id",res.data.id);
localStorage.setItem("name",res.data.data.Username);

alertify.success("Successfully logged in");

if(res.data.type==="payadmin")
{
  window.location.href="/payAdmin"
}else
if(res.data.type==="admin"){

  window.location.href="/adminDashboard"

}else
if(res.data.type==="store_manager")
{
  window.location.href="/Myshop"
}else{

  global.name=res.data.data.Username;
  console.log(res.data.data.Username)
  console.log("this is name"+global.name)
  if(res.data.data.address1===""||res.data.data.address2===""||res.data.data.nic==="")
  {
    this.toggleLarge1();
    
  }else{
    window.location.href="/";
  }
}
             }else{

              alertify.alert(res.data.err);
             }
            
           });
          
         } catch (e) {

          alertify.alert("Unable to login");
         }
    }
    render() { 

     
    
        return (<div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col >
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.submithandler}>
                     
                      <h3>Login to proceed</h3>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="flaticon-profile"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" name="Username" value={this.state.Username} onChange={this.onchangeHandler} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="flaticon-unlock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="newPassword" name="newPassword" value={this.state.newPassword} onChange={this.onchangeHandler}/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Link to="/forgotpassword">
                          <Button color="link" onClick={()=>this.props.toggle} className="px-0">Forgot password?</Button>
                          </Link>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '100%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Join Divisima and get all your clothin items under one roof. All convinient methods to provide 
                          you with the best services. Don't wait. Hurry join us!!!!
                      </p>
                      <Link to="/Register">
                    <Button onClick={this.props.toggle} >Sign Up</Button>
                    </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>


        <Modal isOpen={this.state.large1} toggle={this.toggleLarge1}
      className={'modal-lg ' + this.props.className}>
        <ModalHeader>Update your info</ModalHeader>
    <ModalBody>
   <UserProfile2/>
   </ModalBody>
   <ModalFooter>

     <Button color="secondary" onClick={()=>{this.toggleLarge1();window.location.href="/";}}>Skip</Button>
   </ModalFooter>
 </Modal>
      </div> );
    }
}
 
export default Login2;