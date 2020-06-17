import React, { Component } from 'react'
import { Table, Container, Input, Button, Fade, Alert } from 'reactstrap';
import { RiDeleteBinLine ,RiCheckboxCircleLine,RiEditLine } from 'react-icons/ri';
// Student id :IT18045840
//Name :S.D.S.L Dissanayake

import axios from 'axios';


// const StoreManager=props=>(
class StoreManager extends Component{
    render(){
        return(
    <tr >
        <td>
            <p style={((this.props.editdatastatas)&&(this.props.selectedite_id==this.props.storemanager._id))?{display:"none"}:{display:"inherit"} }>{this.props.storemanager.firstName} </p>
             <Input style={((this.props.editdatastatas)&&(this.props.selectedite_id==this.props.storemanager._id))?{display:"inherit"}:{display:"none"}  }
                                   
                                   placeholder={this.props.storemanager.firstName}
                                   onChange={(e)=>this.props.handeleEditFirstname(e.target.value)}
                                   ref={this.props.editedfirstame}
                                   name="firstName"
                                   
                                  
                                   
             />            
        </td>
        <td>
            <p style={((this.props.editdatastatas)&&(this.props.selectedite_id==this.props.storemanager._id))?{display:"none"}:{display:"inherit"} }>{this.props.storemanager.lastName}</p>
            <Input style={((this.props.editdatastatas)&&(this.props.selectedite_id==this.props.storemanager._id))?{display:"inherit"}:{display:"none"}  }
                                   placeholder={this.props.storemanager.lastName}
                                   onChange={(e)=>this.props.handeleEditLastname(e.target.value)}
                                   value={this.props.editedlastname}
                                   name="lastName"
             />    
            
        </td>
        <td>
           <p style={((this.props.editdatastatas)&&(this.props.selectedite_id==this.props.storemanager._id))?{display:"none"}:{display:"inherit"} }> {this.props.storemanager.birthDay}</p>
            <Input type="date" style={((this.props.editdatastatas)&&(this.props.selectedite_id==this.props.storemanager._id))?{display:"inherit"}:{display:"none"}  }
                                   placeholder={this.props.storemanager.birthDay}
                                   onChange={(e)=>this.props.handeleEditBirthday(e.target.value)}
                                   value={this.props.editBirthday}
                                   name="birthDay"

             />   
        </td>
        <td>
           <p style={((this.props.editdatastatas)&&(this.props.selectedite_id==this.props.storemanager._id))?{display:"none"}:{display:"inherit"} }>{this.props.storemanager.emailAddress}</p> 
            <Input style={((this.props.editdatastatas)&&(this.props.selectedite_id==this.props.storemanager._id))?{display:"inherit"}:{display:"none"}  }
                                   placeholder= {this.props.storemanager.emailAddress}
                                   onChange={(e)=>this.props.handeleEmailAddress(e.target.value)}
                                   value={this.props.editEmailAddress}
                                   name="email"
             /> 
            
        </td>
        <td>
            <p style={((this.props.editdatastatas)&&(this.props.selectedite_id==this.props.storemanager._id))?{display:"none"}:{display:"inherit"} }>{this.props.storemanager.address}</p>
            <Input style={((this.props.editdatastatas)&&(this.props.selectedite_id==this.props.storemanager._id))?{display:"inherit"}:{display:"none"}  }
                                   placeholder={this.props.storemanager.address}
                                   onChange={(e)=>this.props.handeleAddress(e.target.value)}
                                   value={this.props.editAddress}
                                   name="address"

             /> 
        
        </td>
        <td>
            <p style={((this.props.editdatastatas)&&(this.props.selectedite_id==this.props.storemanager._id))?{display:"none"}:{display:"inherit"} }>{this.props.storemanager.telephoneNumber}</p>
            <Input style={((this.props.editdatastatas)&&(this.props.selectedite_id==this.props.storemanager._id))?{display:"inherit"}:{display:"none"}  }
                                   placeholder={this.props.storemanager.telephoneNumber}
                                   onChange={(e)=>this.props.handeleTelephoneNumber(e.target.value)}
                                   value={this.props.editTelephoneNumber}
                                   name="telephonenumber"
             /> 
        
        </td>
        <td>
        <RiDeleteBinLine size="2em" color="#FF9592"  onClick={()=>{this.props.deleteStoreManager(this.props.storemanager._id,this.props.storemanager.userTableId)}}>Delete</RiDeleteBinLine>
        </td>
        <td>
        <RiEditLine  size="2em" color="#FFD478" style={!this.props.editdatastatas?{display:"inherit"}:{display:"none"} } onClick={()=>{this.props.editemodeToggle(this.props.storemanager._id)}}  > </RiEditLine>
        <RiCheckboxCircleLine  size="2em" color="#4EB6E6 " style={((this.props.editdatastatas)&&(this.props.selectedite_id==this.props.storemanager._id))?{display:"inherit"}:{display:"none"}  } onClick={()=>{this.props.updateStoremanager(
            this.props.storemanager.firstName,
            this.props.storemanager.lastName,
            this.props.storemanager.birthDay,
            this.props.storemanager.emailAddress,
            this.props.storemanager.address,
            this.props.storemanager.telephoneNumber,
            this.props.storemanager.userTableId,

        )}} ></RiCheckboxCircleLine>
        </td> 
    </tr>
        )
    }
}
// )






export default class storemanagerview extends Component {
    
    constructor(props){
        super(props)
          this.deleteStoreManager=this.deleteStoreManager.bind(this);
          this.loadStoreManagerData=this.loadStoreManagerData.bind(this);
          this.handleSearch=this.handleSearch.bind(this);
          this.handleEditdata=this.handleEditdata.bind(this);
          this.editmodeToggle=this.editmodeToggle.bind(this);  
          this.enableEditeMode=this.enableEditeMode.bind(this);

          this.handeleEditFirstname=this.handeleEditFirstname.bind(this);
          this.handeleEditLastname=this.handeleEditLastname.bind(this);
          this.handeleEditBirthday=this.handeleEditBirthday.bind(this);
          this.handeleAddress=this.handeleAddress.bind(this);
          this.handeleEmailAddress=this.handeleEmailAddress.bind(this);
          this.handeleTelephoneNumber=this.handeleTelephoneNumber.bind(this);
          this.onSubmitUpdateForm=this.onSubmitUpdateForm.bind(this);  

          this.state={storemanagerlist:[],
                      searchkeyword:'' ,
                      editdata:false ,
                      editFirstname:'',
                      editLastname:'',
                      editBirthday:'',
                      editEmailAddress:'',
                      editAddress:'',
                      editTelephoneNumber:'',
                      edite_Id:'',
                      datasendSuccessful: false,
                      datasendError: false,
        };
  
 
    }

    componentDidMount(){
        //if id is null redirect to root
        if(localStorage.getItem('id')==null){
            window.location.href="/";
        }else{

        //load data        
        this.loadStoreManagerData();
        
       }

    }  
    //enable edite mode
    enableEditeMode(edite_id){
        this.setState({
            edite_Id:edite_id
        })

        this.editmodeToggle()
    }   

    //edite mode state change
    editmodeToggle(){
        this.setState({
            editdata:!this.state.editdata,
        })
    }   

    //load storemanager data
    loadStoreManagerData(){

        const options = {
            headers: {
                "content-type": "application/json", // whatever you want
                authorization: "Bearer ".concat(localStorage.getItem("AccessToken")),
              }
          };




        axios.get(global.backend+'/storeManager/',options)
        .then(ressopns=>{
            console.log(ressopns);
            this.setState({storemanagerlist:ressopns.data})
            console.log(ressopns.data);
            
        })
        .catch((error)=>{
            console.log('error :'+error);
        })
    }   

    //==========get value form storemanager view componet and update states===================
    handeleEditFirstname=(event)=>{                
        this.setState({editFirstname: event})
                               
    }

    handeleEditLastname(event){
        this.setState({editLastname:event})
    }

    handeleEditBirthday(event){
        this.setState({editBirthda:event})
    }

    handeleAddress(event){
        this.setState({editAddress:event})
    }

    handeleEmailAddress(event){
        this.setState({editEmailAddress:event})
    }

    handeleTelephoneNumber(event){
        this.setState({editTelephoneNumber:event})
    }


    deleteStoreManager(storemanager_id,user_id){

        var reason_text = prompt("Please enter reason for delete Store manager ", " ");
        if(reason_text==null){
            reason_text="Delete by admin for maintain purpose"
        }

        let deleteuser={
            reason:reason_text,
            id:user_id
        };

        axios.post(global.backend+'/storeManager/removeuser',deleteuser)
        .then(res=>{
            axios.delete(global.backend+'/storeManager/'+storemanager_id)
            .then(res=>{
                // axios.delete('http://localhost:3001/storeManager/'+id)
                this.setState({
                    datasendSuccessful:true
                   
                })

                setTimeout(()=>{
                    this.setState({datasendSuccessful:false})
                },1600);
                console.log(res.data)
            
            });
            this.setState({
                storemanagerlist:this.state.storemanagerlist.filter(el=>el._id!==storemanager_id)
            })

        })
        .catch(err=>{
            console.log(err)
            this.setState({
                datasendError:this
            })
            setTimeout(()=>{
                this.setState({datasendError:false})
            },1600);
        
        });

       
        
    }

    onSubmitUpdateForm(dfname,dlname,dbday,demil,daddress,dtel,id){
        // event.preventDefault()
        
               
        console.log("call update form method");
            if(this.state.editFirstname==""){
               this.state.editFirstname=dfname               
            }

            if(this.state.editLastname==""){
                this.state.editLastname=dlname;
            }

            if(this.state.editBirthday==""){
                this.state.editBirthday=dbday;
            }

            if(this.state.editEmailAddress==""){
                this.state.editEmailAddress=demil
            }

            if(this.state.editAddress==""){
                this.state.editAddress=daddress
            }

            if(this.state.editTelephoneNumber==""){
                this.state.editTelephoneNumber=dtel
            }

        
        const storeManagerUpdated={
            firstName:this.state.editFirstname,
            lastName:this.state.editLastname,
            birthDay:this.state.editBirthday,
            email:this.state.editEmailAddress,
            address:this.state.editAddress,
            telephonenumber:this.state.editTelephoneNumber
        }

        console.log(storeManagerUpdated);
        

        axios.post(global.backend+'/storeManager/update/'+this.state.edite_Id,storeManagerUpdated)
        .then(res=>{
            console.log("store manager update sucessful"+res.data)

            const UpdateSuer={
                id:id,
                Fullname:storeManagerUpdated.firstName+" "+storeManagerUpdated.lastName,
                email:storeManagerUpdated.email,
                Username:storeManagerUpdated.firstName+"_stmanager",
                address1:storeManagerUpdated.address
            }

            console.log(UpdateSuer)
            
                axios.post(global.backend+'/storeManager/updateuser',UpdateSuer)
                .then(ressopns=>{
                    this.setState({
                        datasendSuccessful:true
                       
                    })
    
                    setTimeout(()=>{
                        this.setState({datasendSuccessful:false})
                    },1600);
                    console.log("change data in user collection"+ressopns)
                
                })
                .catch(err=>{
                    console.log('Err in edite user table')
                    
                    this.setState({
                        datasendError:this
                    })
                    setTimeout(()=>{
                        this.setState({datasendError:false})
                    },1600);
                
                })




                this.loadStoreManagerData();

        })
        .catch(err=>{console.log('error in update :'+err.data)
        this.setState({
            datasendError:this
        })
        setTimeout(()=>{
            this.setState({datasendError:false})
        },1600);
    
        })
        this.editmodeToggle();
        this.clearText();

    }

    clearText=()=>{
        this.setState({

            editFirstname:'',
            editLastname:'',
            editBirthday:'',
            editEmailAddress:'',
            editAddress:'',
            editTelephoneNumber:'',
            edite_Id:'',
        })


    }




    //generate Storemagaer table
    storemanagrList(){
        return this.state.storemanagerlist.map(currentstoremanager=>{
            return <  StoreManager 
                        storemanager={currentstoremanager}
                        editemodeToggle={this.enableEditeMode}
                        editdatastatas={this.state.editdata}
                        selectedite_id={this.state.edite_Id}
                        deleteStoreManager={this.deleteStoreManager}

                        handeleEditFirstname={this.handeleEditFirstname}
                        handeleEditLastname={this.handeleEditLastname}
                        handeleEditBirthday={this.handeleEditBirthday}
                        handeleAddress={this.handeleAddress}
                        handeleEmailAddress={this.handeleEmailAddress}
                        handeleTelephoneNumber={this.handeleTelephoneNumber}
                        
                        editedfirstame={this.state.editFirstname}
                        editedlastname={this.state.editLastname}
                        editedBirthday={this.state.editBirthda}
                        editedEmailAddress={this.state.editEmailAddress}
                        editedAddress={this.state.editAddress}
                        editedTelephone={this.state.editTelephoneNumber}
                        
                        updateStoremanager={this.onSubmitUpdateForm}
                        key={currentstoremanager._id}/>;
        })
   }
   //privde search functions
   handleSearch(event){
       let storemng= event.target.value.trim().toLowerCase();

       if(storemng.length>0){
       this.setState({
          storemanagerlist: this.state.storemanagerlist.filter(item=>{
            return (item.firstName.toLowerCase().match(event.target.value)||
                    item.lastName.toLowerCase().match(event.target.value)||
                    item.emailAddress.toLowerCase().match(event.target.value)||
                    item.address.toLowerCase().match(event.target.value)||
                    item.birthDay.toLowerCase().match(event.target.value)||
                    item.telephoneNumber.toLowerCase().match(event.target.value)
                    )
            })
        })
        }else{
            this.loadStoreManagerData()
        }
   
   }
    
   handleEditdata(editdata){
       console.log("edited");
       console.log(editdata._id);
       
       this.setState({
           editdata:true,
           editFirstname:editdata.firstName,
           editLastname:editdata.lastName,
           editAddress:editdata.address,
           editEmailAddress:editdata.editAddress,
           editBirthda:editdata.birthDay,
           editTelephoneNumber:editdata.telephoneNumber

       })


   }
    
    
    render() {
        return (
          <Container style={Styles.regTablePlanal}>
               <div style={Styles.regForm}>
        {
           
           this.state.datasendSuccessful ? (<Fade>	
                                                <Alert color="success" >
                                                    Data updated successful
                                                </Alert>
                                            </Fade>	
                                            ):(<p></p>)
        }
        
        { 
            this.state.datasendError ? (<Fade>	
                                             <Alert color="danger" >
                                                Error in update 
                                            </Alert>
                                        </Fade>	):(<p></p>)
         
                
        }
         

        </div>










                <h4 style={Styles.regHeadertext}>Store Manager Table</h4>
                    <Input type="text" onChange={this.handleSearch} placeholder="Search hear"></Input>
                    <Table  responsive   >
                        <thead>
                              <tr>
            <th>Fname</th>
            <th>lname</th>
            <th>Birthday</th>
            <th>Email</th> 
            <th>Address</th>
            <th>Telnumber</th>
            <th>Delete</th>
            <th>Edite</th>

         
        </tr>
                        </thead>
                            <tbody>
                               {this.storemanagrList()}
                            </tbody>
                    </Table>
        </Container>         
           
        )
    }
}


const Styles={
    regHeadertext:{
        padding: '10px',
    },
    regTablePlanal:{
        backgroundColor:"white",
        padding: '10px',
        borderRadius:'10px'
    },
    regForm:{
        backgroundColor:"white",
        padding: '10px',
        borderRadius:'10px'
    }

}