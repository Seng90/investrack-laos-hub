import DOMPurify from "dompurify";

const CONFIG: DOMPurify.Config = {
  ALLOWED_TAGS: [
    "p", "br", "strong", "em", "u", "s", "blockquote", "code", "pre",
    "h1", "h2", "h3", "h4", "ul", "ol", "li", "a", "span",
  ],
  ALLOWED_ATTR: ["href", "target", "rel", "class"],
  ALLOWED_URI_REGEXP: /^(?:https?:|mailto:|tel:|#|\/)/i,
};

export const sanitizeHtml = (dirty: string): string => {
  const clean = DOMPurify.sanitize(dirty ?? "", CONFIG) as unknown as string;
  // Force external links to be safe
  return clean.replace(/<a /g, '<a rel="noopener noreferrer nofollow" target="_blank" ');
};
