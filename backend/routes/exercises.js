const router = require('express').Router()
const Exercise = require('../models/exercise.model')

router.get('/', async (req, res) => {
  try {
    const exercises = await Exercise.find()
    res.json(exercises)
  } catch(e) {
    res.status(400).json('Error: ' + e)
  }
})

router.post('/add', async (req, res) => {
  const exercise = new Exercise(req.body)
  console.log(exercise)

  try {
    await exercise.save()
    res.status(201).send(exercise)
  } catch (e) {
    res.status(400).json('Error: ' + e)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id)

    if(!exercise) {
      res.status(404).send()
    }

    res.json(exercise)
  } catch (e) {
    res.status(400).json('Error: ' + e)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id)

    if(!exercise) {
      res.status(404).send()
    }
    res.json(exercise)
  } catch (e) {
    res.status(400).json('Error: ' + e)
  }
})

router.post('/update/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id)
    // overide all the props
    exercise.username = req.body.username
    exercise.description = req.body.description
    exercise.duration = req.body.duration
    exercise.date = req.body.date

    await exercise.save()
    res.json(exercise)
  } catch (e) {
    res.status(400).json('Error: ' + e)
  }
})

module.exports = router