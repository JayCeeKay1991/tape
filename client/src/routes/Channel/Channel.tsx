import { useState, useEffect } from "react";
import TestPlayer from "../../components/TestPlayer/TestPlayer";
import { CloudinaryRes, postMusicToCloudinary } from "../../services/CloudinaryService";
import { Channel as ChannelType }  from "../../types/Channel";
import { useLocation } from "react-router-dom";

interface LocationState {
  channel: ChannelType;
}

const Channel = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [cldResponse, setCldResponse] = useState<any>(null);

  const location = useLocation<LocationState>();
  const { channel } = location.state;



  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target;
    if (files) setFile(files[0]);
  };


  const uploadFile = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!file) {
      console.error("Please select a file.");
      return;
    }
    setUploading(true);
    const uniqueUploadId = `uqid-${Date.now()}`;
    const chunkSize = 5 * 1024 * 1024; // 5MB
    const totalChunks = Math.ceil(file.size / chunkSize);
    let currentChunk = 0;

    const onProgress = () => {
      currentChunk++;
      console.log(`Upload progress: Chunk ${currentChunk} of ${totalChunks}`);
      if (currentChunk < totalChunks) {
        const nextStart = currentChunk * chunkSize;
        const nextEnd = Math.min(nextStart + chunkSize, file.size);
        uploadNextChunk(nextStart, nextEnd);
      } else {
        setUploadComplete(true);
        setUploading(false);
        console.info("File upload complete.");
      }
    };

    const onError = (error: Error | string): void => {
      if (error instanceof Error) console.error("Error uploading chunk:", error.message);
      else if (typeof error === 'string') console.error("Error uploading chunk:", error);
      else console.error("Error uploading chunk: An unknown error occurred");
      setUploading(false);
    };

    const onComplete = (response:CloudinaryRes) => {
      setCldResponse(response);
      console.log("Upload complete response:", response);
    };

    const uploadNextChunk = (start:number, end:number) => {
      postMusicToCloudinary(file, uniqueUploadId, start, end, onProgress, onError, onComplete);
    };

    uploadNextChunk(0, Math.min(chunkSize, file.size));
  };


  return (
    <>
    <h1>{channel.name}</h1>
    <form>
      <h2>Add a mixtape! 📼</h2>
      <input name="file" type="file" onChange={changeHandler} ></input>
      <button onClick={uploadFile} disabled={uploading} >{uploading ? "Uploading..." : "Upload"}</button>
      </form>
      {uploadComplete && cldResponse && (
        <div>
          <span className="left">
            <p>Upload response:</p>
            <pre>{JSON.stringify(cldResponse, null, 2)}</pre>
          </span>
        </div>
      )}
      <TestPlayer/>
    </>
  )

}

export default Channel;