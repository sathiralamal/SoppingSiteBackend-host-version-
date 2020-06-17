
import React,{Component} from "react";
import '../../../../css/showOneProduct.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {Link} from "react-router-dom";
import {Carousel} from "react-responsive-carousel";
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
//npm install react-responsive-carousel --save
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Suggestions from "../Suggestions/Suggestions";
import {Form, InputGroup} from "react-bootstrap";


import AddNewReview from "./AddNewReview";
import ShowReview from "./ShowReview";
import socketIOClient from "socket.io-client";
















class ShowOneProduct extends Component{

    constructor(props) {
        super(props);



        this.state={
            id:this.props.match.params.id,
            pcatgory:'',
            data:[],
            isAdmin:false,
            isDelete:false,
            showaddComment:true,
            isvalidate:false,
            mess:'',
            averageRating:0,
            uid:localStorage.getItem("id"),
            type:localStorage.getItem("type"),
            selectqty:0,
            selectSize:'',
            availabelQty:0


        };

    }

    componentWillMount() {



    }


    componentDidMount(){

        document.body.scrollTop = 0;
        document.documentElement.scrollTop=0;
        socketIOClient(global.backendSoket).on('NotifyProductChange', data => {

            if (data.type=="update"){
                if (data.pid==this.state.id){
                    window.location.replace(this.props.location.pathname);
                }

            }else if (data.type=="delete"){
                if (data.pid==this.state.id){
                    if (!this.state.isAdmin){
                        window.location.replace("allProducts/"+this.state.data[0].catogory);
                    }
                }
            }
        });





        if (window.performance) {
            if (window.performance.navigation.type == 1) {
                window.location.replace(this.props.location.pathname);
            }
        }

        this.props.history.listen((location, action) => {


            try {
                document.getElementById('preloder').style.display="block";
                let key= location.pathname.split("/")[2];

                this.state.id=key;

                this.getData();
                document.body.scrollTop = 0;
                document.documentElement.scrollTop=0;
            }catch (e) {

            }
        });


        this.getData();

        if(this.state.uid==null){
            this.setState({
                showaddComment:false
            })
        }





    }

    selectSize=x=>{

        this.state.selectSize=x.target.value;

    }

    getData(){
        axios({
            methode: 'GET',
            url:global.backend+'/product/getSingelProduct',
            params:{s:true,id:this.state.id,tclick:true}
        }).then(res=>{
            if (this.state.uid!=null){
                    if(this.state.type=="store_manager"||this.state.type=="admin"){
                        if (this.state.uid==res.data[0].sellerID){

                            this.state.isAdmin=true;

                        }
                    }
                }
                this.setState({
                    data:res.data,
                    pcatgory:res.data[0].catogory,
                     availabelQty:res.data[0].quantity
                })


                document.getElementById('preloder').style.display="none";

        }).catch(err=>{
            console.log(err)
        });
    }






    buy=()=>{
        if (this.state.uid==""||this.state.uid==null){

        }else if (this.state.selectSize==''){
            alert('Please select Size');
        }else if (this.state.selectqty==0){
            alert('Please Enter Quantity');
        }else if(this.state.selectqty>this.state.availabelQty){
            alert('Sorry Now availabel Quantity '+this.state.availabelQty);
        } else{
            let details={uid:this.state.uid,pid:this.state.id,qty:this.state.qty,size:this.state.selectSize}
            // alert(details)

            //Create new Order
            let productsarray=[];
            productsarray.push(this.state.id)
            const order={
                totalAmaount:this.state.data[0].price,
                user_id:this.state.uid,
                products:productsarray,
                numberOfItem:1,
                orderCreateDate:new Date(),
                isDelevery:false
            }

            console.log(order);
            console.log(this.state.data[0].price);


            axios.post(global.backend+'/order/add',order)
                .then(res=>{
                    console.log("Order create");
                    console.log(res.data);
                    this.setState({order_id:res.data})

                    let order_idsend=this.state.order_id
                    window.location.href="/paymentMain?order_id="+order_idsend;


                })
                .catch(err=>console.log('Error in create order'+err)
                );

        }






    }

    setaverageRating=x=>{
        this.setState({
            averageRating:x
        })
    }




    addToCart=()=>{
        let data={user:this.state.uid,products:this.state.pid,qty:this.state.qty}
        axios.post(global.backend+'/cart/add',data)
            .then(res=>
                console.log(res.data)
            ).catch(err=>
            console.log(err)
        );
    }

    setQty=e=>{
        this.setState({
            selectqty:e.target.value
            })
    }
    setStars(x){
        if(x==0){
            return<div className="p-rating">
                <i className="fa fa-star-o fa-fade"></i>
                <i className="fa fa-star-o fa-fade"></i>
                <i className="fa fa-star-o fa-fade"></i>
                <i className="fa fa-star-o fa-fade"></i>
                <i className="fa fa-star-o fa-fade"></i>
            </div>
        }else if(x==1){
            return   <div className="p-rating">
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o fa-fade"></i>
                <i className="fa fa-star-o fa-fade"></i>
                <i className="fa fa-star-o fa-fade"></i>
                <i className="fa fa-star-o fa-fade"></i>
            </div>
        }else if(x==2){
            return   <div className="p-rating">
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o fa-fade"></i>
                <i className="fa fa-star-o fa-fade"></i>
                <i className="fa fa-star-o fa-fade"></i>
            </div>

        }else if(x==3){
            return   <div className="p-rating">
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o fa-fade"></i>
                <i className="fa fa-star-o fa-fade"></i>
            </div>
        }else if(x==4){
            return   <div className="p-rating">
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o fa-fade"></i>
            </div>
        }else if(x==5){
            return   <div className="p-rating">
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
            </div>
        }





    }


    setImages(){
        let c=1;
        return <Carousel
            showArrows={true}
                         interval={3000}
                         autoPlay={true}
                         infiniteLoop={true}
                         showThumbs={true}
                         showIndicators={true}

                         centerMode={true}
                         centerSlidePercentage={100}
                         dynamicHeight={true}
                         useKeyboardArrows={true}
                         emulateTouch={true}
                         width={450}

        >
            { this.state.data[0].images.map(image=>(
                <div key={c} >
                    <img className="productImage"  src={global.backend+image} alt=""/>
                    {c++}
                </div>

            ))}

        </Carousel>
    }




    handleDialogue=(x)=>{
        if (x){

                 let query={
                     'isDelete':true,
                     'id':this.state.id
                 }
             //    console.log(query);
                 axios.post(global.backend+'/product/deleteProduct',query)
                 .then(res=>{
                     this.setState({
                         isDelete:false
                     });
                     socketIOClient(global.backendSoket).emit('ChangeProduct',{type:'delete',pid:this.state.id});
                     window.location.replace('/Myshop');

                 })
                 .catch(err=>console.log(err))


        }else {
            this.setState({
                isDelete:false
            });
        }

    }
    showAdminPannel(id){
            if (this.state.isAdmin){
                return <>
                <div className="btnGroup">
                    <h2>Admin pannel</h2><br/>
                    <Link to={"/Myshop/UpdateProduct/"+id}><button class="btn btn-success">Update</button></Link>
                    <button class="btn btn-danger" onClick={()=>{this.setState({
                        isDelete:true
                    })}} >Delete</button>

                </div>
                </>
            }
    }

    showPanel(btn,pannel){
        var button=document.getElementById(btn);
        if (button.className=="panel-link"){
           button.setAttribute("class","panel-link active");
           document.getElementById(pannel).setAttribute("class","collapse show");
       }else{
           button.setAttribute("class","panel-link");
           document.getElementById(pannel).setAttribute("class","collapse");
       }

    }

    render() {

        return <>
            <div id="preloder">
                <div className="loader"></div>
            </div>




            {this.state.data.map(product=>(
                <>
                <section className="product-section" key={product.id} >

                    <div className="container">
                        <div className="back-link">
                            <div style={{cursor:'pointer'}} onClick={()=>{window.history.back()}} > &lt;&lt; Back to Category</div>
                        </div>
                        <div className="row">



                            <div className="col-lg-6" >
                                {this.setImages()}


                            </div>
                            <div className="col-lg-6 product-details">
                                {this.showAdminPannel(product.id)}
                                <Dialog
                                    open={this.state.isDelete}

                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                           Are you sure you want to delete {product.proName} ?
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <button onClick={()=>this.handleDialogue(false)} class="btn btn-secondary">
                                            Cancel
                                        </button>
                                        <button onClick={()=>this.handleDialogue(true)} class="btn btn-danger" autoFocus>
                                            Delete
                                        </button>
                                    </DialogActions>
                                </Dialog>
                                <h2 style={{'font-size':'25px'}} className="p-title">{product.proName}</h2>

                                <h5 style={{'color':'gray'}} className="p-title"><span className="tag">CONDITION </span>{product.condition}</h5>
                                <h5 style={{'color':'gray'}} className="p-title"><span className="tag">CATEGORY </span>{product.catogory+" "+product.subCatogory}</h5>
                                <h2 style={{'color':'gray'}} className="p-title"><span className="tag">BRAND </span>{product.brand}</h2>
                                {(product.discount!=0&&product.discount!=null)?(
                                    <h3 className="p-price"><strike style={{color:'gray'}} >{product.price}$ </strike> {" "+(product.price-((product.price*product.discount)/100)).toFixed(2)}$</h3>
                                ):(
                                    <h3 className="p-price">{product.price} $</h3>
                                )}

                                <h4 className="p-stock">
                                    {product.quantity==0?(
                                        <>Unavailable:0</>
                                    ):(
                                        <>Available: <span>In Stock ({product.quantity}) </span></>
                                    )}



                                </h4>
                                {this.setStars(this.state.averageRating)}

                                <div className="fw-size-choose" id="sizeContainor">
                                    <p>Size</p>

                                    {product.size.map(size=>(
                                        size!="false"?(
                                            <div className="sc-item">
                                                <input type="radio" onClick={this.selectSize} value={size} name="size" id={size+"-size"}/>
                                                    <label htmlFor={size+"-size"}>{size}</label>
                                            </div>
                                        ):(<></>)


                                    ))}















                                </div>
                                <div className="quantity">
                                    <p>Quantity</p>
                                    <div className="pro-qty popup">
                                        <input type="number"   onChange={this.setQty} value={this.state.selectqty} />
                                        {this.state.selectqty>product.quantity?(
                                            <div className="popuptext show" id="myPopup">Sorry Currently availabel {product.quantity}</div>
                                        ):(
                                            <></>
                                        )}

                                    </div>
                                </div>
                                <div className="site-btn" onClick={this.buy}>Buy Now</div>


                                <div id="accordion" className="accordion-area">

                                    <div className="panel">
                                        <div className="panel-header" >
                                            <button className="panel-link active" id="headingOne" onClick={()=>this.showPanel("headingOne","collapse1")} >information
                                            </button>
                                        </div>

                                        <div id="collapse1" className="collapse show" aria-labelledby="headingOne"
                                             data-parent="#accordion">
                                            <div className="panel-body">
                                                <p>{product.description}</p>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="panel">
                                        <div className="panel-header" >
                                            <button className="panel-link" id="headingTwo" onClick={()=>this.showPanel("headingTwo","collapse2")}>care details
                                            </button>
                                        </div>
                                        <div id="collapse2" className="collapse" aria-labelledby="headingTwo"
                                             data-parent="#accordion">
                                            <div className="panel-body">
                                                <img src="/images/cards.png" alt=""/>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                                                    pharetra tempor so dales. Phasellus sagittis auctor gravida. Integer
                                                    bibendum sodales arcu id te mpus. Ut consectetur lacus leo, non
                                                    scelerisque nulla euismod nec.</p>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="panel">
                                        <div className="panel-header" >
                                            <button className="panel-link" id="headingThree" onClick={()=>this.showPanel("headingThree","collapse3")}>shipping & Returns
                                            </button>
                                        </div>
                                        <div id="collapse3" className="collapse" aria-labelledby="headingThree"
                                             data-parent="#accordion">
                                            <div className="panel-body">
                                                <h4>{product.shipping==null?(
                                                    "Free Shipping"
                                                    ):(
                                                    "Shipping Price "+product.shipping+"$"
                                                )}</h4>
                                                <h4>7 Days Returns</h4>
                                                <p>Cash on Delivery Available<br/>Home Delivery <span>3 - 4 days</span></p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra
                                                    tempor so dales. Phasellus sagittis auctor gravida. Integer bibendum
                                                    sodales arcu id te mpus. Ut consectetur lacus leo, non scelerisque nulla
                                                    euismod nec.</p>
                                            </div>
                                        </div>
                                    </div>




                                </div>
                                <div className="social-sharing">
                                    <Link to=""><i className="fa fa-google-plus"></i></Link>
                                    <Link to=""><i className="fa fa-pinterest"></i></Link>
                                    <Link to=""><i className="fa fa-facebook"></i></Link>
                                    <Link to=""><i className="fa fa-twitter"></i></Link>
                                    <Link to=""><i className="fa fa-youtube"></i></Link>
                                </div>
                            </div>


                        </div>





                    </div>
                </section>
                    <Suggestions catogory={product._id} subCatogory={product.subCatogory} id={product.id}/>
                </>
            ))}


            <div className="container">
                <h1>Reviews</h1><br/>

                <AddNewReview  id={this.state.id} />


                <ShowReview id={this.state.id} getaverageRating={this.setaverageRating} />

            </div>



        </> ;
    }
}
export default ShowOneProduct;