import { CommentsType } from "../../types/Comments";
import placeholderImg from '../../assets/img/pexels-juan-gomez-2589650.jpg'
type propsType = {
    comment: CommentsType;
}

function Comment({ comment }: propsType) {


    const prettifyDate = () => {
        const date = comment.date;
    }

    return (
      <div className="bg-tapeBlack w-[700px] h-[120px] flex flex-row pl-[20px] rounded-[20px] border-[2px] p-[10px] mb-[10px] items-center border-tapeDarkGrey">
        <div id='comment-crop' className="w-[80px] h-[80px] overflow-hidden rounded-full mr-[20px]">
          <img src={placeholderImg} className="w-full"></img>
        </div>
        <div className="flex flex-col leading-[30px] justify-start items-start">
            <div className=" flex flex-row"><p className="bg-tape font-semibold text-[25px] mr-[20px]">Nadav</p> <p className="font-medium text-[20px] text-tapeDarkGrey">12.45</p></div>
          <p className="text-[25px] whitespace-nowrap">
            {comment.message}
          </p>
        </div>
      </div>
    );
}

export default Comment;