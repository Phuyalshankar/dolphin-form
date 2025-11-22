/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect, useMemo, useCallback, createContext, useContext, forwardRef } from "react";
import { Mail, Lock, User, Eye, EyeOff, CloudUpload, FileText, X, ChevronDown } from "lucide-react";
import "dolphincss/dolphin-css.css";

/* ====================== TYPES ====================== */
type Variant = "filled" | "outlined" | "plain" | "floating" | "standard";
type FieldType = "text" | "email" | "password" | "number" | "date" | "file" | "select" | "checkbox" | "radio" | "heading" | "description" | "divider" | "custom";

const icons = { mail: Mail, email: Mail, lock: Lock, user: User, upload: CloudUpload, file: FileText } as const;

interface BaseField {
  type: FieldType;
  label?: string;
  required?: boolean;
  icon?: keyof typeof icons;
  placeholder?: string;
  variant?: Variant;
  condition?: (data: Record<string, any>) => boolean;
  hidden?: boolean;
}

interface TextField extends BaseField { type: "text" | "email" | "password" | "number" | "date"; }
interface FileField extends BaseField { type: "file"; multiple?: boolean; accept?: string; maxSize?: number; }
interface SelectField extends BaseField { type: "select"; options: { value: string; label: string }[]; }
interface CheckField extends BaseField { type: "checkbox" | "radio"; }
interface HeadingField extends BaseField { type: "heading"; level: 1 | 2 | 3 | 4 | 5 | 6; text: string; }
interface DescriptionField extends BaseField { type: "description"; text: string; }
interface DividerField extends BaseField { type: "divider"; }
interface CustomField extends BaseField { type: "custom"; component: React.ComponentType<any>; props?: Record<string, any>; }

type Field = TextField | FileField | SelectField | CheckField | HeadingField | DescriptionField | DividerField | CustomField;

interface Schema {
  fields: Record<string, Field>;
  submitText?: string;
  theme?: "light" | "dark" | "auto"; // ✅ THEME SUPPORT फिर्ता थप्नुहोस्
}

/* ====================== CONTEXT ====================== */
interface FormContextValue {
  data: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  previews: Record<string, any>;
  setField: (key: string, value: any) => void;
  setTouched: (key: string) => void;
  removeFile: (key: string, field: FileField) => void;
}

const FormContext = createContext<FormContextValue | undefined>(undefined);
const useForm = (): FormContextValue => {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("useForm must be used within DynamicForm");
  return ctx;
};

/* ====================== UNIVERSAL INPUT ====================== */
const UniversalInput = forwardRef<HTMLInputElement, {
  field: TextField | SelectField | CheckField;
  value: any;
  onValueChange: (v: any) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
}>(({ field, value, onValueChange, onBlur, error, touched }, ref) => {
  const [showPass, setShowPass] = useState(false);
  const v = field.variant || "filled";
  const hasError = !!error && touched;
  const Icon = field.icon ? icons[field.icon] : null;
  const isPass = field.type === "password";
  const type = isPass && showPass ? "text" : field.type;

  if (field.type === "select") {
    return (
      <div className="mb-6">
        {field.label && <label className="block text-sm font-medium mb-2">{field.label}{field.required && <span className="text-danger ml-1">*</span>}</label>}
        <div className="relative">
          {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted z-10 pointer-events-none" />}
          <select
            value={value || ""}
            onChange={e => onValueChange(e.target.value)}
            onBlur={onBlur}
            className={`${v} primary w-full ${Icon ? "pl-10" : "pl-4"} pr-10 py-3 appearance-none ${hasError ? "border-danger" : ""}`}
            style={{ borderRadius: "var(--radius-md)" }}
          >
            <option value="">{field.placeholder || "छान्नुहोस्"}</option>
            {(field as SelectField).options.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
        </div>
        {hasError && <p className="text-danger text-sm mt-1">{error}</p>}
      </div>
    );
  }

  if (field.type === "checkbox" || field.type === "radio") {
    return (
      <label className="flex items-center gap-3 mb-6 cursor-pointer">
        <input 
          type={field.type} 
          checked={!!value} 
          onChange={e => onValueChange(e.target.checked)} 
          onBlur={onBlur}
          className={field.type === "checkbox" ? "primary" : ""} 
        />
        <span className="select-none">{field.label}{field.required && <span className="text-danger ml-1">*</span>}</span>
      </label>
    );
  }

  const isFloat = v === "floating" || v === "standard";

  return (
    <div className="mb-6">
      {!isFloat && field.label && (
        <label className="block text-sm font-medium mb-2">
          {field.label}{field.required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      <div className={`relative ${isFloat ? `${v}label ${Icon ? "input-icon-left" : ""} ${hasError ? "primary" : ""}` : ""}`}>
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted z-10" />}
        <input
          ref={ref}
          type={type}
          value={value || ""}
          onChange={e => onValueChange(e.target.value)}
          onBlur={onBlur}
          placeholder={isFloat ? " " : field.placeholder || field.label}
          className={`${isFloat ? `${v}label-input` : v + " primary"} w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-3 ${hasError ? "border-danger" : ""}`}
          style={!isFloat ? { borderRadius: "var(--radius-md)" } : undefined}
        />
        {isFloat && (
          <label className={`${v}label-label`}>
            {field.label}{field.required && <span className="text-danger ml-1">*</span>}
          </label>
        )}
        {isPass && (
          <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
            {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {hasError && <p className="text-danger text-sm mt-1">{error}</p>}
    </div>
  );
});

/* ====================== FILE UPLOAD ====================== */
const FileUpload: React.FC<{ field: FileField; keyName: string }> = ({ field, keyName }) => {
  const { data, previews, setField, removeFile, setTouched } = useForm();
  const [drag, setDrag] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const arr = Array.from(files);
    const selected: File | File[] = field.multiple ? arr : arr[0]; 
    
    setField(keyName, selected);

    const createPreview = (file: File) => ({ url: URL.createObjectURL(file), file }); 
    
    const newPreviews = field.multiple ? arr.map(createPreview) : createPreview(arr[0]);
    setField(`__preview_${keyName}`, newPreviews);
  };

  useEffect(() => {
    return () => {
      const prev = previews[`__preview_${keyName}`];
      if (prev) {
        const items = Array.isArray(prev) ? prev : [prev];
        items.forEach((p: any) => p?.url && URL.revokeObjectURL(p.url)); 
      }
    };
  }, [previews, keyName]);

  const currentFiles = data[keyName];
  const filesToShow = field.multiple
    ? (Array.isArray(currentFiles) ? currentFiles : [])
    : currentFiles ? [currentFiles as File] : [];

  return (
    <div className="mb-8">
      {field.label && <label className="block text-sm font-medium mb-3">{field.label}{field.required && <span className="text-danger ml-1">*</span>}</label>}
      <div
        onDragOver={e => { e.preventDefault(); setDrag(true); }}
        onDragLeave={e => { e.preventDefault(); setDrag(false); }}
        onDrop={e => { e.preventDefault(); setDrag(false); handleFiles(e.dataTransfer.files); setTouched(keyName); }}
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${drag ? "border-primary bg-primary/5" : "border-border hover:border-primary"}`}
      >
        <input
          type="file"
          multiple={field.multiple}
          accept={field.accept}
          onChange={e => { handleFiles(e.target.files); setTouched(keyName); }}
          onBlur={() => setTouched(keyName)}
          className="hidden"
          id={`file-${keyName}`}
        />
        <label htmlFor={`file-${keyName}`} className="cursor-pointer block">
          <CloudUpload className="w-16 h-16 mx-auto mb-4 text-muted" />
          <p className="text-xl font-medium">Drag & Drop वा क्लिक गर्नुहोस्</p>
          <p className="text-sm text-muted mt-2">{field.accept || "सबै प्रकारका फाइल"}</p>
        </label>
      </div>

      {filesToShow.length > 0 && (
        <div className="mt-6 space-y-3">
          {filesToShow.map((file: File, i: number) => (
            <div key={i} className="flex items-center gap-4 bg-surface border rounded-lg p-4">
              {file.type.startsWith("image/") ? (
                <img 
                  src={previews[`__preview_${keyName}`] && (field.multiple ? previews[`__preview_${keyName}`][i]?.url : previews[`__preview_${keyName}`]?.url)} 
                  alt="preview" 
                  className="w-16 h-16 object-cover rounded-lg" 
                />
              ) : (
                <FileText className="w-12 h-12 text-muted" />
              )}
              <div className="flex-1">
                <p className="font-medium truncate">{file.name}</p>
                <p className="text-sm text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button type="button" onClick={() => removeFile(keyName, field)} className="text-danger hover:bg-danger/10 rounded-full p-2 transition">
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ====================== HEADING COMPONENT ====================== */
const HeadingComponent: React.FC<{ level: 1 | 2 | 3 | 4 | 5 | 6; text: string; className?: string }> = ({ 
  level, 
  text, 
  className = "" 
}) => {
  switch (level) {
    case 1:
      return <h1 className={`text-2xl font-bold mb-6 ${className}`}>{text}</h1>;
    case 2:
      return <h2 className={`text-2xl font-bold mb-6 ${className}`}>{text}</h2>;
    case 3:
      return <h3 className={`text-2xl font-bold mb-6 ${className}`}>{text}</h3>;
    case 4:
      return <h4 className={`text-2xl font-bold mb-6 ${className}`}>{text}</h4>;
    case 5:
      return <h5 className={`text-2xl font-bold mb-6 ${className}`}>{text}</h5>;
    case 6:
      return <h6 className={`text-2xl font-bold mb-6 ${className}`}>{text}</h6>;
    default:
      return <h2 className={`text-2xl font-bold mb-6 ${className}`}>{text}</h2>;
  }
};

/* ====================== MAIN FORM ====================== */
const Form: React.FC<{
  schema: Schema;
  onSubmit: (data: Record<string, any>) => void;
  loading?: boolean;
  className?: string;
}> = ({ schema, onSubmit, loading = false, className = "" }) => {
  const [data, setData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [previews, setPreviews] = useState<Record<string, any>>({});

  // ✅ AUTO THEME SYSTEM फिर्ता थप्नुहोस्
  useEffect(() => {
    const theme = schema.theme || "auto";
    
    const applyTheme = () => {
      const isDark = theme === "dark" || (theme === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches);
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    };
    
    applyTheme();
    
    if (theme === "auto") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyTheme();
      mediaQuery.addEventListener("change", handleChange);
      
      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }
  }, [schema.theme]);

  const setField = useCallback((key: string, value: any) => {
    if (key.startsWith("__preview_")) {
      setPreviews(p => ({ ...p, [key]: value }));
    } else {
      setData(p => ({ ...p, [key]: value }));
      setErrors(p => ({ ...p, [key]: "" }));
    }
  }, []);

  const removeFile = useCallback((key: string, field: FileField) => {
    setField(key, field.multiple ? [] : null);
    
    const prev = previews[`__preview_${key}`];
    if (prev) {
      const items = Array.isArray(prev) ? prev : [prev];
      items.forEach((p: any) => p?.url && URL.revokeObjectURL(p.url));
    }
    
    setField(`__preview_${key}`, null);
  }, [setField, previews]);

  const handleSetTouched = useCallback((k: string) => {
    setTouched(p => ({ ...p, [k]: true }));
  }, []);

  const contextValue = useMemo<FormContextValue>(() => ({
    data, errors, touched, previews, setField,
    setTouched: handleSetTouched,
    removeFile,
  }), [data, errors, touched, previews, setField, removeFile, handleSetTouched]);

  const validate = () => {
    const err: Record<string, string> = {};
    Object.entries(schema.fields).forEach(([k, f]) => {
      if (f.condition && !f.condition(data)) return;
      const val = data[k];
      if (f.required && (!val || (Array.isArray(val) && val.length === 0))) {
        err[k] = `${f.label || k} आवश्यक छ`;
      }
      if (f.type === "email" && val && !/.+@.+\..+/.test(val as string)) {
        err[k] = "मान्य इमेल चाहिन्छ";
      }
    });
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const fields = Object.entries(schema.fields).map(([key, field]) => {
    if (field.hidden || (field.condition && !field.condition(data))) return null;

    if (field.type === "heading") {
      return (
        <HeadingComponent 
          key={key}
          level={(field as HeadingField).level} 
          text={(field as HeadingField).text} 
        />
      );
    }
    if (field.type === "description") return <p key={key} className="text-muted mb-6 text-sm">{(field as DescriptionField).text}</p>;
    if (field.type === "divider") return <hr key={key} className="my-10 border-border" />;
    if (field.type === "custom") {
      const C = (field as CustomField).component;
      return <C key={key} {...(field as CustomField).props} />;
    }
    if (field.type === "file") return <FileUpload key={key} field={field as FileField} keyName={key} />;

    return (
      <UniversalInput
        key={key}
        field={field as any}
        value={data[key] || ""}
        onValueChange={v => setField(key, v)}
        onBlur={() => handleSetTouched(key)}
        error={errors[key]}
        touched={touched[key]}
      />
    );
  });

  return (
    <FormContext.Provider value={contextValue}>
      <form onSubmit={e => { e.preventDefault(); validate() && onSubmit(data); }} className={`space-y-6 ${className}`}>
        {fields}
        <button 
          type="submit" 
          disabled={loading}
          className="filled primary md w-full py-2 text-lg font-medium hover:scale-105 transition-transform"
        >
          {loading ? "प्रक्रिया हुँदैछ..." : schema.submitText || "सबमिट गर्नुहोस्"}
        </button>
      </form>
    </FormContext.Provider>
  );
};

export default Form;
export { useForm };