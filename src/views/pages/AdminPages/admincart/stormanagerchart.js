import React, { Component } from 'react'
import Chart from 'chart.js'
import Axios from 'axios'
// Student id :IT18045840
//Name :S.D.S.L Dissanayake
export default class stormanagerchart extends Component {
    constructor(props){
        super(props)
        this.state={
            CartDetaisls:[],
            ProductCategory:[],
            numberOfFrock:0,
            numberOfCoats:0,
            numberOfMiniDresses:0,
            numberOfTShirt:0,
            numberOfWedding:0

        }
        
    }

    componentDidMount(){

        this.loadProductCategery()
         
        
    }

    loadProductCategery(){
        Axios.get(global.backend+'/productCategory')
        .then(ressopns=>{
            console.log(ressopns.data);
                this.setState({ProductCategory:ressopns.data})
                    this.loadStoreManagerData()


        })
        .catch(err =>console.log(err))

    }


    loadStoreManagerData(){
        Axios.get(global.backend+'/cart/')
        .then(ressopns=>{
            console.log(ressopns);
            this.setState({CartDetaisls:ressopns.data})

           

           let tempCart=this.state.CartDetaisls;

           console.log(this.state.ProductCategory[0].subCategory[1]);
           
           let subCategorylength= this.state.ProductCategory[1].subCategory.length;
           let numberItems=[];

           let DataArry=[];
           let NameArry=[];
           let ColorsArry=[];

           let i=0;

           for (i;i<subCategorylength;i++){
                    numberItems =tempCart.filter(item=>{
                    return  item.products.subCatogory==this.state.ProductCategory[0].subCategory[i];
                  })
                  DataArry.push(numberItems.length)
                  NameArry.push(this.state.ProductCategory[0].subCategory[i]);



           }

           for (let i=0;i<subCategorylength;i++){
            
            let colorvalue='rgba('+Math.floor(Math.random() * 256)+','+ Math.floor(Math.random() * 256)+','+ Math.floor(Math.random() * 256)+','+' 1)';
            ColorsArry.push(colorvalue)
        
         }


                // let numberOfFrock =tempCart.filter(item=>{
                //   return  item.products.subCatogory==this.state.ProductCategory.subCategory[0];
                //     })

                // let numberOfCoats =tempCart.filter(item=>{
                //     return  item.products.subCatogory==this.ProductCategory.subCategory[1];
                //     })

                // let numberOfMiniDresses =tempCart.filter(item=>{
                //     return  item.products.subCatogory==this.ProductCategory.subCategory[2];
                //     })
  
                // let numberOfWedding =tempCart.filter(item=>{
                //       return  item.products.subCatogory==this.ProductCategory.subCategory[3];
                //     })
                
                // let numberOfTShirt =tempCart.filter(item=>{
                //         return  item.products.subCatogory==this.ProductCategory.subCategory[4];
                //     })  
                // this.setState({
                //     numberOfTShirt:numberOfTShirt.length,
                //     numberOfCoats:numberOfCoats.length, 
                //     numberOfWedding:numberOfWedding.length,
                //     numberOfMiniDresses:numberOfMiniDresses.length,
                //     numberOfFrock:numberOfFrock.length
                    
                // })      
             
                this.chartGenerate(DataArry,NameArry,ColorsArry)
        })
        // .catch((error)=>{
        //     console.log('error :'+error);
        // })

    
    }   


    chartGenerate(DataArry,NameArry,ColorsArry){
        console.log("inside chat funct");
        
        console.log(DataArry);
        console.log(NameArry);
        console.log(ColorsArry);
        
        
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            // labels: ['TShirt', 'Coats', 'Wedding', 'MiniDresses', 'Frock',],
            labels:NameArry ,
            datasets: [{
                label: '# of Votes',
                // data: [this.state.numberOfTShirt, this.state.numberOfCoats, this.state.numberOfWedding, this.state.numberOfMiniDresses, this.state.numberOfFrock],
                data: DataArry,
                //  backgroundColor: [
                //     'rgba(255, 99, 132, 1)',
                //     'rgba(54, 162, 235,1)',
                //     'rgba(255, 206, 86, 1)',
                //     'rgba(75, 192, 192, 1)',
                //     'rgba(255, 159, 64,1)'
                // ],
                backgroundColor: ColorsArry,
             
               
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});


    }
    render() {
        return (
            <div style={chartStyle}>
                <h5>Customer Prefers Insight</h5>
                <canvas id="myChart" width="400" height="400"></canvas>
            </div>
        )
    }
}


const chartStyle={
    padding:'51px',
}