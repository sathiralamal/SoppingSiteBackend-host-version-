import React,{Component} from "react";
import {Form} from "react-bootstrap";
import Rating from "react-rating";
import axios from "axios";
import socketIOClient from "socket.io-client";

class AddNewReview extends  Component{

    constructor(props) {
        super(props);
        this.state={
            isvalidate:false,
            reviewText:'',
            rating:-1,
            reviewButton:'Publish',
            id:props.id,
            uid:localStorage.getItem('id'),
            username:localStorage.getItem('name'),

        }
    }





    addrating=x=>{

        this.setState({
            rating:x
        });
        //  console.log(x);
        if (this.state.rating<0){
            this.setState({
                mess:""
            });
        }
    }

    getValues=e=>{
        this.setState({
            [e.target.name]:e.target.value
        });

    }
    handleSubmit=e=>{
        e.preventDefault();

        if (this.state.reviewText.trim()==""){
            this.setState({
                isvalidate:true
            })
        }else {
            this.setState({
                isvalidate:false
            });
            if (this.state.rating<0){
                this.setState({
                    mess:"Please add Rating"
                });
            }else{
                let query={
                    pid:this.state.id,
                    uid:this.state.uid,
                    username:this.state.username,
                    review:this.state.reviewText,
                    rating:this.state.rating,
                };
                axios.post(global.backend+'/product/addReview',query)
                    .then(async function (res){
                        //   console.log("send to soket")
                        socketIOClient(global.backendSoket).emit('addReview',query)

                    })
                    .catch(err=>{
                        console.log(err)
                    });

                this.setState({
                    reviewText:'',
                    rating:-1,
                });

            }

        }

        //
    }


    render() {
           if(this.state.uid!=null) {
               return <div className="row">
                   <div className="col-md-2"></div>
                   <div className="col-md-8">
                       <Form noValidate validated={this.state.isvalidate} onSubmit={this.handleSubmit}>
                           <label htmlFor="">Enter Your Review</label>
                           <Form.Control
                               type="textarea"
                               as="textarea"
                               rows="6"
                               placeholder="Enter Somthing..."
                               aria-describedby="inputGroupPrepend"
                               required
                               name="reviewText"
                               id="reviewText"
                               onChange={this.getValues}
                               value={this.state.reviewText}
                           />
                           <Form.Control.Feedback type="invalid">
                               Please Enter Your Review
                           </Form.Control.Feedback><br/>
                           <label htmlFor="">Enter Rating</label><br/>


                           <Rating
                               id="rating"
                               onChange={this.addrating}
                               initialRating={this.state.rating}


                           /><br/>
                           <p className="errmess"> {this.state.mess}</p>

                           <br/>
                           <button className="btn btn-primary">{this.state.reviewButton}</button>

                       </Form>

                   </div>

               </div>;

           }else {
               return <></>;
           }


    }
}
export default AddNewReview;