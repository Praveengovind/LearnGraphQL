console.log("Welcome Back to Graph QL");

import { GraphQLServer } from 'graphql-yoga'

//Users dummy data
const users = [
    {
        id:1,
        name: 'Praveenraj'
    },
    {
        id:2,
        name: 'Diya'
    },
    {
        id:3,
        name: 'Sri'
    },
    {
        id:4,
        name: 'Amina'
    },
    {
        id:5,
        name: 'Mike'
    }
]

//Posts dummy data
const posts = [
    {
        id: 1,
        title: 'Post 1',
        body: 'Dummy Post 1',
        published: 'Jan 2017'
    },
    {
        id: 2,
        title: 'Post 2',
        body: 'Dummy Post 2',
        published: 'Feb 2017'
    },
    {
        id: 3,
        title: 'Post 3',
        body: 'Dummy Post 3',
        published: 'Mar 2017'
    },
    {
        id: 4,
        title: 'Post 4',
        body: 'Dummy Post 4',
        published: 'Apr 2017'
    },
    {
        id: 5,
        title: 'Post 5',
        body: 'Dummy Post 5',
        published: 'May 2017'
    }
]

// Type definitions (schema)
const typeDefs = `
    type Query {
        greeting(name: String, city: String): String!
        add(a: Float, b: Float): Float!
        add1(numbers: [Float!]): Float!
        grades: [Int!]!
        age: Int
        user: User!
        post: Post!
        users(query:String): [User!]! 
        posts(query:String): [Post!]!
    }

    type User {
        id: Int
        name: String!
    }

    type Post {
        id: Int
        title: String!
        body: String!
        published: String!
    }
`
// Resolvers
const resolvers = {
    Query: {
        greeting(parent,args,ctx,info) {
                //console.log(ctx);
                //console.log(info);
                return 'Hello ' + args.name + ' from ' + args.city;
        },
        add(parent,args,ctx,info){
            return args.a + args.b;
        },
        add1(parent,args,ctx,info){
            if(args.numbers.length === 0){
                return 0;
            } else {
                return args.numbers.reduce((accumulator,currentvalue)=>{
                    return accumulator + currentvalue;
                })
            }
        },
        grades(parent,args,ctx,info){
            return [95,94,93,90,80];
        },
        age(){
            return 80
        },
        user(){
            return {
                id: 10,
                name: "Praveenraj Govindarajan"
            }
        },
        post(){
            return {
                id: 1,
                title:'Se7en',
                body:'Seventh Sense',
                published:'7th Feb'
            }
        },
        users(parent,args,ctx,info){
            if (!args.query){
                return users;
            }
            return users.filter((user)=>{
                return user.name.toLowerCase().includes(args.query.toLowerCase());
            })
        },
        posts(parent,args,ctx,info){
            if(!args.query){
                return posts;
            }
            return posts.filter((post)=>{
                const titleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
                const bodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase());
                return titleMatch || bodyMatch;
            });
        }
    }
}
const server = new GraphQLServer({
                                    typeDefs,
                                    resolvers
});

server.start(() => {
        console.log('The server is up!')
});

