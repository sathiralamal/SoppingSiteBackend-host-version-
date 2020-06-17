import React, { Component } from 'react'
import { Container, Row ,FormGroup, Label, Input, Form, Col, Button, Badge} from 'reactstrap'
import Axios from 'axios'
// Student id :IT18045840
//Name :S.D.S.L Dissanayake

export default class OrderPlaced extends Component {

    constructor(props){
        super(props)
        this.state={
          order_id:'',
          items_ids:[],
          uid:'',
          fulname:''
        }
        

    }

    componentDidMount() {
      this.setState({ uid:localStorage.getItem('id')})
      
      console.log(this.state.uid);
      
      
      
      
    }


    onCreateOrder(){

        let TotalPrice= this.props.totalPrice;
        let numberOfItem =this.props.totalNumberOfProduct;
        let userID= this.state.uid;
        let productList=this.props.productsList;

        // let card_id=this.props.cart_id;
        
        console.log("order object...");
        console.log(TotalPrice);
        console.log(numberOfItem);
        console.log(userID);
        console.log(productList);

        let product_id_arry=[];

        let items_lists=[];
        //create product id list
        productList.map(elemet=>{
          product_id_arry.push(elemet.products.id)
        })
        //get item id
        productList.map(item=>{
          items_lists.push(item._id)
        })

        this.setState({
          items_ids:items_lists
        })

        console.log(product_id_arry);
        
   
      //creata new order object
      let newOrder={

        totalAmaount:TotalPrice,
        user_id:userID,
        products:product_id_arry,
        numberOfItem:numberOfItem,
        orderCreateDate:new Date(),
        isDelevery:false


    };
        
      

        console.log(newOrder);   
        //add order object use post request
        Axios.post(global.backend+'/order/add',newOrder)
            .then(res=>{
                console.log("Order create");
                  console.log(res.data);
                  this.setState({order_id:res.data})
                  let order_idsend=res.data

                      console.log("Items List");
                      
                      console.log(this.state.items_ids);
                      
                      this.state.items_ids.map(itemid=>{
                           Axios.post(global.backend+'/cart/isorder/'+itemid)
                           .then(res=>{
                               console.log(res.data)
                           })
                         .catch(err=>console.log('error in state change in cart item'+err)
                          );
                      })  
                 
                

                  window.location.href= "/paymentMain?order_id="+order_idsend;
                
                
            })
            .catch(err=>console.log('Error in create order'+err)
            );
       
       

            
                           

    }

    onClancel(){
      window.location.href= "/"
    }
    


    render() {
        return (
          <Row>
        <Col style={oderStyle} responsive >
    <Form>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <h5 for="exampleEmail">Total Price</h5>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
       
        <h3><Badge color="success"> {Math.round(this.props.totalPrice*100)/100+" $"}</Badge></h3>
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
          <h6 style={(this.props.totalDiscount==this.props.totalPrice)?{display:"none"}:{display:"inherit"}  } for="exampleEmail">Total price without discount:</h6>
          <p for="exampleEmail">Number of individual Items </p>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
           <h4  style={(this.props.totalDiscount==this.props.totalPrice)?{display:"none"}:{display:"inherit"}  } ><Badge color="warning"> <del>{this.props.totalDiscount+" $"}</del> </Badge></h4>
           <h6 > <Badge color="warning">{this.props.totalNumberOfProduct }</Badge> </h6>
          </FormGroup>
        </Col>
      </Row>
      <Row>
          <Col>
            <Button style={ButtonStyle} disabled={!(this.props.totalPrice>0)}  onClick={()=>{this.onCreateOrder()}} color="primary">Check out</Button>
            <Button style={ButtonStyle} color="danger" onClick={()=>{this.onClancel()}}>Cancel</Button>
        </Col>
      </Row>
    </Form>
               
    </Col>
    </Row>
        )
    }
}


const ButtonStyle={
    margin: '5px',
    padding:'5px',
    bottom: '5%',
}

const oderStyle={
   
    padding: '10px',
    background: 'white',
    borderRadius: '10px',
    margin:'10px',
    boxShadow: '0px 1px 15px 0px #bdbdbd',
    minWidth:'350px'

    
}

