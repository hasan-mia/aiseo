
import express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://<your-project-id>.firebaseio.com'
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 3000;
// Define Firestore collection reference
const db = admin.firestore();
const collection = db.collection('datalist');

// POST request to create a new item
app.post('/items', async (req, res) => {
  try {
    const item = req.body;
    const docRef = await db.collection('datalist').add(item);
    res.json({ id: docRef.id, data: item });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
function cors(): any {
    throw new Error('Function not implemented.');
}

