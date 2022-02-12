## Want-In

An app to help event and workshop organizers create an intuitive and easy-to-mantain platform for their registrations.
Being an organizer myself, I've always found it a bit frustrating to be going through different platforms to keep track of everything realted ot my workshops and events. So I started developing _Want-In_ as a easy-to-manage registration and event coordination platform.

There are still a lot of features to be implemented and a lot of work to do in terms of the UI, but this is a project that will be developed with time and taking any help and resources from people interested in contribute.

This was a project build with a time constraint of one week, as part of a coding program I attended.

## Screenshots

<p align="center">
  <img src="/readme-image.jpg" />
</p>

## Installation

1. Clone this repo;

```bash
git clone https://github.com/braga-felipe/want-in
```

2. In the server/models/index.js file, on line 21, be sure to enter the URL of your MongoDB database, preferably creating an .env file with for the credentails to be protected;

```bash
mongoose.connect(<YOUR URL>, { useNewUrlParser: true }).then(() => {
  server.listen({ port:<DESIRED PORT>}).then((res) => {
    console.log(`Server running at ${res.url}`);
  });
});
```

3. Install dependencies in the client folder and run the front-end;

```bash
cd client
npm install
npm start
```

4. Install dependencies in the server folder and run the server. If installation is successful, you should get two logs:
   1. 'Server running at" and the specified PORT
   2. 'Connected to database!'

```bash
cd ../server        # if you're in the client folder
      OR
cd server           # if you're in the root folder of the repo
npm install
nodemon
```

## Tech Stack

- [GraphQl](https://graphql.org/)
- [Apollo](https://apollographql.com/)
- [Express](https://expressjs.com)
- [Mongoose](https://mongoosejs.com/)
- [React](https://reactjs.org)
- [Material-UI](https://mui.com/)

## Enjoy!

I hope you enjoy this project and feel free to reach out and contribute to it.

Big hugs!

Felipe
