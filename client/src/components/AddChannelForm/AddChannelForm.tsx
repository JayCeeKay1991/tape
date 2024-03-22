import { Dispatch, useState, SetStateAction } from 'react';
import { ChannelType } from '@/types/Channel';
import { useMainContext } from '../Context/Context';
import { createChannel } from '@/services/ChannelClientService';
import { postImageToCloudinary } from '@/services/CloudinaryService';

type FormValues = Omit<ChannelType, '_id'>;
type propsType = {
  setShowForm: Dispatch<SetStateAction<boolean>>;
  setChannelList: Dispatch<SetStateAction<ChannelType[]>>;
};

export default function AddChannelForm({
  setChannelList,
  setShowForm,
}: propsType) {
  const { user, setUser } = useMainContext();

  const initialState = {
    name: '',
    picture: '',
    owner: user,
    members: [],
    mixTapes: [],
    comments: []
  };

  const [formValues, setFormValues] = useState<FormValues>(initialState);
  const [pictureFile, setPictureFile] = useState<File | null>(null);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === 'file' && files) {
      console.log('Click File');
      setPictureFile(files[0]); // Set the image file
    } else setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let pictureUrl = '';
    if (pictureFile) {
      try {
        pictureUrl = await postImageToCloudinary({
          file: pictureFile,
        });
      } catch (error) {
        console.error(error);
      }
    }

    const newChannelData: Omit<ChannelType, '_id'> = {
      ...formValues,
      picture: pictureUrl,
    };

    try {
      const newChannel = await createChannel(newChannelData);
      setUser(prev =>( {...prev, channels: [...prev.channels, newChannel]}))
      setFormValues(initialState);
      setShowForm(false);
      setPictureFile(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
    className='flex flex-col w-72 absolute right-32 top-60 border-tapeDarkGrey bg-tapeBlack border-[2px] rounded-[20px] w-[300px] h-[380px] p-[20px]'
    >
      <h1 className='text-2xl mb-5 text-center' >Create a new channel</h1>
      <label>Name</label>
      <input
        name='name'
        value={formValues.name}
        type='text'
        onChange={changeHandler}
        className='h-[30px] mt-[5px] mb-[20px] p-[20px] text-sm border-tapeDarkGrey bg-tapeBlack border-[2px] text-[25px] text-tapeWhite font-small outline-none'
        data-testid='input-channel-name'>
      </input>
      <label>Image</label>
      <input
        name='picture'
        value={formValues.picture}
        type='file'
        onChange={changeHandler}
        className='border-tapeDarkGrey bg-tapeBlack mt-[5px] mb-[20px]'
        >
        </input>
      <button
        onClick={handleSubmit}
        className='white-button self-center mt-3'
        data-testid='create-button'>
        Create
      </button>
    </form>
  );
}
