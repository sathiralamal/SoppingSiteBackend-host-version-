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
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class PaymentSuccess extends Component {
    constructor(props) {
        super(props)
        this.state = {
            getCode:'',
            code:''
        };

    }

    render() {
        const percentage = 100;
        return (
            <div>
                <Container>
                    <Alert color="success">
                        <h1 className="my-4 mx-3 text-center text-success">PAYMENT SUCCESSFUL!!</h1>
                    </Alert>
                    <Alert color="secondary" className="text-center">
                        You will be notified via email shortly
                    </Alert>
                    <Row className="my-2 justify-content-center">
                        <Col className="mx-auto mb-5" xl="6">
                            <Card>
                                <CardBody>
                                    <br />
                                    <CircularProgressbar
                                        value={percentage}
                                        text={`${percentage}%`}
                                        styles={buildStyles({
                                            // Rotation of path and trail, in number of turns (0-1)
                                            rotation: 0.10,

                                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                            strokeLinecap: 'round',

                                            // Text size
                                            textSize: '16px',

                                            // How long animation takes to go from one percentage to another, in seconds
                                            pathTransitionDuration: 4,

                                            // Can specify path transition in more detail, or remove it entirely
                                            // pathTransition: 'none',

                                            // Colors
                                            pathColor: `rgba(40, 167, 69, ${percentage / 100})`,
                                            textColor: '#28A745',
                                            trailColor: '#d6d6d6',
                                            backgroundColor: '#28A745',
                                        })}
                                    />
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


export default PaymentSuccess;