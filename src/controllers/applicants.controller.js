/*Applicant controller is to get applicants details and post it on applicants view
when applicant submit a job application*/

import ApplicantsModel from "../models/applicants.model.js";

export default class ApplicantsController {

//get applicants on applicants page
getApplicants(req, res, next){   
    const applicants = ApplicantsModel.get();
    res.render('applicants', { applicants,userName: req.session.userName, userEmail: req.session.userEmail });
    next();
}

//post the applicants on applicants list when they apply to job
postApplicants(req, res){
    // console.log(req.body);
    // console.log(req.file);
    const {  applicants_name, applicants_email, applicants_contact, companyname, jobrole } = req.body;
    const pdfFile = "PDF/"+req.file.filename;
    ApplicantsModel.addApplicants( applicants_name, applicants_email, applicants_contact, companyname, jobrole,pdfFile );
    const applicants = ApplicantsModel.get();
    res.render("applied-msg", {applicants, userName: req.session.userName, userEmail: req.session.userEmail });   
 }
}