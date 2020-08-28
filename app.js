const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    schema {
        query: Query
    } # No need, By default it maps Query to query in server

    type Query{
        greeting: String
    }
`;

const resolvers = {
    Query: {
        greeting: () => "Hello graphQL"
    }
};

const app = new ApolloServer({ typeDefs, resolvers });

app.listen({ port: 8000 })
.then((serverInfo) => {
    console.log("App started running on " + serverInfo.url);
})

// In network section of browser
// REQUEST

// TO GraphyQL SERVER we always makes POST request
// content-type: application/json

// request payload
// {"opertaionName: nuill, "variables": {}, "query": {\n greeting \n}\n"}

// RESPONSE

// content-type: application/json
