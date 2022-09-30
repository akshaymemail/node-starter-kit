import express from 'express'
import cors from 'cors'
import routes from './routers/index.mjs'
import mongodbInit from './configs/mongodb.mjs'

// express app
const app = express()

// port
const PORT = process.env.PORT || 4000
const API_PREFIX = '/api/v1'

// middleware
app.use(cors())
app.use(express.json())

// server static files
// TODO

// routes
Object.entries(routes).map(([name, router]) => {
  app.use(`${API_PREFIX}/${name}`, router)
})

// connecting app to mongodb database
mongodbInit()
  .then((res) => console.log('Connected to local mongodb database'))
  .catch((err) =>
    console.log(
      'There was an error while connecting to the mongodb database',
      err
    )
  )

// root route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server is up and running, Cheers!',
  })
})

// spinning the server
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})
