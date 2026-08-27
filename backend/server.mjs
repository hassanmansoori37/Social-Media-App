import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { postRouter } from './routes/index.mjs'
import {connect_database} from './libs/mongoDb.mjs'
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

app.use('/api/v1' , postRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  connect_database()
})

// connect_database()

// export default app

