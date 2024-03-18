const cloudinaryCloudname = import.meta.env.VITE_CLOUDINARY_CLOUDNAME;
const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudinaryCloudname}/image/upload`;

// post the image of a channel or user to cloudinary
export async function postImageToCloudinary(body: {
  file: File;
  upload_preset: string;
}): Promise<string> {
  try {
    const response = await fetch(cloudinaryUrl, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error("Error uploading the image.");
  }
}