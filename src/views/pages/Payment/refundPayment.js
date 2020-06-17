//for user to view refundable payments

import React, { Component } from "react";
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
    Container,
    Row,
    Col,
    Table, Alert,
} from "reactstrap";
import CardFooter from "reactstrap/es/CardFooter";
import CFooter from "@coreui/react/es/CFooter";
import Form from "reactstrap/es/Form";
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";
import FormText from "reactstrap/es/FormText";
import axios from "axios";
import {Link} from 'react-router-dom';

class refundPayment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gotData:[],
            userID: localStorage.getItem("id")
        };

        this.handleRefundOption = this.handleRefundOption.bind(this);
    }
    componentDidMount() {
        const data = {
            userID: this.state.userID
        };

        const options = {
            headers: {
                "content-type": "application/json", // whatever you want
                authorization: "Bearer ".concat(localStorage.getItem("AccessToken")),
            }
        };

        axios.post(global.backend+'/payment/getRefundPaymentDetails',data, options)
            .then(res=>this.setState({
                gotData:res.data
            }))
            .catch(err=>console.log('Error!! unsuccessful :'+err.data));
    }

    handleRefundOption(id){
        const sendId ={id};
        const options = {
            headers: {
                "content-type": "application/json", // whatever you want
                authorization: "Bearer ".concat(localStorage.getItem("AccessToken")),
            }
        };
        axios.post(global.backend+'/payment/refundRequest',sendId, options)
            .then(res=>console.log('Request sent :'+res.data))
            .catch(err=>console.log('Error!! unsuccessful :'+err.data));
    }

    redirectFunction=()=>{

    }
    render() {
        return (
            <div>
                <Container>
                    <Alert color="info">
                        <h1 className="my-auto mx-auto text-center text-dark">PAYMENT-REFUND</h1>
                    </Alert>

                    <h6 className="my-3 mx-auto text-center text-dark">Make sure, only for card payments can be raised a refund request</h6>

                            <Table responsive="md">
                                <thead>
                                <tr>
                                    {/*
                                    if the status is not delivered only, refunds can be accpeted, if the status is delivered,
                                    refund button should not be clickable.
                                    */}
                                    <th>Payment ID</th>
                                    <th>Order ID</th>
                                    <th>Payment Date</th>
                                    <th>Payment amount</th>
                                    <th>Status</th>
                                    <th>Refund</th>
                                </tr>
                                </thead>
                                {this.state.gotData.map(payments=>(
                                    <tbody>
                                    <tr>
                                        <td>{payments.payID}</td>
                                        <td>{payments.orderID}</td>
                                        <td>{payments.payDate}</td>
                                        <td>{payments.payAmount}</td>
                                        <td>{payments.paymentStatus}</td>
                                        {payments.paymentStatus === 'Processing' ?
                                            <td><Link to={{
                                                pathname: '/refundRequest', state: {
                                                    payID: payments.payID,
                                                    orderID: payments.orderID,
                                                    payDate: payments.payDate,
                                                    payAmount: payments.payAmount,
                                                    paymentStatus: payments.paymentStatus
                                                }
                                            }}>
                                                {payments.refundRequest === false ? <Button
                                                        onClick={() => this.handleRefundOption(payments.payID)}>Refund</Button>
                                                    :
                                                    <p>Request sent</p>
                                                }
                                            </Link></td>
                                            :
                                            <td><p>No actions</p></td>
                                        }

                                    </tr>
                                    </tbody>
                                ))}
                            </Table>

                    <CFooter><h6 className="text-right">By <span className="text-danger">PaymentAdmin</span></h6></CFooter>
                </Container>


            </div>
        );
    }
}

export default refundPayment;
