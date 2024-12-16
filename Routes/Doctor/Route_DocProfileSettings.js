const express = require("express");
const router = express.Router();

const db = require("../../database/database");

router.get("/doctor/profile/:userID", async (req, res) => {
  try {
    
    const userID = req.params.userID;

    const currentDoctor = await db
          .DbConn()
          .collection("doctors")
          .find({ userID: userID })
          .toArray();
    
        if (currentDoctor.length === 0) throw new Error("cannot find User");

    res.render("Doctor/docProfileSettings", { currentDoctor: currentDoctor });
  } catch (error) {
    res.status(500).send(`<h1>Server Error</h1><p>${error.message}</p>`);
  }
});

module.exports = router;
