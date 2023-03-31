import React, { useCallback, useState } from 'react';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

// 불러 올때
const EditorMarkdown = dynamic(
  () =>
    import('@uiw/react-md-editor').then((mod) => {
      return mod.default.Markdown;
    }),
  { ssr: false },
);

const CustomMdEditor = () => {
  const [value, setValue] = useState('**Hello world!!!**');
  const handleChange = useCallback((value) => {
    setValue(value);
  }, []);
  return (
    <div>
      <MDEditor value={value} onChange={handleChange} />
      <div>
        <EditorMarkdown source={value} />
      </div>
    </div>
  );
};
export default CustomMdEditor;
