import React,{Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";


class Catogories extends Component{

    constructor(props) {
        super(props);
        this.state={
            catogory:[]
        }
    }

    componentDidMount() {

        axios({
                methode: 'GET',
                url:global.backend+"/productCategory",

            }).then(res=>{
                this.setState({
                    catogory:res.data
                })

            }).catch(err=>{
                console.log(err);
            });


    }

    render() {
        return  <ul className="product-filter-menu" >

            {this.state.catogory.map(catogory=>(
                <>
                    {(catogory.subCategory.length>0)?(
                        <>
                            {(catogory.subCategory.slice(0,5).map(subCategory=>(
                                <li key={subCategory} ><Link to={"/allProducts/"+catogory.categoryName+"~"+subCategory}>{subCategory}</Link></li>
                            )))}

                        </>

                    ):(
                        <></>
                    )}
                </>
            ))}


        </ul>;
    }

}export default Catogories;