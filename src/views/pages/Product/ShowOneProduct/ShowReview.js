import React,{Component} from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";

class ShowReview extends Component{
    constructor(props) {
        super(props);
        this.state={
            reviews:[],
            id:props.id,

        }
    }


    componentWillReceiveProps(nextProps, nextContext) {

        if ( this.state.id!=nextProps.id){
            this.state.id=nextProps.id;
            this.getData();

        }


    }


    componentDidMount() {
        this.getData();

        socketIOClient(global.backendSoket).on('newReview', data => {
            //  console.log("response",data);
            if(data.pid==this.state.id){
                //  console.log(data)
                this.setState({
                    reviews:[data,...this.state.reviews]
                },()=>this.calAverageRating());
            }
        });

        socketIOClient(global.backendSoket).on('updateReview', data => {

            if(data.pid==this.state.id){
                //  console.log(data)
                this.getData();
            }
        });
    }

    updateReview=(x,rid)=>{

        let query={action:x,rid:rid,pid:this.state.id};
        axios.post(global.backend+'/product/updateReviews',query)
            .then(res=>{

                socketIOClient(global.backendSoket).emit('NotifyUpdateReview',{pid:res.data})
            }
        ).catch(
            err=>console.log(err)
        )


    }

    getData=()=>{

        axios({
            methode: 'GET',
            url:global.backend+'/product/getReviews',
            params:{s:true,pid:this.state.id},

        }).then(res=>{
            this.setState({
                reviews:res.data
            },()=>{
                this.calAverageRating();

            });


        }).catch(err=>{

            console.log(err);
        });
    }



    calAverageRating(){
        var x=0;
        if(this.state.reviews.length>0){
            for (var i=0;i<this.state.reviews.length;i++){
                x+=this.state.reviews[i].rating;
            }
            x=Math.round (x/this.state.reviews.length);

        }


        this.props.getaverageRating(x);


    }
    setStars(x){
        if(x==0){
            return<div className="p-rating">
                <i className="fa fa-star-o fa-fade"></i>
                <i className="fa fa-star-o fa-fade"></i>
                <i className="fa fa-star-o fa-fade"></i>
                <i className="fa fa-star-o fa-fade"></i>
                <i className="fa fa-star-o fa-fade"></i>
            </div>
        }else if(x==1){
            return   <div className="p-rating">
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o fa-fade"></i>
                <i className="fa fa-star-o fa-fade"></i>
                <i className="fa fa-star-o fa-fade"></i>
                <i className="fa fa-star-o fa-fade"></i>
            </div>
        }else if(x==2){
            return   <div className="p-rating">
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o fa-fade"></i>
                <i className="fa fa-star-o fa-fade"></i>
                <i className="fa fa-star-o fa-fade"></i>
            </div>

        }else if(x==3){
            return   <div className="p-rating">
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o fa-fade"></i>
                <i className="fa fa-star-o fa-fade"></i>
            </div>
        }else if(x==4){
            return   <div className="p-rating">
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o fa-fade"></i>
            </div>
        }else if(x==5){
            return   <div className="p-rating">
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
            </div>
        }





    }


    render() {
        return <div className="row">
            {this.state.reviews.length>0?(
                this.state.reviews.map(review=>(
                    !review.isblock?(
                        <div className="card">
                            {localStorage.getItem('type')=="store_manager"||localStorage.getItem('type')=="admin"?(
                                <div style={{display:'flex',width:'100%'}}>
                                    <h2>Status : <span>UnBlocked Review</span></h2>
                                    <button  onClick={()=>this.updateReview(true,review._id)} style={{'margin-left':'50px'}} className="btn btn-danger">Hide</button>
                                </div>
                                ):(
                                <></>
                                )}

                            <h3>{review.username}</h3>
                            <p>{review.review}</p>
                            <div>
                                {this.setStars(review.rating)}
                            </div>
                        </div>
                    ):(
                        localStorage.getItem('type')=="store_manager"||localStorage.getItem('type')=="admin"?(
                            <div className="card">
                                <div style={{display:'flex',width:'100%'}}>
                                    <h2>Status : <span>Blocked Review</span></h2>
                                    <button  onClick={()=>this.updateReview(false,review._id)} style={{'margin-left':'50px'}} className="btn btn-secondary">Unhide</button>
                                </div>
                                <h3>{review.username}</h3>
                                <p>{review.review}</p>
                                <div>
                                    {this.setStars(review.rating)}
                                </div>
                            </div>
                        ):(
                            <></>
                            )


                        )

                ))
            ):(
                <>
                    <div className="col-md-4"></div><div className="col-md-4">
                    <h4 style={{'text-align':'center'}}>No reviews </h4><br/><br/>
                </div>
                </>

            )}



        </div>;
    }

}export default ShowReview;