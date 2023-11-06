/*User controller is for registration and login*/

import UserModel from "../models/user.model.js";
import {JobsModel} from "../models/jobs.model.js";

export default class UserController{

    //get resistration page
    getRegister(req,res){
        res.render('register', {errorMessage:null});
    }

    //get login page
    getLogin(req,res){
        res.render('login',{errorMessage: null});
    }

    //post registration
    postRegister(req,res){
        const {name, email, password} = req.body;
        UserModel.add(name, email, password);
        res.render('login',{errorMessage: null});
    }

    //post login
    postLogin(req,res){
        const {email, password} = req.body;
        const user = UserModel.isValidUser(email, password);
        if(!user){
            return res.render('login', {errorMessage:'Invalid Credentials'});
        }

        req.session.userEmail = email;
        req.session.userName = user.name;

        const jobs = JobsModel.get();
        const page = parseInt(req.query.page) || 1; 
        const jobsPerPage = 4; 
        const startIndex = (page - 1) * jobsPerPage;
        const endIndex = startIndex + jobsPerPage;
        const jobsToDisplay = jobs.slice(startIndex, endIndex);
    
        res.render('jobs', { jobs: jobsToDisplay, currentPage: page, userName: req.session.userName, userEmail: req.session.userEmail  });
    }

    //log out when recruiter clicks on log out button
    logout(req, res){
        // on logout, destroy the session
        req.session.destroy((err)=>{
          if(err){
            console.log(err);
          }
          else{
            res.redirect('/login');
          }

        });

        //clear cookies after logging out
        res.clearCookie('lastVisit');     
    }

}