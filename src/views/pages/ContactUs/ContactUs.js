import React,{Component} from "react";
import {Link} from "react-router-dom";
import LatestProducts from "../HomePage/LatestProducts";
import {Form} from "react-bootstrap";
import axios from 'axios';
class ContactUs extends Component{
    constructor(props) {
        super(props);
        this.state={
            name:'',
            mail:'',
            subject:'',
            description:'',
            isvalidate:false,
            mess:3,

        }
    }

    componentDidMount() {
        document.getElementById('preloder').style.display="none";
    }


    changeHandler=e=> {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    submit=(e)=>{
        e.preventDefault();
    if (this.state.name==""||this.state.name==""||this.state.name==""||this.state.name==""){
        this.setState({
            isvalidate:true
        });
    }else {
        this.setState({
            isvalidate:false
        });

        let values={name:this.state.name,mail:this.state.mail,subject:this.state.subject,message:this.state.description}
        axios.post(global.backend+'/user/sendmail',values)
            .then(res=>{
                this.setState({
                    mess:1,
                    name:'',
                    mail:'',
                    subject:'',
                    description:''
                })
            }).catch(err=>{
            this.setState({
                mess:0,
                name:'',
                mail:'',
                subject:'',
                description:''

            })
        })
        setTimeout(()=>{
            this.setState({
                mess:3,
            })
        },5000);

    }
    }

    render() {
        return <>
            <div id="preloder">
                <div className="loader"></div>
            </div>
            <div className="page-top-info">
                <div className="container">
                    <h4>Contact</h4>
                    <div className="site-pagination">
                        <Link to={"/"}>Home</Link> /
                        <Link to={"/contactus"}>Contact</Link>
                    </div>
                </div>
            </div>

            <section className="contact-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 contact-info">
                            <h3>Get in touch</h3>
                            <p>Main Str, no 23, New York</p>
                            <p>+94 9902 123</p>
                            <p>codefoursliit@gmail.com</p>
                            <div className="contact-social">
                                <Link ><i className="fa fa-pinterest"></i></Link>
                                <Link ><i className="fa fa-facebook"></i></Link>
                                <Link ><i className="fa fa-twitter"></i></Link>
                                <Link ><i className="fa fa-dribbble"></i></Link>
                                <Link ><i className="fa fa-behance"></i></Link>
                            </div>

                            {this.state.mess==1?(
                                <h1 style={{color:'green'}} >Message Send Successfully</h1>
                            ):(
                                this.state.mess==0?(
                                   <h2 style={{color:'red'}}>Somthing Went Wrong</h2>
                                ):(
                                    <></>
                                )
                            )}


                            <Form className="contact-form" noValidate validated={this.state.isvalidate} onSubmit={this.submit}>


                                <Form.Control type="text" placeholder="Your name" aria-describedby="inputGroupPrepend" required name="name" onChange={this.changeHandler} value={this.state.name}/>
                                <Form.Control.Feedback type="invalid">Please Enter Your Name</Form.Control.Feedback><br/>

                                <Form.Control type="mail" placeholder="Your e-mail" aria-describedby="inputGroupPrepend" required name="mail" onChange={this.changeHandler} value={this.state.mail}/>
                                <Form.Control.Feedback type="invalid">Please Enter Your Email</Form.Control.Feedback><br/>

                                <Form.Control type="text" placeholder="Subject" aria-describedby="inputGroupPrepend" required name="subject" onChange={this.changeHandler} value={this.state.subject}/>
                                <Form.Control.Feedback type="invalid">Please Enter Subject</Form.Control.Feedback><br/>


                                <Form.Control type="textarea" as="textarea" rows="6" placeholder="Message ..." aria-describedby="inputGroupPrepend" required name="description"
                                    onChange={this.changeHandler} value={this.state.description} />
                                <Form.Control.Feedback type="invalid">Please Enter Your Message</Form.Control.Feedback><br/>


                                <button className="site-btn">SEND NOW</button>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className="map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14376.077865872314!2d-73.879277264103!3d40.757667781624285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1546528920522"
                        style= {{"border":"0"}} allowFullScreen></iframe>
                </div>
            </section>

            <section className="related-product-section spad">
                <div className="container">
                    <div className="row">

                           <LatestProducts/>

                        </div>
                    </div>

            </section>

        </>;
    }

}export default ContactUs;