import React, { Component } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import ProductCard from "../Product/ProductCard";

import '../../../css/home.css';
import LatestProducts from "./LatestProducts";
import Catogories from "./Catogories";





class Home extends Component{


    constructor(props) {

        super(props);
        this.state={

            product:[],
            isLoadmore:false,
            next:0,
            limit:4,
            loading:false,
            latestProduct:[]

        }


    }




    componentDidMount(){
       const script = document.createElement("script");
        script.src = "../../../js/main.js";
        script.async = true;
        document.body.appendChild(script);


        this.getData();




        if (window.performance) {
            if (window.performance.navigation.type == 1) {
                window.location.replace('/');

            }
        }
        var scrollPos = 0;
        window.onscroll = ()=>{

            try {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                var productBoxEle=document.getElementById('productBox');
                var productBox=productBoxEle.scrollHeight*(75/100); //  box height 80%
                if(winScroll>(productBoxEle.offsetTop+productBox-400) &&((document.body.getBoundingClientRect()).top < scrollPos)){

                    if (this.state.isLoadmore){
                        this.state.next+=this.state.limit;
                        this.loadmore();
                        this.setState({
                            loading:true
                        })
                        this.state.isLoadmore=false;
                    }else {
                        this.setState({
                            loading:false
                        })
                    }

                }

                scrollPos = (document.body.getBoundingClientRect()).top;
            }catch (e) {

            }

        };
    }




    loadmore=async ()=>{
        await axios({
            methode: 'GET',
            url:global.backend+'/product/getAllProduct',
            params:{s:true,sets:this.state.next,limit:this.state.limit}

        }).then(res=>{
            // console.log(res.data.length);
            if (res.data.length!=0){
                this.setState({
                    product:[...this.state.product,...res.data],
                    loading:false
                },()=>{
                    this.state.isLoadmore=true;
                    setTimeout(()=>{
                        document.getElementById('preloder').style.display="none";
                    },200);
                });
            }else {
                this.state.isLoadmore=false;
            }

        }).catch(err=>{
            console.log(err);
        });
    }



    getData=async () =>{
        try {
            await axios({
                        methode: 'GET',
                        url:global.backend+"/product/getAllProduct",
                        params:{s:true,sets:this.state.next,limit:this.state.limit}
                    }).then(res=>{
                        this.setState({
                            product:res.data
                        },()=>{
                            this.state.next=+this.state.limit;
                            this.state.isLoadmore=true;
                            document.getElementById('preloder').style.display="none";
                        })
                    }).catch(err=>{
                        console.log(err);
                    });


        }catch (e) {

        }
    }



    render() {
        return (<>
                <div id="preloder">
                    <div className="loader"></div>
                </div>
                <section className="hero-section" id="home">
                    <div className="hero-slider owl-carousel">
                        <div className="hs-item set-bg" data-setbg="images/bg.jpg">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-7 text-white">
                                        <span>New Arrivals</span>
                                        <h2>denim jackets</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                            incididunt ut labore et dolore magna aliqua. Quis ipsum sus-pendisse ultrices
                                            gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. </p>
                                        <a href="#" className="site-btn sb-line">DISCOVER</a>
                                        <a href="#" className="site-btn sb-white">ADD TO CART</a>
                                    </div>
                                </div>
                                <div className="offer-card text-white">
                                    <span>from</span>
                                    <h2>$29</h2>
                                    <p>SHOP NOW</p>
                                </div>
                            </div>
                        </div>
                        <div className="hs-item set-bg" data-setbg="images/bg-2.jpg">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-7 text-white">
                                        <span>New Arrivals</span>
                                        <h2>denim jackets</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                            incididunt ut labore et dolore magna aliqua. Quis ipsum sus-pendisse ultrices
                                            gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. </p>
                                        <a href="#" className="site-btn sb-line">DISCOVER</a>
                                        <a href="#" className="site-btn sb-white">ADD TO CART</a>
                                    </div>
                                </div>
                                <div className="offer-card text-white">
                                    <span>from</span>
                                    <h2>$29</h2>
                                    <p>SHOP NOW</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="slide-num-holder" id="snh-1"></div>
                    </div>
                </section>





                <section className="features-section">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4 p-0 feature">
                                <div className="feature-inner">
                                    <div className="feature-icon">
                                        <img src="./images/icons/1.png" alt="/"/>
                                    </div>
                                    <h2>Fast Secure Payments</h2>
                                </div>
                            </div>
                            <div className="col-md-4 p-0 feature">
                                <div className="feature-inner">
                                    <div className="feature-icon">
                                        <img src="images/icons/2.png" alt="/"/>
                                    </div>
                                    <h2>Premium Products</h2>
                                </div>
                            </div>
                            <div className="col-md-4 p-0 feature">
                                <div className="feature-inner">
                                    <div className="feature-icon">
                                        <img src="images/icons/3.png" alt="/"/>
                                    </div>
                                    <h2>Free & fast Delivery</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <LatestProducts/>




                <section className="banner-section" >
                    <div className="container">
                        <div className="banner set-bg" data-setbg="images/banner-bg.jpg">
                            <div className="tag-new">NEW</div>
                            <span>New Arrivals</span>
                            <h2>STRIPED SHIRTS</h2>
                            <a href="/" className="site-btn">SHOP NOW</a>
                        </div>
                    </div>
                </section>


                <section className="product-filter-section">
                    <div className="container">
                        <div className="section-title" >
                            <h2>BROWSE TOP SELLING PRODUCTS</h2>
                        </div>
                        <Catogories/>






                        <div className="row" id="productBox">

                            {this.state.product.map(product=>(
                                <div key={product.id} className="col-lg-3 col-sm-6">
                                    <ProductCard data={product} />
                                </div>

                            ))}

                            
                            
                        </div>
                        {this.state.loading?(
                            <img className="loading" src="/images/loading.gif" alt=""/>
                        ):(
                            <></>
                        )}



                    </div>
                </section>





            </>
        );
    }
}
export default Home;