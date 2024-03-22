import { Dispatch, useState, SetStateAction } from 'react';
import { ChannelType } from '@/types/Channel';
import { useMainContext } from '../Context/Context';
import { createChannel } from '@/services/ChannelClientService';
import { postImageToCloudinary } from '@/services/CloudinaryService';

type FormValues = Omit<ChannelType, '_id'>;

type FormValuesAddChannel = {
  name: string;
  // file: File | null;
  picture: string;
};

const initialStateFormValuesAddChannel = {
  name: '',
  // file: null,
  picture: '',
};

type ChannelData = Omit<ChannelType, '_id'>;

type propsType = {
  setShowForm: Dispatch<SetStateAction<boolean>>;
  setChannelList: Dispatch<SetStateAction<ChannelType[]>>;
};

export default function AddChannelForm({
  setChannelList,
  setShowForm,
}: propsType) {
  const { user } = useMainContext();

  const initialState = {
    name: '',
    picture: '',
    owner: user,
    members: [],
    mixTapes: [],
    comments: [],
  };

  const [formValues, setFormValues] = useState<FormValues>(initialState);
  const [pictureFile, setPictureFile] = useState<File | null>(null);
  const [FormValuesAddChannel, setFormValuesAddChannel] =
    useState<FormValuesAddChannel>(initialStateFormValuesAddChannel);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === 'file' && files) {
      setPictureFile(files[0]); // Set the image file
      // } else setFormValues({ ...formValues, [name]: value });
    } else setFormValuesAddChannel({ ...FormValuesAddChannel, [name]: value });
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

    console.log(FormValuesAddChannel);

    // const newChannelData: Omit<ChannelType, '_id'> = {
    //   ...formValues,
    //   picture: pictureUrl,
    //   //member:1, as the owner or user herself
    //   members: [user],
    // };

    const newChannelData: ChannelData = {
      // ...formValues,
      ...FormValuesAddChannel,
      owner: user,
      picture: pictureUrl,
      members: [user],
      mixTapes: [],
      comments: [],
    };

    console.log(newChannelData);

    try {
      const newChannel = await createChannel(newChannelData);
      console.log(newChannel);
      setChannelList((prevList: ChannelType[]) => [...prevList, newChannel]);
      // setFormValues(initialState);
      setFormValuesAddChannel(initialStateFormValuesAddChannel);
      setShowForm(false);
      setPictureFile(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="flex flex-col w-72 absolute right-32 top-60">
      <h1>Create a new channel</h1>
      <input
        name="name"
        value={FormValuesAddChannel.name}
        type="text"
        onChange={changeHandler}
        placeholder="name"
        data-testid="input-channel-name"
      ></input>
      <input
        name="picture"
        value={FormValuesAddChannel.picture}
        type="file"
        onChange={changeHandler}
      ></input>
      <button
        onClick={handleSubmit}
        className="white-button"
        data-testid="create-button"
      >
        Create
      </button>
    </form>
  );
}
