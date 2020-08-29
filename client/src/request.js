const endpoint_url = 'http://localhost:9000/graphql'

async function graphqlRequest(query, variables) {
  const response = await fetch(endpoint_url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
  const responseBody = await response.json()
  if (responseBody.errors) {
    const message = responseBody.errors.map((error) => error.message).join('\n')
    throw new Error(message)
  }
  //   console.log(responseBody)
  return responseBody.data
}

export async function loadCompany(id) {
  const query = `query companyQuery($id: ID){
        company(id: $id){
          id
          name
          description
      }
      }`
  const variables = {
    id,
  }
  const response = await graphqlRequest(query, variables)
  return response.company
}

export async function loadJob(id) {
  const query = `
    query jobQuery($id: ID!){
        job(id: $id){
          id
          title
          companies{
            id
            name
          }
          description
        }
      }`
  const variables = {
    id,
  }
  const response = await graphqlRequest(query, variables)
  return response.job
}

export async function loadJobs() {
  const query = `{
        jobs{
            id,
            title,
            companies{
                id,
                name
            },
        },
    }`
  const variables = {}
  const response = await graphqlRequest(query, variables)
  return response.jobs
}
