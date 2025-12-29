import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const uploadOnCloudinary = async(file:Blob):Promise<string|null> => {
   if(!file){
    return null
   }
   try {
  
   const buffer = Buffer.from(await file.arrayBuffer());

    return new Promise((resolve,reject)=>{
        const uploadStream = cloudinary.uploader.upload_stream(
            {resource_type:"auto",
             folder: "uploads",
             eager:[
                { width: 400, crop: "scale", quality: "auto", fetch_format: "auto" },
             ],
             eager_async:false
            },
            (error,uploadResult)=>{
                if(error){
                    reject(error)
                }else{
                    resolve(uploadResult?.eager[0]?.secure_url ?? null)
                }
            }
        )
        uploadStream.end(buffer)
    })

   } catch (error) {
     console.log(error);
     return null
   }
}

export default uploadOnCloudinary