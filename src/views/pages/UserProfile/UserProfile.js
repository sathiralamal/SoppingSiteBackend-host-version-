//User profile for user by V>D Dantanarayana
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

class UserProfile extends Component{

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
            data:[],
            valid:false,
            invalid:false,
            valid1:false,
            invalid1:false,
            oldpassword:"",

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
        pass:res.data.data[0].newPassword,
        dialCode:"",
        isupdated:false,
        newpassword:"",
        oldpassword:"",
        confirmPass:"",
        isdeleted:false,
        reason:"",
        deletepassword:"",
       })
        
    }).catch(err=>{
        
    })
  }

  changeHandler=(e)=>{

    this.setState({
      [e.target.name]:e.target.value
    })
    
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

    if (e.target.value === this.state.newpassword) {
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



  submitUpdatePassword=(e)=>{
    e.preventDefault();
    console.log("this is pass"+this.state.newpassword)
    if(this.state.pass===this.state.oldpassword)
    {
      

      const data={
        id:localStorage.getItem("id"),
        newPassword:this.state.newpassword,
        
      }
  
  
      document.getElementById('preloder').style.display="block";
      try {
        axios.post(global.backend+"/user/updatepass", data).then((res) => {
          console.log(res);
          console.log(res.data);
          setTimeout(()=>{
            document.getElementById('preloder').style.display="none";
           
        },400);
        window.location.href="/userprofile"
        alertify.success("Successfully updated password");
        
        });
      } catch (e) {
        console.log(e)
      }

    }else{
      alertify.alert("Old password is wrong");

    }
    


  }



  SubmitDeleteUser=(e)=>{
    e.preventDefault();

    const data={
      id:localStorage.getItem("id"),
      reason:this.state.reason
    }

if(this.state.deletepassword===this.state.pass)
{
    document.getElementById('preloder').style.display="block";
    try {
      axios(global.backend +"/user/removeuser",{
        method:"POST",
      headers: {
        "content-type": "application/json", // whatever you want
        authorization: "Bearer ".concat(localStorage.getItem("AccessToken")),
      },
      data}).then((res) => {
        console.log(res);
        console.log(res.data);
        if(res.data.success===true)
        {
        setTimeout(()=>{
          document.getElementById('preloder').style.display="none";
         
      },400);
      alertify.success("Successfully deleted profile");
      localStorage.clear();
      window.location.href="/"

    }else if(res.data.success===false&&res.data.status===401)
    {
      
        setTimeout(()=>{
          document.getElementById('preloder').style.display="none";
         
      },400);
      alertify.alert("unauthorized. delete failed");
    }else{
      
        setTimeout(()=>{
          document.getElementById('preloder').style.display="none";
         
      },400);
      alertify.alert("delete error");
    }
      });
    } catch (e) {
      console.log(e)
      alertify.alert("delete error");
    }
  }else{

    alertify.alert("Password you entered is incorrect");
  }
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
      console.log(e)
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

    document.getElementById('preloder').style.display="block";
    try {
      axios.post(global.backend+"/user/updateuser", data).then((res) => {
        console.log(res);
        console.log(res.data);
        setTimeout(()=>{
          document.getElementById('preloder').style.display="none";
         
      },400);
      window.location.href="/"
     
      });
    } catch (e) {
      console.log(e)
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
           <div id="preloder">
                <div className="loader"></div>
            </div>

            <p style={{display:"none"}}>{setTimeout(()=>{
            document.getElementById('preloder').style.display="none";
        },400)}</p>
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
         },console.log(this.state.mobileNum));
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

            <TabPane tabId="2">
              {
                <div>
                  
                  <Card style={{ borderColor: "white" }}>
                    <CardHeader>Change password</CardHeader>
 <CardBody>
                      <form onSubmit={this.submitUpdatePassword} >

                      <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                      <i className="flaticon-unlock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" placeholder="Old password" name="oldpassword" value={this.state.oldpassword} autoComplete="new-password" onChange={this.changeHandler} required/>
                   
                  </InputGroup>


                    <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                      <i className="flaticon-unlock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" placeholder="new password" name="newpassword" value={this.state.newpassword} autoComplete="new-password" valid={this.state.valid1} invalid={this.state.invalid1} onChange={this.onChangeHandler} required/>
                    <FormFeedback>Password length should be more than 7</FormFeedback>
                  </InputGroup>
                  
                  
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                      <i className="flaticon-unlock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" placeholder="confirm new password" name="confirmPass"  autoComplete="new-password" valid={this.state.valid} invalid={this.state.invalid} onChange={this.HandlepasswordConfirm} required/>
                    <FormFeedback>Passwords doesn't match</FormFeedback>
                  </InputGroup>
                  <Button type="submit" className="success">Update Password</Button>
                  </form>
                  </CardBody>
                  </Card>
                  </div>
              }
              </TabPane>
              <TabPane tabId="3">
                {
                  <Card style={{ borderColor: "white" }}>
                  <CardHeader>Delete Account</CardHeader>
<CardBody>
  <p>Deleting this account will remove all your data. You won't be able to enjoy any services from C4fashions</p>
  <p>please re-think before deleting</p>
                  <Button type="submit" className="success" onClick={()=>{this.setState({
                    isdeleted:true
                  })}}>Delete profile</Button><br></br>

                  {this.state.isdeleted===true?<div style={{paddingTop:10}}>
                    <form onSubmit={this.SubmitDeleteUser}>
                    <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                      <i className="flaticon-unlock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" placeholder="enter password" name="deletepassword" value={this.state.deletepassword} autoComplete="new-password"  onChange={this.changeHandler} required/>
                    
                  </InputGroup>

                  <FormGroup>
     <Label htmlFor="reason">Reason for deleting</Label>
     <Input
       type="textarea"
       id="reason"
       name="reason"
       placeholder="Enter reason for deleting account"
       value={this.state.reason}
       onChange={this.changeHandler}
       required
     />
   </FormGroup>
   <Button type="submit">submit</Button>
   </form>
                  </div>:<></>}
                  </CardBody>
                  </Card>
                }
              </TabPane>
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
        <NavItem>
          <NavLink
            active={this.state.activeTab[0] === "2"}
            onClick={() => {
              this.toggle(0, "2");
            }}
          >
            Security
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={this.state.activeTab[0] === "3"}
            onClick={() => {
              this.toggle(0, "3");
            }}
          >
            Settings
          </NavLink>
        </NavItem>
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
export default UserProfile;