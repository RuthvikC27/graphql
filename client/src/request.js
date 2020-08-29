const endpoint_url = 'http://localhost:9000/graphql'

export async function loadJobs() {
  const response = await fetch(endpoint_url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: `{
                jobs{
                    id,
                    title,
                    companies{
                        id,
                        title
                    },
                },
            }`,
    }),
  })

  const responseBody = await response.json()
  console.log(responseBody)
  return responseBody.data.jobs
}
