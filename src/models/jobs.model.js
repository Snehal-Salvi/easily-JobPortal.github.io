//JobsModel class to represent job listings

class JobsModel {

   // Constructor to initialize a job object
  constructor(id, name, role, location, lpa, skills, no_of_openings, apply_by) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.location = location;
    this.lpa = lpa;
    this.skills = Array.isArray(skills) ? skills : [skills];
    this.no_of_openings = no_of_openings;
    this.apply_by = apply_by;
  }

  // get the list of job listings
  static get() {
    return jobs;
  }

  // to add a new job listing
  static addJobs(name, role, location, lpa, skills, no_of_openings, apply_by) {
    let newjob = new JobsModel(jobs.length + 1, name, role, location, lpa, skills, no_of_openings, apply_by);
    jobs.push(newjob);
  }

  // get a job by its ID
  static getById(id) {
    return jobs.find((j) => j.id == id);
  }

  // edit job by its ID
  static edit(jobObj) {
    const index = jobs.findIndex((j) => j.id == jobObj.id);
    jobs[index] = jobObj;
  }

  //delete job by its ID
  static delete(id) {
    const index = jobs.findIndex((j) => j.id == id);
    jobs.splice(index, 1);
  }

  //search a job  by its ID
  static searchResult(name) {
    return jobs.filter((job) => job.name === name);
  }
}

// Array containing sample job listings
const jobs = [
  new JobsModel(1, 'Coding Ninjas', 'Front-End Developer', 'Mumbai', '10', ['React', 'NodeJs', 'Java'], 5, '2023-11-11'),
  new JobsModel(2, 'Accenture', 'SDE', 'Mumbai', '40', ['React', 'NodeJs', 'Angular'], 8, '2023-11-11'),
  new JobsModel(3, 'Amazon', 'Front-End Developer', 'Mumbai', '60', ['React', 'NodeJs', 'Angular'], 8, '2023-11-11'),
  new JobsModel(4, 'Flipkart', 'SDE', 'Mumbai', '45', ['React', 'NodeJs', 'Java'], 9, '2023-11-11'),
  new JobsModel(5, 'Apple', 'HR', 'Mumbai', '20', ['React', 'NodeJs', 'Java'], 10, '2023-11-11'),
];

export { JobsModel, jobs };
