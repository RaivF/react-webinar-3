import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import React, { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";

const CommentFallbackMessage = ({ t, onCancel, pathToLogin, isModeReply = false }) => {
  const cn = bem("CommentFallbackMessage");
  const location = useLocation();

  return isModeReply ? (
    <div>
      <Link to={pathToLogin} state={{ back: location.pathname }} className={cn("link")}>
        {t("comments.signIn")}
      </Link>
      , {t("comments.toReply")}{" "}
      <button
        type="button"
        className={cn("cancel")}
        onClick={() => onCancel()}
      >
        {t("comment.cancel")}
      </button>
    </div>
  ) : (
    <div>
      <Link to={pathToLogin} state={{ back: location.pathname }} className={cn("link")}>
        {t("comments.signIn")}
      </Link>
      , {t("comments.toSendComment")}
    </div>
  );
};

CommentFallbackMessage.propTypes = {
  t: PropTypes.func.isRequired,
  pathToLogin: PropTypes.string.isRequired,
  isModeReply: PropTypes.bool,
  onCancel: PropTypes.func,
}

CommentFallbackMessage.defaultProps = {
  isModeReply: false,
  onCancel: () => {},
}

export default memo(CommentFallbackMessage);
