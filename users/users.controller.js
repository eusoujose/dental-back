const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.get('/pacientes', getAllPatients);
router.post('/paciente', createPatient);
router.get('/dentistas', getAllDentists);
router.post('/dentista', createDentist);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function getAllPatients(req, res, next) {
    userService.getAllPatients()
        .then(users => res.json(users))
        .catch(next);
}

function createPatient(req, res, next) {
    userService.createPatient(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function getAllDentists(req, res, next) {
    userService.getAllDentists()
        .then(users => res.json(users))
        .catch(next);
}

function createDentist(req, res, next) {
    userService.createDentist(req.body)
        .then(user => res.json(user))
        .catch(next);
}
