import { useState, useEffect } from "react";
import Comment from "../Comment/Comment";
import { ChannelType } from "../../types/Channel";
import { CommentsType } from "../../types/Comments";
import { addComment } from "../../services/ChannelClientService";

type propsType = {
  channel: ChannelType;
};

function CommentList({ channel }: propsType) {

  const [comments, setComments] = useState<CommentsType[]>([]);
  const [formValue, setFormValue] = useState("");

  useEffect(() => {
    setComments(channel.comments)
  },[channel.comments])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const owner = channel.owner;
    const date = new Date();
    const message = formValue;
    const comment = { owner, message, date };
    await addComment(channel._id, comment);
    setFormValue("")
    setComments((comments) => [...comments, comment])
  };

  // const change

  return (
    <div className="h-[400px] pl-[50px]">
      <div id="comments-top" className="w-full flex mb-[20px]">
        <form onSubmit={handleSubmit} className="">
          <input
            value={formValue}
            onChange={handleChange}
            placeholder="Leave a comment"
            className="border-tapeDarkGrey bg-tapeBlack rounded-full pl-[20px] w-[400px] h-[40px] mr-[10px] text-tapeWhite  text-[20px] font-medium outline-none"
          ></input>
          <button
            type="submit"
            className="bg-tapeWhite border-none text-tapeBlack w-[100px] h-[40px] text-[20px] text-semibold rounded-[20px]"
          >
            submit
          </button>
        </form>

        <form className="w-[200px] mx-auto">
          <select
            id="underline_select"
            className="block  px-0 w-full text-[20px] text-tapeDarkGrey bg-tapeBlack border-0 border-b-2 border-tapeDarkGrey appearance-none dark:text-tapeDarkGrey dark:border-tapeGrey focus:outline-none focus:ring-0 focus:border-tapeGrey peer"
          >
            <option selected value="Latest">
              Latest
            </option>
            <option value="oldest">Oldest</option>
          </select>
        </form>
      </div>

      <div>
        {comments.map((comment) => (
          <Comment comment={comment} />
        ))}
      </div>
    </div>
  );
}

export default CommentList;