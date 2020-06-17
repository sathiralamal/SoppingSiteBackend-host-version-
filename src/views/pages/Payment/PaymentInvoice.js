//for user to download the payment invoice

import React, { Component } from 'react';
import {PDFDownloadLink,  Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image} from "@react-pdf/renderer";
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
import alertify from "alertifyjs";
import axios from "axios";

class PaymentInvoice extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        const search = this.props.location.search; // returns the URL query String
        const params = new URLSearchParams(search);
        const IdFromURL = params.get('getInvoice');
        const data = {
            payID: IdFromURL.toString()
        };

        const options = {
            headers: {
                "content-type": "application/json", // whatever you want
                authorization: "Bearer ".concat(localStorage.getItem("AccessToken")),
            }
        };

        axios.post(global.backend+'/payment/getDataForInvoice', data, options).then(res=>{
            this.setState({
                data: res.data
            });
            console.log(res.data);
        }).catch(err=>{
            console.log(err);
        });

    }

    render() {
        const dummy = "This is Dummy";
        const styles = StyleSheet.create({
            page: {
                backgroundColor: "#ffffff"
            },
            receiptLogo: {
                display: "flex",
                marginLeft: 219
            },
            receiptTitle: {
                fontSize: 30,
                marginTop: 25,
                fontWeight: "bold",
                marginLeft: 95,
            },
            image: {
                height: 50,
                width: 165,
                alignItems: "center",
                marginTop: 30
            },
            receiptDetails: {
                fontSize: 20,
                marginTop: 15,
                marginLeft: 50,
            },
            receiptFooter: {
                fontSize: 15,
                marginTop: 125,
                marginLeft: 160,
                fontWeight: "bold"
            }

        });
        return (
            <div>
                <Container>
                    <Alert color="success">
                        <h1 className="my-4 mx-3 text-center text-success">PAYMENT IS COMPLETED</h1>
                    </Alert>
                    <Alert color="secondary" className="text-center">
                        Download your payment receipt
                    </Alert>
                    <Row className="my-2 justify-content-center">
                        <Col className="mx-auto mb-5" xl="6">
                            <Card>
                                <CardBody>
                                    {this.state.data.map(details=>(
                                    <PDFDownloadLink
                                        document={<Document>
                                            <Page style={styles.page}>
                                                <View style={styles.receiptLogo}>
                                                    <Image source="./images/logo.png" style={styles.image} />
                                                </View>
                                                <View style={styles.receiptTitle}>
                                                    <Text style={styles.receiptTitle}>Payment Invoice</Text>
                                                    <Text>------------------------------------------</Text>
                                                </View>
                                                <View style={styles.receiptDetails}>
                                                    <Text style={styles.receiptDetails}>Payment ID: {details.payID} </Text>
                                                </View>
                                                <View style={styles.receiptDetails}>
                                                    <Text style={styles.receiptDetails}>User ID: {details.userID}</Text>
                                                </View>
                                                <View style={styles.receiptDetails}>
                                                    <Text style={styles.receiptDetails}>Order ID: {details.orderID}</Text>
                                                </View>
                                                <View style={styles.receiptDetails}>
                                                    <Text style={styles.receiptDetails}>Payment amount: {details.payAmount}</Text>
                                                </View>
                                                <View style={styles.receiptDetails}>
                                                    <Text style={styles.receiptDetails}>Payment type: {details.payType}</Text>
                                                </View>
                                                <View style={styles.receiptDetails}>
                                                    <Text style={styles.receiptDetails}>Payment date: {details.payDate}</Text>
                                                </View>
                                                <View style={styles.receiptDetails}>
                                                    <Text style={styles.receiptDetails}>Payment status: {details.paymentStatus}</Text>
                                                </View>

                                                <View style={styles.receiptFooter}>
                                                    <Text style={styles.receiptFooter}>By C4FASHIONS PAYMENT ADMIN</Text>
                                                </View>


                                            </Page>
                                        </Document>}
                                        fileName="Receipt.pdf"
                                        style={{
                                            textDecoration: "none",
                                            padding: "10px",
                                            color: "#4a4a4a",
                                            backgroundColor: "#f2f2f2",
                                            border: "1px solid #4a4a4a"
                                        }}
                                    >
                                        {({ blob, url, loading, error }) =>
                                            loading ? "Loading document..." : "Download Receipt"
                                        }
                                    </PDFDownloadLink>
                                    ))}
                                </CardBody>
                                <CardFooter>
                                    <h6 className="text-muted text-right">Handled by <span className="text-info">C4FASHIONSPayAdmin</span></h6>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

        );
    }

}


export default PaymentInvoice;