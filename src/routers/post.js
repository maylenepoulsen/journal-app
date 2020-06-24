const express = require('express')
const Post = require('../models/post')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/posts', auth, async (req, res) => {
  const post = new Post({
    ...req.body,
    user: req.user._id
  }) 

  try {
    await post.save()
    res.status(201).send(post)
  } catch (e) {
    res.status(400).send(e)
  } 
})

router.get('/posts', auth, async (req, res) => {
  try {
    await req.user.populate('posts').execPopulate() 
    res.send(req.user.posts) 
  } catch (e) {
    res.status(500).send()
  }
})

router.delete('/posts/:id', auth, async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id, user: req.user._id })
    if(!post) {
      res.status(400).send()
    }

    res.send(post)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router