//middleware to check post new job form validation
import { body, validationResult} from "express-validator";

const validateRequest = async (req, res, next) => {

  // console.log(req.body);
  const rules = [
    body('job_category').notEmpty().withMessage('Job Category is required'),
    body('job_designation').notEmpty().withMessage('Job Designation is required'),
    body('job_location').notEmpty().withMessage('Job Location is required'),
    body('company_name').notEmpty().withMessage('Company Name is required'),
    body('salary').isFloat({gt:0}).withMessage('Salary should be positive number'),
    body('no_of_openings').isFloat({gt:0}).withMessage('Total Positions should be positive number'),
    body('skills_required').notEmpty().withMessage('At least one skill is required'),
    body('apply_by').notEmpty().withMessage('Please mention Apply by date'),
 


  ];

  await Promise.all(rules.map(rule => rule.run(req)));

  var validationErrors = validationResult(req);
  // console.log(validationErrors);

  //if errors are there return the errors message
  if(!validationErrors.isEmpty()){
      return res.render('postnewjob',{errorMessage: validationErrors.array()[0].msg});
  }

  next();
}

export default validateRequest;
