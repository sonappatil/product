const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://******:*******@cluster0.w8m1b2p.mongodb.net/FrontEnd?retryWrites=true&w=majority")
.then(()=>{
    console.log("connect");
}).catch((e)=>{
    console.log(e);
})
