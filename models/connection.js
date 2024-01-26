const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://pachara06200:YEMCXuKIjBiU78Hi@cluster0.y351cnv.mongodb.net/citarapide';

//connect to database
mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
 .then(() => console.log('Base de données connectée'))

 .catch(error => console.error(error));

