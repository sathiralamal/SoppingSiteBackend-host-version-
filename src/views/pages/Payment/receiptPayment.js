//for user to make bank payment

import React, { Component } from 'react';
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
    Alert, Table
} from 'reactstrap';
import CardFooter from "reactstrap/es/CardFooter";
import CFooter from "@coreui/react/es/CFooter";
import Form from "reactstrap/es/Form";
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";
import FormText from "reactstrap/es/FormText";
import axios from "axios";

class cardPayment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gotData:[],
            bankName: '',
            bankBranch: '',
            depositedAmount: '',
            depositedDate: '',
            receiptNumber:'',
            sendData:[]
        };

        this.handleBankName = this.handleBankName.bind(this);
        this.handleBankBranch = this.handleBankBranch.bind(this);
        this.handleDepositedAmount = this.handleDepositedAmount.bind(this);
        this.handleDepositedDate = this.handleDepositedDate.bind(this);
        this.handleReceiptNumber = this.handleReceiptNumber.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    componentDidMount() {
        const data={
            orderID:this.props.location.state.orderID
        };

        const options = {
            headers: {
                "content-type": "application/json", // whatever you want
                authorization: "Bearer ".concat(localStorage.getItem("AccessToken")),
            }
        };

        axios.post(global.backend+'/payment/getOrderDetails',data, options)
            .then(res=>this.setState({
                gotData:res.data
            }))
            .catch(err=>console.log('Error!! unsuccessful :'+err.data));
    }

    handleBankName(event){
        this.setState({bankName: event.target.value})
    }

    handleBankBranch(event){
        this.setState({bankBranch: event.target.value})
    }

    handleDepositedAmount(event){
        this.setState({depositedAmount: event.target.value})
    }

    handleDepositedDate(event){
        this.setState({depositedDate: event.target.value})
    }

    handleReceiptNumber(event){
        this.setState({receiptNumber: event.target.value})
    }
    onSubmit(event){
        event.preventDefault();

            const newBankPayment={
                payAmount: 0,
                userID: null,
                orderID: this.props.location.state.orderID,
                payDate: new Date(),
                bankName:this.state.bankName,
                bankBranch:this.state.bankBranch,
                depositedAmount:this.state.depositedAmount,
                depositedDate:this.state.depositedDate,
                receiptNumber:this.state.receiptNumber,
                cardNumber: null,
                cardCSV: null,
                cardHolderName: null,
                expireDate: null,
                cardType: null,
                payReceipt:true
            };

        const options = {
            headers: {
                "content-type": "application/json", // whatever you want
                authorization: "Bearer ".concat(localStorage.getItem("AccessToken")),
            }
        };

        axios.post(global.backend+'/payment/addBankPayment',newBankPayment, options)
            .then(res=>console.log('Added new bank payment :'+res.data))
            .catch(err=>console.log('Error!! unsuccessful :'+err.data));
        var protection="Confirm";
        window.location.href= `http://localhost:3000/payConfirm?protection=${protection}`;
    }

    render() {
        return (
            <div>
                <Container>
                    <Alert color="info">
                        <h1 className="my-3 mx-auto text-center text-dark">PAYMENT-RECEIPT</h1>
                    </Alert>
                    <Row className="my-2">
                        <Col className="mx-auto mb-5" xl="5">
                            <Card>
                                <CardImg top width="100%" src="./images/Payment/2.jpg" alt="Card image cap" />
                                <CardBody>
                                    <CardTitle ><h3 className="text-info font-weight-bold">Bank payment receipt</h3></CardTitle>
                                    <CardSubtitle className="font-weight-bold">Pay by Bank Slip </CardSubtitle>
                                    <br />
                                    <Form method="POST" onSubmit={this.onSubmit}>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label>Bank Name:</Label>
                                                    <Input type="text" name="bname" id="bname" placeholder="Enter bank name" onChange={this.handleBankName} required />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label>Branch</Label>
                                                    <Input type="text" name="branch" id="branch" placeholder="Enter bank branch" onChange={this.handleBankBranch} required />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <FormGroup>
                                            <Label>Amount</Label>
                                            <Input type="text" name="Amount" id="Amount" placeholder="Enter deposited amount" onChange={this.handleDepositedAmount} required />
                                        </FormGroup>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label>Deposited date</Label>
                                                    <Input type="date" name="ddate" id="ddate" required onChange={this.handleDepositedDate} />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label>Receipt Number</Label>
                                                    <Input type="text" name="receiptNumber" id="receiptNumber" placeholder="Enter receipt number" onChange={this.handleReceiptNumber} required />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Button color="danger" className="ml-auto my-2" type="submit">SUBMIT</Button>
                                    </Form>
                                </CardBody>
                                <CardFooter>
                                    <h6 className="text-muted text-right">Handled by <span className="text-info">C4FASHIONSPayAdmin</span></h6>
                                </CardFooter>
                            </Card>
                        </Col>

                        <Col className="mx-auto mb-5" xl="7">
                            <Card>
                                <CardImg top width="100%" src="./images/Payment/4.jpg" alt="Card image cap" />
                                <CardBody>
                                    <CardTitle ><h3 className="text-info font-weight-bold text-center">Order Details</h3></CardTitle>
                                    <CardSubtitle className="font-weight-bold text-center mb-4">Refer below your order items before proceed further</CardSubtitle>
                                    <CardText className="text-center">
                                        <Table responsive="sm">
                                            <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Number of Items</th>
                                                <th>Full payment</th>
                                                <th>Order Date</th>
                                            </tr>
                                            </thead>
                                            {this.state.gotData.map(details =>(
                                                <tbody>
                                                <tr>
                                                    <td>{details._id}</td>
                                                    <td>{details.numberOfItem}</td>
                                                    <td>{details.totalAmaount}</td>
                                                    <td>{details.orderCreateDate}</td>
                                                </tr>
                                                </tbody>
                                            ))}
                                        </Table>
                                    </CardText>
                                </CardBody>
                                <CardFooter>
                                    <h6 className="text-muted text-right">Handled by <span className="text-info">C4FASHIONSPayAdmin</span></h6>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                    <CFooter><h6 className="text-right">By <span className="text-danger">PaymentAdmin</span></h6></CFooter>
                </Container>


            </div>
        );
    }
}

export default cardPayment;