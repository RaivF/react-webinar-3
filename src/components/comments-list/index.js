import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import React, { memo, useCallback, useLayoutEffect, useRef, useState } from "react";
import CommentFallbackMessage from "../comment-fallback-message";
import CommentItem from "../comment-item";
import CommentTextArea from "../comment-text-area";
import "./style.css";

const CommentsList = ({ comments, t, onSubmit, isUserAuth, currentUser, pathToLogin }) => {
  const cn = bem("CommentsList");
  const [showNewCommentTextArea, setShowNewCommentTextArea] = useState(true);
  const [showReplyComment, setShowReplyComment] = useState(false);
  const [itemIdToReply, setItemIdToReply] = useState('');
  const [itemIdToScroll, setItemIdToScroll] = useState('');
  const [widthUList, setWidthUList] = useState(0);

  const allLiElementsRef = useRef([]);
  const ulRef = useRef();

  useLayoutEffect(() => {
    if (ulRef.current) {
      setWidthUList(ulRef.current.offsetWidth);
    }
  }, [ulRef.current]);

  const handleReply = useCallback((id) => {
    setShowReplyComment(true);
    setShowNewCommentTextArea(false);
    setItemIdToReply(id);

    const lastReplyId = comments.findLast((comment) => comment.parent._id === id)?._id;
    setItemIdToScroll(lastReplyId ?? id);

    const elem = allLiElementsRef.current[lastReplyId ?? id];
    elem?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [setShowReplyComment, setShowNewCommentTextArea, setItemIdToReply, setItemIdToScroll, comments, allLiElementsRef.current]);

  const handleCancel = useCallback(() => {
    setShowReplyComment(false);
    setShowNewCommentTextArea(true);
    allLiElementsRef.current[itemIdToReply]?.scrollIntoView({ behavior: "smooth", block: "center" });

    setTimeout(() => {
      setItemIdToReply('');
      setItemIdToScroll('');
    }, 0);
  }, [setShowReplyComment, setShowNewCommentTextArea, setItemIdToReply, setItemIdToScroll, allLiElementsRef.current, itemIdToReply]);

  const handleSubmit = useCallback((text) => onSubmit(text, itemIdToReply), [onSubmit, itemIdToReply]);

  return (
    <section className={cn()}>
      <h2 className={cn("title")}>
        {t("comments.title")} ({comments.length || 0})
      </h2>

      {comments.length > 0 && (
        <ul className={cn("list")} ref={ulRef}>
          {comments.map((comment) => (
            <li
              key={comment._id}
              style={{ marginLeft: `${Math.min(comment.level * 30, Math.floor(widthUList / 2))}px` }}
              ref={(el) => allLiElementsRef.current[comment._id] = el}
            >
              <CommentItem
                t={t}
                isAuthorByCurrentUser={comment.author?._id === currentUser._id}
                onReply={() => handleReply(comment._id)}
                styles={{ marginBottom: itemIdToScroll === comment._id ? "30px" : "0" }}
                authorName={comment.author?.profile?.name || currentUser?.profile?.name}
                {...comment}
              />

              {itemIdToScroll === comment._id &&
                showReplyComment &&
                (isUserAuth ? (
                  <CommentTextArea
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isModeReply={true}
                    t={t}
                  />
                ) : (
                  <CommentFallbackMessage
                    isModeReply={true}
                    onCancel={handleCancel}
                    t={t}
                    pathToLogin={pathToLogin}
                  />
                ))}
            </li>
          ))}
        </ul>
      )}

      {showNewCommentTextArea &&
        (isUserAuth ? (
          <CommentTextArea onSubmit={handleSubmit} t={t} />
        ) : (
          <CommentFallbackMessage pathToLogin={pathToLogin} t={t} />
        ))}
    </section>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  t: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isUserAuth: PropTypes.bool.isRequired,
  currentUser: PropTypes.object.isRequired,
  pathToLogin: PropTypes.string.isRequired,
};

export default memo(CommentsList);
