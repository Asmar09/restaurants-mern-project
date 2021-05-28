
const mongoose = require('mongoose')


const MongoDB = async () =>{
     try{
      await  mongoose.connect('mongodb+srv://asmar:asmar123@restaurant-project.m2evn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
       {useNewUrlParser: true , useUnifiedTopology: true , useFindAndModify: true});
          console.log("successfully connect with databse");
     }catch(error){
       console.log("error Found ", error);
     }
}


module.exports = MongoDB