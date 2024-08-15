var cloudinary = require('cloudinary').v2;



cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET, 
    secure: true
  });


 async function uploadFileImgCloudinary(fileImage){

    console.log('imagen',fileImage)
   

  return  await cloudinary.uploader.upload(fileImage,{
    folder: 'imghatsapp',
    width: 2000, height: 2000, crop: 'limit', tags: "mobile_upload",

  });
}

async function uploadFileVideoCloudinary(fileImage){

  console.log('video',fileImage)
 
    return  await cloudinary.uploader.upload(fileImage,{
      resource_type: "video",
      folder: 'imghatsapp',
      eager: [
        { width: 300, height: 300, crop: "pad", audio_codec: "none" }, 
        { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" } ],                                   
      eager_async: true,
    });
}



async function deleteImagenCloudinary(publicId){
  return await cloudinary.uploader.destroy(publicId)

}

module.exports = { 
  uploadFileImgCloudinary,
  deleteImagenCloudinary, 
  uploadFileVideoCloudinary 

};