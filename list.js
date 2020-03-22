const express = require('express')
const express_graphql = require('express-graphql')
const {buildSchema} = require('graphql')

// GraphQl Schema
const schema = buildSchema(`
    type Query {
       course(id: Int!): Course
       courses(topic: String): [Course]

    }
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`)

const coursesData = [
    {
        id: 1,
        title: 'The complete Nodejs developer course',
        author: 'Andrew Mead, Rob Percival',
        description: 'learn nodejs in 30days',
        topic: 'NodeJS',
        url: 'https://www.nodejs.org'
    },
    {
        id: 2,
        title: 'Laravel 3 developer course',
        title: 'Brad Manth, Bryan stobeson',
        description: 'learn laravel in 30days',
        topic: 'Laravel 3',
        url: 'https://www.laravel.com'
    },
    {
        id: 3,
        title: 'Backend with Ruby on Rails 6',
        title: 'Nicole Susekon, Camile Watson',
        description: 'learn nodejs in 30days',
        topic: 'RubyRails',
        url: 'https://www.rubyrails.com'
    },
    {
        id: 4,
        title: 'Entry Nodejs beginner course',
        author: 'Jack Mattias, Wilson Brown',
        description: 'learn nodejs for absolute begineer',
        topic: 'NodeJS',
        url: 'https://www.nodejs.org'
    }, 
]

const getCourse = args => {
    const id = args.id;
    return coursesData.filter(course => {
        return course.id == id;
    })[0];
}

const getCourses = args => {
    if(args.topic) {
        const topic = args.topic;
        return coursesData.filter(course => course.topic === topic);
    } else {
        return coursesData;
    }
}
// Root resolver
const root = {
    course: getCourse,
    courses: getCourses
}

// Create an express server and a GraphQl endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

app.listen(5000, () => console.log('Express GraphQl Server now running on localhost:5000/graphql'))