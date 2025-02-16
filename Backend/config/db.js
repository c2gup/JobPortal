const mongoose = require('mongoose');

const dbconnect = async()=>{
      try {
            
            mongoose.connect('mongodb://localhost:27017/ecommerce');
            console.log("Database connected successfully");
      } catch (error) {
            console.log("Error connecting to database",error);
      }


};


module.exports = dbconnect;