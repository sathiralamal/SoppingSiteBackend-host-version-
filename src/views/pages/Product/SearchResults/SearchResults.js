import React, {Component, useEffect} from "react";
import '../../../../css/showAllProducts.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import axios from 'axios';
import {Link} from "react-router-dom";
import $ from 'jquery'
import ProductCard from "../ProductCard";
import socketIOClient from "socket.io-client";

class SearchResults extends Component{

    constructor(props) {
        super();
        this.state={
            subCatogory:null,
            skey:props.history.location.pathname.split("/")[2],
            size:null,
            data:[],
            products:[],
            length:0,
            price:[0,1000],
            pageloading:'block',
            next:0,
            getCatogorys:[],
            catogory:'',
            isLoadmore:true,
            limit:3,
            loading:false

        };
        this.loadCatogories();


    }




    componentDidMount(){

        socketIOClient(global.backendSoket).on('NotifyProductChange', data => {


            if (data.type=="update"||data.type=="delete"){
                window.location.reload();
            }
        });
        const script = document.createElement("script");
        script.src = "../../../../js/main.js";
        script.async = true;
        document.body.appendChild(script);








        this.props.history.listen((location, action) => {
            if (action=="POP"){
                window.location.reload();
            }
           document.getElementById('preloder').style.display="block";
            this.clearSize();

            this.state.next=0;

            this.state.minPrice=0;
            this.state.maxPrice=10000;
            this.state.size=null;
            this.setState({
                skey:location.pathname.split("/")[2]
            },()=>this.getData());
        });




        var scrollPos = 0;
        window.onscroll = ()=>{

            try {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

                var productBox=document.getElementById('productBox').scrollHeight*(0.5); //  box height 80%

                var scrolled =winScroll;

                if(scrolled>productBox &&((document.body.getBoundingClientRect()).top < scrollPos)){
                    this.state.next+=this.state.limit;

                    if (this.state.isLoadmore){
                        this.setState({
                            loading:true
                        })
                        this.state.isLoadmore=false;
                        this.loadmore();
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


        if (window.performance) {
            if (performance.navigation.type == 1) {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop=0;
                this.state.next=0;
                this.state.isLoadmore=true;
                window.location.replace(this.props.history.location.pathname);
            }
        }

    }

    loadCatogories=async ()=>{

        await axios.get(global.backend +"/productCategory")
            .then(result=> {
                this.setState({
                    getCatogorys:result.data,
                },()=>{
                    this.getData();
                });

            }).catch(err=>console.log(err));


    }



    loadmore=async ()=>{

        await axios({
            methode: 'GET',
            url:global.backend +'/product/getSearchProduct',
            params:{s:true,key:this.state.skey,minprice:this.state.price[0],maxprice:this.state.price[1],size:this.state.size ,sets:this.state.next,limit:this.state.limit },

        }).then(res=>{
            if (res.data.length!=0){
                this.setState({
                    data:[...this.state.data,...res.data]

                },()=>{
                    this.setState({
                        loading:false
                    })
                    this.state.isLoadmore=true;
                });
            }else {
                this.state.isLoadmore=false;
            }

        }).catch(err=>{
            console.log(err);
        });
    }



    getData  =async ()=>{

        await axios({
            methode: 'GET',
            url: global.backend +'/product/getSearchProduct',
            params:{s:true,key:this.state.skey,minprice:this.state.price[0],maxprice:this.state.price[1],size:this.state.size ,sets:this.state.next,limit:this.state.limit },


        }).then(res=>{
            this.setState({
                data:[...res.data]
            },()=>{
                setTimeout(()=>{
                    document.getElementById('preloder').style.display="none";
                },200);
            });
        }).catch(err=>{

            console.log(err);
        });



    }

    clearSize(){
        this.state.next=0;
        var tags=document.getElementsByName("size");
        var i=0;
        while (i<tags.length){
            tags[i].checked=false;
            i++;

        }

    }


    setSize =e=>{
        this.state.next=0;
        this.state.isLoadmore=true;
        var clicked=document.getElementById(e);
        clicked.checked=true;
        this.setState({
            size:clicked.id
        },()=>this.getData());
    }

    setPrice=(e,values)=>{
        this.state.next=0;
        this.state.isLoadmore=true;
       // console.log("price change")
        this.setState({
            price:values
        });
    }

    getDataByPrice=()=>{
        this.getData();
    }


    setActive(x){
        document.getElementById(x).setAttribute("class","active");
    }
    removeActive(x){
        document.getElementById(x).setAttribute("class","");
    }

    render() {
        return <>
            <div id="preloder">
                <div className="loader"></div>
            </div>
            <div className="page-top-info" style={{height: '50px'}}>
                <div className="container">
                    <h4><span style={{color:'gray','font-size':'25px'}} >Search Result : </span>{this.state.skey}</h4>

                </div>
            </div>
            <section className="category-section spad" style={{'padding-top': '50px'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 order-2 order-lg-1">
                            <div className="filter-widget">
                                <h2 className="fw-title">Categories</h2>
                                <ul className="category-menu">
                                    {this.state.getCatogorys.map(catogory=>(
                                        <li key={catogory._id} id={catogory._id} onMouseOver={()=>this.setActive(catogory._id)} onMouseOut={()=>this.removeActive(catogory._id)}><Link to={"/allProducts/"+catogory.categoryName}  >{catogory.categoryName}</Link>
                                            {(catogory.subCategory.length>0)?(
                                                <ul className="sub-menu">
                                                    {(catogory.subCategory.map(subCategory=>(
                                                        <li key={subCategory} ><Link to={"/allProducts/"+catogory.categoryName+"~"+subCategory}  >{subCategory}</Link></li>
                                                    )))}


                                                </ul>
                                            ):(
                                                <></>
                                            )}




                                        </li>
                                    ))}



                                </ul>


                            </div>
                            <div className="filter-widget mb-0">
                                <h2 className="fw-title">refine by</h2>
                                <div className="price-range-wrap">
                                    <h4>Price</h4>
                                    <Slider
                                        value={this.state.price}
                                        onChange={this.setPrice}
                                        valueLabelDisplay="auto"
                                        aria-labelledby="range-slider"
                                        style={{width:"250px"}}
                                        max={1000}
                                        onClick={this.getDataByPrice}
                                    />
                                    <div className="priceinput">
                                        <div >
                                            <label htmlFor="">{this.state.price[0]}</label>
                                            <label style={{width:'70px'}} htmlFor="">min Price</label>
                                        </div>
                                        <div style={{'margin-left':'120px'}} >
                                            <label htmlFor="">{this.state.price[1]}</label>
                                            <label style={{width:'70px'}}htmlFor="">max Price</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="filter-widget mb-0">
                                <h2 className="fw-title">Size</h2>
                                <div className="fw-size-choose">
                                    <div className="sc-item">
                                        <input type="radio" name="size" id="XS"   />
                                        <label htmlFor="xs-size" onClick={()=>this.setSize('XS')}>XS</label>
                                    </div>
                                    <div className="sc-item">
                                        <input type="radio" name="size" id="S"  />
                                        <label htmlFor="s-size" onClick={()=>this.setSize('S')}>S</label>
                                    </div>
                                    <div className="sc-item">
                                        <input type="radio" name="size" id="M"    />
                                        <label htmlFor="m-size" onClick={()=>this.setSize('M')}>M</label>
                                    </div>
                                    <div className="sc-item">
                                        <input type="radio" name="size" id="L"   />
                                        <label htmlFor="l-size" onClick={()=>this.setSize('L')}>L</label>
                                    </div>
                                    <div className="sc-item">
                                        <input type="radio" name="size" id="XL"   />
                                        <label htmlFor="xl-size" onClick={()=>this.setSize('XL')}>XL</label>
                                    </div>
                                    <div className="sc-item">
                                        <input type="radio" name="size" id="XXL"    />
                                        <label htmlFor="xxl-size" onClick={()=>this.setSize('XXL')}>XXL</label>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-lg-9  order-1 order-lg-2 mb-5 mb-lg-0" id="products">
                            <div className="row" id="productBox">
                                {this.state.data.length==0?(
                                    <h1>No Results Found</h1>
                                ):(this.state.data.map(oneRow=>(
                                        <div className="col-lg-4 col-sm-6" key={oneRow.id}>


                                                    <ProductCard data={oneRow} />

                                        </div>

                                    ))
                                )}

                                {this.state.data.length==0?(
                                    <></>
                                ):(
                                    <></>
                                )}







                            </div>
                            {this.state.loading?(
                                <img className="loading" src="/images/loading.gif" alt=""/>
                            ):(
                                <></>
                            )}

                        </div>
                    </div>
                </div>
            </section>
        </>;

    }

}
export default SearchResults;