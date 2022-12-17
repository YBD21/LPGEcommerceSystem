// require('dotenv').config()
const secretKey = process.env.REACT_APP_SECRET_KEY;
const userName = process.env.REACT_APP_USER_NAME;
const Password = process.env.REACT_APP_PASSWORD;
const userData = process.env.REACT_APP_USER_DATA ;
export const hashKey = {
  secretKey, userName, Password, userData
}