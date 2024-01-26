// Insert your code here
const mongoose = require('mongoose');

const citationSchema = mongoose.Schema({
 proverbe: String,
 auteur: String,
 theme: String,
});

const Citation = mongoose.model('citations', citationSchema);

module.exports = Citation;