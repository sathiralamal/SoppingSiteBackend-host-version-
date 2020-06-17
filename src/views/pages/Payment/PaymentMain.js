//for user to select the payment method

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
    Alert
} from 'reactstrap';
import CardFooter from "reactstrap/es/CardFooter";
import CFooter from "@coreui/react/es/CFooter";
import {Link,NavLink} from 'react-router-dom';
import alertify from "alertifyjs";
import axios from "axios";

class PaymentMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderID:'',
            gotData:[],
            userID:'',
            payAmount:''
        };

    }
    componentDidMount() {
        const search = this.props.location.search; // returns the URL query String
        const params = new URLSearchParams(search);
        const IdFromURL = params.get('order_id');

        if(IdFromURL === null){
            alert("No orders created!!");
            window.location = "http://localhost:3000";
        }
        this.setState({orderID:IdFromURL.toString()})

    }

    render() {
        return (
            <div>
                <Container>
                    <Alert color="info">
                        <h1 className="my-3 mx-auto text-center text-dark">PAYMENT FOR ORDER</h1>
                    </Alert>
                    <Row className="my-2">
                        <Col className="mx-auto mb-5" xl="5">
                            <Card>
                                <CardImg top width="100%" src="./images/Payment/1.jpg" alt="Card image cap" />
                                <CardBody>
                                    <CardTitle className="text-info font-weight-bold">Credit/Debit</CardTitle>
                                    <CardSubtitle>Pay by Credit/Debit card</CardSubtitle>
                                    <CardText>Clients will be able to make online payments through Credit/Debit card. We assure that this method is 100% secure. <br /> <br /></CardText>


                                        <Link to={{
                                            pathname: '/cardPayment', state: {
                                                orderID: this.state.orderID
                                            }
                                        }}>
                                            <Button color="primary">Next</Button>
                                        </Link>


                                </CardBody>
                                <CardFooter>
                                    <h6 className="text-muted text-right">Handled by <span className="text-info">C4FASHIONSPayAdmin</span></h6>
                                </CardFooter>
                            </Card>
                        </Col>

                        <Col className="mx-auto mb-5" xl="5">
                            <Card>
                                <CardImg top width="100%" src="./images/Payment/2.jpg" alt="Card image cap" />
                                <CardBody>

                                    <CardTitle className="text-info font-weight-bold">Bank receipt</CardTitle>
                                    <CardSubtitle>Pay through bank receipt</CardSubtitle>
                                    <CardText>Make payment to our bank account and submit the receipt here. <br /> Bank account: 11223345678  <br /> Bank: Commercial Bank PLC</CardText>
                                    <Link to={{
                                        pathname: '/receiptPayment', state: {
                                            orderID: this.state.orderID
                                        }
                                    }}>
                                        <Button color="primary">Next</Button>
                                    </Link>

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

export default PaymentMain;