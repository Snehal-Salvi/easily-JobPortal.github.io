//import necessary modules
import path from 'path';
import express from 'express';
import JobsController from './src/controllers/jobs.controller.js';
import ejsLayouts  from 'express-ejs-layouts';
import validationMiddleware from './src/middlewares/validation.middleware.js';
import UserController from './src/controllers/user.controller.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js';
import validateRegistration from './src/middlewares/registrationValidation.middleware.js';
import ApplicantsController from './src/controllers/applicants.controller.js';
import { uploadFile } from './src/middlewares/fileupload.middleware.js';


const server = express();

server.use(session({
    secret:'SnehalSecretKey',
    resave:false,
    saveUninitialized:true,
    cookie: {secure: false},
}))

//parse form data
server.use(express.urlencoded({extended: true}));

//cookie parser
server.use(cookieParser());
server.use(setLastVisit);

//setup view engine settings
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(),"src",'views'));
server.use(ejsLayouts);
server.use(express.static('public'));
server.use(express.static('src/views'));

// Create a Controller instance to handle related routes and actions
const jobsController = new JobsController();
const usersController = new UserController();
const applicantController = new ApplicantsController();

//get and post requests
server.get('/', jobsController.getInterface);
server.get('/new',  jobsController.getJobs);
server.get('/newjob', auth, jobsController.getNewJob);
server.get('/view-details/:id', jobsController.getJobDetails);
server.get('/edit-job/:id', jobsController.getEditJobView);
server.get('/register', usersController.getRegister);
server.get('/login', usersController.getLogin);
server.get('/logout', usersController.logout);
server.get('/delete-job/:id',  jobsController.deleteJob);
server.get("/applicants", auth,applicantController.getApplicants);
server.post('/new', validationMiddleware,   jobsController.postNewJob);
server.post('/edit-job', validationMiddleware, jobsController.postEditedJob);
server.post('/register', validateRegistration, usersController.postRegister);
server.post('/login',  usersController.postLogin);
server.post("/applicants", uploadFile.single('pdfFile'), applicantController.postApplicants);
server.post("/search", jobsController.getSearchResults);

server.listen(3200);
console.log('Server is listening on port 3200');