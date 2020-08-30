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

module.exports = {
  Query,
  Job,
  Company
}
