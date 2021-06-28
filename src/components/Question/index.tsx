import { ReactNode } from "react";
import cx from "classnames";

import "./styles.scss";

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
};

export function Question({
  content,
  author,
  children,
  isAnswered = false,
  isHighlighted = false,
}: QuestionProps) {
  return (
    <div
      className={cx(
        "question-container",
        { '-answered': isAnswered },
        { '-highlighted': isHighlighted && !isAnswered }
      )}
    >
      <p className="content">{content}</p>
      <footer className="question-footer">
        <div className="user-info -footer">
          <img className="avatar" src={author.avatar} alt={author.name} />
          <span className="name">{author.name}</span>
        </div>
        <div className="tools">{children}</div>
      </footer>
    </div>
  );
}
