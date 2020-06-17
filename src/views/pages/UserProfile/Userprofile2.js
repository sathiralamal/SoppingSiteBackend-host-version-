//User profile at login prompt by V.D Dantanarayana
import React, { Component } from 'react';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from 'axios';

import alertify from "alertifyjs/build/alertify";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.min.css";
import {
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Row,
    Col,
  } from "reactstrap";

  import {
    CardFooter,
    CardHeader,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Dropdown,
    Fade,
    Form,
    FormGroup,
    FormText,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    InputGroupText,
    Label,
    Card,
    CardBody,
    Button
  } from "reactstrap";

class UserProfile2 extends Component{

    constructor(props){
        super(props);
        this.state={
            activeTab: new Array(4).fill("1"),
            fullname:"",
           // mobileNumber:"",
            Nic:"",
            username:"",
            address1upd:"",
            address2upd:"",
            cityupd:"",
            data:[]

        }
    }


    componentDidMount=()=>{
      axios({
        method:"GET",
        url:global.backend+"/user/getuserbyid",
        params:{_id:localStorage.getItem("id")},
       
    }).then(res=>{
       console.log(res.data.data);
       this.setState({
        Fullname:res.data.data[0].Fullname,
        mobileNumber:res.data.data[0].mobile,
        Nic:res.data.data[0].nic,
        username:res.data.data[0].Username,
        address1upd:res.data.data[0].address1,
        address2upd:res.data.data[0].address2,
        cityupd:res.data.data[0].city,
        dialCode:"",
        isupdated:false,

       })
        
    }).catch(err=>{
        
    })
  }

  changeHandler=(e)=>{

    this.setState({
      [e.target.name]:e.target.value
    })
    
  }

  submithandler=(e)=>{
    e.preventDefault();

    if(this.state.isupdated===false)
    {

    const data={
      id:localStorage.getItem("id"),
      Fullname:this.state.Fullname,
      mobile:this.state.mobileNumber,
      nic:this.state.Nic,
      Username:this.state.username,
      address1:this.state.address1upd,
      address2:this.state.address2upd,
      city:this.state.cityupd,


    }

    document.getElementById('preloder').style.display="block";
    try {
      axios.post(global.backend+"/user/updateuser", data).then((res) => {
        console.log(res);
        console.log(res.data);
        setTimeout(()=>{
          document.getElementById('preloder').style.display="none";
         
      },400);
      alertify.success("Successfully updated profile");
      window.location.href="/"
      
      });
    } catch (e) {
      alertify.alert("Error updating user");
    }
  }else{



    const data={
      id:localStorage.getItem("id"),
      Fullname:this.state.Fullname,
      mobile:"94"+this.state.mobileNum,
      nic:this.state.Nic,
      Username:this.state.username,
      address1:this.state.address1upd,
      address2:this.state.address2upd,
      city:this.state.cityupd,


    }


    try {
      axios.post(global.backend+"/user/updateuser", data).then((res) => {
        console.log(res);
        console.log(res.data);
       
      window.location.href="/"
     
      });
    } catch (e) {
      alertify.alert("Error updating user");
    }


  }


  }



    toggle=(tabPane, tab)=> {
       
    
          const newArray = this.state.activeTab.slice();
          newArray[tabPane] = tab;
          this.setState({
            activeTab: newArray,
          });
    
       
      
      }


      tabPane() {
        return (
          <>
            {/* <div id="preloder">
                <div className="loader"></div>
            </div>

            <p style={{display:"none"}}>{setTimeout(()=>{
            document.getElementById('preloder').style.display="none";
        },400)}</p> */}
            <TabPane tabId="1">
              {
                   <Col>
 <Card style={{ borderColor: "white" }}>
 <CardBody>
 <form onSubmit={this.submithandler}>
   <FormGroup>
     <Label htmlFor="firstName">Full Name</Label>
     <Input
       type="text"
       id="Fullname"
       name="Fullname"
       placeholder="Enter first Name"
       value={this.state.Fullname}
       onChange={this.changeHandler}
     />
   </FormGroup>

   <FormGroup>
     <Label htmlFor="mobileNumber">
       Mobile Number
     </Label>
     

     <PhoneInput
       country={"lk"}
       name="mobileNumber"
       value={this.state.mobileNumber}
       onChange={(country, value, event) => {
         this.setState({
          isupdated:true,
           dialCode: value["dialCode"],
           Country: value["name"],
           mobileNum: country.slice(
             value.dialCode.length
           ),
         });
       }}
     />
   </FormGroup>

   <FormGroup>
     <Label htmlFor="Nic">NIC</Label>
     <Input
       type="text"
       id="Nic"
       name="Nic"
       placeholder="Enter Employee NIC"
       value={this.state.Nic}
       onChange={this.changeHandler}
     />
   </FormGroup>


   <FormGroup><Label htmlFor="Nic">Username</Label>
                              <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="fa fa-user"></i>
                                  </InputGroupText>
                                </InputGroupAddon>
                                
                                <Input
                                  type="text"
                                  id="username"
                                  name="username"
                                  placeholder="Username"
                                  autoComplete="name"
                                  value={this.state.username}
                                  onChange={this.changeHandler}
                                  required
                                />
                              </InputGroup>
                            </FormGroup>
                        
                            <FormGroup>
                                  <Label htmlFor="street">Address 1</Label>
                                  <Input
                                    type="text"
                                    id="address1upd"
                                    name="address1upd"
                                    placeholder="Enter Address line 1"
                                    value={this.state.address1upd}
                                    onChange={this.changeHandler}
                                  />
                                </FormGroup>

                                <FormGroup>
                                  <Label htmlFor="street">Address 2</Label>
                                  <Input
                                    type="text"
                                    id="address2upd"
                                    name="address2upd"
                                    placeholder="Enter Address line 2"
                                    value={this.state.address2upd}
                                    onChange={this.changeHandler}
                                  />
                                </FormGroup>

                                <FormGroup>
                                  <Label htmlFor="city">City</Label>
                                  <Input
                                    type="text"
                                    id="cityupd"
                                    name="cityupd"
                                    placeholder="Enter your city"
                                    value={this.state.cityupd}
                                    onChange={this.changeHandler}
                                  />
                                </FormGroup>
                                <Button type="submit" className="success">Update details</Button>
</form>

 </CardBody>
</Card>
</Col>
              }
            </TabPane>

            {/* <TabPane tabId="2">
              {
                   <div>Hi</div>
              }
              </TabPane> */}
            </>);
            
        }

render(){

    return(
<div className="d-flex justify-content-center ">
    <div>
<Col>
        <Nav tabs>
        <NavItem>
          <NavLink
            active={this.state.activeTab[0] === "1"}
            onClick={() => {
              this.toggle(0, "1");
            }}
          >
            Update Profile
          </NavLink>
        </NavItem>
        {/* <NavItem>
          <NavLink
            active={this.state.activeTab[0] === "2"}
            onClick={() => {
              this.toggle(0, "2");
            }}
          >
            Security
          </NavLink>
        </NavItem> */}
        {/* <NavItem>
          <NavLink
            active={this.state.activeTab[0] === "3"}
            onClick={() => {
              this.toggle(0, "3");
            }}
          >
            Messages
          </NavLink>
        </NavItem> */}
      </Nav>
      <TabContent activeTab={this.state.activeTab[0]}>
        {this.tabPane()}
      </TabContent>
      </Col>
      </div>
      </div>

    );
}

}
export default UserProfile2;