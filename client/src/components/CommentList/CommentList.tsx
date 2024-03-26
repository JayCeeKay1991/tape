import { useState, useEffect } from "react";
import Comment from "../Comment/Comment";
import { ChannelType } from "../../types/Channel";
import { CommentsType } from "@/types/Comments";
import { addComment } from "../../services/ChannelClientService";
import { FiSend } from "react-icons/fi";
import { useMainContext } from "../Context/Context";

type propsType = {
  channel: ChannelType;
};

function CommentList({ channel }: propsType) {
  const { user } = useMainContext();
  const [formValue, setFormValue] = useState<string>("");
  const [comments, setComments] = useState<CommentsType[]>(channel.comments);

  // Set and sort comments
  useEffect(() => {
     const sortedComments = [...channel.comments].sort((a, b) =>
       b.date?.toString()?.localeCompare(a.date?.toString())
     );
     setComments(sortedComments);
  }, [channel]);

  // Handle comments form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue(e.target.value);
  };

  // Handle submission of form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const owner = user;
    const date = new Date();
    const message = formValue;
    const newComment = { owner, message, date };
    await addComment(channel._id, newComment);
    setComments([...comments, { ...newComment, owner: user }]);
    setFormValue("");
  };

  //Sort comments based on select value
  const sortComments = (e: React.FormEvent<HTMLSelectElement>) => {
    const selectVal = (e.target as HTMLSelectElement).value;
    const sortedComments = [...comments].sort((a, b) => {
      const dateA = a.date.toString();
      const dateB = b.date.toString();
      if (selectVal === "latest") {
        return dateB.localeCompare(dateA);
      } else {
        return dateA.localeCompare(dateB);
      }
    });
    setComments(sortedComments);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <form onSubmit={handleSubmit} className="w-full mb-[50px]">
        <label className="">Comment</label>
        <input
          value={formValue}
          onChange={handleChange}
          className="bg-tapeOffBlack w-full h-[50px] align-top mb-[10px] leading-[0px] pl-[20px] text-tapeWhite border-[1px] border-tapeDarkGrey text-[20px] font-medium outline-none placeholder-tapeDarkGrey rounded-[10px]"
        ></input>
        <button
          type="submit"
          className="w-full h-[50px] border-none text-tapeBlack text-[20px] text-semibold rounded-[60px] bg-tapeWhite"
        >
          send
          {/* <FiSend className="text-tapeDarkGrey" size={25} /> */}
        </button>
      </form>

      {comments.length > 0 ? (
        <div id="comments list" className="flex flex-col items-center">
          <div className="w-full flex flex-row">
            <div className="w-full mb-[20px]">
              <p className="text-tapeDarkGrey text-[20px] font-medium">
                {comments.length} Comments
              </p>
            </div>

            <form className="w-[150px]">
              <select
                id="underline_select"
                className=" w-full block px-0 text-[20px] text-tapeDarkGrey font-medium bg-tapeOffBlack border-0 border-b-[1px] border-tapeDarkGrey appearance-none dark:text-tapeDarkGrey dark:border-tapeGrey focus:outline-none focus:ring-0 focus:border-tapeGrey peer"
                defaultValue="latest"
                onChange={sortComments}
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
              </select>
            </form>
          </div>

          {comments.map((comment, index) => (
            <Comment key={index} comment={comment} />
          ))}
        </div>
      ) : (
        <p className="text-[40px] text-tapeDarkGrey">No comments yet</p>
      )}
    </div>
  );
}

export default CommentList;
