const mongoose = require('mongoose');

const connectionString = process.env.CONNEXION_STRING

//connect to database
mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
 .then(() => console.log('Base de données connectée'))

 .catch(error => console.error(error));

