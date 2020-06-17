import React from "react";


function ShowError(props) {

    if (props.isShow){
        if (props.value===""||props.value===null){
            return <p className="error" >{props.name} &#9888;</p>
        }
        return null;
    }
    return null;

}
export default ShowError;