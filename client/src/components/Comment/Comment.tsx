import { CommentsType } from "../../types/Comments";
import placeholderImg from "../../assets/img/pexels-juan-gomez-2589650.jpg";
import { TimePrettier } from "../../utils/timePrettifier";

type propsType = {
  comment: CommentsType;
};

function Comment({ comment }: propsType) {
  return (
    <div className="bg-tapeBlack w-[700px] h-[120px] flex flex-row pl-[20px] rounded-[20px] border-[2px] p-[10px] mb-[50px] items-center border-tapeDarkGrey border-[1px]">
      <div
        id="comment-crop"
        className="w-[80px] h-[80px] overflow-hidden rounded-full mr-[40px]"
      >
        <img src={placeholderImg} className="w-full" alt="Profile" />
      </div>
      <div className="flex flex-col leading-[30px] justify-start items-start">
        <div className=" flex flex-row">
          <p className="bg-tape font-semibold text-[25px] mr-[20px]">
            {comment.owner?.userName || "Unknown User"}
          </p>
          <p className="font-medium text-[20px] text-tapeDarkGrey">
            {TimePrettier(comment.date)}
          </p>
        </div>
        <p className="text-[25px] whitespace-nowrap">{comment.message}</p>
      </div>
    </div>
  );
}

export default Comment;
