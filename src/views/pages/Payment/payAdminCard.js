//for pay admin to view all card payments and do actions

import React, { Component } from "react";
import {
    Button,
    Container,
    Table, Alert,
} from "reactstrap";

import CFooter from "@coreui/react/es/CFooter";
import axios from "axios";


class payAdminCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data:[]
        };

        this.handleChangeStatus = this.handleChangeStatus.bind(this);
    }

    componentDidMount() {
        const confirm = this.props.location.state.protection;
        if(confirm !== 'Confirm')
        {
            alert("Access denied");
            window.location='http://localhost:3000/payAdmin';
        }

        const options = {
            headers: {
                "content-type": "application/json", // whatever you want
                authorization: "Bearer ".concat(localStorage.getItem("AccessToken")),
            }
        };

        axios.get(global.backend+'/payment/getCardPaymentDetails',options)
            .then(res=>{this.setState({
                data: res.data
            });
            }).catch(err=>console.log('Error!! unsuccessful :'+err.data));
    }

    handleChangeStatus(id,id1){
        const sendId ={id,id1};
        const options = {
            headers: {
                "content-type": "application/json", // whatever you want
                authorization: "Bearer ".concat(localStorage.getItem("AccessToken")),
            }
        };
        axios.post(global.backend+'/payment/changeCardStatus', sendId, options)
            .then(res=>console.log('Request sent :'+res.data))
            .catch(err=>console.log('Error!! unsuccessful :'+err.data));
        window.location='http://localhost:3000/payAdminCard';
    }

    render() {
        return (
            <div>
                <Container>
                    <Alert color="info">
                        <h1 className="my-auto mx-auto text-center text-dark">PAYMENT CARD-DASHBOARD</h1>
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
                            <th>Change Status</th>
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
                                    <td>{payments.paymentStatus == 'Processing' ? <Button
                                            onClick={() => this.handleChangeStatus(payments.payID, payments.userID)}>Complete</Button> :
                                        <p>No actions</p>}</td>

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

export default payAdminCard;
