import { useState } from 'react';
import Form from './components/Form';

// साधारण प्रयोगकर्ता दर्ता form
const userFormSchema = {
  fields: {
    title: { 
      type: "heading" as const, 
      level: 2 as const, // ✅ LEVEL लाई पनि as const गर्नुहोस्
      text: "प्रयोगकर्ता दर्ता" 
    },
    name: { 
      type: "text" as const, 
      label: "पूरा नाम", 
      icon: "user" as const, 
      required: true, 
      placeholder: "तपाईंको नाम",
      variant: "floating" as const 
    },
    email: { 
      type: "email" as const, 
      label: "इमेल", 
      icon: "mail" as const, 
      required: true,
      variant: "filled" as const
    },
    password: { 
      type: "password" as const, 
      label: "पासवर्ड", 
      icon: "lock" as const, 
      required: true,
      variant: "standard" as const 
    },
    userType: {
      type: "select" as const, 
      label: "प्रयोगकर्ता प्रकार",
      options: [
        { value: "student", label: "विद्यार्थी" },
        { value: "teacher", label: "शिक्षक" },
        { value: "admin", label: "प्रशासक" }
      ]
    },
    agree: { 
      type: "checkbox" as const, 
      label: "सबै नियमहरू स्वीकार गर्छु", 
      required: true 
    }
  },
  submitText: "दर्ता गर्नुहोस्",
  theme: "auto" as const
};

// फाइल अपलोड form
const fileFormSchema = {
  fields: {
    title: { 
      type: "heading" as const, 
      level: 2 as const, // ✅ LEVEL लाई पनि as const गर्नुहोस्
      text: "फाइल अपलोड" 
    },
    documents: { 
      type: "file" as const, 
      label: "फाइलहरू", 
      multiple: true, 
      accept: "image/*,.pdf" 
    },
    note: { 
      type: "description" as const, 
      text: "अधिकतम ५ फाइलहरू" 
    }
  },
  submitText: "अपलोड गर्नुहोस्",
  theme: "auto" as const
};

function App() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubmit = (data: Record<string, any>, formName: string) => {
    setLoading(formName);
    console.log(`${formName} form data:`, data);
    
    // Simulation को लागि
    setTimeout(() => {
      setLoading(null);
      alert(`${formName} फर्म सफलतापूर्वक पेश गरियो!`);
    }, 1500);
  };

  return (
    <div className="min-h-screen sea-foam p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            DynamicForm परीक्षण
          </h1>
          <p className="text-muted-foreground">
            React Dynamic Form Component को डेमो
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* प्रयोगकर्ता दर्ता फर्म */}
          <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
            <h2 className="text-xl font-semibold text-center mb-4 text-card-foreground">
              प्रयोगकर्ता दर्ता
            </h2>
            <Form 
              schema={userFormSchema} 
              onSubmit={(data) => handleSubmit(data, 'user')} 
              loading={loading === 'user'}
            />
          </div>

          {/* फाइल अपलोड फर्म */}
          <div className="ocean-gradient rounded-xl shadow-lg p-6 border border-border">
            <h2 className="text-xl font-semibold text-center mb-4 text-card-foreground">
              फाइल अपलोड
            </h2>
            <Form 
              schema={fileFormSchema} 
              onSubmit={(data) => handleSubmit(data, 'file')} 
              loading={loading === 'file'}
            />
          </div>
        </div>

        <div className="mt-8 text-center text-muted-foreground text-sm">
          <p>सबै फिल्डहरू स्वचालित रूपमा काम गर्छन्</p>
        </div>
      </div>
    </div>
  );
}

export default App;