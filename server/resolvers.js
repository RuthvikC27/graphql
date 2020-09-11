const db = require('./db')

const Query = {
  company: (root, args) => db.companies.get(args.id),
  job: (root, args) => db.jobs.get(args.id),
  jobs: () => db.jobs.list(),
}

const Company = {
  jobs: (company) => db.jobs.list().filter(job => company.id == job.companyId)
}

const Job = {
  companies: (job) => db.companies.get(job.companyId),
}

const Mutation = {
  createJob: (root, {input}) => {
    const id = db.jobs.create(input)
    return db.jobs.get(id)
  }
}

module.exports = {
  Query,
  Job,
  Company,
  Mutation
}


// mutation{
//   createPost(
//     companyId: "SJV0-wdOM" 
//     title: "new job"
//     description: "test"
//   )
// }

// mutation{
//   Job: createJob(
//     companyId: "SJV0-wdOM" 
//     title: "Web Scraping"
//     description: "Web Scrap and Crawl"
//   ){
//     id
//     title
//     description
//   }
// }

// mutation CreateJob($input: CreateJobInput){
//   Job: createJob(input: $input){
//     id
//     title
//     description
//   }
// }

// {
//   "input": {
//     "companyId": "SJV0-wdOM",
//     "title": "Web Scraping",
//     "description": "Web Scrap and Crawl"
//   }
// }