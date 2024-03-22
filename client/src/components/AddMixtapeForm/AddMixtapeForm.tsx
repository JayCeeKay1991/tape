import { useState, Dispatch, SetStateAction, useRef, MouseEvent } from 'react';
import {
  CloudinaryRes,
  postMusicToCloudinary,
} from '../../services/CloudinaryService';
import { createMixTape } from '../../services/MixtapeClientService';
import { ChannelType } from '../../types/Channel';
import { useMainContext } from '../Context/Context';
import { PiUploadSimple } from "react-icons/pi";

type AddMixtapeFormProps = {
  channelId: string;
  channel: ChannelType;
  setChannel: Dispatch<SetStateAction<ChannelType>>;
  setShowMixForm: Dispatch<SetStateAction<boolean>>;
};

// Form for add mixtape
type FormValuesMixTape = {
  name: string;
  file: File | null;
};
const initialStateFormValuesMixTape = {
  name: '',
  file: null,
};

const initCloudinaryResState = {
  public_id: '',
  version: 0,
  signature: '',
  width: 0,
  height: 0,
  format: '',
  resource_type: '',
  created_at: '',
  tags: [],
  bytes: 0,
  type: '',
  etag: '',
  placeholder: false,
  url: '',
  secure_url: '',
  duration: 0,
};

const AddMixtapeForm = ({
  channelId,
  channel,
  setChannel,
  setShowMixForm,
}: AddMixtapeFormProps) => {
  const { user } = useMainContext();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [cldResponse, setCldResponse] = useState<CloudinaryRes>(initCloudinaryResState);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formValuesMixTape, setFormValuesMixTape] = useState<FormValuesMixTape>(
    initialStateFormValuesMixTape
  );

  // Handle choose file click
  const handleChooseFilesClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  //Change handler function keeps track of the upload form
  const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;

    if (type === 'file' && files) {
      setFile(files[0]); // Set the file
      const response = await uploadFile()
    } else
      setFormValuesMixTape((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
  };

  // upload file to cloudinary
  const uploadFile = async (): Promise<CloudinaryRes | undefined> => {
    if (!file) {
      console.error('Please select a file.');
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
        console.info('File upload complete.');
      }
    };

    const onError = (error: Error | string): void => {
      if (error instanceof Error)
        console.error('Error uploading chunk:', error.message);
      else if (typeof error === 'string')
        console.error('Error uploading chunk:', error);
      else console.error('Error uploading chunk: An unknown error occurred');
      setUploading(false);
    };

    const onComplete = (response: CloudinaryRes) => {
      setCldResponse(response);
      console.log('Upload complete response:', response);
      setUploading(false);
      return response;
    };

    const uploadNextChunk = (start: number, end: number) => {
      postMusicToCloudinary(
        file,
        uniqueUploadId,
        start,
        end,
        onProgress,
        onError,
        onComplete
      );
    };
    uploadNextChunk(0, Math.min(chunkSize, file.size));
  };

  // add the image to database together with the other form values
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const addMixtape = async () => {
      try {
        if (cldResponse) {
          const fileUrl = cldResponse.secure_url;
          const duration = cldResponse.duration;
          const { name, file } = formValuesMixTape;
          const newMixtapeData = {
            name,
            url: fileUrl,
            duration: duration,
            channel: channelId,
            creator: user._id,
          };

          const newMixTape = await createMixTape(newMixtapeData);

          const updatedChannel = {
            ...channel,
            mixTapes: [...channel.mixTapes, newMixTape],
          };
          setChannel(updatedChannel);

          setFormValuesMixTape(initialStateFormValuesMixTape);
          setFile(null);
          setShowMixForm(false);
        } else throw new Error('No uploaded file to add.');
      } catch (error) {
        console.error(error);
      }
    };
    addMixtape();
  };

  return (
    <form
      className="inset-y-1/4 inset-x-1/3 z-50 text-tapeWhite flex flex-col w-72 gap-5 m-8 border-dashed border-tapeDarkGrey bg-tapeBlack border-[2px] rounded-[20px] w-[900px] h-[300px] p-[20px]"
      onSubmit={submitHandler}
    >
      <div className='flex flex-col items-center'>
        <PiUploadSimple size={120} className='text-tapeDarkGrey m-5' />
        <p>Or</p>
        <button type='button' className='rounded-full border-[2px] border-tapeDarkGrey w-[150px] p-[5px] m-8' onClick={handleChooseFilesClick}>Choose files</button>
      </div>
      <input name="file" type="file" onChange={changeHandler}
        className='hidden' ref={fileInputRef}>
      </input>
      {/* <h1 className='text-2xl text-center' >Add a mixtape</h1>
      <label>Name</label>
      <input
        name="name"
        type="text"
        value={formValuesMixTape.name}
        onChange={changeHandler}
        placeholder="mixtape title"
        className='h-[30px] p-[20px] text-sm border-tapeDarkGrey bg-tapeBlack border-[2px] text-[25px] text-tapeWhite font-small outline-none'
      ></input>
      <label>Image</label>
      <div className="flex flex-row gap-3">
        <input name="file" type="file" onChange={changeHandler}
        className='hidden' ref={fileInputRef}>
        </input>
        <button
          className="white-button h-[50px]"
          onClick={uploadFile}
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
      {uploading ? (
        <></>
      ) : (
        <button
          type="submit"
          disabled={uploading}
          className="white-button self-center">
        Add Mixtape
        </button>
      )} */}
    </form>
  );
};

export default AddMixtapeForm;
