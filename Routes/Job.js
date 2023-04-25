const express = require('express');
const { createJob, updateJob, getAllJobs, getAllCreatedJobs, getAllCreatedJobsByToken, getJobById } = require('../Controller/Job');
const decodeToken = require('../Middleware/isValidToken');
const Router = express.Router();

Router.post('/create', createJob);

Router.patch('/:_id', decodeToken, updateJob);

Router.get('/getAllJobs', getAllJobs);

Router.get('/:_id', getJobById);

Router.get('/creator', decodeToken, getAllCreatedJobsByToken);

Router.get('/creator/:creatorID', getAllCreatedJobs);



module.exports = Router;