import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import Login2 from "../../views/pages/Login/Login2"
import Register from "../../views/pages/Register"
import '../../css/animate.css';
import '../../css/bootstrap.min.css';
import '../../css/flaticon.css';
import '../../css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../../css/slicknav.min.css';
import '../../css/style.css';
import axios from "axios";




const propTypes = {
    children: PropTypes.node,
};


const defaultProps = {};

class DefaultHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            large: false,
            small: false,
            primary: false,
            success: false,
            warning: false,
            danger: false,
            info: false,
            skeyWord:'',
            getCatogorys:[],

            PrdouctList:[],

            shownew:""
        };


        this.toggleLarge = this.toggleLarge.bind(this);

    }

    changefalse=(value)=>{
        this.setState({
            large:value
        })
    }

    toggleLarge(large) {
        this.setState({
            large: !this.state.large,
        });
    }
    componentDidMount(){
        axios.get(global.backend+"/productCategory")
            .then(result=> {
                this.state.getCatogorys=result.data.sort((a,b)=>a._id<b._id?-1:1);
                this.setState({
                    shownew:this.state.getCatogorys[this.state.getCatogorys.length-1].categoryName
                });

            }).catch(err=>console.log(err));

        this.getCartItem()

    }

    getCartItem=()=>{

        axios.get(global.backend+'/cart/'+localStorage.getItem('id'))
            .then(async ressopns=>{

                this.setState({PrdouctList:ressopns.data})
                let noOrderedItems=this.state.PrdouctList.filter(Items=>{
                    return Items.isOrder==false
                })
                this.setState({
                    PrdouctList:noOrderedItems
                })
            })
            .catch(err=>console.log('error in get number of item'+err))

    }

    getKeyWord=e=>{

        this.setState({
            skeyWord:e.target.value
        })
    }
    search=e=>{
        e.preventDefault();
        if (this.state.skeyWord!=""){
            window.location.replace('/search/'+this.state.skeyWord);
        }



    }



    state = {  }
    render() {
        // if(localStorage.getItem("AccessToken")!==null)
        // {
        //     this.setState({
        //         large:false

        //     })
        // }
        return ( <React.Fragment>


                <header className="header-section">
                    <div className="header-top">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-2 text-center text-lg-left">
                                    <Link to="/" className="site-logo">
                                        <img src="/images/logo.png" alt=""/>
                                    </Link>
                                </div>
                                <div className="col-xl-6 col-lg-5">
                                    <form className="header-search-form" onSubmit={this.search}>
                                        <input type="text" onChange={this.getKeyWord} value={this.skeyWord} placeholder="Search ...."/>
                                        <button><i className="flaticon-search"></i></button>
                                    </form>
                                </div>
                                <div className="col-xl-4 col-lg-5">

                                    <div className="user-panel">
                                    {localStorage.getItem("type")==="user"?
                                        <div className="up-item">
                                            <div className="shopping-card">
                                                <i className="flaticon-bag"></i>

                                                <span>{this.state.PrdouctList.length}</span>
                                            </div>

                                            <Link to="/cart">Shopping Cart</Link>

                                        </div>
                                        :<></>}

                                        <div className="up-item">
                                            {localStorage.getItem("AccessToken")===null?

                                                <div className="loginRegister" onClick={this.toggleLarge}> <i className="flaticon-profile"></i>
                                                    Sign In or Create Account</div>:(
                                                    <>
                                                        <div className="dropdown">
                                                            <button className="dropbtn" >{localStorage.getItem("name").charAt(0)}</button>
                                                            <div className="dropdown-content">
                                                                {localStorage.getItem("type")==="user"?

                                                                    <div onClick={()=>{window.location.href="/userprofile"}}>Profile</div>:<></>}

                                                                <div onClick={()=>{localStorage.clear(); window.location.href="/"}}>Logout</div>
                                                            </div>
                                                        </div>

                                                    </>
                                                )}



                                            <Modal isOpen={this.state.large} toggle={this.toggleLarge}
                                                   className={'modal-lg ' + this.props.className}>

                                                <ModalBody>
                                                    <Login2 toggle={this.toggleLarge}/>
                                                </ModalBody>
                                                {/* <ModalFooter>
					  <Link to="/Register">
                    <Button color="primary" onClick={this.toggleLarge}>Sign Up!</Button>{' '}
					</Link>
                    <Button color="secondary" onClick={this.toggleLarge}>Cancel</Button>
                  </ModalFooter> */}
                                            </Modal>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <nav className="main-navbar">
                        <div className="container">
                            <ul className="main-menu">
                                <li><Link to="/">Home  </Link></li>


                                {this.state.getCatogorys.map(catogory=>(
                                    <li key={catogory._id} ><Link to={"/allProducts/"+catogory.categoryName}  >
                                        {catogory.categoryName}
                                        {this.state.shownew==catogory.categoryName?(

                                            <span className="new">New</span>
                                        ):(
                                            <></>
                                        )}


                                    </Link>
                                        {(catogory.subCategory.length>0)?(
                                            <ul className="sub-menu">
                                                {(catogory.subCategory.map(subCategory=>(
                                                    <li key={subCategory} ><Link to={"/allProducts/"+catogory.categoryName+"~"+subCategory}>{subCategory}</Link></li>
                                                )))}


                                            </ul>
                                        ):(
                                            <></>
                                        )}




                                    </li>
                                ))}

                                {localStorage.getItem('type')=="store_manager"||localStorage.getItem('type')=="admin"?(
                                    <li><Link to="/Myshop">My Shop</Link>
                                        <ul className="sub-menu">
                                            <li><Link  to="/Myshop">My Shop</Link></li>
                                            <li><Link  to="/Myshop/addProduct">Add Product</Link></li>

                                        </ul>
                                    </li>
                                ):(
                                    <></>
                                )}



                                {localStorage.getItem('type')=="store_manager"||localStorage.getItem('type')=="admin"?(
                                    <li>
                                        <NavLink to="/adminDashboard" className="nav-link" >Dashboard</NavLink>
                                    </li>
                                ):(
                                    <></>
                                )

                                }






                                {localStorage.getItem("type")==="user"?
                                <li>
                                    <Link to="/payment" className="nav-link">Payment</Link>
                                </li>
                                :<></>}
                                <li>
                                    <Link to="/contactus" className="nav-link">Contact us</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>


            </React.Fragment>
        );
    }

}
DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;