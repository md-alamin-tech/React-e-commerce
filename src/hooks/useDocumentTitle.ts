/**
 * useDocumentTitle Hook
 * Updates document.title and meta descriptions dynamically for basic SEO.
 *
 * @param title - page specific title
 * @param description - optional meta description
 */

import { useEffect } from 'react';

export function useDocumentTitle(title: string, description?: string): void {
  useEffect(() => {
    const fullTitle = `${title} | Belké Market`;
    document.title = fullTitle;

    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }
  }, [title, description]);
}
