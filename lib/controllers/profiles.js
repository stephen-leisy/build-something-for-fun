const { Router } = require('express');
const ProfileService = require('../services/ProfileService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    console.log(req.body);
    try {
      const newUserProfile = await ProfileService.create(req.body);
      res.send(newUserProfile);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const allUsers = await ProfileService.getAllUsers();
      res.send(allUsers);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const oneUser = await ProfileService.getOneUser(req.params.id);
      res.send(oneUser);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const changedUser = await ProfileService.changeOneUser(
        req.params.id,
        req.body.name
      );
      res.send(changedUser);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const deletedUser = await ProfileService.deleteAUser(req.params.id);
      res.send(deletedUser);
    } catch (err) {
      next(err);
    }
  });
