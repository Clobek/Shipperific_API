const bcrypt = require('bcrypt');
const express = require('express');
const users = express.Router();
const User = require('../models/users.js')
const Package = require('../models/packages.js');
const isAuthenticated = (req, res, next) => {
    if(req.session.currentUser) {
        return next()
    } else {
        res.redirect('/sessions/new')
    }
}

users.get('/new', (req, res) => {
    res.render('users/New') // What should go here instead of JSX file?
})

users.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (err, createdUser) => {
        console.log('User is created', createdUser)
        res.redirect('/')
    })
});

users.get('/:id', isAuthenticated, (req, res) => {
    if(req.session.currentUser._id === req.params.id){
      Package.find({userID: req.session.currentUser._id}, (error, yourPackages) => {
          res.render('users/Index', {
              currentUser: req.session.currentUser,
              packages: yourPackages
          })
      })  
    } else {
        res.redirect('/packages')
    }
});

users.delete('/:id', isAuthenticated, (req, res) => {
    Package.findByIdAndRemove(req.params.id, (error, data) => {
        res.redirect(`/user/${req.session.currentUser._id}`)
    })
})

module.exports = users;