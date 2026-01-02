import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { ID_LOCALE } from "../locale/id";
import { EN_LOCALE } from "../locale/en";

type Language = "en" | "id";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const translations = {
  en: EN_LOCALE,
  id: ID_LOCALE,
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // 1. Precise Language Extraction
  const language = useMemo((): Language => {
    const segment = pathname.split("/")[1];
    return segment === "en" ? "en" : "id";
  }, [pathname]);

  // 2. Secure Path Transformation
  const setLanguage = (newLang: Language) => {
    if (newLang === language) return;

    // Remove existing language prefix securely
    const cleanPath = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
    const targetPath =
      newLang === "en" ? `/en${cleanPath === "/" ? "" : cleanPath}` : cleanPath;

    navigate(targetPath);
  };
const t = (path: string): string => {
  if (!path) return "";

  const keys = path.split(".");
  let current: any = translations[language];

  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = current[key];
    } else {
      // Jika path tidak ditemukan, kembalikan key aslinya agar
      // Anda tahu bagian mana yang belum terjemah (debugging)
      console.warn(`Translation key not found: ${path}`);
      return path;
    }
  }

  // Pastikan hasil akhirnya adalah string, bukan objek
  return typeof current === "string" ? current : path;
};
  // 3. Side Effects (SEO & Meta)
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t("meta.title");

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", t("meta.description"));

    updateAlternateLinks(pathname, language);
  }, [language, pathname]); // Removed 't' from deps to avoid infinite loops if translations are dynamic

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Helper function updated
function updateAlternateLinks(currentPath: string, currentLang: Language) {
  document
    .querySelectorAll('link[rel="alternate"]')
    .forEach((link) => link.remove());

  // FIX 3: Terapkan regex yang sama aman-nya di sini
  const pathWithoutLang = currentPath.replace(/^\/en(?=\/|$)/, "") || "/";

  const idPath = pathWithoutLang;
  const enPath = "/en" + (pathWithoutLang === "/" ? "" : pathWithoutLang);

  const baseUrl = window.location.origin;

  const idLink = document.createElement("link");
  idLink.rel = "alternate";
  idLink.hreflang = "id";
  idLink.href = baseUrl + idPath;
  document.head.appendChild(idLink);

  const enLink = document.createElement("link");
  enLink.rel = "alternate";
  enLink.hreflang = "en";
  enLink.href = baseUrl + enPath;
  document.head.appendChild(enLink);

  const defaultLink = document.createElement("link");
  defaultLink.rel = "alternate";
  defaultLink.hreflang = "x-default";
  defaultLink.href = baseUrl + idPath;
  document.head.appendChild(defaultLink);

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", baseUrl + currentPath);
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}


export const getLocalizedPath = (path: string, currentLang: string) => {
  // Jika bahasa Indonesia, biarkan path apa adanya
  if (currentLang === "id") return path;

  // Jika bahasa Inggris, tambahkan /en di depan path (pastikan tidak double slash)
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `/en${cleanPath === "/" ? "" : cleanPath}`;
};