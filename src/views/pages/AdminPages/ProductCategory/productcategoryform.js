import React, { Component } from 'react';
import { Form, Row, Col,FormGroup ,Label, Input, Button,Alert,Fade ,Badge, ListGroup, ListGroupItem } from 'reactstrap';
import { MdAddCircle } from 'react-icons/md';
import axios from 'axios';
// Student id :IT18045840
//Name :S.D.S.L Dissanayake
export default class Productcategoryform extends Component {
    
    constructor(props){
        super(props)

        this.state={
            productCategoryName:'',
            productCategoryDiscription:'',
            productCategoryNote:'',
            subCategory:'',
            subCategoryArry:[],
            datasendError: false,
            datasendSuccessful: false,
        }

        this.handeleproductCategoryName=this.handeleproductCategoryName.bind(this);
        this.handeleproductCategoryDiscription=this.handeleproductCategoryDiscription.bind(this);
        this.handeleproductCategoryNote=this.handeleproductCategoryNote.bind(this);
        this.onSubmitForm=this.onSubmitForm.bind(this);
        this.cleartextFilde=this.cleartextFilde.bind(this);
        this.handeleproductSubCategory=this.handeleproductSubCategory.bind(this);
        this.handeleproductAddCategory=this.handeleproductAddCategory.bind(this);
        this.handeleshowSubCategory=this.handeleshowSubCategory.bind(this);
    }
    
    handeleproductCategoryName(event){
        this.setState({productCategoryName:event.target.value})
    }
    
    handeleproductCategoryDiscription(event){
        this.setState({productCategoryDiscription:event.target.value})
    }
    
    handeleproductCategoryNote(event){
        this.setState({productCategoryNote:event.target.value})
    }

    handeleproductSubCategory(event){
        this.setState({subCategory:event.target.value});
      
    }
    handeleproductAddCategory(event){
        if(this.state.subCategory.length>0){
            this.state.subCategoryArry.push(this.state.subCategory);
            this.setState({subCategory:''})
        }else{
            alert("SubCategory is empty"); 
        }

       
         
    }

    handeleshowSubCategory(){
    return  this.state.subCategoryArry.map(subcat=>{
        return  <ListGroupItem>{subcat}</ListGroupItem>
    })
    }
    

    cleartextFilde(){
        this.setState({
            productCategoryName:'',
            productCategoryDiscription:'',
            productCategoryNote:'',
            subCategory:''
        })
    }
    
  
    onSubmitForm(event){
        event.preventDefault();

        const productCategory={

            productCategoryName:this.state.productCategoryName,
            productCategoryDiscription:this.state.productCategoryDiscription,
            productCategoryNote:this.state.productCategoryNote,
            subCategoryArry:this.state.subCategoryArry
        }

        axios.post(global.backend+'/productCategory/add',productCategory)
        .then(res=>{
            console.log('new product category create :'+res.data)
            this.setState({
                datasendSuccessful:true
               
            })

            setTimeout(()=>{
                this.setState({datasendSuccessful:false})
            },1600);
        
        })
        .catch(err=>{
            console.log('error in sendig product category :'+err.data)
            this.setState({
                datasendError:true
            })
            setTimeout(()=>{
                this.setState({datasendError:false})
            },1600);
        
        });
        // window.location='/adminDashbord';
        this.cleartextFilde();
        this.setState({subCategoryArry:[]})



    }
    
     
    
    
    
    render() {
        return (
     <div style={Styles.regForm}>
        {
           
           this.state.datasendSuccessful ? (<Fade>	
                                                <Alert color="success" >
                                                    Category create successful
                                                </Alert>
                                            </Fade>	
                                            ):(<p></p>)
        }
        
        { 
            this.state.datasendError ? (<Fade>	
                                             <Alert color="danger" >
                                                Category create not successful 
                                            </Alert>
                                        </Fade>	):(<p></p>)
         
                
        }
         
        
<h4 style={Styles.regHeadertext}>Create Product Category</h4>
        <Form  method="POST"  onSubmit={this.onSubmitForm}>
         <Row form>
            <Col md={6}>
                <FormGroup>
                    {/* <Label for="exampleEmail">Product Category Name</Label> */}
                    <Input type="text" name="categoryName"  placeholder="Category Name" value={this.state.productCategoryName} onChange={this.handeleproductCategoryName} required/>
                 </FormGroup>
          
             </Col>
           
            <Col md={6}>
                 <FormGroup>
                     {/* <Label for="examplePassword">Product Category Note</Label> */}
                    <Input type="text" name="categoryNote"   placeholder="Note" value={this.state.productCategoryNote}  onChange={this.handeleproductCategoryNote} required/>
                </FormGroup>
            </Col>
         
        </Row>
        <Row form>
            <Col md={5}>
                    
                 <FormGroup>
                     {/* <Label for="examplePassword">Product Category Discription</Label> */}
                    <Input type="text" name="categoryDiscription"   placeholder="Category Discription"  value={this.state.productCategoryDiscription} onChange={this.handeleproductCategoryDiscription}  required/>
                </FormGroup>
            </Col>
            <Col md={3}>
                 <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                 {/* <Label for="examplePassword">Sub-Category </Label> */}
                    <Input type="text" name="categoryNote"   placeholder="Sub Category" value={this.state.subCategory} onChange={this.handeleproductSubCategory} />
                </FormGroup>
            </Col>
            <Col Col md={3} >
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                {/* <Label for="examplePassword">SubCategory  </Label> */}
                    <MdAddCircle size="2em" color="#1BBFFD " onClick={this.handeleproductAddCategory} >+</MdAddCircle>
                </FormGroup> 
            </Col>
        </Row>
        <Row>
        <Col Col md={12} >
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0" >
            <Label for="examplePassword">
                <ListGroup>
                    {this.handeleshowSubCategory()}
                </ListGroup>
            </Label>    
            </FormGroup>
        </Col>
        </Row>
        <Row >
        <Col md={6}>
          <FormGroup>
                <Button type="submit" value="Submit" color="success">Create</Button>                  
          </FormGroup>
        </Col>
       </Row>

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