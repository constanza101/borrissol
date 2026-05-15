const WHATSAPP_BASE = 'https://wa.me/34673247520';
export const WHATSAPP_HREF = WHATSAPP_BASE;
export const waHref = (text: string) => `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`;
