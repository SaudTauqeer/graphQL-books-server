//imports
require('dotenv').config();
const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
//config
const port = process.env.PORT || 4000;
const uri = `mongodb://${process.env.MONGO_DB_ID}:${process.env.MONGO_DB_PW}@ds155845.mlab.com:55845/gql-author-app`;

mongoose.connect(uri, { useNewUrlParser: true }, (err) => (err != null ? console.log(err) : ''));
mongoose.connection.once('open', () => console.log('Mongoose connected '));
//cors middlewar
app.use(cors());
//graphql-express middleware
app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: false
	})
);

app.listen(port, () => {
	console.log(`Node + GraphQL server is running at http://localhost:${port}`);
});
