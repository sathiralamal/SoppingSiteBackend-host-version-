//for pay admin to view all refund requests and do actions

import React, { Component } from "react";
import {
    Button,
    Container,
    Table, Alert,
} from "reactstrap";

import CFooter from "@coreui/react/es/CFooter";
import axios from "axios";


class payAdminRefund extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data:[],
            dataCheck:false
        };

        this.handleRefundChangeStatus = this.handleRefundChangeStatus.bind(this);
    }

    componentDidMount() {

        const options = {
            headers: {
                "content-type": "application/json", // whatever you want
                authorization: "Bearer ".concat(localStorage.getItem("AccessToken")),
            }
        };

        axios.get(global.backend+'/payment/getRefundPaymentDetailsForAdmin',options)
            .then(res=>{this.setState({
                data: res.data
            });
            }).catch(err=>console.log('Error!! unsuccessful :'+err.data));
    }

    handleRefundChangeStatus(id,id1){
        const sendId ={id,id1};
        const options = {
            headers: {
                "content-type": "application/json", // whatever you want
                authorization: "Bearer ".concat(localStorage.getItem("AccessToken")),
            }
        };
        axios.post(global.backend+'/payment/acceptRefund', sendId, options)
            .then(res=>console.log('Request sent :'+res.data))
            .catch(err=>console.log('Error!! unsuccessful :'+err.data));
        window.location='http://localhost:3000/payAdminRefund';
    }

    render() {
        return (
            <div>
                <Container>
                    <Alert color="info">
                        <h1 className="my-auto mx-auto text-center text-dark">PAYMENT REFUND-DASHBOARD</h1>
                    </Alert>

                    <Table responsive="md">
                        <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Payment ID</th>
                            <th>Order ID</th>
                            <th>Payment Date</th>
                            <th>Payment amount</th>
                            <th>Payment type</th>
                            <th>Status</th>
                            <th>Refund Action</th>
                        </tr>
                        </thead>
                        {this.state.data.map(payments=>(

                                    <tbody>
                                        <tr>
                                        <td>{payments.userID}</td>
                                        <td>{payments.payID}</td>
                                        <td>{payments.orderID}</td>
                                        <td>{payments.payDate}</td>
                                        <td>{payments.payAmount}</td>
                                        <td>{payments.payType}</td>
                                        <td>{payments.paymentStatus}</td>
                                        <td><Button
                                        onClick={() => this.handleRefundChangeStatus(payments.payID, payments.userID)}
                                        className="btn btn-success">Accept</Button></td>
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

export default payAdminRefund;
