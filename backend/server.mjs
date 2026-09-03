import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { authRouter, postRouter, profileRouter } from './routes/index.mjs'
import {connect_database} from './libs/mongoDb.mjs'
import { authGuardJWT } from './middlewares/index.mjs'
const app = express()
const port = 409



// body parse
app.use(express.json())

// cors
app.use(cors({
    origin: "http://localhost:5173",
    method: "*"
}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use('/api/v1' , authRouter)
app.use('/api/v1' , authGuardJWT)
app.use('/api/v1' , postRouter)
app.use('/api/v1' , profileRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  connect_database()
})

// connect_database()

// export default app

