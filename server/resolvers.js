const db = require('./db')

const Query = {
  job: (root, args) => db.jobs.get(args.id),
  jobs: () => db.jobs.list(),
}

const Job = {
  companies: (job) => db.companies.get(job.companyId),
}

module.exports = {
  Query,
  Job,
}
