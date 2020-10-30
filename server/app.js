const express = require('express');
const cors = require("cors");

const search = require('./search.js')

const app = express();
const port = process.env.port || 9000;
app.set('port', port);

app.use(cors());

app.get('/search', async (req, res) => {
    const q = req.query.q;
    const r = await search.search(q);
    res.send(r.data.items);
});


app.listen(port, () => console.log(`Listening on port ${port}`));
