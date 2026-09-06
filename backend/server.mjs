import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { authRouter, postRouter, profileRouter } from './routes/index.mjs'
import {connect_database} from './libs/mongoDb.mjs'
import { authGuardJWT, limiter } from './middlewares/index.mjs'
import { UserModel } from './models/index.mjs'
import morgan from 'morgan'
const app = express()

const port = 409



// body parse
app.use(express.json())

// cors
app.use(cors({
    origin: "http://localhost:5173",
    method: "*"
}))

// morgan middleware
app.use(morgan("dev"))

// rate-limit
app.use(limiter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})




app.get('/users' , async (req, res, next) => {
  const allUser = await UserModel.find()
  res.send({
    message: "user-fetched",
    data: allUser
  })
})

app.use('/api/v1' ,
   authRouter,
   authGuardJWT, 
   postRouter,
   profileRouter)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  connect_database()
})

// connect_database()

// export default app

