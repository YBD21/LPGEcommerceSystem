const express = require('express');
const cors = require('cors');

const app = express()

const port = 5000

/*
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11)
}
*/

//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: false }));



// req = request & res = respond
app.post('/login',(req, res) => {
  // console.log(req.body);
  let Data = req.body;
  
  console.log(Data.PhoneNumber);
  console.log(Data.Password);
  if (Data.PhoneNumber === '9779860694050' && Data.Password === '123456'){
    res.json({Message : true})
  }
  else
  {
    res.json({Message : false});
  }

  
  
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})