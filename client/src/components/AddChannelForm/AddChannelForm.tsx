import { Dispatch, useState, SetStateAction } from "react";
import { Channel } from "../../types/Channel";
import { useMainContext } from "../Context/Context";
import { createChannel } from "../../services/ChannelClientService";
import { postImageToCloudinary } from "../../services/CloudinaryService";

type FormValues = Omit<Channel, '_id'>;
type propsType = {
  setShowForm: Dispatch<SetStateAction<boolean>>;
  setChannelList: Dispatch<SetStateAction<Channel[]>>;
};

const AddChannelForm = ({setChannelList, setShowForm}:propsType) => {
  const { user } = useMainContext();

  const initialState = {
  name: '',
  picture: '',
  owner: user,
  members: [],
  mixTapes: []
};

  const [formValues, setFormValues] = useState<FormValues>(initialState);
  const [pictureFile, setPictureFile] = useState<File | null>(null);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === 'file' && files) {
      setPictureFile(files[0]); // Set the image file
    } else setFormValues({ ...formValues, [name]: value });
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let pictureUrl = '';
    if (pictureFile) {
      try {
        pictureUrl = await postImageToCloudinary({
          file: pictureFile
        });
      } catch (error) {
        console.error(error);
      }
    }

    const newChannelData: Omit<Channel, '_id'> = {
      ...formValues,
      picture: pictureUrl
    };

    try {
      const newChannel = await createChannel(newChannelData);
      setChannelList((prevList:Channel[]) => [...prevList, newChannel]);
      setFormValues(initialState);
      setShowForm(false);
      setPictureFile(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className="flex flex-col w-72 absolute right-32 top-60" >
      <h1>Create a new channel</h1>
      <input name="name" value={formValues.name} type="text" onChange={changeHandler} placeholder="name" data-testid="input-channel-name" ></input>
      <input name="picture" value={formValues.picture} type="file" onChange={changeHandler}></input>
      <button onClick={handleSubmit} className="white-button" >Create</button>
    </form>
  )


}

export default AddChannelForm;