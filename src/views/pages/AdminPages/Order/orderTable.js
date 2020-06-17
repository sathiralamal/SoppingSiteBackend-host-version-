import React, { Component } from 'react'
import { Container, Input, Table, Badge, Button } from 'reactstrap'
import Axios from 'axios';
// Student id :IT18045840
//Name :S.D.S.L Dissanayake

class OderDetails extends Component{
    render(){
        return(
            <tr>
                <td><p> {this.props.order._id}</p></td>
                <td> <p> {Math.round((this.props.order.totalAmaount*100)/100)+" $"} </p> </td>
                <td> <p> {this.props.order.user_id} </p> </td>
                <td><p> {this.props.order.numberOfItem} </p>  </td>
                <td> <p>{new Date(this.props.order.orderCreateDate).toDateString()+" : "+new Date(this.props.order.orderCreateDate).toTimeString()}</p> </td>
                <td><p>{this.props.order.isDelevery?<Badge color="primary">Delivered</Badge>:<Badge color="danger">Not Delivered</Badge>}</p></td>
                <td><Button outline color="danger" onClick={()=>{this.props.deleteOder(this.props.order._id)}} >Delete </Button></td>
                <td><Button outline color="warning"onClick={()=>{this.props.changeStatus(this.props.order._id)}} disabled={this.props.order.isDelevery}  >Change delivery status </Button></td>
            </tr>
        )
    }
}





export default class orderPanal extends Component {

    constructor(props){
        super(props)


        this.state={
            orderList:[],
            dataload:false,
        }

        this.loadOrderData=this.loadOrderData.bind(this);
        this.orderManagmetList=this.orderManagmetList.bind(this);
        this.datanotLoad=this.datanotLoad.bind(this);
        this.handleSearch=this.handleSearch.bind(this);

    }


    

    componentDidMount(){
        if(!(localStorage.getItem('type')=="admin")){
            window.location.href="/"
        }else{
            this.loadOrderData()

        }
    }

    loadOrderData(){

        const options = {
            headers: {
                "content-type": "application/json", // whatever you want
                authorization: "Bearer ".concat(localStorage.getItem("AccessToken")),
              }
          };
        

        Axios.get(global.backend+'/order',options)
        .then(ressopns=>{
                this.setState({orderList:ressopns.data,dataload:true})
                           
        })
        .catch((error)=>{
            console.log('error :'+error);
        })
    }

    deleteOder(order_id){
        Axios.delete(global.backend+'/order/'+order_id)
            .then(ressopns=>{
                console.log("Order delete"+ressopns);
                this.loadOrderData();

                    // this.setState({
                    //     orderList:this.state.orderList.filter(el=>el._id!==order_id)
                    //  })

            })
            .catch(err=>console.log("error in delete order"))

    window.location.href="/orderDashbord"
    }

    changeStatus=(ordr_id)=>{
        Axios.put(global.backend+'/order/changestatus'+ordr_id)
            .then(response=>{
                console.log("Change order status");
                this.loadOrderData();

                                
            })
            .catch(err=>console.log("Errror in change status"+err))
    }


    orderManagmetList(){
        return this.state.orderList.map(currentorder=>{
             return <OderDetails 
                    order={currentorder}
                    deleteOder={this.deleteOder}
                    changeStatus={this.changeStatus}
                    
                    key={currentorder._id} ></OderDetails>
        })
    }

    datanotLoad(){
        return <h3>Data not loading...</h3>
    }

    handleSearch(event){
        let orderkeyword=event.target.value.trim().toLowerCase();
        if(orderkeyword.length>0){
            this.setState({
                orderList:this.state.orderList.filter(element=>{
                    return(
                        element.totalAmaount.toLowerCase().match(event.target.value)||
                        element.numberOfItem.toLowerCase().match(event.target.value)||
                        element.orderCreateDate.toLowerCase().match(event.target.value)||
                        element.user_id.toLowerCase().match(event.target.value)||
                        element._id.toLowerCase().match(event.target.value)



                    )
                })
            })
        }else{
            this.loadOrderData()
        }
    }

    render() {
        return (
            <Container style={Styles.regTablePlanal}>
            <h4 style={Styles.regHeadertext}>Order Managemet</h4>
                <Input type="text" onChange={this.handleSearch} placeholder="Search hear"></Input>
                <Table  responsive   >
                    <thead>
                          <tr>
                            <th>OrderID</th>
                            {/* <th>Product List</th> */}
                            <th>Total Amount</th>
                            <th>User ID</th>
                            <th>Number of Items</th> 
                            <th>Order Create date</th> 
                            <th>Deliver status</th> 
                            <th>Delete</th> 
                            <th>Chnage Status</th>   
                         </tr>
                    </thead>
                        <tbody>
                            { this.state.dataload? this.orderManagmetList() :'not load' }
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

}