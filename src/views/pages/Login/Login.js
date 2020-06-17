//General Login UI by V.D Dantanarayana
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

import alertify from "alertifyjs/build/alertify";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.min.css";
class Login extends Component {
    constructor(props) {
		super(props);
		this.state = {
		  large: false,
      redirectToReferrer:false,
      Username:"",
    newPassword:"",

      
    };
	
	
    this.toggleLarge = this.toggleLarge.bind(this);
    
		
    }
    
   componentDidMount=()=>{
     if(this.props.location.state===undefined)
     {
      this.props.history.push('/login', { from: '/',msg:"Welcome"});
     }
     alertify.error(this.props.location.state.msg);

    localStorage.clear();
    
    
   }


	toggleLarge() {
		this.setState({
		  large: !this.state.large,
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
              this.setState({
                large:false
              });
              window.location.reload();
              alertify.success("Successfully logged in");

             }else{
              alertify.error(res.data.err);

             }

            
           });
         } catch (e) {

          console.log(e.response.status);
         }
    }
    render() { 

     
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        
    
        if (localStorage.getItem("AccessToken")!==null) {
          return <Redirect to={from.pathname} />
        }

      console.log(this.props.location.state)
    
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
                          <Button color="link" className="px-0">Forgot password?</Button>
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
      </div> );
    }
}
 
export default Login;