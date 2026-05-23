# Digital Presence Audit — Borrissol Espai Creatiu

**Business:** Textile craft workshop (tufting, punch needle, needle felting, loom weaving), Carrer de Sant Antoni 17, baix, 08301 Mataró, Barcelona. Founded by Belén Vilanova.
**Audited:** May 2026

---

## 1. Website — borrissol.com

### What works well

The site is a clean, focused single-page application built with four language variants (CA root, `/es`, `/en`, `/fr`). The structure is logical and conversion-oriented:

- Navigation: Serveis → Tallers → Procés → Nosaltres → FAQ → Contacte
- H1: "Art que connecta" — short, distinctive, memorable
- Hero tagline contains the three money keywords: **tufting + brodats + Mataró**
- The five-step process section ("De zero a la teva peça pròpia") reduces anxiety for first-timers — well executed UX
- WhatsApp-first booking is appropriate for the audience and reduces friction
- Pricing is fully transparent and tiered clearly (Pelusa 78€ → Pelut 181€)
- Summer lab program signals year-round programming
- Sustainability angle (Fiber Fever recycled acrylic) provides genuine differentiation
- The French page reads like professional translation, not machine output — unusual quality for a studio this size

### Issues and gaps

// TODO
**Single-page, one URL per language.** Google's index returns only one result for `site:borrissol.com`. There are no subpages: no individual workshop pages, no blog, no press page, no team page. This is the single biggest SEO liability. Every workshop (Pelusa, Floc, Vellut, etc.) that has its own URL could rank independently for long-tail searches like "taller tufting 4 hores Mataró" or "tufting workshop beginner Barcelona."

**No sitemap per-page hreflang.** The `sitemap-0.xml` lists 4 URLs but without hreflang cross-references. Google cannot confirm the language relationship between `/`, `/es`, `/en`, `/fr` from the sitemap alone.

**Contact email is a Gmail address** (`borrissolespaicreatiu@gmail.com`). For a business with a custom domain, this erodes professionalism. A `hola@borrissol.com` address would cost nothing extra on most hosts.

**No booking system.** All reservations go through WhatsApp. This is fine for conversions but creates a bottleneck: no availability calendar, no automated confirmation, no ability to sell gift vouchers online, and no email list capture.

**No blog or content section.** Zero editorial content means zero ongoing indexability and no way to appear for informational queries like "qué es el tufting," "taller tufting regalo Barcelona," or "cómo se hace una alfombra de tufting." *(Blog implemented May 2026 — first post live in local dev.)*

**No press/media section.** Belén did a MataróTV interview — there is no record of it on the site. This is a missed backlink and credibility signal.

### Calls to action

Primary CTA is "Reservar" / "Reserva la teva plaça" (WhatsApp). Secondary is "Consultar." Both are consistent. However, there is no CTA for gift cards, no newsletter signup, and no corporate/team building dedicated landing page despite offering group workshops.

---

## 2. SEO

### Current state

**Google index: 1 page.** A `site:borrissol.com` search returns a single result. The entire website — four languages — is treated as one indexable entity.

**Page titles (confirmed across languages):**
- CA: "Taller d'Art a Mataró · Tufting i Team Building · Borrissol"
- ES: "Taller de Arte en Mataró · Tufting y Team Building · Borrissol"
- EN: "Art Workshop in Mataró · Tufting & Team Building · Borrissol"
- FR: "Atelier d'Art Mataró · Tufting & Team Building · Borrissol"

These are solid — city + technique + use case + brand.

**Organic ranking signals:**
- Borrissol.com appears as the first result for "taller tufting Mataró" — effectively the only result, since Warmi is in Premiá de Mar and all others are in central Barcelona. Borrissol owns this niche.
- For "tufting Barcelona" or "taller tufting Barcelona," Borrissol competes against 6–8 well-established operators, most with more content, more pages, and platform listings (Fever, GetYourGuide, Bookwhen).
- No evidence of any press backlinks, directory listings (TripAdvisor, Yelp, GetYourGuide), or citation-building.

**Technical SEO (confirmed OK):**
- `robots.txt` well-configured: `Allow: /`, sitemap declared at `/sitemap-index.xml`, social crawlers explicitly permitted
- JSON-LD structured data implemented (Organization, ImageObject with dimensions, logo)
- GA4 implemented with Consent Mode v2

**Missing SEO assets:**
- No individual landing pages per workshop
- No schema type for `LocalBusiness` with operating hours
- Not listed on GetYourGuide, Viator, or Fever — all three rank well for "tufting workshop Barcelona"

---

## 3. Social Media

### Instagram — @borrissol_espai_creatiu

- Account indexed and active in Google results
- Brand voice across the website is warm, process-oriented, and anti-perfectionist — if this carries through to Instagram, it maps well to the platform's craft community

**What should be happening:** Tufting is highly visual and extremely viral on Instagram and TikTok. Competitors like TUTU Studio, Gomyrug, and Warmi (3,450 followers) have built audiences through before/after videos, time-lapses of rug creation, and "POV: you just took a tufting class" Reels. If Borrissol is not producing Reels consistently, it is leaving the most cost-effective discovery channel on the table.

### TikTok — @borrissol_espai_creatiu

The brand handle matches Instagram (good). TikTok's algorithm is uniquely favorable to local creative businesses showing process content — a single video of a tufting gun going through fabric can reach tens of thousands of organic views with no paid promotion.

Relevant: TUTU Studio Barcelona runs active TikTok content (`@tutustudiobcn`) and drives bookings directly from it.

### Content strategy note

The business name "Borrissol" (Catalan for "fluff" / fiber nap) is distinctive and memorable but not self-explanatory. Content should be doing the translation work — showing what tufting is, what the studio looks like, who Belén is. A founder-led presence (Belén on camera explaining techniques, showing her workspace, reacting to student results) would be highly differentiated in this space where most competitors show the product but not the person.

---

## 4. Google Business Profile

**Status: Cannot confirm a verified GBP exists.** The website links to "Veure totes les ressenyes a Google Maps" suggesting a Maps listing exists, and testimonials on the site are attributed to Google Maps reviews (Carmen, Gerard A., and others — genuine and specific, not marketing copy). However, no star rating / review count surfaced in Google's search results for the brand name.

**Risks if GBP is incomplete:**
- No hours shown in Google Search / Maps
- No photos from the business owner
- No service categories properly set (e.g., "Art Studio," "Workshop," "Team Building")
- No Q&A section moderated

**If GBP is not yet claimed and verified, this is an immediate priority.** Claiming it costs nothing, takes 1–2 weeks for verification, and a complete profile with photos, posts, and service listings directly increases conversion from local search.

---

## 5. Competitor Landscape

### Direct competitors (tufting, same region)

| Studio | Location | Format | Price | Booking | Differentiator |
|---|---|---|---|---|---|
| **Warmi Casa Taller** | Premiá de Mar (15 min) | Tufting + commissions | n/a | Instagram DM | Nearest geographic competitor; 3,450 IG followers |
| **TUTU Studio** | Barcelona Eixample + Valencia | 1.5–2.5h sessions | From €35 | Online | Fever-listed, birthday positioning, TikTok active |
| **Gomyrug** | Echo Club Textil, Barcelona | 4h session | n/a | WhatsApp | Manufacturer + teacher, strong online presence |
| **Twee Muizen @ Duduá** | Gràcia, Barcelona | 4.5h | €125 | Online | Physical store, established brand |
| **Julie (JÜdesigns) @ Subcultours** | El Born, Barcelona | 4h | €149–162 | Bookwhen | Tourist-facing, English-first, press coverage |
| **Kozze Studio** | Barcelona | Custom + workshops | n/a | Email | Design-forward |
| **María de la Araujo** | Barcelona | Workshop + commissions | n/a | Website | Artist-brand |

### Competitive summary

**Borrissol has a near-monopoly on tufting in Mataró and the Maresme coast.** Its closest competitor (Warmi) is in the same comarca but has a different model (commissions-first, not workshop-first). Every other active tufting studio is in central Barcelona, 40+ minutes away by train. For anyone in Mataró, Badalona, Premià, Masnou, Granollers, or the northern coast corridor, Borrissol is the only nearby option.

---

## 6. Opportunities — Prioritized

### Immediate (0–3 months)

- [ ] **Claim and complete Google Business Profile.** Add photos, correct hours, post weekly updates. Improves local pack visibility for "taller tufting Mataró" and "actividades Mataró."
- [ ] **List on Fever and/or GetYourGuide.** Fever lists TUTU Studio and drives direct bookings. A Borrissol listing would appear alongside Barcelona city studios when people search for "tufting workshop Barcelona." Fever takes ~25–30% commission but drives volume.
- [ ] **Replace Gmail with a professional email** at borrissol.com — e.g. `hola@borrissol.com`. Takes 15 minutes on any decent host.
- [ ] **Fix sitemap hreflang** to explicitly declare language relationships between the four pages.

### Short-term (3–6 months)

- [ ] **Add individual workshop landing pages.** Each workshop variant (Pelusa, Floc, Vellut, Pelut, Tote Bag, Laboratori d'Estiu, Group) should have its own URL. This multiplies indexable pages from 4 to 32+ and allows each to rank for different query types.
- [x] **Publish blog articles.** *(Blog implemented May 2026.)* Target informational queries: "qué es el tufting," "ideas para team building creativo Barcelona," "taller manualidades cumpleaños Mataró," "diferencia tufting punch needle."
- [ ] **Corporate/team building landing page.** A dedicated `/team-building` page optimized for "actividad team building Mataró" and "taller creativo empresa Barcelona" captures B2B demand (10+ people at €78+ each — much higher average order value).
- [ ] **Gift card / voucher system.** Online-purchasable gift cards (even via a simple Stripe link) convert gift-intent visitors who can't or won't use WhatsApp to commit.

### Medium-term (6–12 months)

- [ ] **Press and partnership outreach.** MataróTV has already covered the studio. Next targets: Nacext, Vilaweb, local Maresme lifestyle blogs, TimeOut Barcelona, Domestika. One article generates backlinks and sustained discovery traffic.
- [ ] **Domestika / Skillshare online course.** Belén could teach a punch needle or tufting intro course online. Even a free mini-course builds an email list and extends brand reach beyond Mataró.
- [ ] **Email newsletter / WhatsApp broadcast list.** Past students are the warmest possible audience for repeat bookings and referrals. No capture mechanism exists today.

---

## 7. Risks

- **Single-page architecture.** If the site goes down or is penalized, all organic discovery stops immediately. More pages = resilience.
- **WhatsApp-only conversion.** If Belén's phone is unavailable, the business is unreachable. No fallback booking system, no automated availability, no async option for international visitors.
- **Platform dependency (Instagram/TikTok).** An account suspension or algorithm change has outsized impact. Email list and direct Google traffic are the only platform-independent channels.
- **Founder dependency.** All testimonials praise Belén by name. She is the product. If she is unavailable, the business pauses — structural risk for scaling or delegation.
- **Single physical location, no online revenue.** If the studio space becomes unavailable, there is no online income stream.
- **Seasonality.** Workshop attendance is likely strongest in autumn–spring. Summer tourism could help (French visitors, Lab program). December–January and August could be structural low points.

---

## 8. Challenges

- **Niche market ceiling.** Mataró has ~130,000 residents. The addressable audience for a textile craft workshop at €78–181 is a subset. Growth requires capturing the Maresme/Barcelona catchment, corporate B2B clients, or repeat customers — the current model has limited mechanisms for all three.
- **Price sensitivity.** At €78–181, Borrissol is priced at a premium relative to TUTU Studio's €35/person group format. This is defensible (longer sessions, personal instruction, better technique range) but requires content and social proof to justify it.
- **Discoverability gap.** Most people search "manualidades Barcelona," "actividad original Mataró," "regalo experiencia Barcelona" — not "tufting." Content and listings need to bridge this gap by leading with the experience, not the technique name.
