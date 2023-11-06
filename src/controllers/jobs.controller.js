/*Jobs controller is to get jobs details and post it on jobs view
when new job is posted via recruiter*/

import {JobsModel }from '../models/jobs.model.js';

export default class JobsController {

//get main page
getInterface(req, res, next) {
        res.render("index", {userName: req.session.userName, userEmail: req.session.userEmail });
        next();
    }

//get all the Jobs on Jobs page
getJobs(req, res, next) {
    const jobs = JobsModel.get();

    //pagination logic
    const page = parseInt(req.query.page) || 1; 
    const jobsPerPage = 4; 
    const startIndex = (page - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    const jobsToDisplay = jobs.slice(startIndex, endIndex);

    res.render('jobs', { jobs: jobsToDisplay, currentPage: page,userName: req.session.userName, userEmail: req.session.userEmail  });
}


//get new job posted via recruiter
getNewJob(req, res, next){
    res.render('postnewjob', {errorMessage:null, userName: req.session.userName, userEmail: req.session.userEmail});
    next();
}

//post new job
postNewJob(req, res){
    // console.log(req.body);
    const { company_name, job_designation, job_location,  salary,  skills_required,no_of_openings,apply_by} = req.body;
    JobsModel.addJobs(company_name, job_designation, job_location,  salary,  skills_required,no_of_openings,apply_by );
    const jobs = JobsModel.get();
    const page = parseInt(req.query.page) || 1; 
    const jobsPerPage = 4; 
    const startIndex = (page - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    const jobsToDisplay = jobs.slice(startIndex, endIndex);

    res.render('jobs', { jobs: jobsToDisplay, currentPage: page, userName: req.session.userName, userEmail: req.session.userEmail  });
   
}

//get Job details when clicked on View details button
getJobDetails(req,res,next){
        const id = req.params.id;
        const jobFound = JobsModel.getById(id);
        if(jobFound){
            res.render('view-details', {job: jobFound, errorMessage:null,userName: req.session.userName, userEmail: req.session.userEmail});
        }else{
            res.status(401).send("Job not found");
        }
        next();
}

//get Job view when recruiter clicks on edit icon
getEditJobView(req,res,next){
    const id = req.params.id;
    const jobFound = JobsModel.getById(id);
    if(jobFound){
        res.render('edit-job', {job: jobFound, errorMessage:null, userName: req.session.userName, userEmail: req.session.userEmail});
    }else{
        res.status(401).send("Job not found");
    }
    next();
}

//post edited job via recruiter
postEditedJob(req, res, next) {
    const id = req.body.id; 
    const jobFound = JobsModel.getById(id);

    if (jobFound) {
        
        jobFound.name = req.body.company_name;
        jobFound.role = req.body.job_designation;
        jobFound.location = req.body.job_location;
        jobFound.lpa = req.body.salary;
        jobFound.skills = req.body.skills_required;
        jobFound.no_of_openings = req.body.no_of_openings;
        jobFound.apply_by = req.body.apply_by;
    
        JobsModel.edit(jobFound);

        // console.log("Job updated successfully with ID: " + id);

        const jobs = JobsModel.get();
        const page = parseInt(req.query.page) || 1; 
        const jobsPerPage = 4; 
        const startIndex = (page - 1) * jobsPerPage;
        const endIndex = startIndex + jobsPerPage;
        const jobsToDisplay = jobs.slice(startIndex, endIndex);
    
        res.render('jobs', { jobs: jobsToDisplay, currentPage: page, userName: req.session.userName, userEmail: req.session.userEmail });
    
    } else {
        console.log("Job not found for ID: " + id);
        res.status(404).send("Job not found"); 
    }
    next();
}

//delete a job when clicked on delete icon
deleteJob(req, res){
    const id = req.params.id;
    const jobFound = JobsModel.getById(id);
    if(!jobFound){
        return res.status(401).send("Job not found");
    }
    JobsModel.delete(id);
    const jobs = JobsModel.get();
    const page = parseInt(req.query.page) || 1; 
    const jobsPerPage = 4; 
    const startIndex = (page - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    const jobsToDisplay = jobs.slice(startIndex, endIndex);

    res.render('jobs', { jobs: jobsToDisplay, currentPage: page, userName: req.session.userName, userEmail: req.session.userEmail });

}

//get search results when user search in search box
getSearchResults(req, res, next) {
    const { name } = req.body;
    const result = JobsModel.searchResult(name);
    res.render("searchResults", { jobs: result,userName: req.session.userName, userEmail: req.session.userEmail});
    next();
  }
  
}

