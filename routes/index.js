var express = require("express");
var router = express.Router();
const citation = require("../models/citations");

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


// supprimer une citation par son id
router.delete('/citations/:id', async (req, res) => {
  try {
    const result = await citation.deleteOne({ _id: req.params.id });
    if (result.deletedCount > 0) {
      // Après la suppression, récupérez toutes les citations restantes
      const allCitations = await citation.find({});
      console.log(allCitations);
      res.json({ message: 'Citation supprimée avec succès', citations: allCitations });
    } else {
      res.status(404).send('Citation non trouvée');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
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
