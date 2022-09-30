import mongoose from 'mongoose'
import schemas from '../schemas/index.mjs'

export const User = mongoose.model('User', schemas.user)
