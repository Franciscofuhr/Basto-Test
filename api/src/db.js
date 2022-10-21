
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/basto-tech')
.then(db=>console.log("connecected DB"))
.catch(err=> console.log("error DB", err))
