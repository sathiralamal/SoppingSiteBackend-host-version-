import React,{Component} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import '../../../../css/suggestions.css'
import ProductCard from "../ProductCard";

class Suggestions extends Component{

    constructor(props) {
        super(props);
        this.state={
            products:[],
            catogory:props.catogory,
            subCatogory:props.subCatogory,
            id:props.id,

        }
    }

    componentWillReceiveProps(nextProps, nextContext) {

        if (this.state.id!=nextProps.id){
            this.state.id=nextProps.id;
            this.state.products=[];
            this.filter();
        }

    }




    componentDidMount() {
        this.filter();
    }





    filter=()=> {

        axios({
            methode: 'GET',
            url:global.backend+'/product/getProduct',
            params:{s:true,catogory:this.state.catogory,subCatogory: this.state.subCatogory},

        }).then(res=>{
            let data=res.data;
            var length=4;
            if(data.length<4){
                length=data.length;
            }
            for (var c=0;c<length;c++){
                if (data[c].id!=this.state.id){
                    this.setState({
                        products:[data[c],...this.state.products]
                    });

                }
            }

        }).catch(err=>{
            console.log(err);
        });



    }




    render() {

        return <>
            <section className="related-product-section">
                <div className="container">
                    <div className="section-title">
                        {this.state.products.length==0?(
                            <></>
                        ):(
                            <h2>RELATED PRODUCTS</h2>
                        )
                        }

                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        {this.state.products.length==0?(
                            <></>
                        ):(
                            this.state.products.map(product => (
                                <>
                                    <div key={product.id}   className="col-md-3">
                                        <ProductCard data={product}/>
                                    </div>
                                </>
                                ))
                        )}

                    </div>
                </div>


            </section>
        </>;

    }
}
export default  Suggestions;