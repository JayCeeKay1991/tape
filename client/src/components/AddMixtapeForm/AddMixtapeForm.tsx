import { useState, Dispatch, SetStateAction } from 'react'
import { User } from '../../types/User'
import { CloudinaryRes, postMusicToCloudinary } from "../../services/CloudinaryService";
import { createMixTape } from "../../services/MixtapeClientService";
import { ChannelType } from '../../types/Channel';
import { MixTape } from "../../types/Mixtape";


interface AddMixtapeFormProps {
    channel: ChannelType
    setChannel: Dispatch<SetStateAction<ChannelType>>
    user: User
}

type FormValues = Omit<MixTape, '_id'>;


const AddMixtapeForm = ({ channel, user, setChannel }: AddMixtapeFormProps) => {

    const initialState = {
        name: '',
        url: '',
        duration: 0,
        creator: user,
        parentChannel: channel,
        channels: [],
        users: [],
    };


    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);
    const [cldResponse, setCldResponse] = useState<any>(null);
    const [formValues, setFormValues] = useState<FormValues>(initialState);


    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, files } = e.target;
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

        const onComplete = (response: CloudinaryRes) => {
            setCldResponse(response);
            console.log("Upload complete response:", response);
            setUploading(false);
        };

        const uploadNextChunk = (start: number, end: number) => {
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
                        url: fileUrl,
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
                setShowMixForm(false);
            } catch (error) {
                console.error(error)
            }
        };
        addMixtape();
    }

    return (
        <form className="text-tapeWhite flex flex-col w-72 gap-2" >
            <input name="name" type="text" onChange={changeHandler} placeholder="mixtape name"></input>
            <div className="flex" >
                <input name="file" type="file" onChange={changeHandler} ></input>
                <button className="white-button" onClick={uploadFile} disabled={uploading} >{uploading ? "Uploading..." : "Upload"}</button>
            </div>
            {
                uploading ? <></> : <button className="white-button" onClick={submitHandler} >Add Mixtape</button>
            }
        </form>
    )

};

export default AddMixtapeForm