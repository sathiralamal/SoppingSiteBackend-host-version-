//for user to view all payments

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

class viewAllPayments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gotData:[],
            userID: localStorage.getItem("id")
        };

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

        axios.post(global.backend+'/payment/getAllPaymentDetails',data, options)
            .then(res=>this.setState({
                gotData:res.data
            }))
            .catch(err=>console.log('Error!! unsuccessful :'+err.data));
    }

    render() {
        return (
            <div>
                <Container>
                    <Alert color="info">
                        <h1 className="my-auto mx-auto text-center text-dark">PAYMENT-DETAILS</h1>
                    </Alert>

                    <Table responsive="md">
                        <thead>
                        <tr>
                            <th>Payment ID</th>
                            <th>Order ID</th>
                            <th>Payment Date</th>
                            <th>Payment amount</th>
                            <th>Payment type</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        {this.state.gotData.map(payments=>(
                            <tbody>
                            <tr>
                                <td>{payments.payID}</td>
                                <td>{payments.orderID}</td>
                                <td>{payments.payDate}</td>
                                <td>{payments.payAmount}</td>
                                <td>{payments.payType}</td>
                                <td>{payments.paymentStatus}</td>

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

export default viewAllPayments;
