const cloudinaryCloudname = import.meta.env.VITE_CLOUDINARY_CLOUDNAME;
const cloudinaryPreset = import.meta.env.VITE_CLOUDINARY_PRESET;
const cloudinaryUrlImage = `https://api.cloudinary.com/v1_1/${cloudinaryCloudname}/image/upload`;
const cloudinaryUrlMusic = `https://api.cloudinary.com/v1_1/${cloudinaryCloudname}/auto/upload`;


export type CloudinaryRes = {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  duration: number;
}

// post the image of a channel or user to cloudinary
export async function postImageToCloudinary(body: {
  file: File;
  }
): Promise<string> {

  const formData = new FormData();
  formData.append('file', body.file);
  formData.append('upload_preset', cloudinaryPreset);

  try {
    const response = await fetch(cloudinaryUrlImage, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.secure_url) {
      console.log('🚀', data );
      return data.secure_url;
    } else {
      throw new Error('secure_url not found in response.');
    }
  } catch (error) {
    console.log(error);
    throw new Error('Error uploading the image.');
  }
}

// post mixtape to cloudinary
export async function postMusicToCloudinary(
  file:File,
  uniqueUploadId: string,
  start: number,
  end: number,
  onProgress: () => void,
  onError: (error:Error) => void,
  onComplete: (response:CloudinaryRes) => void
): Promise<void> {

  const formData = new FormData();
  formData.append("file", file.slice(start, end));
  formData.append("upload_preset", cloudinaryPreset);

  const contentRange = `bytes ${start}-${end - 1}/${file.size}`;
  try {
    const response = await fetch(cloudinaryUrlMusic, {
      method: "POST",
      body: formData,
      headers: {
        "X-Unique-Upload-Id": uniqueUploadId,
        "Content-Range": contentRange
      },
    });
    if (!response.ok) {
      throw new Error("Chunk upload failed.");
    }

    const data:CloudinaryRes = await response.json();

    if (end < file.size) onProgress();
    else onComplete(data);
  } catch (error) {
    if (error instanceof Error) {
      onError(error);
    } else {
      onError(new Error('An unknown error occurred during the upload.'));
    }
  }
}