import React, { useEffect, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { JsonSchema } from '../types';

interface FormPreviewProps {
  jsonSchema: JsonSchema;
  setJsonSchema: (schema: JsonSchema) => void;
}

const FormPreview: React.FC<FormPreviewProps> = ({ jsonSchema, setJsonSchema }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const watchedFields = watch();
  const prevWatchedFields = useRef(watchedFields);

  const onSubmit: SubmitHandler<any> = data => {
    console.log(data);
    alert('Form submitted successfully!');
  };

  useEffect(() => {
    const fieldsChanged = Object.keys(watchedFields).some(
      key => watchedFields[key] !== prevWatchedFields.current[key]
    );

    if (fieldsChanged) {
      const updatedFields = jsonSchema.fields.map(field => ({
        ...field,
        value: watchedFields[field.id]
      }));
      setJsonSchema({ ...jsonSchema, fields: updatedFields });
      prevWatchedFields.current = watchedFields;
    }
  }, [watchedFields, jsonSchema, setJsonSchema]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{jsonSchema.formTitle}</h2>
      <p className="text-gray-600 mb-6">{jsonSchema.formDescription}</p>
      {jsonSchema.fields && jsonSchema.fields.map((field: any) => (
        <div key={field.id} className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">{field.label}</label>
          {field.type === 'text' && (
            <input
              {...register(field.id, { required: field.required })}
              placeholder={field.placeholder}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          )}
          {field.type === 'email' && (
            <input
              type="email"
              {...register(field.id, { required: field.required, pattern: field.validation?.pattern })}
              placeholder={field.placeholder}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          )}
          {field.type === 'select' && (
            <select {...register(field.id, { required: field.required })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              {field.options.map((option: any) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          )}
          {field.type === 'radio' && field.options.map((option: any) => (
            <div key={option.value} className="flex items-center mb-2">
              <input
                type="radio"
                {...register(field.id, { required: field.required })}
                value={option.value}
                className="mr-2"
              />
              <label>{option.label}</label>
            </div>
          ))}
          {field.type === 'textarea' && (
            <textarea
              {...register(field.id, { required: field.required })}
              placeholder={field.placeholder}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          )}
          {errors[field.id] && <span className="text-red-500">{field.validation?.message || 'This field is required'}</span>}
        </div>
      ))}
      <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
    </form>
  );
};

export default FormPreview;