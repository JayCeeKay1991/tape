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
    setComments(channel.comments);
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
    <div className="flex flex-col items-center w-full ">
      <div
        id="comments-top"
        className="w-full flex flex-col justify-between  mb-[80px] pr-[60px] pl-[50px]"
      >
        <div className="w-[100px]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-row justify-between items-center"
          >
            <input
              value={formValue}
              onChange={handleChange}
              placeholder="Leave a comment"
              className="bg-tapeBlack h-[60px] mr-[10px] text-tapeWhite border-none text-[20px] font-medium outline-none border-b-4 placeholder-tapeDarkGrey"
            ></input>
            <button
              type="submit"
              className=" border-none text-tapeBlack text-[20px] text-semibold rounded-[20px]"
            >
              <FiSend className="text-tapeDarkGrey" size={25} />
            </button>
          </form>
        </div>
      </div>

      {comments.length > 0 ? (
        <div id="comments list" className="flex flex-col items-center">

        <div className="">
          <div className="w-full mb-[20px]">
            <p className="text-tapeDarkGrey text-[20px]">
              {comments.length} Comments
            </p>
          </div>

          <form className="w-[100px]">
            <select
              id="underline_select"
              className=" w-full block px-0 text-[20px] text-tapeDarkGrey font-medium bg-tapeBlack border-0 border-b-[1px] border-tapeDarkGrey appearance-none dark:text-tapeDarkGrey dark:border-tapeGrey focus:outline-none focus:ring-0 focus:border-tapeGrey peer"
              defaultValue="latest"
              onChange={sortComments}
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </form>
        </div>

          {comments.map((comment, index) => (
            <Comment key={index} comment={comment}/>
          ))}
          </div>
        </div>
      ) : (
        <p className="text-[40px] text-tapeDarkGrey">No comments yet</p>
      )}
    </div>
  );
}

export default CommentList;
