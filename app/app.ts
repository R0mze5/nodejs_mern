const express = require('express');
const cors = require('cors');
const config = require('config');
const mongoose = require('mongoose');
const path = require('path');
// const MongoClient = require('mongodb').MongoClient;

const app = express();

const PORT = config.get('port') || 5000;

app.use(cors());
app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));
app.use('/t', require('./routes/redirect.routes'));

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '..', 'client', 'build')));

  app.get(* , (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client' , 'build', 'index.html'))
  })
  // console.log(path.join(__dirname, '..', 'client', 'build'));
}

async function start() {
  try {
    // const client = new MongoClient(config.get('mongoUri'), {
    //   useNewUrlParser: true,
    //   // useUnifiedTopology: true,
    //   // useCreateIndex: true,
    // });
    // await client.connect(err => {
    //   const collection = client.db('test').collection('devices');
    //   // perform actions on the collection object

    //   console.log(err);
    //   // console.log(collection);
    //   client.close();
    // });
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }); // Promise

    app.listen(PORT, () => {
      console.log(`app has started on ${PORT}...`);
    });
  } catch (error) {
    console.log(`Server error`, error.message);
    process.exit(1);
  }
}

start();
