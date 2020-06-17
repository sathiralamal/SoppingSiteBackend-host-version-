//Register verify by V.D Dantanarayana
import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  FormFeedback 
} from "reactstrap";
import axios from "axios";
import queryString from 'query-string';

import alertify from "alertifyjs/build/alertify";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.min.css";

class registerVerify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token:"",
      userId:"",
      password:"",
      confirmPass:"",
      valid:false,
      invalid:false,
      valid1:false,
      invalid1:false,
    };
  }


  componentDidMount=()=>{
    
    const values = queryString.parse(this.props.location.search)
console.log(values)
console.log(this.props.location.search)
    if(values.token===undefined||values.user_id===undefined)
    {
      alertify.alert("Unable to register. Please contact system administrator or check your email inbox for registration link");
      window.location.href="/";
    }else{

      this.setState({
        token:values.token,
        userId:values.user_id
      })

      console.log("value of token"+values.token)
console.log("value of userID"+values.user_id)
    }

    }


  onChangeHandler=(e)=>{

    this.setState({
      [e.target.name]:e.target.value
    })

    if(e.target.value.length<7)
    {
      console.log("visited")
      this.setState(
        {
          valid1: false,
          invalid1: true,
        }
      );

    }else{
      console.log("visited 2")
      this.setState(
        {
          invalid1: false,
          valid1: true,
        }
      );

    }
   
  }

  HandlepasswordConfirm=(e)=>{

    if (e.target.value === this.state.password) {
      this.setState(
        {
          valid: true,
          invalid: false,
        }
      );
    } else {
      this.setState(
        {
          invalid: true,
          valid: false,
        }
      );
    }
    // console.log(this.state.malidi);
  
  }

  submitHandler = (e) => {
    e.preventDefault();
    // alertify.notify("sample", "success", 5, function () {
    //   console.log("dismissed");
    // });
    // const data = this.state;

    // delete data.confirmPass;
    // delete data.valid;
    // delete data.invalid;
    // delete data.valid1;
    // delete data.invalid1;

    const data={
      id:this.state.userId,
      newPassword:this.state.password,
      token:this.state.token

    }
    document.getElementById('preloder').style.display="block";
    try {
      axios.post(global.backend+"/user/addtoken", data).then((res) => {
        console.log(res);
        console.log(res.data);
        setTimeout(()=>{
          document.getElementById('preloder').style.display="none";
         
      },400);
      window.location.href="/Login2"
      alertify.alert("login to continue")
      });
    } catch (e) {
      console.log(e)
    }
  };
  render() {
    return (
      <div className="app flex-row align-items-center">
          <div id="preloder">
                <div className="loader"></div>
            </div>

            <p style={{display:"none"}}>{setTimeout(()=>{
            document.getElementById('preloder').style.display="none";
        },400)}</p>
        
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
              <CardBody className="p-4">
                  <Form onSubmit={this.submitHandler}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    
                 
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <i className="flaticon-unlock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" name="password" value={this.state.password} autoComplete="new-password" valid={this.state.valid1} invalid={this.state.invalid1} onChange={this.onChangeHandler}/>
                      <FormFeedback>Password length should be more than 7</FormFeedback>
                    </InputGroup>
                    
                    
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                        <i className="flaticon-unlock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" name="confirmPass" autoComplete="new-password" valid={this.state.valid} invalid={this.state.invalid} onChange={this.HandlepasswordConfirm}/>
                      <FormFeedback>Passwords doesn't match</FormFeedback>
                    </InputGroup>
                    <Button color="success" block>Create Account</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default registerVerify;
