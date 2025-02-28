declare module 'react-quill-new' {
    import * as React from 'react';
    import Quill from 'quill';
  
    export interface ReactQuillProps extends React.HTMLAttributes<HTMLDivElement> {
      value?: string;
      defaultValue?: string;
      readOnly?: boolean;
      placeholder?: string;
      modules?: {
        toolbar?: any[];
      };
      formats?: string[];
      theme?: string;
      onChange?: (value: string, delta: any, source: string, editor: any) => void;
      onChangeSelection?: (range: any, source: string, editor: any) => void;
      ref?: React.Ref<ReactQuill>;
    }
  
    export default class ReactQuill extends React.Component<ReactQuillProps> {
      getEditor(): Quill;
      focus(): void;
      blur(): void;
    }
  }