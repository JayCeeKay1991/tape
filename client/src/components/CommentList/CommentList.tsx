import { useState, useEffect } from "react";
import Comment from "../Comment/Comment";
import { ChannelType } from "../../types/Channel";
import { addComment } from "../../services/ChannelClientService";
import { FiSend } from "react-icons/fi";

type propsType = {
  channel: ChannelType;
  setChannel: (updatedChannel:ChannelType) => void;
};

function CommentList({ channel, setChannel }: propsType) {
  const [formValue, setFormValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormValue(e.target.value);
};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const owner = channel.owner;
    const date = new Date();
    const message = formValue;
    const comment = { owner, message, date };
    const updatedChannel =  await addComment(channel._id, comment);
    setChannel(updatedChannel)
    setFormValue("");
};

  return (
    <div className="flex flex-col items-center w-full">
      <div
        id="comments-top"
        className="w-full flex flex-row justify-between items-end mb-[80px] pr-[60px] pl-[50px]"
      >
        <div className="w-[400px]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-row justify-between items-center"
          >
            <input
              value={formValue}
              onChange={handleChange}
              placeholder="Leave a comment"
              className="border-tapeDarkGrey bg-tapeBlack h-[60px] mr-[10px] text-tapeWhite border-none text-[20px] font-medium outline-none border-b-4"
            ></input>
            <button
              type="submit"
              className=" border-none text-tapeBlack text-[20px] text-semibold rounded-[20px]"
            >
              <FiSend className="text-tapeDarkGrey" size={25} />
            </button>
          </form>
          <hr className="border-tapeDarkGrey"></hr>
        </div>

        <form className="w-[200px]">
          <select
            id="underline_select"
            className="block px-0 w-full text-[20px] text-tapeDarkGrey bg-tapeBlack border-0 border-b-2 border-tapeDarkGrey appearance-none dark:text-tapeDarkGrey dark:border-tapeGrey focus:outline-none focus:ring-0 focus:border-tapeGrey peer"
            defaultValue="latest" // You can specify "latest" or "oldest" here
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </form>
      </div>

    {channel.comments.length > 0 ? (
        <div id="comments list" className="flex flex-col items-center">
          {channel.comments.map((comment, index) => (
            <Comment key={index} comment={comment} />
          ))}
        </div>
          ):(
        <p className="text-[40px] text-tapeDarkGrey">No comments yet</p>
      )}

    </div>
  );
}

export default CommentList;