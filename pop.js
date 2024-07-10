#! /usr/bin/env node

console.log(
  'This script populates some test data for users, posts, and comments to your database.'
);
console.log(
  'Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const mongoose = require('mongoose');
const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');

const postsObs = [];
const usersObs = [];

const mongoDB = userArgs[0];

main().catch((err) => console.error(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createUsers();
  await createPosts();
  await createComments();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

async function createUsers() {
  console.log('Adding users');
  await User.deleteMany({}); // Clear existing users

  const users = [
    {
      firstname: 'John',
      lastname: 'Doe',
      username: 'john_doe',
      email: 'john@mail.com',
      password: '1234',
      admin: true,
    },
    {
      firstname: 'Jane',
      lastname: 'Smith',
      username: 'jane_smith',
      email: 'jane@mail.com',
      password: '5678',
      admin: false,
    },
    {
      firstname: 'Chris',
      lastname: 'Brown',
      username: 'chris_brown',
      email: 'chirs@mail.com',
      password: '5678',
      admin: false,
    },
  ];

  for (const userData of users) {
    const user = new User(userData);
    usersObs.push(user);
    await user.save(); // Use save method to trigger pre-save hook
    console.log(`Added user: ${user.username}`);
  }
}

async function createPosts() {
  console.log('Adding posts');
  await Post.deleteMany({}); // Clear existing posts

  const posts = [
    {
      title: 'First Post',
      body: 'This is the first post. Lorem ipsum dolor sit amet consectetur adipisicing elit. \
      Necessitatibus quaerat veritatis ex id deserunt unde aliquam culpa, tempora quia! \
      Natus exercitationem placeat libero enim aliquid quas ducimus repellat culpa odit! \
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. \
      Maiores unde, accusantium similique fuga dicta nulla. \
      Nobis ipsum dolore nam debitis optio repellat accusamus mollitia natus, adipisci praesentium fugiat! \
      Incidunt provident, optio dolores, minus exercitationem explicabo veritatis necessitatibus sapiente quo \
      quaerat animi accusantium, blanditiis saepe odit ab perspiciatis itaque rem est at possimus modi non voluptas. \
      Incidunt vitae necessitatibus, voluptate sequi aliquid eum dolores eos veritatis odio voluptatibus aut aperiam \
      dolore facilis ab libero, culpa sint accusantium illum est perferendis ut velit? \
      Est, expedita quam doloribus dolores natus neque dolorum minus aperiam mollitia iusto \
      ipsam non fugit reiciendis culpa, temporibus nam.',
      public: true,
    },
    {
      title: 'Second Post',
      body: 'This is the second post. Lorem ipsum dolor sit amet consectetur adipisicing elit. \
      Necessitatibus quaerat veritatis ex id deserunt unde aliquam culpa, tempora quia! \
      Natus exercitationem placeat libero enim aliquid quas ducimus repellat culpa odit! \
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. \
      Maiores unde, accusantium similique fuga dicta nulla. \
      Nobis ipsum dolore nam debitis optio repellat accusamus mollitia natus, adipisci praesentium fugiat! \
      Incidunt provident, optio dolores, minus exercitationem explicabo veritatis necessitatibus sapiente quo \
      quaerat animi accusantium, blanditiis saepe odit ab perspiciatis itaque rem est at possimus modi non voluptas. \
      Incidunt vitae necessitatibus, voluptate sequi aliquid eum dolores eos veritatis odio voluptatibus aut aperiam \
      dolore facilis ab libero, culpa sint accusantium illum est perferendis ut velit? \
      Est, expedita quam doloribus dolores natus neque dolorum minus aperiam mollitia iusto \
      ipsam non fugit reiciendis culpa, temporibus nam.',
      public: true,
    },
    {
      title: 'Third Post',
      body: 'This is the third post. Lorem ipsum dolor sit amet consectetur adipisicing elit. \
      Necessitatibus quaerat veritatis ex id deserunt unde aliquam culpa, tempora quia! \
      Natus exercitationem placeat libero enim aliquid quas ducimus repellat culpa odit! \
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. \
      Maiores unde, accusantium similique fuga dicta nulla. \
      Nobis ipsum dolore nam debitis optio repellat accusamus mollitia natus, adipisci praesentium fugiat! \
      Incidunt provident, optio dolores, minus exercitationem explicabo veritatis necessitatibus sapiente quo \
      quaerat animi accusantium, blanditiis saepe odit ab perspiciatis itaque rem est at possimus modi non voluptas. \
      Incidunt vitae necessitatibus, voluptate sequi aliquid eum dolores eos veritatis odio voluptatibus aut aperiam \
      dolore facilis ab libero, culpa sint accusantium illum est perferendis ut velit? \
      Est, expedita quam doloribus dolores natus neque dolorum minus aperiam mollitia iusto \
      ipsam non fugit reiciendis culpa, temporibus nam.',
      public: true,
    },
    {
      title: 'Fourth Post',
      body: 'This is the fourth post. Lorem ipsum dolor sit amet consectetur adipisicing elit. \
      Necessitatibus quaerat veritatis ex id deserunt unde aliquam culpa, tempora quia! \
      Natus exercitationem placeat libero enim aliquid quas ducimus repellat culpa odit! \
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. \
      Maiores unde, accusantium similique fuga dicta nulla. \
      Nobis ipsum dolore nam debitis optio repellat accusamus mollitia natus, adipisci praesentium fugiat! \
      Incidunt provident, optio dolores, minus exercitationem explicabo veritatis necessitatibus sapiente quo \
      quaerat animi accusantium, blanditiis saepe odit ab perspiciatis itaque rem est at possimus modi non voluptas. \
      Incidunt vitae necessitatibus, voluptate sequi aliquid eum dolores eos veritatis odio voluptatibus aut aperiam \
      dolore facilis ab libero, culpa sint accusantium illum est perferendis ut velit? \
      Est, expedita quam doloribus dolores natus neque dolorum minus aperiam mollitia iusto \
      ipsam non fugit reiciendis culpa, temporibus nam.',
      public: false,
    },
    {
      title: 'Five Post',
      body: 'This is the fith post. Lorem ipsum dolor sit amet consectetur adipisicing elit. \
      Necessitatibus quaerat veritatis ex id deserunt unde aliquam culpa, tempora quia! \
      Natus exercitationem placeat libero enim aliquid quas ducimus repellat culpa odit! \
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. \
      Maiores unde, accusantium similique fuga dicta nulla. \
      Nobis ipsum dolore nam debitis optio repellat accusamus mollitia natus, adipisci praesentium fugiat! \
      Incidunt provident, optio dolores, minus exercitationem explicabo veritatis necessitatibus sapiente quo \
      quaerat animi accusantium, blanditiis saepe odit ab perspiciatis itaque rem est at possimus modi non voluptas. \
      Incidunt vitae necessitatibus, voluptate sequi aliquid eum dolores eos veritatis odio voluptatibus aut aperiam \
      dolore facilis ab libero, culpa sint accusantium illum est perferendis ut velit? \
      Est, expedita quam doloribus dolores natus neque dolorum minus aperiam mollitia iusto \
      ipsam non fugit reiciendis culpa, temporibus nam.',
      public: false,
    },
  ];

  for (const postData of posts) {
    const post = new Post(postData);
    postsObs.push(post);
    await post.save(post);
    console.log(`Added post: ${post.title}`);
  }
}

async function createComments() {
  console.log('Adding comments');
  await Comment.deleteMany({}); // Clear existing comments

  const comments = [
    {
      text: 'This is a comment on the first post.',
      username: usersObs[1].username,
      post: postsObs[0],
    },
    {
      text: 'This is a comment on the second post.',
      username: usersObs[2].username,
      post: postsObs[1],
    },
    {
      text: 'This is a comment on the first post.',
      username: usersObs[0].username,
      post: postsObs[0],
    },
    {
      text: 'This is a comment on the first post.',
      username: usersObs[0].username,
      post: postsObs[0],
    },
    {
      text: 'This is a comment on the second post.',
      username: usersObs[1].username,
      post: postsObs[1],
    },
    {
      text: 'This is a comment on the third post.',
      username: usersObs[2].username,
      post: postsObs[2],
    },
    {
      text: 'This is a comment on the fourth post.',
      username: usersObs[0].username,
      post: postsObs[3],
    },
    {
      text: 'This is a comment on the fourth post.',
      username: usersObs[0].username,
      post: postsObs[3],
    },
    {
      text: 'This is a comment on the second post.',
      username: usersObs[2].username,
      post: postsObs[1],
    },
    {
      text: 'This is a comment on the fifth post.',
      username: usersObs[2].username,
      post: postsObs[4],
    },
    {
      text: 'This is a comment on the second post.',
      username: usersObs[1].username,
      post: postsObs[1],
    },
    {
      text: 'This is a comment on the first post.',
      username: usersObs[1].username,
      post: postsObs[0],
    },
    // Add more comments as needed
  ];

  for (const comment of comments) {
    await Comment.create(comment);
    console.log(`Added comment`);
  }
}
