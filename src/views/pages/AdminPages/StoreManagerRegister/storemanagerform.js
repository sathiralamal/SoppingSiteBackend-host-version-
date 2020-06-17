import React, { Component } from 'react';
import { Form, Row, Col,FormGroup ,Label, Input, Button } from 'reactstrap';
import axios from 'axios';
// Student id :IT18045840
//Name :S.D.S.L Dissanayake

export default class Storemanagerform extends Component {

    constructor(props){
        super(props)
        this.state={
            firstName:'',
            lastName:'',
            birthDay:'',
            email:'',
            password:'',
            address:'',
            telephonenumber:'',
           

        }

        this.handeleAddress=this.handeleAddress.bind(this);
        this.handeleFirstName=this.handeleFirstName.bind(this);
        this.handeleLasttName=this.handeleLasttName.bind(this);
        this.handelebirthDay=this.handelebirthDay.bind(this);
        this.handeleEmail=this.handeleEmail.bind(this);
        this.handelePassword=this.handelePassword.bind(this);
        this.handeleTelephoneNumber=this.handeleTelephoneNumber.bind(this);
        this.onSubmitForm=this.onSubmitForm.bind(this);

    }

    componentDidMount(){


    }

    //get first name
    handeleFirstName(event){
        this.setState({firstName: event.target.value})
    }
    // get last name
    handeleLasttName(event){
        this.setState({lastName: event.target.value})
    }
    //get birthday
    handelebirthDay(event){
        this.setState({birthDay: event.target.value})
    }
    //get email
    handeleEmail(event){
        this.setState({email: event.target.value})
    }
    //get password
    handelePassword(event){
        this.setState({password: event.target.value})
    }
    //get email
    handeleAddress(event){
        this.setState({address: event.target.value})
    }

    //get telephone number
    handeleTelephoneNumber(event){
        this.setState({telephonenumber:event.target.value})
    }

    //create store manager
    onSubmitForm(event){
       event.preventDefault();

       console.log("submited...");
            
        //object post for ussr collection
       const storemanager_user={
        Fullname:this.state.firstName+" "+this.state.lastName,
        Username:this.state.firstName+"_stmanager",
        email:this.state.email,
        type:"store_manager",
        newPassword:this.state.password
       }

       axios.post(global.backend+'/storeManager/addasUser',storemanager_user)
       .then(res=>{
           console.log('new StpreManager create :')
           console.log(res)

           if(res.data.success||!(res.data._id==null)){
            // use for store manager table
           const storeManager={
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            birthDay:this.state.birthDay,
            email:this.state.email,
            password:this.state.password,
            address:this.state.address,
            telephonenumber:this.state.telephonenumber,
            userTableId:res.data._id
            
            }



            const options = {
                headers: {
                    "content-type": "application/json", // whatever you want
                    authorization: "Bearer ".concat(localStorage.getItem("AccessToken")),
                  }
              };
         
            axios.post(global.backend+"/storeManager/add",storeManager,options)
            .then(res_user=>{
                console.log("new user create as storemanager "+res_user)
                window.location.href="/storeManager";

             })
            .catch(err_useer=>console.log("error in creating store manager as user"+err_useer))        
         }else if(!res.data.success) {
             alert("Email is already exists !"); //if email already exist alrt propmt
          }
        })
       .catch(err=>{
           console.log('error in sendig storemanager :'+err.data)
          
        
        });



       
        
    }




    render() {
        return (
           <div style={Styles.regForm}>
                <h4 style={Styles.regHeadertext}>Register new Store Manager</h4>
            <Form  method="POST"  onSubmit={this.onSubmitForm}>
               
             <Row form>
                <Col md={6}>
                    <FormGroup>
                        <Label for="exampleEmail">First Name</Label>
                        <Input type="name" name="firstname"  placeholder="first name" value={this.state.firstName} onChange={this.handeleFirstName} required/>
                     </FormGroup>
              
                     <FormGroup>
                         <Label for="examplePassword">Birth Day</Label>
                        <Input type="date" name="birthday"   placeholder="last name"  value={this.state.birthDay} onChange={this.handelebirthDay}  required/>
                    </FormGroup>
                 </Col>
                 <Col md={6}>
                     <FormGroup>
                         <Label for="examplePassword">Last Name</Label>
                        <Input   name="name"   placeholder="last name" value={this.state.lastName}  onChange={this.handeleLasttName} required/>
                    </FormGroup>
                 
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email"   placeholder="Email" value={this.state.email} onChange={this.handeleEmail} required/>
                     </FormGroup>
                </Col>
            </Row>
           
                           
                     <FormGroup>
                         <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password"   placeholder="Password" value={this.state.password} onChange={this.handelePassword} required />
                    </FormGroup>
                
          
                    <FormGroup>
                        <Label for="exampleAddress2">Address </Label>
                        <Input type="text" name="address"   placeholder="Apartment, studio, or floor" value={this.state.address} onChange={this.handeleAddress} required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleAddress2">Telephone Number </Label>
                        <Input type="text" name="telephonenumber"   placeholder="Add Telephone Number" value={this.state.telephonenumber} onChange={this.handeleTelephoneNumber} required/>
                    </FormGroup>
           
                    
                         <Button type="submit" value="Submit" color="primary">Create Manager</Button>
                         
            </Form>
            </div> 
        )
    }
}


const Styles={
    regHeadertext:{
        padding: '10px',
    },
    regForm:{
        backgroundColor:"white",
        padding: '10px',
        borderRadius:'10px'
    }
}