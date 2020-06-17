import React,{Component} from "react";

import '../../../../css/updateProduct.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import {BrowserRouter as Router, Link} from "react-router-dom";



import { FilePond, File, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';
import {Checkbox, TextField} from "@material-ui/core";
import ShowError from "../ShowError";
import socketIOClient from "socket.io-client";


registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview,FilePondPluginImageResize,FilePondPluginFileValidateType,FilePondPluginImageValidateSize)


class UpdateProduct extends  Component{

constructor(props) {


    super(props);
    this.state={

        error:"",
        freeShipping:true,
        agree:false,
        addDiscount:false,
        proName:'',
        catogory:'',
        subCatogory:'',
        size:['false','false','false','false','false','false'],
        brand:'',
        quantity:'',
        condition:'',
        description:'',
        price:'',
        shipping:null,
        discount:null,
        check:false,
        sellerID:localStorage.getItem("id"),
        type:localStorage.getItem("type"),
        files:  [ ],
        cImages:[],
        sSize:"false",
        id:this.props.match.params.id,
        maxImages:6,
        getCatogorys:[],
        getSubCatogorys:[]
    }



}

    componentWillMount() {

        if (this.state.sellerID==null||this.state.sellerID==""){
           window.location.replace("/");
        }else if(this.state.type!="store_manager"){
            if(this.state.type!="admin"){
                window.location.replace("/");
            }
        }


    }


    componentDidMount(){

        if (window.performance) {
            if (window.performance.navigation.type == 1) {
                window.location.replace(this.props.location.pathname);
            }
        }
        const script = document.createElement("script");
        script.src = "../../../js/main.js";
        script.async = true;
        document.body.appendChild(script);

       this.getData();


        this.props.history.listen((location, action) => {
            document.getElementById('preloder').style.display="block";
            this.state.id=location.pathname.split("/")[2]
         this.getData();

        })



}

getData(){
    axios({
        methode: 'GET',
        url:global.backend+'/product/getProduct',
        params:{s:true,id:this.state.id}
    }).then(res=>{
        this.state.data=res.data;
        if (this.state.sellerID!=this.state.data[0].sellerID){

               window.location.replace("/");
            }
        this.setElemets();


        axios.get(global.backend+"/productCategory")
            .then(result=>{
                this.setState({
                    getCatogorys:result.data
                },()=>{
                    document.getElementById('preloder').style.display="none";

                });

            }).catch(err=>{
                console.log(err)
        });



    }).catch(err=>{
        console.log(err)
    });
}



    setElemets(){
    let pData=this.state.data[0];
    let imgArr=[];

    for (let i=0;i<pData.images.length;i++){
        let tarr={
            source: global.backend+pData.images[i],
            options: {type: 'local'}
        }
        imgArr=[...imgArr,tarr];

    }


    let isShippingFree,isDiscount;
    if (pData.shipping==""||pData.shipping==null){
        isShippingFree=true;
    }else{
        isShippingFree=false;
    }
    if (pData.discount==""||pData.discount==null){
        isDiscount=false;
    }else {
        isDiscount=true;
    }



        this.state.freeShipping=isShippingFree;
            this.state.agree=false;
            this.state.addDiscount=isDiscount;
            this.state.proName=pData.proName;
            this.state.catogory=pData.catogory;
            this.state.subCatogory=pData.subCatogory;
            this.state.size=[pData.size[0],pData.size[1],pData.size[2],pData.size[3],pData.size[4],pData.size[5]];
            this.state.brand=pData.brand;
            this.state.quantity=pData.quantity;
            this.state.condition=pData.condition;
            this.state.description=pData.description;
            this.state.price=pData.price;
            this.state.shipping=pData.shipping;
            this.state.discount=pData.discount;
            this.state.check=false;
            this.state.files=[];
            this.state.cImages=pData.images;
            this.state.sSize='false';
            this.state.maxImages=(6-pData.images.length);

    }



    addShipping(){
    if (this.state.freeShipping){
        this.setState({
            freeShipping:false
        })
    }else{
            this.setState({
                freeShipping:true
            })
        }
    }

    addDiscount(){
        if (this.state.addDiscount){
            this.setState({
                addDiscount:false
            })
        }else{
            this.setState({
                addDiscount:true
            })
        }
    }

 agreement=()=>{
        if (this.state.agree){
            this.setState({
                agree:true
            })
        }else{
            this.setState({
                agree:false
            })
        }
    }




    showShippingPrice(){
        if (!this.state.freeShipping){
            return <div> <br/><br/>
                <label htmlFor="validationCustom02">Shipping Price<span>*</span></label>
                <TextField type="number" name="shipping" value={this.state.shipping} onChange={this.changeHandler} className="form-control"
                       placeholder="5$" required/>
                <ShowError isShow={this.state.check} value={this.state.shipping} name={"Enter Shipping Price"} />
                <br/>

            </div>
        }
    }
    showDiscountPrice(){
        if (this.state.addDiscount){
            return <div>
                <label htmlFor="validationCustom04">Discount<span>*</span>  (%)</label>
                <TextField type="number" className="form-control" name="discount" value={this.state.discount}   onChange={this.changeHandler}
                       id="validationCustom06"    placeholder="10%"/>
                <ShowError isShow={this.state.check} value={this.state.discount} name={"Enter Discount Price"} />
                <br/>

            </div>
        }
    }
    handleInit() {
    console.log('FilePond instance has initialised', this.state.files);

    }
    setSize =e=>{
        var temp = this.state.size;

        if (this.state.size[e.target.value]=="false"){
            temp[e.target.value]=e.target.name;
        }else{
            temp[e.target.value]='false';
        }
        this.setState({
            size:temp
        })

       for (let i=0;i<6; i++){
            if(this.state.size[i]!="false"){
                this.setState({
                    sSize:"ok"
                })
                break;
            }else{
                this.setState({
                    sSize:""
                })
            }
        }

    }


    deleteImage=(image)=>{
       var tImage=this.state.cImages;
       tImage.splice(tImage.indexOf(image),1);
      this.setState({
          cImages:tImage,
          maxImages:(this.state.maxImages+1)
      })
        let sendData={
          id:this.state.id,
          img:image,
          uImages:tImage
        }
axios.post(global.backend+"/product/deleteImage",sendData)
    .then(res=>console.log("img delete res",res))
    .catch(err=>{

        console.log("img delete err",err)
    })

    }



showSubCatogory() {
    let getSubCatogorys=[];



    getSubCatogorys=this.state.getCatogorys.find(getCatogory=>getCatogory._id===this.state.catogory)
    //console.log(this.state.subCatogory,getSubCatogorys)


    if (getSubCatogorys==null){
        return <div className="subctogory" >
            <label htmlFor="validationCustom05">Sub Catagory<span>*</span></label>
            <select name="subCatogory" value={this.state.subCatogory} onChange={this.changeHandler} className="form-control" required>
                <option value={this.state.subCatogory} >{this.state.subCatogory}</option>
            </select>
            <br/>
        </div>;
    }else{
        return <div className="subctogory" >
            <label htmlFor="validationCustom05">Sub Catagory<span>*</span></label>
            <select name="subCatogory" value={this.state.subCatogory} onChange={this.changeHandler} className="form-control" required>
                <option value="" key="0">Choose</option>

                {getSubCatogorys.subCategory.map(catogory=>(
                    <option key={catogory} value={catogory}>{catogory}</option>

                ))}

            </select>
            <ShowError isShow={this.state.check} value={this.state.subCatogory} name={"Select Sub Cataogory"} />
            <br/>
        </div>;



    }


}






    submitHandler=e=>{
    e.preventDefault();
        if (this.state.proName===""||this.state.catogory===""||
            this.state.quantity===""||this.state.condition===""||
            this.state.price===""||(!this.state.freeShipping&&this.state.shipping==="")||
                (this.state.addDiscount&&this.state.discount ==="")||
            this.state.agree===""){
            this.setState({
                check:true
            })
        } else{
        this.setState({
            check:false
        })
        const  values=this.state;

        delete values.box;
        delete values.freeShipping;
        delete values.addDiscount;
        delete values.error;
        delete values.sucss1;
        delete values.sucss2;
        delete values.sucss3;
        delete values.agree;
        delete values.sSize;
        delete values.maxImages;
        delete values.sellerID;
        delete values.type;
        delete  values.check;
        let imgs=[];


        try {
            const formData = new FormData();
            for (const key of Object.keys(this.state.files)) {
                formData.append('file', this.state.files[key])
                imgs=[this.state.files[key].name,...imgs]
            }
            var len=this.state.files.length;
            delete  values.files;
            delete  values.cImages;
            delete  values.data;

            values.proimages = imgs;
           // console.log("form data",len)

            axios.post(global.backend+'/product/updateProduct',values)
                .then(response1=>{
                  //  console.log(response1.statusText);
                    if(len!=0){
                        axios.post(global.backend+'/product/uploadProduct',formData)
                            .then(response2=>{

                           //     console.log(response2.statusText);
                                this.setState({
                                    error:response2.statusText
                                });
                                socketIOClient(global.backendSoket).emit('ChangeProduct',{type:'update',pid:this.state.id,ndata:values});
                               window.location.replace('/oneProduct/'+response2.data);
                            })
                            .catch(error=>{
                                console.log(error);
                                this.setState({
                                    error:"Can not Upload the images"

                                });

                            });
                    }else{
                        socketIOClient(global.backendSoket).emit('ChangeProduct',{type:'update',pid:this.state.id,ndata:values});
                        window.location.replace('/oneProduct/'+response1.data);
                    }

                })
                .catch(error=>{
                    console.log(error);
                    this.setState({
                        error:"Can not Add the Product"
                    });

                });

        }catch (e) {
            console.log(e);
        }

    }

}





    changeHandler=e=> {
       const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }






    render() {

        return<div className="mainBox" >
            <div id="preloder">
                <div className="loader"></div>
            </div>
                    <div className="page-top-info">
                        <div className="container">
                            <h2>Update Product {this.state.proName}</h2>
                            <div className="site-pagination">
                                Home / Shop / Update Product/{this.state.proName}
                            </div>
                            <h3 className="error">{this.state.error}</h3>

                        </div>
                    </div>

                            <form ref={form => this.formEl = form} className="needs-validation" onSubmit={this.submitHandler} encType="multipart/form-data"  >
                                <div className="container">
                                    <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="validationCustom01">Product Name<span>*</span></label><br/>
                                        <TextField text id="pname"  className="form-control"  placeholder="Product name" name="proName"
                                                   value={this.state.proName} onChange={this.changeHandler} required
                                                    /><br/><br/>
                                        <ShowError isShow={this.state.check} value={this.state.catogory} name={"Select Cataogory"} />
                                        <label htmlFor="validationCustom05">Catagory<span>*</span></label>
                                        <select name="catogory" value={this.state.catogory} onChange={this.changeHandler} className="form-control" required>
                                            <option value="" >Choose</option>
                                            {this.state.getCatogorys.map(getCatogory=>(
                                                <option value={getCatogory._id}>{getCatogory.categoryName}</option>
                                            ))}

                                        </select>

                                        <ShowError isShow={this.state.check} value={this.state.catogory} name={"Select Cataogory"} />
                                        <br/>
                                        {this.showSubCatogory()}
                                        <label htmlFor="validationCustom05">SIZE<span>*</span></label>
                                        <div className="checkBox">
                                            <div className="a" >
                                                <label className="checkContainer">
                                                    <Checkbox
                                                        name="XS"  value="0" checked={this.state.size[0]!="false"} onClick={this.setSize}
                                                        color="blue"
                                                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                                                    />XS

                                                </label>
                                                <label className="checkContainer">
                                                    <Checkbox
                                                        name="S"  value="1" checked={this.state.size[1]!="false"} onClick={this.setSize}
                                                        color="blue"
                                                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                                                    />S


                                                </label>
                                                <label className="checkContainer">
                                                    <Checkbox
                                                        name="M"  value="2" checked={this.state.size[2]!="false"} onClick={this.setSize}
                                                        color="blue"
                                                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                                                    />M

                                                </label>
                                            </div>
                                            <div className="a" >
                                                <label className="checkContainer">
                                                    <Checkbox
                                                        name="L"  value="3" checked={this.state.size[3]!="false"} onClick={this.setSize}
                                                        color="blue"
                                                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                                                    />L

                                                </label>
                                                <label className="checkContainer">
                                                    <Checkbox
                                                        name="XL"  value="4" checked={this.state.size[4]!="false"} onClick={this.setSize}
                                                        color="blue"
                                                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                                                    />XL

                                                </label>
                                                <label className="checkContainer">
                                                    <Checkbox
                                                        name="XXL"  value="5" checked={this.state.size[5]!="false"} onClick={this.setSize}
                                                        color="blue"
                                                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                                                    />XXL

                                                </label>
                                            </div>
                                        </div>

                                        <ShowError isShow={this.state.check} value={this.state.sSize} name={"Select Size"} />
                                        <br/>
                                        <label htmlFor="validationCustom01">Brand<span>*</span></label>
                                        <TextField type="text" name="brand" value={this.state.brand}  onChange={this.changeHandler} className="form-control"
                                               placeholder="Brand name" required/>
                                        <ShowError isShow={this.state.check} value={this.state.brand} name={"Enter Brand"} />
                                        <br/>

                                        <label htmlFor="validationCustom01">Quantity<span>*</span></label>
                                        <TextField type="number" name="quantity" value={this.state.quantity}  onChange={this.changeHandler} className="form-control"
                                               placeholder="quantity" required/>
                                        <ShowError isShow={this.state.check} value={this.state.quantity} name={"Enter Quantity"} />
                                        <br/>
                                        <label htmlFor="validationCustom03">Condition<span>*</span></label>
                                        <select name="condition" value={this.state.condition} className="form-control"  onChange={this.changeHandler} required>
                                            <option value="">Choose</option>
                                            <option value="BarandNew">Brand New</option>
                                            <option value="Used">Used</option>
                                        </select>
                                        <ShowError isShow={this.state.check} value={this.state.condition} name={"Select Condition"} />
                                        <br/>



                                        <label htmlFor="validationCustom04">Descriprion</label>
                                        <TextField name="description" cols="30" rows="10" className="form-control"
                                                   multiline variant="outlined"
                                                  placeholder="Desctiption.." value={this.state.description} onChange={this.changeHandler} ></TextField>
                                        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

                                        <label htmlFor="validationCustom02">Price<span>*</span></label>
                                        <TextField  type="number" className="form-control" placeholder="10$" name="price" value={this.state.price}
                                               onChange={this.changeHandler} required/>
                                        <ShowError isShow={this.state.check} value={this.state.price} name={"Enter Price"} />
                                        <br/><br/>

                                        <label htmlFor="validationCustom02">Free shipping</label>
                                        <Checkbox

                                            color="primary"
                                            onClick={()=>this.addShipping()}
                                            checked={this.state.freeShipping}
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        />
                                        {this.showShippingPrice()}<br/><br/>
                                        <label htmlFor="validationCustom02">Add Discount</label>
                                        <Checkbox
                                            color="primary"
                                            checked={this.state.addDiscount}
                                            onClick={()=>this.addDiscount()}
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        />

                                        <br/><br/>
                                        {this.showDiscountPrice()}


                                        <br/>
                                        <Checkbox
                                            required
                                            color="primary"
                                            value={this.agree}
                                            onClick={()=>this.agreement()}
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        />

                                        <label className="form-check-label"  onClick={()=>this.agreement()} htmlFor="invalidCheck">
                                            Agree to terms and conditions
                                        </label>
                                        <ShowError isShow={this.state.check} value={this.state.agree} name={" You must agree before submitting"} />


                                        <br/>

                                        <br/><br/>


                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="validationCustom01">Choose Images (max Images {this.state.maxImages})<span>*</span></label><br/>

                                        {this.state.cImages.map(image=>(


                                        <div className="imgconatinor" key={image}>
                                            <div >
                                                <img className="imgbox" src={global.backend+image} alt=""/>
                                                <i onClick={()=>this.deleteImage(image)} className="fa fa-close"></i>

                                            </div>
                                        </div>
                                        ))}

                                        <FilePond

                                            required={this.state.cImages.length<=0}
                                            ref={ref => this.pond = ref}
                                            files={this.state.files}
                                            allowMultiple={true}
                                            maxFiles={this.state.maxImages}
                                            labelIdle='Drag & Drop your Product Images or <span class="filepond--label-action"> Browse </span>'
                                            acceptedFileTypes={['image/*']}
                                            labelFileTypeNotAllowed={"Invalid file"}
                                            imageResizeMode={'cover'}
                                            imagePreviewMaxHeight={400}
                                            imageResizeTargetWidth={500}
                                            imageResizeTargetHeight={775}
                                            imageValidateSizeMinHeight={200}
                                            imageValidateSizeMinWidth={200}
                                            oninit={() => this.handleInit() }
                                            onupdatefiles={(fileItems) => {
                                                this.setState({
                                                    files: fileItems.map(fileItem => fileItem.file)

                                                });

                                                if (this.state.files!=null||this.state.files.length!=0) {
                                                    this.setState({
                                                        sucss3: false
                                                    });
                                                }




                                            }}


                                        >

                                        </FilePond>
                                        <ShowError isShow={this.state.check} value={this.state.files} name={"Please add Product Images"} />
                                    </div>


                                    </div>
                                    <div className="row">
                                        <div className="col-md-6" >
                                            <br/><br/>
                                            <button className="btn btn-primary" type="submit">Update Product</button>
                                            <br/><br/><br/><br/>
                                        </div>
                                    </div>
                                </div>
                                </form>

                </div>;
    }


}
export default UpdateProduct;