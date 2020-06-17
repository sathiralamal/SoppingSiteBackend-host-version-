import React, { Component } from 'react'
import Chart from 'chart.js'
import Axios from 'axios'
// Student id :IT18045840
//Name :S.D.S.L Dissanayake
export default class CartGrahps extends Component {
    constructor(props){
        super(props)
        this.state={
         
            DataArry:[],
            UsersDataArry:[],
            ProductDataArry:[],
            StoreManagers:[],

            AuthHedader:{},

            totalOrde:0,
            totalUser:0,
            totaProductCat:0,
            totalStoremanager:0
        }

        // this.loadStoreManagerData=this.loadStoreManagerData.bind(this);

       
        
    }

     componentDidMount(){
       this.loadUsersData()
       this.loadOrderData()
       this.loadStreManagerData()
       this.loadProductCategoryData()
       

       this.setState({
           AuthHedader:{
                    headers: {
                        "content-type": "application/json", // whatever you want
                        authorization: "Bearer ".concat(localStorage.getItem("AccessToken")),
                     }
          }
       })
       
        
        
    }

  
    loadOrderData=()=>{

        const options = {
            headers: {
                "content-type": "application/json", // whatever you want
                authorization: "Bearer ".concat(localStorage.getItem("AccessToken")),
              }
          };

        Axios.get(global.backend+'/order/',options)
            .then(ressopns=>{
                this.setState({DataArry:ressopns.data,isLoading:true,totalOrde:ressopns.data.length})
            })
            .catch((error)=>{
            console.log('error :'+error);
            })
    }
  
    loadUsersData=()=>{

        const options = {
            headers: {
                "content-type": "application/json", // whatever you want
                authorization: "Bearer ".concat(localStorage.getItem("AccessToken")),
              }
          };


        Axios.get(global.backend+'/order/',options)
        .then(ressopns=>{
            this.setState({UsersDataArry:ressopns.data,totalUser:ressopns.data.length})
        })
        .catch((error)=>{
        console.log('error :'+error);
        })
    }

    loadStreManagerData=()=>{

        const options = {
            headers: {
                "content-type": "application/json", // whatever you want
                authorization: "Bearer ".concat(localStorage.getItem("AccessToken")),
              }
          };




        Axios.get(global.backend+'/storemanager/',options)
        .then(ressopns=>{
            this.setState({StoreManagers:ressopns.data,totalStoremanager:ressopns.data.length})
        })
        .catch((error)=>{
        console.log('error :'+error);
        })
    }

    loadProductCategoryData=()=>{
        Axios.get(global.backend+'/productCategory/')
        .then(ressopns=>{
            this.setState({ProductDataArry:ressopns.data,totaProductCat:ressopns.data.length})
        })
        .catch((error)=>{
        console.log('error :'+error);
        })
    }
    

    notdataLoading=()=>{
        return <h5>Data loading...</h5>
    }

      
    
    render() {
        
       
        return (
            <div style={chartStyle} >
                <h5> Summery of Data </h5>
                <div style={divione}>
                     <h5>Total Number of Order</h5>
                        <h2>{this.state.totalOrde}</h2>
                </div>
                <div style={basicStyle}>
                     <h5>Total Number of Users</h5>
                        <h2>{this.state.totalUser}</h2>
                </div>
                <div style={divitwo}>
                     <h5>Total Number of StoreManagers</h5>
                        <h2>{this.state.totalStoremanager}</h2>
                </div>
                <div style={divitree}>
                     <h5>Total Number Producs Category</h5>
                        <h2>{this.state.totaProductCat}</h2>
                </div>
               
                        
                
            </div>
        )
    }
}


const chartStyle={
    padding:'51px',
}

const basicStyle={ 
    padding: '10px',
    borderRadius: '10px',
    margin: '5px',
    background : '#00D2FC',
    boxShadow: '1px 1px 11px #cacaca'
}

const divione={
    padding: '10px',
    borderRadius: '10px',
    margin: '5px',
    background : '#4FFBDF',
    boxShadow: '1px 1px 11px #cacaca'
}

const divitree={ 
    padding: '10px',
    borderRadius: '10px',
    margin: '5px',
    background : '#845EC2',
    boxShadow: '1px 1px 11px #cacaca'
}

const divitwo={
    padding: '10px',
    borderRadius: '10px',
    margin: '5px',
    background : '#009EFA',
    boxShadow: '1px 1px 11px #cacaca'
}