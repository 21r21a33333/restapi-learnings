const mongoose=require("mongoose")
const {MONGO_URL}=require("./config")
async function databaseconnect(){
    try{
        let data=await mongoose.connect(MONGO_URL);
        console.log("connected to mongo")
    }catch(err){
        console.log(err)
    }
}
module.exports={databaseconnect};