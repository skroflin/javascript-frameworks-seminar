import express from "express";
import http from 'http';

const app = express()
const server = http.createServer(app)


app.get('/health', (req, res) => {
  res.sendStatus(200)
})


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((_req, res, next) => {
  console.log('Response headers:', res.getHeaders());
  next();
});


app.use('/api/to-do', require('./to-do/routes'))


const PORT = process.env.PORT || 3003;


server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
