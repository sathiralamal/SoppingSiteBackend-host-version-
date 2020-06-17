//final refund request raised page

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
    Table,
    Alert
} from 'reactstrap';
import CardFooter from "reactstrap/es/CardFooter";
import CFooter from "@coreui/react/es/CFooter";
import Form from "reactstrap/es/Form";
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";
import FormText from "reactstrap/es/FormText";
import axios from "axios";

class refundRequest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data:[],

        };

    }

    componentDidMount() {

    }

    render() {
        const {payID, orderID, payDate, payAmount, paymentStatus} = this.props
        return (
            <div>
                <Container>
                    <Alert color="danger">
                        <h1 className="my-4 mx-3 text-center text-danger">Refund request is PROCESSING!!!!</h1>
                    </Alert>
                    <Alert color="secondary">
                        You will be notified via email shortly
                    </Alert>
                    <Row className="my-2 justify-content-center">
                        <Col className="mx-auto mb-5" xl="10">
                            <Card>
                                <CardBody>
                                    <CardTitle ><h3 className="text-info font-weight-bold">Refund Details</h3></CardTitle>
                                    <br />
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
                                        </tr>
                                        </thead>
                                            <tbody>
                                            <tr>
                                                <td>{this.props.location.state.payID}</td>
                                                <td>{this.props.location.state.orderID}</td>
                                                <td>{this.props.location.state.payDate}</td>
                                                <td>{this.props.location.state.payAmount}</td>
                                                <td>{this.props.location.state.paymentStatus}</td>
                                            </tr>
                                            </tbody>

                                    </Table>
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

export default refundRequest;