const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app
  .route("/bfhl")
  .get((req, res) => {
    res.status(200).json({ operation_code: 1 });
  })
  .post((req, res) => {
    try {
      const data = req.body.data || [];
      const numbers = [];
      const alphabets = [];
      let highest_lowercase_alphabet = "";

      for (const item of data) {
        if (!isNaN(item)) {
          numbers.push(item);
        } else if (item.length === 1 && isNaN(item)) {
          alphabets.push(item);
          if (
            !highest_lowercase_alphabet ||
            (item === item.toLowerCase() && item > highest_lowercase_alphabet)
          ) {
            highest_lowercase_alphabet = item;
          }
        }
      }

      res.json({
        is_success: true,
        user_id: "azim_rizan_15032003",
        email: "azim.21bce8448@vitapstudent.ac.in",
        roll_number: "21BCE8448",
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highest_lowercase_alphabet ? [highest_lowercase_alphabet] : [],
      });
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ is_success: false, message: "Internal Server Error" });
    }
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
