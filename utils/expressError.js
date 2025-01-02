class ExpressError extends Error{
    constructor(stetusCode,message){
        super();
        this.stetusCode=stetusCode;
        this.message=message;
    }
};
module.exports=ExpressError;