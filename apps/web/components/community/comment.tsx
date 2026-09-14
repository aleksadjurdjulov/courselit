import { useContext, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MoreVertical, FlagTriangleRight, Trash } from "lucide-react";
import {
    CommunityComment,
    CommunityCommentReply,
    Constants,
    Membership,
} from "@courselit/common-models";
import { formattedLocaleDate, hasCommunityPermission } from "@ui-lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddressContext, ProfileContext } from "@components/contexts";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { isCommunityComment } from "./utils";
import {
    DELETED_COMMENT_PLACEHOLDER,
    COURSE_DISCUSSIONS_DELETE,
    COURSE_DISCUSSIONS_REPORT,
    COURSE_DISCUSSIONS_REPLY_PLACEHOLDER,
    COURSE_DISCUSSIONS_REPLY,
    COURSE_DISCUSSIONS_CANCEL,
    COURSE_DISCUSSIONS_REPORTED,
    COURSE_DISCUSSIONS_REPORT_DIALOG_TITLE_COMMENT,
    COURSE_DISCUSSIONS_REPORT_DIALOG_DESCRIPTION_COMMENT,
    COURSE_DISCUSSIONS_REPORT_DIALOG_PLACEHOLDER,
    COURSE_DISCUSSIONS_REPORT_DIALOG_SUBMIT,
    COURSE_DISCUSSIONS_REPORT_CONTENT_SUCCESS,
    BUTTON_CANCEL_TEXT,
    COURSE_DISCUSSIONS_DELETE_CONFIRM,
    COURSE_DISCUSSIONS_DELETE_CONFIRM_DESCRIPTION,
    TOAST_TITLE_ERROR,
} from "@ui-config/strings";
import { useToast } from "@courselit/components-library";
import { FetchBuilder } from "@courselit/utils";
import { ReactionsBar } from "./reactions-bar";

type CommentOrReply =
    | CommunityComment
    | (CommunityCommentReply & { commentId: string });

interface CommentProps {
    communityId: string;
    comment: CommentOrReply;
    onReact: (commentId: string, emoji: string, replyId?: string) => void;
    onReply: (
        commentId: string,
        content: string,
        parentReplyId?: string,
    ) => void;
    onDelete: (comment: CommentOrReply) => void;
    depth?: number;
    membership: Pick<Membership, "status" | "role" | "rejectionReason">;
    isPosting?: boolean;
}

export function Comment({
    communityId,
    comment,
    onReact,
    onReply,
    onDelete,
    membership,
    depth = 0,
    isPosting = false,
}: CommentProps) {
    const [isReplying, setIsReplying] = useState(false);
    const [replyContent, setReplyContent] = useState("");
    const [commentToDelete, setCommentToDelete] =
        useState<CommentOrReply | null>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showReportConfirmation, setShowReportConfirmation] = useState(false);
    const [reportReason, setReportReason] = useState("");
    const [commentToReport, setCommentToReport] =
        useState<CommentOrReply | null>(null);
    const { profile } = useContext(ProfileContext);
    const address = useContext(AddressContext);
    const { toast } = useToast();

    const handleDeletePost = (comment: CommentOrReply) => {
        setCommentToDelete(comment);
        setShowDeleteConfirmation(true);
    };

    const confirmDeletePost = () => {
        if (commentToDelete) {
            onDelete(commentToDelete);
            setShowDeleteConfirmation(false);
            setCommentToDelete(null);
        }
    };

    const handleReportPost = (comment: CommentOrReply) => {
        setCommentToReport(comment);
        setShowReportConfirmation(true);
    };

    const confirmReportPost = () => {
        if (commentToReport && reportReason.trim()) {
            if (isCommunityComment(commentToReport)) {
                handleReport(commentToReport.commentId, reportReason);
            } else {
                handleReport(
                    commentToReport.replyId,
                    reportReason,
                    commentToReport.commentId,
                );
            }
            setShowReportConfirmation(false);
            setCommentToReport(null);
            setReportReason("");
        }
    };

    const handleReport = async (
        contentId: string,
        reason: string,
        contentParentId?: string,
    ) => {
        const query = `
            mutation ($communityId: String!, $contentId: String!, $type: CommunityReportContentType!, $reason: String!, $contentParentId: String) {
                report: reportCommunityContent(communityId: $communityId, contentId: $contentId, type: $type, reason: $reason, contentParentId: $contentParentId) {
                    communityId
                    reportId
                    content {
                        id
                        content
                    }
                    type
                    reason
                    status
                    contentParentId
                    rejectionReason
                    createdAt
                    updatedAt
                }
            }
        `;
        const fetch = new FetchBuilder()
            .setUrl(`${address.backend}/api/graph`)
            .setPayload({
                query,
                variables: {
                    communityId: communityId,
                    contentId,
                    type: contentParentId
                        ? Constants.CommunityReportType.REPLY.toUpperCase()
                        : Constants.CommunityReportType.COMMENT.toUpperCase(),
                    reason,
                    contentParentId,
                },
            })
            .setIsGraphQLEndpoint(true)
            .build();

        try {
            await fetch.exec();
            toast({
                title: COURSE_DISCUSSIONS_REPORTED,
                description: COURSE_DISCUSSIONS_REPORT_CONTENT_SUCCESS,
            });
        } catch (err: any) {
            toast({
                title: TOAST_TITLE_ERROR,
                description: err.message,
                variant: "destructive",
            });
        }
    };

    const itemId = isCommunityComment(comment)
        ? comment.commentId
        : (comment as CommunityCommentReply).replyId;

    return (
        <div
            id={itemId}
            className={`space-y-2 rounded-xl border border-transparent px-3 py-3 transition-[background-color,border-color,box-shadow] duration-500 ${depth > 0 ? "ml-6" : ""}`}
        >
            <div className="flex items-start gap-2">
                <Avatar className="h-8 w-8">
                    <AvatarImage
                        src={
                            comment.user.avatar?.thumbnail ||
                            "/courselit_backdrop_square.webp"
                        }
                        alt={`${comment.user.name}'s avatar`}
                    />
                    <AvatarFallback>
                        {(comment.user.name || "")
                            .toUpperCase()
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex items-center gap-2 justify-between">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">
                                {comment.user.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                {formattedLocaleDate(comment.updatedAt)}
                            </span>
                        </div>
                        {!comment.deleted && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-muted-foreground mr-1"
                                    >
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {(hasCommunityPermission(
                                        membership,
                                        Constants.MembershipRole.MODERATE,
                                    ) ||
                                        profile?.userId ===
                                            comment.user.userId) && (
                                        <DropdownMenuItem
                                            onClick={() =>
                                                handleDeletePost(comment)
                                            }
                                        >
                                            <Trash className="h-4 w-4" />
                                            {COURSE_DISCUSSIONS_DELETE}
                                        </DropdownMenuItem>
                                    )}
                                    {profile?.userId !==
                                        comment.user.userId && (
                                        <DropdownMenuItem
                                            onClick={() =>
                                                handleReportPost(comment)
                                            }
                                        >
                                            <FlagTriangleRight />{" "}
                                            {COURSE_DISCUSSIONS_REPORT}
                                        </DropdownMenuItem>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                    <p className="text-sm mt-1 whitespace-pre-wrap">
                        {comment.deleted ? (
                            <span className="italic text-gray-500">
                                {DELETED_COMMENT_PLACEHOLDER}
                            </span>
                        ) : (
                            comment.content
                        )}
                    </p>
                    <div className="flex flex-wrap gap-1 items-center min-w-0 mt-2">
                        <ReactionsBar
                            reactions={comment.reactions || []}
                            onReact={(emoji) => {
                                if (isCommunityComment(comment)) {
                                    onReact(comment.commentId, emoji);
                                } else {
                                    onReact(
                                        comment.commentId,
                                        emoji,
                                        comment.replyId,
                                    );
                                }
                            }}
                            showReplyButton
                            onReply={() => setIsReplying(!isReplying)}
                        />
                    </div>
                </div>
            </div>
            {isReplying && profile?.name && (
                <div className="mt-2 space-y-2 p-1">
                    <Textarea
                        placeholder={COURSE_DISCUSSIONS_REPLY_PLACEHOLDER}
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsReplying(false)}
                        >
                            {COURSE_DISCUSSIONS_CANCEL}
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => {
                                if (replyContent.trim()) {
                                    isCommunityComment(comment)
                                        ? onReply(
                                              comment.commentId,
                                              replyContent,
                                          )
                                        : onReply(
                                              comment.commentId,
                                              replyContent,
                                              comment.replyId,
                                          );
                                    setReplyContent("");
                                    setIsReplying(false);
                                }
                            }}
                            disabled={isPosting}
                        >
                            {COURSE_DISCUSSIONS_REPLY}
                        </Button>
                    </div>
                </div>
            )}
            {isCommunityComment(comment) &&
                comment.replies?.map((reply) => (
                    <Comment
                        communityId={communityId}
                        key={reply.replyId}
                        comment={{
                            ...reply,
                            commentId: comment.commentId,
                        }}
                        onReact={(commentId, emoji, replyId) =>
                            onReact(commentId, emoji, reply.replyId)
                        }
                        onReply={onReply}
                        onDelete={onDelete}
                        membership={membership}
                        depth={depth + 1}
                        isPosting={isPosting}
                    />
                ))}
            <Dialog
                open={showDeleteConfirmation}
                onOpenChange={setShowDeleteConfirmation}
            >
                <DialogContent>
                    <DialogTitle>{COURSE_DISCUSSIONS_DELETE}</DialogTitle>
                    <DialogDescription>
                        {COURSE_DISCUSSIONS_DELETE_CONFIRM}{" "}
                        {COURSE_DISCUSSIONS_DELETE_CONFIRM_DESCRIPTION}
                    </DialogDescription>
                    <DialogFooter>
                        <Button
                            variant="secondary"
                            onClick={() => setShowDeleteConfirmation(false)}
                        >
                            {BUTTON_CANCEL_TEXT}
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDeletePost}
                        >
                            {COURSE_DISCUSSIONS_DELETE}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog
                open={showReportConfirmation}
                onOpenChange={setShowReportConfirmation}
            >
                <DialogContent>
                    <DialogTitle>
                        {COURSE_DISCUSSIONS_REPORT_DIALOG_TITLE_COMMENT}
                    </DialogTitle>
                    <DialogDescription>
                        {COURSE_DISCUSSIONS_REPORT_DIALOG_DESCRIPTION_COMMENT}
                    </DialogDescription>
                    <Textarea
                        placeholder={
                            COURSE_DISCUSSIONS_REPORT_DIALOG_PLACEHOLDER
                        }
                        value={reportReason}
                        onChange={(e) => setReportReason(e.target.value)}
                    />
                    <DialogFooter>
                        <Button
                            variant="secondary"
                            onClick={() => setShowReportConfirmation(false)}
                        >
                            {BUTTON_CANCEL_TEXT}
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmReportPost}
                            disabled={!reportReason.trim()}
                        >
                            {COURSE_DISCUSSIONS_REPORT_DIALOG_SUBMIT}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
