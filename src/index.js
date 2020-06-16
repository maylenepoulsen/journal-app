require('./db/mongoose')
const express = require('express')
const userRouter = require('./routers/user')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

