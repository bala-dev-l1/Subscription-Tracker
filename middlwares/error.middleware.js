const errorMiddleware = (err, req, res, next) => {
    //create a subscription -> middleare(check for renewal date) -> controller (create subscription) -> service (save subscription)
try{

let error ={...err}
error.message = err.message;
console.error(err);


// resource not found error
if(err.name === "CastError"){
    const message = "Resource not found";
    error=new Error(message);
    error.statuscode  = 404;
}
//mongoose duplicate key error
if(err.name===11000){
    const message = "Duplicate field value entered";
    error=new Error(message);
    error.statuscode=400;
}
//mongoose validation error
if(err.name==="ValidationError"){
    const message = Object.values(err.errors).map(val => val.message);
    error=new Error(message.join(", "));
    error.statuscode=400;
}
res.status(error.statuscode || 500).json({sucesss :false,error:error.message || 'server Error'});
}
catch(error){
next(error);
}
};
export default errorMiddleware;
