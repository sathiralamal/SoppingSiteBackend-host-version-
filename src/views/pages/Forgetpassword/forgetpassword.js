//Forget password by V.D Dantanarayana
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


class forgetpassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
   
      email: "",
     
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

  //Submit handler for forgetpassword
  submitHandler = (e) => {
    e.preventDefault();
   
    const data = this.state;

    
    delete data.Valid;
    delete data.Invalid;
    document.getElementById('preloder').style.display="block";

    try {
      axios.post(global.backend+"/user/forgotpassword", data).then((res) => {
        console.log(res);
        console.log(res.data);
        if(res.data.success===true)
        {
          setTimeout(()=>{
            document.getElementById('preloder').style.display="none";
           
        },400);

       
          alertify.alert("Email sent..please click on link for forgot password complete")

        
          
          
        }else{
          
            setTimeout(()=>{
              document.getElementById('preloder').style.display="none";
             
          },400);

          alertify.alert("Error resetting please contact administrator "+res.data.err);
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
                    <h3>Forgot Password</h3>
                    <p className="text-muted">Add email for password reset</p>

              

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Input Email"
                        name="email"
                        className="form-control-warning"
                        valid={this.state.Valid[2]}
                        invalid={this.state.Invalid[2]}
                        autoComplete="email"
                        value={this.state.email}
                        onChange={this.onChangeHandler}
                      />
                    </InputGroup>
                

                    <Button type="submit" color="success" block>
                      Submit
                    </Button>
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

export default forgetpassword;
