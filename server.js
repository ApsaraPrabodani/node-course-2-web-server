const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();
//follwing line shulb be called before set view engine
hbs.registerPartials(__dirname+'/views/partials');
app.set('view_engine', 'hbs');

//middleware
app.use(express.static( __dirname+'/public'));

//middleware
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now} : ${req.method} ${req.url}`;
	fs.appendFile('server.log', log +`\n`, (err) => {
		if (err) {
			console.log('Unsble to write file');
		}
	});
	console.log(log)

	next();
});

//restrct serving pages
// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('scremIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	// res.send('<h1>Hi Express !</h1>');
	// res.send({
	// 	name : 'Apsara',
	// 	likes : [
	// 		'food',
	// 		'books',
	// 		'trip'
	// 	]
	// });
	res.render('home.hbs', {
		pageTitle : 'Home page',
		message : 'Welcome to the home page'
	});
});

app.get('/about', (req, res) => {
	//res.send('About page')
	res.render('about.hbs', {
		pageTitle : 'About page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		message : 'Unable to fulfill the reqeust'
	})
});

app.get('/project', (req, res) => {
	res.render('home.hbs', {
		pageTitle : 'Project page',
		message : 'Welcome to the project page'
	});
});

//app.listen(3000);
app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});