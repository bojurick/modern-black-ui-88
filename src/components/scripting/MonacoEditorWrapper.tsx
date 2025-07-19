
import React, { useRef } from 'react';
import Editor, { OnMount, EditorProps } from '@monaco-editor/react';
import { useTheme } from '@/contexts/ThemeContext';

interface MonacoEditorWrapperProps {
  value: string;
  onChange: (value: string | undefined) => void;
  language?: string;
  height?: string;
  className?: string;
  options?: Record<string, any>;
}

const MonacoEditorWrapper: React.FC<MonacoEditorWrapperProps> = ({
  value,
  onChange,
  language = 'lua',
  height = '400px',
  className = '',
  options = {}
}) => {
  const editorRef = useRef<any>(null);
  const { theme: appTheme } = useTheme();
  const isLight = appTheme === 'light';

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Configure editor colors for transparent background
    monaco.editor.defineTheme('essenceDark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6a9955' },
        { token: 'keyword', foreground: 'c586c0' },
        { token: 'string', foreground: 'ce9178' },
        { token: 'number', foreground: 'b5cea8' },
        { token: 'function', foreground: 'dcdcaa' },
      ],
      colors: {
        'editor.background': '#00000000',
        'editor.foreground': '#d4d4d4',
        'editorCursor.foreground': '#ff6b6b', // Red cursor
        'editor.lineHighlightBackground': '#ff000015', // Subtle red highlight
        'editorLineNumber.foreground': '#858585',
        'editor.selectionBackground': '#772222', // Red selection
        'editor.inactiveSelectionBackground': '#3a3d41',
        'editorIndentGuide.background': '#404040',
      }
    });

    monaco.editor.defineTheme('essenceLight', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '008000' },
        { token: 'keyword', foreground: 'A31515' },
        { token: 'string', foreground: 'A31515' },
        { token: 'number', foreground: '098658' },
        { token: 'function', foreground: '795E26' },
      ],
      colors: {
        'editor.background': '#ffffff80',
        'editor.foreground': '#333333',
        'editorCursor.foreground': '#ff3333',
        'editor.lineHighlightBackground': '#ff000010',
        'editorLineNumber.foreground': '#666666',
        'editor.selectionBackground': '#ffdddd',
        'editor.inactiveSelectionBackground': '#f0f0f0',
        'editorIndentGuide.background': '#e0e0e0',
      }
    });
    
    monaco.editor.setTheme(isLight ? 'essenceLight' : 'essenceDark');
  };

  const defaultOptions = {
    fontSize: 14,
    fontFamily: 'JetBrains Mono, monospace',
    fontLigatures: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    lineNumbers: 'on' as const,
    renderLineHighlight: 'all' as const,
    padding: { top: 16, bottom: 16 },
    automaticLayout: true,
    tabSize: 2,
    scrollbar: {
      vertical: 'auto' as const,
      horizontal: 'auto' as const,
      verticalScrollbarSize: 10,
      horizontalScrollbarSize: 10,
      verticalHasArrows: false,
      horizontalHasArrows: false,
      useShadows: false
    }
  };

  return (
    <div className={`rounded-lg border ${isLight ? 'border-gray-200 bg-white/70' : 'border-white/10 bg-black/20'} backdrop-blur ${className}`}>
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={{...defaultOptions, ...options}}
        theme={isLight ? 'essenceLight' : 'essenceDark'}
      />
    </div>
  );
};

export default MonacoEditorWrapper;
