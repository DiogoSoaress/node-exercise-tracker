const router = require('express').Router()
const User = require('../models/user.model')

router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (e) {
    res.status(400).json('Error: ' + e)
  }
})

router.post('/add', async (req, res) => {
  const newUser = new User(req.body)
  
  try {
    await newUser.save()
    res.status(201).json(newUser)
  } catch (e) {
    res.status(400).json('Error: ' + e)
  }
})

module.exports = router