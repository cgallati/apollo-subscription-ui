import {ApolloClient, HttpLink, InMemoryCache, split} from "@apollo/client";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {createClient} from "graphql-ws";
import {getMainDefinition} from "@apollo/client/utilities";

const isBrowser = !(typeof window === 'undefined')


const httpLink = new HttpLink({
    uri: 'https://poker-subscription-server.herokuapp.com/'
});

const wsLink = isBrowser ?
    new GraphQLWsLink(createClient({
        url: 'ws://poker-subscription-server.herokuapp.com/',
        reconnect: true
    }))
    : null;

const splitLink = isBrowser ? split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
) : httpLink;

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
});

export default client;