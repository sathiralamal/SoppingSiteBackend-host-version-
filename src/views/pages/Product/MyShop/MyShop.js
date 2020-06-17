import React,{Component} from "react";
import '../../../../css/myShop.css'
import {Link} from "react-router-dom";
import '../../../../css/showAllProducts.css'
import axios from "axios";





class MyShop extends  Component{

constructor(props) {


    super(props);
    this.state={
        uid:localStorage.getItem("id"),
        type:localStorage.getItem("type"),
        data:[],
        next:0,
        limit:4,
        loading:false,
        find:''


    }




}

    componentWillMount() {
        if (this.state.uid==null||this.state.uid==""){
            window.location.replace("/");
        }else if(this.state.type!="store_manager"){
            if(this.state.type!="admin"){
                window.location.replace("/");
            }
        }


    }

    componentDidMount() {

    const script = document.createElement("script");
    script.src = "../../../js/main.js";
    script.async = true;
    document.body.appendChild(script);




    if (window.performance) {
        if (window.performance.navigation.type == 1) {
            window.location.replace('/Myshop');

        }
    }


    this.getData();
    var scrollPos = 0;
    window.onscroll = ()=>{

        try {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            var productBoxEle=document.getElementById('productBox');
            var productBox=productBoxEle.scrollHeight*(75/100); //  box height 80%

            if(winScroll>(productBoxEle.offsetTop+productBox) &&((document.body.getBoundingClientRect()).top < scrollPos)) {
             
                if (this.state.loading){
                    this.state.next+=this.state.limit;
                    this.loadmore();
                    this.state.loading=false;
                }
            }


            scrollPos = (document.body.getBoundingClientRect()).top;
        }catch (e) {

        }

    };



}

    loadmore=()=>{
        axios({
            methode: 'GET',
            url:global.backend+'/product/myShop',
            params:{sellerID:this.state.uid,sets:this.state.next,limit:this.state.limit}
        }).then(res=>{
            this.setState({
                data:[...this.state.data,...res.data],

            },()=>{

                this.state.loading=true;
            })
        }).catch(err=>console.log(err));

    }


getData=()=>{
    axios({
        methode: 'GET',
        url:global.backend+'/product/myShop',
        params:{sellerID:this.state.uid,sets:this.state.next,limit:this.state.limit}
    }).then(res=>{
        this.setState({
            data:res.data,

        },()=>{
            this.state.loading=true;
            document.getElementById('preloder').style.display="none";
        })
    }).catch(err=>console.log(err));

}



    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }




    render() {

        return <>
            <div id="preloder">
            <div className="loader"></div>
        </div>

            <div className="hbox">
                <h4>My shop</h4>
                <div className="site-pagination">
                    <Link to="/">Home</Link> /
                    <Link to="/Myshop">My Shop</Link> /
                </div>
            </div>

            <div className="container">

                <section className="cart-section spad">
                    <div className="container">
                        <div className="row">


                            <div className="col-lg-12">
                                <div className="cart-table">

                                    <div className="cart-table-warp div" id="productBox">


                                            {this.state.data.length==0?(
                                                <h1>No Products</h1>
                                            ):(
                                                <>
                                                <table>


                                                <thead>
                                                <tr>
                                                    <th style={{'max-width':'450px','font-size':'15px'}} >Product</th>

                                                    <th style={{'width':'100px','font-size':'15px'}}>Total Clicks</th>
                                                    <th style={{'font-size':'15px'}}>price ($)</th>
                                                    <th style={{'font-size':'15px'}}>Shipping ($)</th>
                                                    <th style={{'font-size':'15px'}}>Discount (%)</th>
                                                    <th style={{'font-size':'15px'}}>Modify Date</th>
                                                    <th style={{'width':'100px','font-size':'15px'}}>View</th>

                                                </tr>
                                                </thead>
                                                    <tbody>
                                            {this.state.data.map(item=>(
                                                        <tr key={item.id} >

                                                            <td className="product-col" >
                                                                <img className="img" style={{ 'width': '150px', 'min-width': '150px',height:'200px'}} src={global.backend+item.images[0]} alt=""/>
                                                                <div  className="pc-title">
                                                                    <h4>{item.proName}</h4>


                                                                </div>
                                                            </td>


                                                            <td>{item.totClicks}</td>
                                                            <td>{item.price}</td>
                                                            <td>{item.shipping==null?(
                                                                0
                                                            ):(
                                                                item.shipping
                                                            )}</td>
                                                            <td>{item.discount==null?(
                                                                0
                                                            ):(
                                                                item.discount
                                                            )}</td>
                                                            <td>{this.formatDate(item.addDate) }</td>
                                                            <td><Link to={"/oneProduct/"+item.id}> <button class="btn btn-info" >View</button></Link></td>

                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                                </>
                                                )}

                                        {this.state.loading?(
                                            <img className="loading" src="/images/loading.gif" alt=""/>
                                        ):(
                                            <></>
                                        )}






                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </section>


            <table>


            </table>
            </div></>
    }


}
export default MyShop;