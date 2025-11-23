// src/index.ts
import Form from './components/Form.tsx';
import { useForm } from './components/Form.tsx';

export default Form;
export { useForm };
export type { 
  Schema, 
  Field, 
  Variant, 
  FieldType,
  BaseField,
  TextField,
  FileField, 
  SelectField,
  CheckField,
  HeadingField,
  DescriptionField,
  DividerField,
  CustomField,
  FormContextValue
} from './components/Form.tsx';