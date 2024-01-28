var express = require("express");
var router = express.Router();
var citation = require('../models/citation'); // Assurez-vous d'avoir un modèle de citation

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
  const citation = await citation.findByIdAndDelete(req.params.id);
  res.json(citation);
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
  Citation.deleteOne({ _id: id }).then(() => {
    Citation.find().then(data => {
      console.log(data);
    });
  });
}

deleteCitation('65b3da9bfd65a86b76f7a352')

module.exports = router;