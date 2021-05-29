
const express = require('express')
const app = express()
const connectDB = require('./database/db')
const cors = require('cors')
const morgan = require('morgan')
const port = process.env.PORT || 5000
const authRoutes = require('./routes/auth');

connectDB()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use('/api/auth', authRoutes);

// app.get('/' , (req,res) =>{
//     res.send("inside server")
// })

app.listen(port, () => console.log(`listning on port ${port}`))