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
} from "reactstrap";
import axios from "axios";
import alertify from "alertifyjs/build/alertify";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.min.css";


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Fullname: "",
      Username: "",
      email: "",
      type:"user",
      Valid: [false, false, false, false, false],
      Invalid: [false, false, false, false, false],
     
    };
  }

  onChangeHandler = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => console.log(this.state.newPassword)
    );

  };

  
  submitHandler = (e) => {
    e.preventDefault();
   
    const data = this.state;

    
    delete data.Valid;
    delete data.Invalid;
    document.getElementById('preloder').style.display="block";

    try {
      axios.post(global.backend+"/user/addUser", data).then((res) => {
        console.log(res);
        console.log(res.data);
        if(res.data.success===true)
        {
          setTimeout(()=>{
            document.getElementById('preloder').style.display="none";
           
        },400);

        alertify.success("Successfully registered");
          alertify.alert("Email sent..please click on link for registration complete")

        
          
          
        }else{
          
            setTimeout(()=>{
              document.getElementById('preloder').style.display="none";
             
          },400);

          alertify.alert("Error registering please contact administrator "+res.data.err);
        }
        

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
                    <h3>Register</h3>
                    <p className="text-muted">Create your account</p>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="flaticon-profile"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Full Name"
                        name="Fullname"
                        autoComplete="Fullname"
                        valid={this.state.Valid[0]}
                        invalid={this.state.Invalid[0]}
                        value={this.state.Fullname}
                        onChange={this.onChangeHandler}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="flaticon-profile"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Username"
                        name="Username"
                        autoComplete="Username"
                        valid={this.state.Valid[1]}
                        invalid={this.state.Invalid[1]}
                        value={this.state.Username}
                        onChange={this.onChangeHandler}
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Email"
                        name="email"
                        className="form-control-warning"
                        valid={this.state.Valid[2]}
                        invalid={this.state.Invalid[2]}
                        autoComplete="email"
                        value={this.state.email}
                        onChange={this.onChangeHandler}
                      />
                    </InputGroup>
                    {/* <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="flaticon-unlock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Password"
                        className="form-control-success"
                        name="newPassword"
                        valid={this.state.Valid[3]}
                        invalid={this.state.Invalid[3]}
                        autoComplete="new-password"
                        value={this.state.newPassword}
                        onChange={this.onChangeHandler}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="flaticon-unlock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Repeat password"
                        name="newPasswordck"
                        autoComplete="new-password"
                        valid={this.state.vidula}
                        invalid={this.state.malidi}
                        onChange={this.handlePasswordConfirm}
                      />
                    </InputGroup> */}

                    <Button type="submit" color="success" block>
                      Create Account
                    </Button>
                  </Form>
                </CardBody>
                {/* <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block>
                        <span>facebook</span>
                      </Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block>
                        <span>twitter</span>
                      </Button>
                    </Col>
                  </Row>
                </CardFooter> */}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
