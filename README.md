
Dolphin Form - Dynamic React Form Component
https://img.shields.io/badge/React-18.0+-blue.svg
https://img.shields.io/badge/TypeScript-5.0+-blue.svg
https://img.shields.io/badge/License-MIT-green.svg

A highly customizable, dynamic form component for React with built-in Nepali localization and auto dark/light theme support.

🌟 Features
Dynamic Schema-Based Forms - Define forms using JSON schema

Multiple Field Types - Text, email, password, select, checkbox, file upload, and more

Auto Dark/Light Theme - System theme detection with manual override

Nepali Localization - Built-in Nepali language support

File Upload with Preview - Drag & drop file upload with image preview

Conditional Fields - Show/hide fields based on form data

Form Validation - Built-in required field and email validation

Custom Styling - Multiple variants (filled, outlined, floating, standard)

TypeScript Support - Fully typed for better development experience

🚀 Installation
bash
npm install dolphin-form
# or
yarn add dolphin-form
📦 Peer Dependencies
Make sure you have these dependencies installed:

json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "lucide-react": "^0.263.0"
}
💻 Basic Usage
typescript
import { DynamicForm } from 'dolphin-form';

const schema = {
  fields: {
    name: {
      type: "text",
      label: "पूरा नाम",
      required: true,
      variant: "floating"
    },
    email: {
      type: "email", 
      label: "इमेल ठेगाना",
      required: true,
      variant: "filled"
    },
    userType: {
      type: "select",
      label: "प्रयोगकर्ता प्रकार",
      options: [
        { value: "student", label: "विद्यार्थी" },
        { value: "teacher", label: "शिक्षक" }
      ]
    }
  },
  submitText: "दर्ता गर्नुहोस्",
  theme: "auto"
};

function App() {
  const handleSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <DynamicForm 
      schema={schema} 
      onSubmit={handleSubmit} 
    />
  );
}
🎨 Field Types
Text Input
typescript
{
  type: "text" | "email" | "password" | "number" | "date",
  label: "Field Label",
  required: true,
  icon: "user", // user, mail, lock, upload, file
  placeholder: "Placeholder text",
  variant: "filled" // filled, outlined, floating, standard, plain
}
Select Dropdown
typescript
{
  type: "select",
  label: "Select Field",
  options: [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" }
  ]
}
Checkbox/Radio
typescript
{
  type: "checkbox" | "radio",
  label: "Accept terms",
  required: true
}
File Upload
typescript
{
  type: "file",
  label: "Upload Files",
  multiple: true,
  accept: "image/*,.pdf",
  maxSize: 10 // in MB
}
Layout Elements
typescript
// Heading
{ type: "heading", level: 2, text: "Section Title" }

// Description  
{ type: "description", text: "Help text" }

// Divider
{ type: "divider" }
🔧 Advanced Features
Conditional Fields
typescript
{
  userType: {
    type: "select",
    label: "User Type",
    options: [
      { value: "student", label: "Student" },
      { value: "teacher", label: "Teacher" }
    ]
  },
  studentId: {
    type: "text",
    label: "Student ID",
    condition: (data) => data.userType === "student" // Only shows when userType is student
  }
}
Custom Components
typescript
{
  type: "custom",
  component: YourCustomComponent,
  props: { customProp: "value" }
}
Theme Options
typescript
{
  theme: "auto", // auto, light, dark
  // auto: Follows system theme
  // light: Always light theme
  // dark: Always dark theme
}
🎯 Form Context
Access form state and methods using the useForm hook:

typescript
import { useForm } from 'dolphin-form';

function CustomField() {
  const { data, setField, errors, touched } = useForm();
  
  return (
    <div>
      <input 
        value={data.customField} 
        onChange={(e) => setField('customField', e.target.value)}
      />
      {errors.customField && <span>{errors.customField}</span>}
    </div>
  );
}
📋 Props
DynamicForm Component
Prop	Type	Required	Description
schema	Schema	Yes	Form configuration object
onSubmit	(data: Record<string, any>) => void	Yes	Form submission handler
loading	boolean	No	Show loading state on submit button
className	string	No	Additional CSS classes
Schema Object
Property	Type	Description
fields	Record<string, Field>	Form field definitions
submitText	string	Submit button text (default: "सबमिट गर्नुहोस्")
theme	"light" | "dark" | "auto"	Color theme (default: "auto")
🎨 Styling
The component uses dolphincss for styling. Make sure to import the CSS:

typescript
import "dolphincss/dolphin-css.css";
Available Variants
filled - Material Design filled input

outlined - Material Design outlined input

floating - Floating label input

standard - Standard underline input

plain - Minimal styling

🌐 Nepali Localization
All default labels and placeholders are in Nepali. You can customize them in your schema:

typescript
{
  label: "तपाईंको नाम",
  placeholder: "नाम लेख्नुहोस्",
  submitText: "पेश गर्नुहोस्"
}
🔮 Examples
Registration Form
typescript
const registrationSchema = {
  fields: {
    personalInfo: { type: "heading", level: 2, text: "व्यक्तिगत जानकारी" },
    name: { type: "text", label: "नाम", required: true, variant: "floating" },
    email: { type: "email", label: "इमेल", required: true },
    password: { type: "password", label: "पासवर्ड", required: true },
    divider: { type: "divider" },
    agree: { type: "checkbox", label: "सबै शर्तहरू स्वीकार गर्छु", required: true }
  },
  submitText: "खाता खोल्नुहोस्",
  theme: "auto"
};
File Upload Form
typescript
const uploadSchema = {
  fields: {
    title: { type: "heading", level: 2, text: "फाइल अपलोड" },
    documents: { 
      type: "file", 
      label: "फाइलहरू", 
      multiple: true, 
      accept: "image/*,.pdf" 
    },
    note: { type: "description", text: "अधिकतम १०MB सम्म" }
  },
  submitText: "अपलोड गर्नुहोस्"
};
🤝 Contributing
We welcome contributions! Please feel free to submit issues and pull requests.

📄 License
MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Built with React

Icons by Lucide React

Styling with Dolphin CSS

Made with ❤️ in Nepal

