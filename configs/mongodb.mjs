import mongoose from 'mongoose'

// initialize the mongodb local connection
const mongodbInit = () => {
  // create a new promise that return the status
  return new Promise((resolve, reject) => {
    mongoose
      .connect('mongodb://127.0.0.1:27017/shopexe')
      .then((res) => {
        // successfully connected so resolve the promise
        resolve(res)
      })
      .catch((err) => {
        // there was some error while connecting to the mongodb reject the promise
        reject(err)
      })
  })
}

export default mongodbInit
