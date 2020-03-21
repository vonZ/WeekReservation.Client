import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { resolvers, typeDefs } from "./resolvers";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import injectStyles from "./styles";
import RouterRoot from "./router";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1565c0"
    },
    secondary: {
      main: "#d50000"
    },
    action: {
      active: "#6d6c6c"
    },
    success: {
      main: "#00c853"
    },
    error: {
      main: "#d50000"
    }
  }
});

// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint
const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    // uri: "http://localhost:4000/graphql",
    uri: "https://weekreservationapi.viktorvz.now.sh/src",
    headers: {
      authorization: localStorage.getItem("token"),
      "client-name": "Week reservatation [web]",
      "client-version": "1.0.0"
    }
  }),
  resolvers,
  typeDefs
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem("token"),
    cartItems: []
  }
});

injectStyles();
const Index = ReactDOM.render(
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <RouterRoot />
    </ApolloProvider>
  </ThemeProvider>,
  document.getElementById("root")
);

export default Index;
