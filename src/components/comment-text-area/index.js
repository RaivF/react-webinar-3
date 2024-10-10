import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import { memo, useState } from "react";
import "./style.css";

const CommentTextArea = ({ onSubmit, onCancel, t, isModeReply = false }) => {
  const cn = bem("CommentTextArea");
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim().length === 0) {
      setText("");
      return;
    }

    onSubmit(text.trim());
    setText("");
  };

  return (
    <section className={cn()}>
      <h3 className={cn("title")}>
        {isModeReply ? t("comment.new-reply") : t("comment.new-title")}
      </h3>
      <textarea
        className={cn("input")}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className={cn("submit")} onClick={handleSubmit}>
        {t("comment.send")}
      </button>

      {isModeReply && (
        <button className={cn("cancel")} onClick={() => onCancel()}>
          {t("comment.cancel")}
        </button>
      )}
    </section>
  );
};

CommentTextArea.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  t: PropTypes.func.isRequired,
};

CommentTextArea.defaultProps = {
  isModeReply: false,
};

export default memo(CommentTextArea);
