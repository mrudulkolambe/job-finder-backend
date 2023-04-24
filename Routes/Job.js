const express = require('express');
const { createJob, updateJob, getAllJobs, getAllCreatedJobs, getAllCreatedJobsByToken } = require('../Controller/Job');
const decodeToken = require('../Middleware/isValidToken');
const Router = express.Router();

Router.post('/create', createJob);

Router.patch('/:_id', decodeToken, updateJob);

Router.get('/getAllJobs', getAllJobs);

Router.get('/creator', decodeToken, getAllCreatedJobsByToken);

Router.get('/:creatorID', getAllCreatedJobs);



module.exports = Router;