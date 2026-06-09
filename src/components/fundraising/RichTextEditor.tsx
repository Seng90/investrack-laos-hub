import { useEffect, useState } from "react";
import "react-quill-new/dist/quill.snow.css";

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link"],
    ["clean"],
  ],
};

const RichTextEditor = ({ value, onChange, placeholder }: Props) => {
  const [Quill, setQuill] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    import("react-quill-new").then((m) => {
      if (mounted) setQuill(() => m.default);
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (!Quill) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-md border border-input bg-background text-sm text-muted-foreground">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="rich-text-editor rounded-md border border-input bg-background">
      <Quill theme="snow" value={value} onChange={onChange} modules={modules} placeholder={placeholder} />
    </div>
  );
};

export default RichTextEditor;
