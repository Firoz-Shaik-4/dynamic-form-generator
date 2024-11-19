import React from 'react';
import ReactJson from 'react-json-view';
import { JsonSchema } from '../types';

interface JSONEditorProps {
  jsonSchema: JsonSchema;
  setJsonSchema: (schema: JsonSchema) => void;
}

const JSONEditorComponent: React.FC<JSONEditorProps> = ({ jsonSchema, setJsonSchema }) => {
  const handleEdit = (edit: any) => {
    setJsonSchema(edit.updated_src);
  };

  return (
    <div>
      <ReactJson
        src={jsonSchema}
        onEdit={handleEdit}
        onAdd={handleEdit}
        onDelete={handleEdit}
        theme="monokai"
        style={{ height: '100%', overflow: 'auto' }}
      />
    </div>
  );
};

export default JSONEditorComponent;