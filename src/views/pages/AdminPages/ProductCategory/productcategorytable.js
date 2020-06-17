import React, { Component } from 'react'
import axios from 'axios'
import { Container, Table,Badge, Input } from 'reactstrap'
import { RiDeleteBinLine ,RiCheckboxCircleLine,RiEditLine } from 'react-icons/ri';

// Student id :IT18045840
//Name :S.D.S.L Dissanayake


class ProductCatergory extends Component{
    render(){
        return(
    <tr>
        <td>
            <p style={((this.props.editdatastatas)&&(this.props.selectedite_id==this.props.productCatergory._id))?{display:"none"}:{display:"inherit"} }>{this.props.productCatergory.categoryName}</p>
            <Input style={((this.props.editdatastatas)&&(this.props.selectedite_id==this.props.productCatergory._id))?{display:"inherit"}:{display:"none"}  }
                                   placeholder={this.props.productCatergory.categoryName}
                                   onChange={(e)=>this.props.handeleeditcategoryNameprop(e.target.value)}
                                   value={this.props.editcategoryName}
                                   name="productname"
             /> 
        </td>
        <td>
            <p style={((this.props.editdatastatas)&&(this.props.selectedite_id==this.props.productCatergory._id))?{display:"none"}:{display:"inherit"} }>{this.props.productCatergory.categoryDiscription}</p>
            <Input style={((this.props.editdatastatas)&&(this.props.selectedite_id==this.props.productCatergory._id))?{display:"inherit"}:{display:"none"}  }
                                   placeholder={this.props.productCatergory.categoryDiscription}
                                   onChange={(e)=>this.props.handeleeditecategoryDiscriptionprop(e.target.value)}
                                   value={this.props.categoryDiscription}
                                   name="productdiscription"
             /> 
        </td>
        
        <td>
            <p style={((this.props.editdatastatas)&&(this.props.selectedite_id==this.props.productCatergory._id))?{display:"none"}:{display:"inherit"} }>{this.props.productCatergory.categoryNote}</p>
            <Input style={((this.props.editdatastatas)&&(this.props.selectedite_id==this.props.productCatergory._id))?{display:"inherit"}:{display:"none"}  }
                                   placeholder={this.props.productCatergory.categoryNote}
                                   onChange={(e)=>this.props.handeleediteeditecategoryNoteprop(e.target.value)}
                                   value={this.props.categoryNote}
                                   name="productname"
             /> 
            
            </td>
        <td>
        <Input style={((this.props.editdatastatas)&&(this.props.selectedite_id==this.props.productCatergory._id))?{display:"inherit"}:{display:"none"}  }
                                   placeholder={this.props.productCatergory.subCategory}
                                   onChange={(e)=>this.props.handeleediteeditecategorysubCategory(e.target.value)}
                                   value={this.props.subCategory}
                                   name="productname"
             /> 

            <h6> {this.props.productCatergory.subCategory.map(element=>{
                     return  <Badge color="primary">{element}</Badge>
                })}
            </h6>
        </td>
        
        <td>
        <RiDeleteBinLine size="2em" color=""  onClick={()=>{this.props.deleteProductCategory(this.props.productCatergory._id)}}>Delete</RiDeleteBinLine>
        </td>
        <td>
        <RiEditLine  size="2em" color="#FFD478" style={!this.props.editdatastatas?{display:"inherit"}:{display:"none"} } onClick={()=>{this.props.editemodeToggle(this.props.productCatergory._id)}}  > </RiEditLine>
        <RiCheckboxCircleLine  size="2em" color="#4EB6E6 "style={((this.props.editdatastatas)&&(this.props.selectedite_id==this.props.productCatergory._id))?{display:"inherit"}:{display:"none"}  } onClick={()=>{this.props.updateProductCatogory(
            this.props.productCatergory.categoryName,
            this.props.productCatergory.categoryNote,
            this.props.productCatergory.categoryDiscription,
            this.props.productCatergory.subCategory
           

        )}} ></RiCheckboxCircleLine>
        </td>
        
    </tr>

     )
    }
}

export default class productcategorytable extends Component {

    constructor(props){
        super(props)
       
        this.loadProductCategoryData=this.loadProductCategoryData.bind(this);
        // this.categoryList=this.categoryList.bind(this);
        this.deleteProductCategory=this.deleteProductCategory.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
        this.categoryList=this.categoryList.bind(this);
        
        this.enableEditeMode=this.enableEditeMode.bind(this);
        this.onSubmiteUpdateForm=this.onSubmiteUpdateForm.bind(this);

        this.handeleeditcategoryName=this.handeleeditcategoryName.bind(this);
        this.handeleeditecategoryDiscription=this.handeleeditecategoryDiscription.bind(this);
        this.handeleediteeditecategoryNote=this.handeleediteeditecategoryNote.bind(this);
        this.handeleediteeditecategorysubCategory=this.handeleediteeditecategorysubCategory.bind(this);

        this.clearState=this.clearState.bind(this);


        this.state={

            productcategorylist:[],
            editdata:false ,
            editcategoryName:'',
            editecategoryDiscription:'',
            editecategoryNote:'',
            editesubCategory:[],
            edite_Id:''
           

        };
    
    }

    componentDidMount(){
        this.loadProductCategoryData()

    }

    enableEditeMode(edite_id){
        this.setState({
            edite_Id:edite_id
        })

        this.editmodeToggle()
    } 

    editmodeToggle(){
        this.setState({
            editdata:!this.state.editdata,
        })
    }  
    loadProductCategoryData(){
        axios.get(global.backend+'/productCategory/')
        .then(ressopns=>{
            console.log(ressopns);
            this.setState({productcategorylist:ressopns.data})
            console.log(ressopns.data);
            
        })
        .catch((error)=>{
            console.log('error :'+error);
        })
    }

    deleteProductCategory(id){
        axios.delete(global.backend+'/productCategory/'+id)
        .then(res=>console.log(res.data));
        this.setState({
            productcategorylist:this.state.productcategorylist.filter(el=>el._id!==id)
        })
        
    }

    clearState(){
        this.setState({
            editcategoryName:"",
            editecategoryDiscription:"",
            editecategoryNote:"",
            editesubCategory:[]
        })
    }

    onSubmiteUpdateForm(previousname,previousnote,previousdiscription,privioussubcat){
        console.log("call update method");
        console.log("note prevalue"+previousnote);
        console.log("note state"+this.state.editecategoryNote);
        
        
        if(this.state.editcategoryName==""){
            this.state.editcategoryName=previousname
        }
        if(this.state.editecategoryDiscription==""){
            this.state.editecategoryDiscription=previousdiscription
        }
        if(this.state.editecategoryNote==""){
            this.state.editecategoryNote=previousnote
        }
        if(this.state.editesubCategory.length==0){
            this.state.editesubCategory=privioussubcat
        }

        let productcatCategoryUpdated={
            categoryName:this.state.editcategoryName,
            categoryDiscription:this.state.editecategoryDiscription,
            categoryNote: this.state.editecategoryNote,
            subCategory:this.state.editesubCategory
        }

       

        axios.post(global.backend+'/productCategory/update/'+this.state.edite_Id,productcatCategoryUpdated)
        .then(res=>console.log("store manager update sucessful"+res.data))
        .catch(err=>console.log('error in update :'+err.data))
        this.clearState(); //clear states
        this.editmodeToggle();//change edite mode
        this.loadProductCategoryData(); //load new data
         


    }

    handeleeditcategoryName(event){
        this.setState({editcategoryName:event})
    }

    handeleeditecategoryDiscription(event){
        this.setState({editecategoryDiscription:event})
    }

    handeleediteeditecategoryNote(event){
        this.setState({editecategoryNote:event})
    }

    handeleediteeditecategorysubCategory(event){
        let newcatarry=event.split(',');
        this.setState({editesubCategory:newcatarry})
    }
   

    categoryList(){
        return this.state.productcategorylist.map(currentproductcategory=>{
            return <  ProductCatergory productCatergory={currentproductcategory}
                                       deleteProductCategory={this.deleteProductCategory}  

                                       handeleediteeditecategoryNoteprop={this.handeleediteeditecategoryNote}
                                       handeleeditecategoryDiscriptionprop={this.handeleeditecategoryDiscription}
                                       handeleeditcategoryNameprop={this.handeleeditcategoryName}
                                       handeleediteeditecategorysubCategory={this.handeleediteeditecategorysubCategory}
                                        
                                       editemodeToggle={this.enableEditeMode}

                                       editdatastatas={this.state.editdata}
                                       selectedite_id={this.state.edite_Id}

                                       editcategoryName={this.state.editcategoryName}
                                       editecategoryDiscription={this.state.editecategoryDiscription}
                                       editeeditecategoryNote={this.state.editecategoryNote}
                                       editesubCategory={this.state.editesubCategory}

                                       updateProductCatogory={this.onSubmiteUpdateForm}



                    key={currentproductcategory._id}/>;
        })
   }


    handleSearch(event){
        console.log("onchange appply");
        
        let productcat= event.target.value.trim().toLowerCase();
 
        if(productcat.length>0){
        this.setState({
            productcategorylist: this.state.productcategorylist.filter(item=>{
             return (
                        item.categoryName.toLowerCase().match(event.target.value)||
                        item.categoryDiscription.toLowerCase().match(event.target.value)||
                        item.categoryNote.toLowerCase().match(event.target.value)
                    //    item.subCategory.filter( sub=> { return sub.toLowerCase().match(event.target.value)})
                    
                     )
             })
         })
         }else{
             this.loadProductCategoryData()
         }
    
    }

  
  
    render() {
        return (
            <Container style={Styles.regTablePlanal}>
            <h4 style={Styles.regHeadertext}>Product Catergory</h4>
            <Input type="text" onChange={this.handleSearch} placeholder="Search hear"></Input>
                <Table  responsive size="sm" >
                    <thead>
                          <tr>
                            <th>Name</th>
                            <th>Discription</th>
                            <th>Note</th>
                            <th>SubCategory</th>
                            <th>Delete</th>
                            <th>Edite</th>         
                         </tr>
                    </thead>
                        <tbody>
                           {this.categoryList()}
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
    }

}