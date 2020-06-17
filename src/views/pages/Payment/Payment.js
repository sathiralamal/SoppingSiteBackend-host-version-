//main payment details viewing page for user

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

class Payment extends Component {
    state = {}

    render() {
        return (
            <div>
                <Container>
                    <Alert color="info">
                        <h1 className="my-3 mx-auto text-center text-dark">PAYMENT DETAILS</h1>
                    </Alert>
                    <Row className="my-2">
                        <Col className="mx-auto mb-5" xl="5">
                            <Card>
                                <CardImg top width="100%" src="./images/Payment/4.jpg" alt="Card image cap" />
                                <CardBody>
                                    <CardTitle className="text-info font-weight-bold">View all payment</CardTitle>
                                    <CardSubtitle>All your card/bank payments</CardSubtitle>
                                    <CardText>Clients will be able to view all the past payments details for card/bank payments. We assure that this will be 100% accurate. <br /> <br /></CardText>
                                    <Link to="/allPayments">
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
                                <CardImg top width="100%" src="./images/Payment/3.jpg" alt="Card image cap" />
                                <CardBody>
                                    <CardTitle className="text-info font-weight-bold">Refund payment</CardTitle>
                                    <CardSubtitle>Raise request for refund</CardSubtitle>
                                    <CardText>Only credit/debit card payments can be refunded and payment status must be processing. If you need to refund a bank payment, please send a request to below email. <br /> Email: support@adminpayment.com</CardText>
                                    <Link to="/refundPayment">
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

export default Payment;