var express = require("express");
var router = express.Router();
const citation = require("../models/citations");

// afficher toutes les citations
router.get('/citations', (req, res) => {
  citation.find({})
    .then(citations => {
      res.json(citations);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

// supprimer une citation par son id
router.delete('/citations/:id', (req, res) => {
  console.log('ID reçu pour suppression:', req.params.id); // Ajout d'un log pour déboguer
  if (!req.params.id) {
    return res.status(400).send('Aucun identifiant fourni');
  }

  citation.deleteOne({ _id: req.params.id })
    .then(result => {
      if (result.deletedCount > 0) {
        // Après la suppression, récupérez toutes les citations restantes
        citation.find({})
          .then(allCitations => {
            console.log(allCitations);
            res.json({ message: 'Citation supprimée avec succès', citations: allCitations });
          });
      } else {
        res.status(404).send('Citation non trouvée');
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

router.get("/v1/quotes/:category", (req, res) => {
  fetch(`https://api.api-ninjas.com/v1/quotes?category=${req.params.category}`, {
    headers: {
      "X-Api-Key": process.env.VITE_APP_API_KEY
    }
  })
    .then(response => response.json())
    .then(apiData => {

      const newCita = new Citation({
        proverbe: apiData[0].quote,
        auteur: apiData[0].author,
        theme: apiData[0].category,
      });

      newCita.save().then(() => {
        res.json({ result: true, citation: newCita });
      });
    });
});





module.exports = router;
