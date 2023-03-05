# comapp-server 

### Description 
Backend for a `clients & projects` project with the implementations below

  - Create a client
  - Update client info
  - Delete client info
  - Create a project 
  - Update project info
  - Delete project info


### Technologies

#### [Express](https://expressjs.com/)
Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. 
It is responsible for serving the server

#### [Express-GraphQL](https://graphql.org/graphql-js/running-an-express-graphql-server/)
Express-GraphQL is the simplest way to run a GraphQL API server is to use Express, a popular web application framework for Node.js. 
It is responsible for connecting expressjs and graphql
 
#### [GraphQL](https://graphql.org/)
GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more. 
It is responsible for defining the graphQL query schemas and providing the GrapphQL schema types 
 
#### [Mongoose](https://mongoosejs.com/)
Mongoose offers Object Data Modelling, basically a neater way to work with mongoDB in this case. 
It is responsible for Object Data Modelling


### How to Use
Go ahead and clone this repo `git clone https://github.com/muriukialex/comapp-server.git` then run `yarn add` or `npm i`
#### Test out the server

1. [Create](https://www.mongodb.com/basics/create-database) a MongoDB 
2. Create a `.env` file then;
```shell
cp .env.sample  .env
```
3. In your `.env` file, replace the following with your credentials and MongoDB connection string
```javascript
MONGODB_USERNAME=username /*your MongoDB username*/
MONGODB_PASSWORD=password /*your MongoDB db password*/
MONGODB_CLUSTER=MongoDB_cluster /*your MongoDB connection string*/
```
4. Start the server
```shell
yarn dev
```
OR
```shell
npm run dev
```


##### Credits 🙏🏾
This project was made following through Brad Traversy's GraphQL [tutorial](https://www.youtube.com/watch?v=BcLNfwF04Kw). Thanks [Brad](https://github.com/bradtraversy)
