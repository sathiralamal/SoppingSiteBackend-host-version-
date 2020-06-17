// for user to make card payments
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
import {Link,Redirect} from 'react-router-dom';

class cardPayment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gotData:[],
            cardNumber: '',
            cardCSV: '',
            cardHolderName: '',
            expireDate: '',
            cardType: ''
        };

        this.handeleName = this.handeleName.bind(this);
        this.handeleCardNumber = this.handeleCardNumber.bind(this);
        this.handeleCSV = this.handeleCSV.bind(this);
        this.handeleExpireDate = this.handeleExpireDate.bind(this);
        this.handeleCardType = this.handeleCardType.bind(this);
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

    handeleName(event){
        this.setState({cardHolderName: event.target.value})
    }
    handeleCardNumber(event){
        this.setState({cardNumber: event.target.value})
    }
    handeleCSV(event){
        this.setState({cardCSV: event.target.value})
    }
    handeleExpireDate(event){
        this.setState({expireDate: event.target.value})
    }
    handeleCardType(event){
        this.setState({cardType: event.target.value})
    }

    onSubmit(event){
        event.preventDefault();

        const newCardPayment={
            payAmount: 0,
            userID:null,
            orderID: this.props.location.state.orderID,
            payDate: new Date(),
            cardNumber: this.state.cardNumber,
            cardCSV: this.state.cardCSV,
            cardHolderName: this.state.cardHolderName,
            expireDate: this.state.expireDate,
            cardType: 'VISA',
            payReceipt:false,
            receiptNumber:null
        };

        const options = {
            headers: {
                "content-type": "application/json", // whatever you want
                authorization: "Bearer ".concat(localStorage.getItem("AccessToken")),
            }
        };

        axios.post(global.backend+'/payment/addCardPayment',newCardPayment, options)
            .then(res=>console.log('Add new payment :'+res.data))
            .catch(err=>console.log('Error!! unsuccessful :'+err.data));
        var protection="Confirm";
        window.location.href= `http://localhost:3000/payConfirm?protection=${protection}`;
    }

    render() {
        return (
            <div>
                <Container>
                    <Alert color="info">
                        <h1 className="my-3 mx-auto text-center text-dark">PAYMENT-CARD</h1>
                    </Alert>
                    <Row className="my-2">
                        <Col className="mx-auto mb-5" xl="5">
                            <Card>
                                <CardImg top width="100%" src="./images/Payment/1.jpg" alt="Card image cap" />
                                <CardBody>
                                    <CardTitle ><h3 className="text-info font-weight-bold">Credit/Debit</h3></CardTitle>
                                    <CardSubtitle className="font-weight-bold">Pay by Credit/Debit card </CardSubtitle>
                                    <br />

                                    <Form method="POST" onSubmit={this.onSubmit}>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label>Name</Label>
                                                    <Input type="text" name="name" id="name" placeholder="Card holder name" onChange={this.handeleName} required />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <FormGroup>
                                            <Label>Card number</Label>
                                            <Input type="text" name="cardNumber" id="cardNumber" placeholder="16 digits card number" pattern="\d{16}" title="Card number contains only 16 digits" onChange={this.handeleCardNumber} required />
                                        </FormGroup>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label>Secret number</Label>
                                                    <Input type="text" name="csv" id="csv" placeholder="3 digits CSV number" pattern="\d{3}" title="Secret number contains only 3 digits" onChange={this.handeleCSV} required />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label>Expire Date</Label>
                                                    <Input type="date" name="edate" id="edate" required onChange={this.handeleExpireDate} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <FormGroup row>
                                            <Label for="exampleSelect" sm={2}>Card</Label>
                                            <Col sm={5}>
                                                <Input type="select" name="cardType" id="cardType" onChange={this.handeleCardType}>
                                                    <option onChange={this.handeleCardType}>VISA</option>
                                                    <option onChange={this.handeleCardType}>MASTER</option>
                                                </Input>
                                            </Col>
                                        </FormGroup>
                                        <Button type="submit" color="danger" className="ml-auto">PAY</Button>
                                    </Form>
                                </CardBody>
                                <CardFooter>
                                    <h6 className="text-muted text-right">Handled by <span className="text-info">C4FPayAdmin</span></h6>
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
                                        <Table responsive="md">
                                            <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Number of Items</th>
                                                <th>Full payment</th>
                                                <th>Order Date</th>
                                            </tr>
                                            </thead>
                                            {this.state.gotData.map(details=>(
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