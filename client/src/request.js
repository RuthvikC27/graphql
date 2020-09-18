import { ApolloClient, createHttpLink, InMemoryCache, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// import { getAccessToken, isLoggedIn } from './auth'
const endpoint_url = 'http://localhost:9000/graphql';


const httpLink = createHttpLink({
  uri: endpoint_url,
  credentials: 'same-origin'
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('accessToken');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

// console.log(client)

// async function graphqlRequest(query, variables = {}) {
//   const request = {
//     method: 'POST',
//     headers: { 'content-type': 'application/json' },
//     body: JSON.stringify({ query, variables, }),
//   }
//   if (isLoggedIn()) {
//     request.headers['authorization'] = 'Bearer ' + getAccessToken();
//   }

//   const response = await fetch(endpoint_url, request)

//   const responseBody = await response.json()
//   if (responseBody.errors) {
//     const message = responseBody.errors.map((error) => error.message).join('\n')
//     throw new Error(message)
//   }
//   //   console.log(responseBody)
//   return responseBody.data
// }

export async function loadCompany(id) {
  const query = gql`query companyQuery($id: ID){
        company(id: $id){
          id
          name
          description
      }
      }`
  const variables = {
    id,
  }
  const response = await client.query({ query, variables })
  return response.company
}

export async function loadJob(id) {
  const query = gql`
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
    id
  }
  const { data } = await client.query({ query, variables });
  return data.job
}

export async function loadJobs() {
  const query = gql`{
        jobs{
            id,
            title,
            companies{
                id,
                name
            },
        },
    }`;


  const { data: { jobs } } = await client.query({ query });
  return jobs
}


export async function createJob(input) {
  const mutation = gql`mutation CreateJob($input: CreateJobInput){
  Job: createJob(input: $input){
    id
    title
    description
  }
}`
  // console.log(input)
  const {data: {Job}} = await client.mutate({ mutation, variables: { input } })
  return Job
}