const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
	.connect('mongodb://mongo:27017/docker-node', { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.error(err));

const Item = require('./models/Item');

app.get('/', (req, res) => {
	Item.find()
		.then(items => res.render('index', { items }))
		.catch(err => res.status(404).json({ msg: 'No items found' }));
});

app.post('/items/add', (req, res) => {
	const newItem = new Item({ name: req.body.name });
	newItem.save().then(item => res.redirect('/'));
});

const PORT = 3000;

app.listen(PORT, () => console.log('Server running...'));
