import React, { Component } from 'react';
import { HashRouter, Route, Switch ,Redirect,BrowserRouter as Router} from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import alertify from "alertifyjs/build/alertify";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.min.css";

import DefaultFooter from "./containers/DefaultLayout/DefaultFooter";
import DefaultHeader from "./containers/DefaultLayout/DefaultHeader";
import AddProduct from "./views/pages/Product/AddProduct/AddProduct";
import {DefaultLayout} from "./containers";
import ShowAllProducts from "./views/pages/Product/ShowAllProducts/ShowAllProducts";
import ShowOneProduct from "./views/pages/Product/ShowOneProduct/ShowOneProduct";
import Home from "./views/pages/HomePage";
import Register from "./views/pages/Register"
import UpdateProduct from "./views/pages/Product/UpdateProduct/UpdateProduct";
import MyShop from "./views/pages/Product/MyShop/MyShop";
import AdminDashbord from "./views/pages/AdminPages/admindashbord";
import fakeAuth from "./views/pages/fakeAuth"
import Login from "./views/pages/Login"
import Login2 from "./views/pages/Login/Login2"
import ProductCategory from "./views/pages/AdminPages/ProductCategory/createcategoryPanal";
import StoreManagerPanal from "./views/pages/AdminPages/StoreManagerRegister/StoremanagerPanal";
import registerVerify from "./views/pages/registerVerify";
import UserProfile from "./views/pages/UserProfile"
import forgetpassword from "./views/pages/Forgetpassword/forgetpassword"
import ResetVerify from "./views/pages/ResetVerify/ResetVerify"
//=========================PAYMENT PAGES==================================
import PaymentMain from "./views/pages/Payment/PaymentMain";
import cardPayment from "./views/pages/Payment/cardPayment";
import receiptPayment from "./views/pages/Payment/receiptPayment";
import payConfirm from "./views/pages/Payment/payConfirm";
import payAdmin from "./views/pages/Payment/payAdmin";
import refundPayment from "./views/pages/Payment/refundPayment";
import refundRequest from "./views/pages/Payment/refundRequest";
import paymentSuccess from "./views/pages/Payment/PaymentSuccess";
import payment from "./views/pages/Payment/Payment";
import viewAllPayments from "./views/pages/Payment/viewAllPayments";
import payAdminCard from "./views/pages/Payment/payAdminCard";
import payAdminReceipt from "./views/pages/Payment/payAdminReceipt";
import payAdminRefund from "./views/pages/Payment/payAdminRefund";
import payInvoice from "./views/pages/Payment/PaymentInvoice";

//=========================CART===========================================

import Cart from "./views/pages/Cart/Cart"

//=========================ORDER==========================================
import OrderDashbord from "./views/pages/AdminPages/Order/orderTable"
import SearchResults from "./views/pages/Product/SearchResults/SearchResults";
import LatestProducts from "./views/pages/HomePage/LatestProducts";
import ContactUs from "./views/pages/ContactUs/ContactUs";


//========================================================================
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;








// Containers
//const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
// const Login = React.lazy(() => import('./views/Pages/Login'));
// const Page404 = React.lazy(() => import('./views/Pages/Page404'));
// const Page500 = React.lazy(() => import('./views/Pages/Page500'));

const PrivateRouteUser = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    //fakeAuth.isAuthenticated === true
    localStorage.getItem("type")==="user"
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location,
            msg:"Access Denied Login as user to continue"  }
        }} />
       
  )} />
)


const PrivateRouteAdmin = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    //fakeAuth.isAuthenticated === true
    localStorage.getItem("type")==="admin"
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location,
            msg:"Access Denied Login as admin to continue"  }
        }} />
       
  )} />
)

const PrivateRoutePayadmin = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    //fakeAuth.isAuthenticated === true
    localStorage.getItem("type")==="payadmin"
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location,
            msg:"Access Denied Login as payment admin to continue" }
          
        }} />
        
       
  )} />
)

const PrivateRouteStoreManager = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    //fakeAuth.isAuthenticated === true
    localStorage.getItem("type")==="store_manager"
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location,
          msg:"Access Denied Login as Store Manager to continue" }
        }} />
       
  )} />
)

class App extends Component {

  render() {
    return (
        <Router>

            <div className="App">
                <DefaultHeader/>
                <Switch>
                    <Route  path ="/" exact   component={Home} />
                    
                    {/* <Route path="/login1" exact component={Login}/> */}
                    
                    <Route path="/allProducts/:id" exact component={ShowAllProducts} />
                    <Route path="/oneProduct/:id" exact component={ShowOneProduct} />
                    <Route path="/Myshop" exact component={MyShop} />
                    <Route path="/Myshop/addProduct" component={AddProduct} />
                    <Route path="/Myshop/UpdateProduct/:id" exact component={UpdateProduct} />
                    <Route path="/search/:key" exact component={SearchResults}/>
                    <Route path="/contactus" exact component={ContactUs}/>
                    
                    {/* StoreManager */} 
                    <PrivateRouteAdmin path="/adminDashboard" component={AdminDashbord}/>
                    <Route path="/productcategory" component={ProductCategory}/>
                    <Route path="/storeManager" component={StoreManagerPanal}/>


                    {/* User */}
                    <Route path="/login" exact component={Login}/>
                    <Route exact path="/Register" component={Register} />
                    <Route exact path="/RegisterConfirm" component={registerVerify}/>
                    <Route path="/Login2" exact component={Login2}/>
                    <PrivateRouteUser path="/userprofile" exact component={UserProfile}/>
                    <Route path="/forgotpassword" exact component={forgetpassword}/>
                    <Route path="/resetpassword" exact component={ResetVerify}/>

                    {/* PAYMENT */}
                    <PrivateRouteUser path="/paymentMain" component={PaymentMain} />
                    <PrivateRouteUser path="/cardPayment" component={cardPayment} />
                    <PrivateRouteUser path="/receiptPayment" component={receiptPayment} />
                    <PrivateRouteUser path="/payConfirm" component={payConfirm} />
                    <PrivateRoutePayadmin path="/payAdmin" component={payAdmin} />
                    <PrivateRouteUser path="/refundPayment" component={refundPayment} />
                    <PrivateRouteUser path="/refundRequest" component={refundRequest} />
                    <PrivateRouteUser path="/paymentSuccess" component={paymentSuccess} />
                    <Route path="/payment" component={payment} />
                    <PrivateRouteUser path="/allPayments" component={viewAllPayments} />
                    <PrivateRoutePayadmin path="/payAdminCard" component={payAdminCard} />
                    <PrivateRoutePayadmin path="/payAdminReceipt" component={payAdminReceipt} />
                    <PrivateRoutePayadmin path="/payAdminRefund" component={payAdminRefund} />
                    <PrivateRouteUser path="/payInvoice" component={payInvoice} />
                    
                    {/*CART*/}
                    {/*<Route path="/cart" component={Cart}/>*/}
                    <PrivateRouteUser path="/cart" component={Cart}/>
                    {/*ORDER*/}
                    <Route path="/orderDashbord" component={OrderDashbord}/>

                </Switch>
                <DefaultFooter/>
                
            </div>
        </Router>
    );
  }

}

export default App;
