import { useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import { ReactEditor } from '@editorjs/react';
import Header from '@editorjs/header';
import List from '@editorjs/list';

interface EditorData {
  blocks: {
    type: string;
    data: Record<string, unknown>;
  }[];
  version: string;
}

const editorConfig = {
  holder: 'editor-container',
  autofocus: true,
  placeholder: 'Start writing here...',
  tools: {
    header: {
      class: Header,
      inlineToolbar: true
    },
    list: {
      class: List,
      inlineToolbar: true
    }
  }
};

function Editor() {
  const editorRef = useRef<EditorJS | null>(null);

  const handleSave = async () => {
    if (editorRef.current) {
      const data: EditorData = await editorRef.current.save();
      console.log(data);
    }
  };

  return (
    <>
      <ReactEditor
        tools={editorConfig.tools}
        holder={editorConfig.holder}
        autofocus={editorConfig.autofocus}
        placeholder={editorConfig.placeholder}
        onReady={() => console.log('Editor is ready')}
        instanceRef={(instance) => (editorRef.current = instance)}
      />
      <button onClick={handleSave}>Save</button>
    </>
  );
}

export default Editor;
