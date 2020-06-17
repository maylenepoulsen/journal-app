require('./db/mongoose')
const express = require('express')
const userRouter = require('./routers/user')
const postRouter = require('./routers/post')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(postRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

