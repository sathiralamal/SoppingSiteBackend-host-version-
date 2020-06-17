import React,{Component} from "react";
import ProductCard from "../Product/ProductCard";
import axios from "axios";
import socketIOClient from "socket.io-client";

class LatestProducts extends Component{

    constructor(props) {
        super(props);
        this.state={
            latestProduct:[]
        }
    }




    componentDidMount() {

        this.getlatestProduct();



        socketIOClient(global.backendSoket).on('NotifyProductChange', data => {
            this.setState({
                latestProduct:[]
            },()=>this.getlatestProduct());


        });



    }

    getlatestProduct=()=>{

        axios({
            methode: 'GET',
            url:global.backend+'/product/letestProduct',
            params:{s:true}
        }).then(res=>{
            this.setState({
                latestProduct:res.data
            })


        }).catch(err=>{
            console.log(err);
        });
    }

    render() {
        return <section className="top-letest-product-section">
            <div className="container">
                <div className="section-title" >
                    <h2>LATEST PRODUCTS</h2>
                </div>
                <div className="row">




                    {this.state.latestProduct.map(product=>(
                        <div key={product.id} className="col-md-3" >   <ProductCard data={product} /> </div>
                    ))}



                </div>



            </div>
        </section>
    }


}export default LatestProducts;