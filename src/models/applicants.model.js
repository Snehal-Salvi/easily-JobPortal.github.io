/*Applicant Model have applicants array 
when new applicant is added it includes it in applicants array*/

export default class ApplicantsModel {
    
     // Constructor to initialize a applicant object
    constructor(applicants_id, applicants_name, applicants_email, applicants_contact, companyname, jobrole, pdfFile) {
        this.applicants_id = applicants_id;
        this.applicants_name = applicants_name;
        this.applicants_email = applicants_email;
        this.applicants_contact = applicants_contact;
        this.companyname = companyname;
        this.jobrole = jobrole;
        this.pdfPath = pdfFile;  
    }
  
     // Get the list of applicants
    static get() {
        return applicants;
    }
  
     // Add a new applicant to the list
    static addApplicants(  applicants_name, applicants_email, applicants_contact, companyname, jobrole, pdfFile) {
        let newApplicant = new ApplicantsModel(applicants.length+1, applicants_name, applicants_email, applicants_contact, companyname, jobrole, pdfFile);
        applicants.push(newApplicant);
    }  
    
  }
  
  //Initial list of applicants for testing purposes 
  const applicants = [
    new ApplicantsModel('1', 'Snehal', 'snehal@gmail.com', '9123456789', 'Apple', 'SDE', '/PDF/sample.pdf'),
    new ApplicantsModel('2', 'Sneha', 'sneha@gmail.com', '9129456789', 'Google', 'Software Engineer','/PDF/sample.pdf'),
  ];
  
  export { ApplicantsModel, applicants };
  