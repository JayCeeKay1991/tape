import Comment from "./Comment";
import { render, screen } from '@/test/testConfig';
import { describe, it, expect, beforeEach } from 'vitest';
import { mockComment } from "@/test/mocks";


beforeEach(() => {
    render(
        <Comment comment={mockComment}/>
    );
});

describe('Comment Component', async () => {
    it('should render the comment content', async () => {
        const commentContent = screen.getByTestId('comment-content') as HTMLParagraphElement;
        expect(commentContent).toHaveTextContent(mockComment.message);
    } )

    it('should render the comments author', async () => {
        const commentAuthor = screen.getByTestId('comment-author') as HTMLParagraphElement;
        expect(commentAuthor).toHaveTextContent(mockComment.owner.userName)
    })
})