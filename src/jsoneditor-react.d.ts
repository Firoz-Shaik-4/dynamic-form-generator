declare module 'jsoneditor-react' {
    import { Component } from 'react';
  
    interface JSONEditorProps {
      value: object;
      onChange: (updatedJson: object) => void;
      mode?: string;
      theme?: string;
    }
  
    export default class JSONEditor extends Component<JSONEditorProps> {}
  }