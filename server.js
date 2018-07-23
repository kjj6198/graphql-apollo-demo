const express = require("express");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const { buildSchema } = require("graphql");

const app = express();

const schema = buildSchema(`
  type Person {
    id: ID
    name: String
    age: Int
  }
  
  input createPerson {
    name: String
    age: Int
  }


  type Query {
    people: [Person]
  }

  type Mutation {
    insertPerson(input: createPerson): Person
    mutatePerson(input: createPerson): [Person]
  }
`);

const people = [
  {
    id: "1",
    name: "kalan",
    age: 23
  },
  {
    id: "2",
    name: "jack",
    age: 30
  },
  {
    id: "3",
    name: "eason",
    age: 22
  },
  {
    id: "4",
    name: "jasper",
    age: 28
  },
  {
    id: "5",
    name: "kaihao",
    age: 24
  },
  {
    id: "6",
    name: "scars",
    age: 30
  },
  {
    id: "7",
    name: "test",
    age: 22
  },
  {
    id: "8",
    name: "angelaby",
    age: 23
  }
];

const resolver = {
  people: () => people,
  mutatePerson: (...args) => {
    const {
      input: { name, age }
    } = args[0];
    const idx = people.findIndex(p => p.name === name);

    if (idx > -1) {
      people[idx] = {
        id: people[idx].id,
        name,
        age
      };
      return [
        {
          id: people[idx].id,
          name,
          age
        }
      ];
    }
  },
  insertPerson: (...args) => {
    const {
      input: { name, age }
    } = args[0];
    people.push({ name, age });
    return {
      name,
      age
    };
  }
};

app.use(
  "/graphql",
  cors(),
  graphqlHTTP({
    schema,
    rootValue: resolver,
    graphiql: true
  })
);

app.listen(3000);
