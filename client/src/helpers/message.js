

import React from 'react';


export const ErrorMessage = (msg) =>{

return(
<div className="alert alert-danger" role="alert">
 {msg}
</div>
)
}


export const SuccessMessage = (msg) =>{

    return(
    <div className="alert alert-success" role="alert">
     {msg}
    </div>
    )
    }