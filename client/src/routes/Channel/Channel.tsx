import { useState } from "react";
import TestPlayer from "../../components/TestPlayer/TestPlayer";
import { CloudinaryRes, postMusicToCloudinary } from "../../services/CloudinaryService";
import { useLocation } from "react-router-dom";
import { createMixTape } from "../../services/MixtapeClientService";
import { useMainContext } from "../../components/Context/Context";
import { MixTape
 } from "../../types/MixTape";
import { MdPlayArrow } from "react-icons/md";

type FormValues = Omit<MixTape, '_id'>;

const Channel = () => {
  const { user } = useMainContext();
  const location = useLocation();
  const [channel, setChannel] = useState(location.state.channel);

  const initialState = {
    name: '',
    url: '',
    duration: 0,
    creator: user,
    parentChannel: channel,
    channels: []
  };

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [cldResponse, setCldResponse] = useState<any>(null);
  const [formValues, setFormValues] = useState<FormValues>(initialState);


  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value, type, files} = e.target;
    if (type === 'file' && files) {
      setFile(files[0]); // Set the image file
    } else setFormValues({ ...formValues, [name]: value });
  };


  // upload file to cloudinary
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
      setUploading(false);
    };

    const uploadNextChunk = (start:number, end:number) => {
      postMusicToCloudinary(file, uniqueUploadId, start, end, onProgress, onError, onComplete);
    };

    uploadNextChunk(0, Math.min(chunkSize, file.size));
  };


  // add the image to database together with the other form values
  const submitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const addMixtape = async () => {
      try {
        if (cldResponse) {
          const fileUrl = cldResponse.secure_url;
          const duration = cldResponse.duration;
          const newMixtapeData = {
            ...formValues,
            url:fileUrl,
            duration: duration,
            parentChannel: channel
          };
          const newMixTape = await createMixTape(newMixtapeData);
          setChannel({
            ...channel,
            mixTapes: [
              ...channel.mixTapes,
              newMixTape
            ]
          })
      } else throw new Error('No uploaded file to add.');
      setFormValues(initialState);
      setFile(null);
      } catch (error) {
        console.error(error)
      }
    };
    addMixtape();
  }


  return (
    <>
    <div id="channel-element" className="text-tapeWhite h-72 bg-gradient-to-r from-tapePink tapeYellow flex justify-between p-10 w-11/12 m-12 rounded-2xl" >
      <div id="channel-info" >
        <h1 className="flex items-center" ><MdPlayArrow size={35}/>{channel.name}</h1>
        <p>{`${channel.mixtapes ? channel.mixtapes.length : 0} mixtapes`}</p>
      </div>
      <img src={channel.picture} className="w-48 rounded-2xl" />
    </div>
    <form className="text-tapeWhite flex flex-col w-72 gap-2" >
      <h2>Add a mixtape</h2>
      <input name="name" type="text" onChange={changeHandler} placeholder="mixtape name"></input>
      <div className="flex" >
      <input name="file" type="file" onChange={changeHandler} ></input>
      <button className="white-button" onClick={uploadFile} disabled={uploading} >{uploading ? "Uploading..." : "Upload"}</button>
      </div>
      {
        !uploading ? <button className="white-button" onClick={submitHandler} >Add Mixtape</button> : <></>
      }
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