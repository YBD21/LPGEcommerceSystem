import {Bucket} from "../../firebaseConfig.js";

const ImageUpload = async (requestedDataFile) => {
    let sendData = {}
    let createDate = new Date().toString();
    let file = Bucket.file(
        `Product_Images/${requestedDataFile.originalname}`
        );
  
    const stream = file.createWriteStream({
        metadata : {
            contentType : requestedDataFile.mimetype
        }
    });

   /* 
   creates a write stream for the file object with the contentType of the file's metadata set to the mimetype of the requestedDataFile object, allowing you to stream data to the file and set its type.
   */
 
    stream.on('error', (err) => {
        requestedDataFile.cloudStorageError = err;
        sendData = {...sendData, Error : err};
    });

   await new Promise ((resolve,reject) => {
    stream.on('finish', async () =>{
        requestedDataFile.cloudStorageObject = requestedDataFile.originalname
        try {
            // get the url
            const [url] = await file.getSignedUrl({
                action : 'read',
                expires: '03-01-2500'
            });
            // console.log(url);
            sendData = {...sendData, Link: url, ImageName : requestedDataFile.originalname, Created : createDate}
            resolve(sendData);
        } catch (err) {
            sendData = {...sendData, Error : err};
            reject (sendData);
        }
    });

    stream.end(requestedDataFile.buffer) // end or clear stream buffer
   });
  return sendData
};

export {ImageUpload};