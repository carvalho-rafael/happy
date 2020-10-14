import express from 'express';

const app = express();

app.get('/users', (req, res) => {
    return res.send({'message': 'happy'})
})

app.listen(3333);