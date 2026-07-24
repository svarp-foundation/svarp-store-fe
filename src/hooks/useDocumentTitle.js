import { useEffect } from "react";

export function useDocumentTitle(title) {
  useEffect(() => {
    const defaultTitle = "SVARP BODY WELLNESS LLP";
    document.title = title ? `${title} | SVARP Body Wellness` : defaultTitle;

    return () => {
      document.title = defaultTitle;
    };
  }, [title]);
}
