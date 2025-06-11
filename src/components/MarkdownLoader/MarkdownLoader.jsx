import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";              // for tables, strikethrough, etc.
import rehypeHighlight from "rehype-highlight";  // for syntax highlighting
import "highlight.js/styles/github.css";         // optional styling for code blocks
import rehypeRaw from 'rehype-raw';

function MarkdownLoader({ file }) {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(file)
      .then((res) => res.text())
      .then(setContent)
      .catch(console.error);
  }, [file]);

  return (
    <div className="markdown-body">
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
      />
    </div>
  );
}

export default MarkdownLoader;
