import { ui, defaultLang } from './ui';

export type Lang = keyof typeof ui;
export type UIKey = keyof typeof ui[typeof defaultLang];

export function getLangFromUrl(url: URL) {
    const [, lang] = url.pathname.split('/');
    if (lang in ui) return lang as Lang;
    return defaultLang;
}

export function useTranslations(lang: Lang) {
    return function t(key: UIKey) {
        return ui[lang][key] || ui[defaultLang][key];
    }
}

const escapeHtml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Escapes a UI string and turns `*text*` into `<em>text</em>` for serif-italic accents. */
export function rich(text: string) {
    return escapeHtml(text).replace(/\*(.+?)\*/g, '<em>$1</em>');
}

/** Plain-text version of a `rich` string (for aria-labels, alt text…). */
export const plain = (text: string) => text.replace(/\*/g, '');

export const FOUNDED = 1996;
export const yearsSinceFounded = () => new Date().getFullYear() - FOUNDED;
