import {Bucket} from "../firebaseConfig.js";

const FileUpload = async (requestedData) => {
    let sendData = {}

    let file = Bucket.file(
        `Product_Images/${requestedData.file.originalname}`
        );
    const fileExists = await file.exists();
    if (fileExists[0]) {
        // console.log("exist");
        sendData = {...sendData, Error : `File ${requestedData.file.originalname} already exists`};
       return sendData;
    }

    const stream = file.createWriteStream({
        metadata : {
            contentType : requestedData.file.mimetype
        }
    });
 
    stream.on('error', (err) => {
        requestedData.file.cloudStorageError = err;
        sendData = {...sendData, Error : err};
    });

   await new Promise ((resolve,reject) => {
    stream.on('finish', async () =>{
        requestedData.file.cloudStorageObject = requestedData.file.originalname
        try {
            // get the url
            const [url] = await file.getSignedUrl({
                action : 'read',
                expires: '03-01-2500'
            });
            // console.log(url);
            sendData = {...sendData, Link: url, ImageName : requestedData.file.originalname}
            resolve(sendData);
        } catch (err) {
            sendData = {...sendData, Error : err};
            reject (sendData);
        }
    });

    stream.end(requestedData.file.buffer)
   });
  return sendData
};

export {FileUpload}