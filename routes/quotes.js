var express = require("express");
var router = express.Router();
var citation = require('../models/citation'); // Assurez-vous d'avoir un modèle de citation


// ajouter une citation
router.post('/citations', async (req, res) => {
  try {
   const citation = new citation(req.body);
   const result = await citation.save();
   res.json(result);
  } catch (err) {
   console.log(err);
   res.status(500).send(err);
  }
 });


// afficher toutes les citations
router.get('/citations', async (req, res) => {
 try {
  const citations = await citation.find({});
  res.json(citations);
 } catch (err) {
  console.log(err);
  res.status(500).send(err);
 }
});

// supprimer une citation
router.delete('/citations/:id', async (req, res) => {
  try {
   const result = await citation.deleteOne({ _id: req.params.id });
   if (result.deletedCount > 0) {
     res.json({ message: 'Citation supprimée avec succès' });
   } else {
     res.status(404).send('Citation non trouvée');
   }
  } catch (err) {
   console.log(err);
   res.status(500).send(err);
  }
 });



// obtenir une citation spécifique par son id
router.get('/citations/:id', async (req, res) => {
 try {
  const citation = await citation.findById(req.params.id);
  if (citation) {
   res.json(citation);
  } else {
   res.status(404).send('Citation non trouvée');
  }
 } catch (err) {
  console.log(err);
  res.status(500).send(err);
 }
});

// mettre à jour une citation spécifique par son id
router.put('/citations/:id', async (req, res) => {
 try {
  const citation = await citation.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (citation) {
   res.json(citation);
  } else {
   res.status(404).send('Citation non trouvée');
  }
 } catch (err) {
  console.log(err);
  res.status(500).send(err);
 }
});



function deleteCitation(id) {
 citation.deleteOne({ _id: id }).then(() => {
  citation.find().then(data => {
   console.log(data);
  });
 });
}

deleteCitation('65b3da9bfd65a86b76f7a352')

module.exports = router;