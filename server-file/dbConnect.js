const mongoose = require("mongoose")


const connect = ()=>{
    return mongoose.connect(process.env.dbURL).then(()=>{
        console.log("conneted to DB");
    }).catch((e)=>{
        console.log(e);
    })
}


module.exports = connect;