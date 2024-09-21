const express = require('express');
const app = express();
app.use(express.json());
const port = 8000;

let transactionsMap = new Map();
let totalPoints = 0;

// /add POST Endpoint
app.post("/add", (req, res) => {
    const { payer, points, timestamp } = req.body;

    // Check required fields
    if (!payer || typeof points !== 'number' || !timestamp) {
        return res.status(400).send("Missing or invalid fields: Payer, Points (must be number), Timestamp");
    }

    // Check if transaction is already stored
    if (transactionsMap.has(timestamp)) {
        const existingTransaction = transactionsMap.get(timestamp);
        if (existingTransaction.payer === payer && existingTransaction.points === points) {
            return res.status(409).send("Transaction already exists");
        }
    }

    // Store transaction
    transactionsMap.set(timestamp, { payer, points });
    totalPoints += points;
    res.sendStatus(200);
});

// /spend POST Endpoint
app.post("/spend", (req, res) => {
    let { points } = req.body;

    // Check request body validity
    if(typeof points !== 'number' || points <= 0) {
        return res.status(400).send("Points must be postive number");
    }

    // Check if the user has enough points
    if (points > totalPoints) {
        return res.status(400).send("User doesn't have enough points");
    }

    const sortedTransactions = Array.from(transactionsMap.entries()).sort((a, b) => new Date(a[0]) - new Date(b[0]));
    const spentPoints = [];

    // Calculate oldest points to be spent for payers
    for (const [timestamp, { payer, points: availablePoints }] of sortedTransactions) {
        // See how many points can be spent on this transaction
        const pointsSpentFromPayer = Math.min(availablePoints, points);

        // Adjust balances and remaining points to spend, and add payer and points to result array
        transactionsMap.set(timestamp, { payer, points: availablePoints - pointsSpentFromPayer });
        points -= pointsSpentFromPayer;
        totalPoints -= pointsSpentFromPayer;
        spentPoints.push({ payer, points: -pointsSpentFromPayer });

        // Early return if no points remaining
        if (points === 0) {
            break;
        }
    }

    res.status(200).json(spentPoints);
});

// /balance GET Endpoint
app.get("/balance", (req, res) => {
    const balancePayers = {};

    // Calculate the total points for each payer
    for (const { payer, points } of transactionsMap.values()) {
        if (!balancePayers[payer]) {
            balancePayers[payer] = 0;
        }

        balancePayers[payer] += points;  // Sum points for each payer
    }

    if (Object.keys(balancePayers).length === 0) {
        return res.status(200).send("No points available");
    }

    res.status(200).json(balancePayers);
});

// REST API Startup
app.listen(port, () => {
    console.log("Running on port 8000");
});