async function greeting() {
    const response = await fetch("http://localhost:8000/", {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            query: `
                query{
                    greeting
                }
            `
        })
    })
        
    const responseBody = await response.json();
    return responseBody.data
}

greeting().then(({greeting}) => {
    document.querySelector('.greeting').textContent = greeting
})