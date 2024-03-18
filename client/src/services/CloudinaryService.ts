const cloudinaryCloudname = import.meta.env.VITE_CLOUDINARY_CLOUDNAME;
const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudinaryCloudname}/image/upload`;


// post the image of a channel or user to cloudinary
export async function postImageToCloudinary(body: {
  file: File;
  upload_preset: string;
  }


): Promise<string> {

  const formData = new FormData();
  formData.append('file', body.file);
  formData.append('upload_preset', body.upload_preset);

  try {
    const response = await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error('secure_url not found in response.');
    }
  } catch (error) {
    console.log(error);
    throw new Error('Error uploading the image.');
  }
}