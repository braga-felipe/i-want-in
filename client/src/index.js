import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// importing what we need to connect our React app to our GraphQl server.
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { uri } from './config';

// this client will have all the information about our GraphQL server
const client = new ApolloClient({
	uri,
	cache: new InMemoryCache(),
});

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
