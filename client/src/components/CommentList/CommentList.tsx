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
      setComments(()=> channel.comments)
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
   const updatedChannel =  await addComment(channel._id, comment);
  };

  return (
    <div className="bg-tapeDarkGrey w-[300px] h-[400px]">
      <form onSubmit={handleSubmit}>
        <input value={formValue} onChange={handleChange}></input>
        <button type="submit" className="bg-tapePink">submit</button>
      </form>
      <div>
        {comments.map((comment) => (
          <p>{comment.message}</p>
        ))}
      </div>
    </div>
  );
}

export default CommentList;