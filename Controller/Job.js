const Job = require('../Models/Job');

const createJob = async (req, res) => {
	try {
		const newJob = new Job({ ...req.body });
		const finalJob = await newJob.save();
		if (finalJob) {
			res.json({ error: false, message: "Job Created Successfully!", job: finalJob });
		} else {
			res.json({ error: true, message: "Something Went Wrong", job: undefined });
		}
	} catch (error) {
		res.json({ error: true, message: error.message, job: undefined });
	}
}

const updateJob = async (req, res) => {
	try {
		const job = await Job.findByIdAndUpdate(req.params._id, req.body, { returnOriginal: false });
		res.json({ error: false, message: "Job Updated Successfully!", job: job })
	} catch (error) {
		res.json({ error: true, message: error.message, job: undefined });
	}
}

const deleteJob = async (req, res) => {
	try {
		await Job.findByIdAndDelete(req.params._id);
		res.json({ error: false, message: "Job Deleted Successfully!", job: undefined })
	} catch (error) {
		res.json({ error: true, message: error.message, job: undefined });
	}
}

const getAllJobs = async (req, res) => {
	try {
		const jobs = await Job.find({}).populate('creatorID');
		if(jobs){
			res.json({ error: false, message: "Success", jobs: jobs })
		}else{
			res.json({ error: true, message: "Something Went Wrong!", jobs: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, job: undefined });
	}
}

const getJobById = async (req, res) => {
	try {
		const jobs = await Job.findById(req.params._id).populate('creatorID');
		if(jobs){
			res.json({ error: false, message: "Success", job: jobs })
		}else{
			res.json({ error: true, message: "Something Went Wrong!", job: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, job: undefined });
	}
}

const getAllCreatedJobs = async (req, res) => {
	try {
		console.log(req.params.creatorID)
		const jobs = await Job.find({creatorID: req.params.creatorID});
		if(jobs){
			res.json({ error: false, message: "Success", jobs: jobs })
		}else{
			res.json({ error: true, message: "Something Went Wrong!", jobs: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, job: undefined });
	}
}

const getAllCreatedJobsByToken = async (req, res) => {
	try {
		const jobs = await Job.find({creatorID: req.user._id});
		if(jobs){
			res.json({ error: false, message: "Success", jobs: jobs })
		}else{
			res.json({ error: true, message: "Something Went Wrong!", jobs: undefined })
		}
	} catch (error) {
		res.json({ error: true, message: error.message, job: undefined });
	}
}

module.exports = { createJob, updateJob, deleteJob, getAllJobs, getAllCreatedJobs, getAllCreatedJobsByToken, getJobById };