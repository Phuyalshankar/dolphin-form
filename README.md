📦 Dolphin Form – Dynamic React Form Component






A highly customizable dynamic React form component with:

Nepali localization 🇳🇵

Auto dark/light theme

Schema-based fields

File upload with preview

Conditional fields

Custom styling variants

🌟 Features

Dynamic Schema-Based Forms – Define forms using JSON schema

Multiple Field Types – text, email, password, select, checkbox, file upload, etc.

Auto Dark/Light Theme – Follows system theme

Nepali Localization – Built-in

File Upload with Preview – Drag & drop

Conditional Fields – Based on form data

Validation – Required & email validation

TypeScript Support – Fully typed

Custom Styling Variants – filled, outlined, floating, plain, etc.

🚀 Installation
npm install dolphin-form
# or
yarn add dolphin-form

📦 Peer Dependencies

Make sure you have:

{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "lucide-react": "^0.263.0"
}

💻 Basic Usage
import { DynamicForm } from "dolphin-form";

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
    console.log("Form data:", data);
  };

  return <DynamicForm schema={schema} onSubmit={handleSubmit} />;
}

🎨 Field Types
Text Input
{
  type: "text" | "email" | "password" | "number" | "date",
  label: "Field Label",
  required: true,
  icon: "user",
  placeholder: "Placeholder text",
  variant: "filled" // filled | outlined | floating | standard | plain
}

Select Dropdown
{
  type: "select",
  label: "Select Field",
  options: [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" }
  ]
}

Checkbox / Radio
{
  type: "checkbox" | "radio",
  label: "Accept terms",
  required: true
}

File Upload
{
  type: "file",
  label: "Upload Files",
  multiple: true,
  accept: "image/*,.pdf",
  maxSize: 10
}

Layout Elements
{ type: "heading", level: 2, text: "Section Title" }
{ type: "description", text: "Help text" }
{ type: "divider" }

🔧 Advanced Features
Conditional Fields
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
    condition: (data) => data.userType === "student"
  }
}

Custom Components
{
  type: "custom",
  component: YourCustomComponent,
  props: { customProp: "value" }
}

Theme Options
{
  theme: "auto" // "auto" | "light" | "dark"
}

🎯 Form Context
import { useForm } from "dolphin-form";

function CustomField() {
  const { data, setField, errors } = useForm();

  return (
    <div>
      <input
        value={data.customField}
        onChange={(e) => setField("customField", e.target.value)}
      />
      {errors.customField && <span>{errors.customField}</span>}
    </div>
  );
}

📋 Props
DynamicForm Props
Prop	Type	Required	Description
schema	Schema	Yes	Form configuration
onSubmit	(data: Record<string, any>) ⇒ void	Yes	Submit handler
loading	boolean	No	Submit button loading state
className	string	No	Additional CSS classes
🎨 Styling

Import DolphinCSS:

import "dolphincss/dolphin-css.css";


Input Variants:

filled

outlined

floating

standard

plain

🌐 Nepali Localization

Default text Nepali मा हुन्छ:

{
  label: "तपाईंको नाम",
  placeholder: "नाम लेख्नुहोस्",
  submitText: "पेश गर्नुहोस्"
}

🔮 Examples
Registration Form
const registrationSchema = {
  fields: {
    personalInfo: { type: "heading", level: 2, text: "व्यक्तिगत जानकारी" },
    name: { type: "text", label: "नाम", required: true, variant: "floating" },
    email: { type: "email", label: "इमेल", required: true },
    password: { type: "password", label: "पासवर्ड", required: true },
    divider: { type: "divider" },
    agree: {
      type: "checkbox",
      label: "सबै शर्तहरू स्वीकार गर्छु",
      required: true
    }
  },
  submitText: "खाता खोल्नुहोस्",
  theme: "auto"
};

File Upload Form
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

PRs and issues are always welcome!

📄 License

MIT License