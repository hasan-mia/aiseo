
const express = require('express');
const app = express()
const cors = require('cors') 
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://onnorokompathsala.firebaseio.com'
});

app.use(cors())
app.use(bodyParser.json());
// Start the server
const PORT = process.env.PORT || 8080;
// Define Firestore collection reference
const db = admin.firestore();
const collection = db.collection('fake');

// POST request to create a new item
app.post('/fake', async (req, res) => {
  try {
    const item = req.body;
    const docRef = await db.collection('fake').add(item);
    res.json({ id: docRef.id, data: item });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});


// GET request to retrieve a specific item
app.get('/fake/:id', async (req, res) => {

  try {
    const id = req.params.id;
    console.log(id)
    const doc = await db.collection('fake').doc(id).get();
    if (!doc.exists) {
      res.status(404).send('Item not found');
    } else {
      res.json({ id: doc.id, data: doc.data() });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// GET request to retrieve all items
app.get('/fakes', async (req, res) => {
  try {
    const snapshot = await db.collection('fake').get();
    const items: any[] = [];
    snapshot.forEach(doc => {
      items.push({ id: doc.id, data: doc.data() });
    });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// PUT request to update an existing item
app.put('/fake/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const item = req.body;
    const docRef = db.collection('fake').doc(id);
    await docRef.update(item);
    res.json({ id, data: item });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});


// DELETE request to delete an item
app.delete('/fake/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection('fake').doc(id).delete();
    res.status(200).send('Delete success');
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// server default route
app.get('/', (req, res) => {
  res.send(`Server listening on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
