import { useState, Dispatch, SetStateAction, useRef, MouseEvent } from 'react';
import { CloudinaryRes, postMusicToCloudinary } from '../../services/CloudinaryService';
import { createMixTape } from '../../services/MixtapeClientService';
import { useMainContext } from '../Context/Context';
import { ChannelType } from '../../types/Channel';
import { useDropzone } from 'react-dropzone';
import { PiUploadSimple } from "react-icons/pi";

type AddMixtapeFormProps = {
  channelId: string;
  channel: ChannelType;
  setChannel: Dispatch<SetStateAction<ChannelType>>;
  setShowMixForm: Dispatch<SetStateAction<boolean>>;
};

const AddMixtapeForm = ({ channelId, channel, setChannel, setShowMixForm, }: AddMixtapeFormProps) => {
  const { user } = useMainContext();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { getRootProps } = useDropzone({
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        console.log(`File "${acceptedFiles[0].name}" dropped.`);
        try {
          await uploadMixTapeCloudinary(acceptedFiles[0], acceptedFiles[0].name);
        } catch (error) {
          console.error("Error uploading mixtape:", error);
        }
      }
    },
  });

  // Handle choose file click
  const handleChooseFilesClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  // Change handler for file selection
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        await uploadMixTapeCloudinary(e.target.files[0], e.target.files[0].name)
      } catch (error) {
        console.error("Error uploading mixtape:", error);
      }
    }
  };

  // upload mixtape to Cloudinary
  const uploadMixTapeCloudinary = async (file: File, name: string) => {
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
      console.log('Upload complete response:', response);
      setUploading(false);
      return addMixtape(response, name)
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

  // add mixtape to db
  const addMixtape = async (response: CloudinaryRes, name: string) => {
    try {
      const newMixtapeData = {
        name,
        url: response.secure_url,
        duration: response.duration,
        channel: channelId,
        creator: user._id,
      };
      const newMixTape = await createMixTape(newMixtapeData);
      console.log(`newmixtape : ${newMixTape.name}`)
      const updatedChannel = {
        ...channel,
        mixTapes: [...channel.mixTapes, newMixTape],
      };
      setChannel(updatedChannel);
      setShowMixForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="inset-y-1/4 inset-x-1/3 z-50 text-tapeWhite flex flex-col w-72 gap-5 m-8 border-dashed border-tapeDarkGrey bg-tapeBlack border-[2px] rounded-[20px] w-[900px] h-[300px] p-[20px]"
    >
      <div {...getRootProps()} className='flex flex-col items-center' >
        <div>
          <div>
            <PiUploadSimple size={120} className='text-tapeDarkGrey m-5' />
          </div>
        </div>
        <p>Or</p>
        <button type='button' className='rounded-full border-[2px] border-tapeDarkGrey w-[150px] p-[5px] m-8' onClick={handleChooseFilesClick} disabled={uploading}>Choose files</button>
      </div>
      <input name="file" type="file" onChange={handleFileSelect} className='hidden' ref={fileInputRef} disabled={uploading}></input>
    </form>
  );

};
export default AddMixtapeForm;