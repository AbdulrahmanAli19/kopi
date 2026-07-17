# Kopi Menu Implementation Notes

## Menu data

Menu content lives in `app/lib/menu-data.ts`. Each category has a stable `id`, the original `sourceHeading` from `docs/MENU_ITEMS.md`, localized `name`, and an `items` array. Each menu item has a stable `id`, localized `name`, and numeric `price`. Descriptions and images are optional because neither was present in the available menu source.

## Translations

Interface copy, external links, and language options live in `app/lib/i18n.ts`. English is the default language. Arabic menu names were translated naturally from the English item names in `docs/MENU_ITEMS.md` because the Arabic column in that file is empty. Product and brand names such as Kopi, Nutella, Lotus, V60, Red Bull, and Italian menu terms are preserved or transliterated instead of being rewritten.

## Category mapping

Category buttons use the same stable IDs as the menu sections. The client component stores section refs by category ID, and each section uses `scroll-margin-top` so clicking a category scrolls the title below the sticky header and sticky category bar.

## Sticky navigation

`app/components/kopi-menu.tsx` measures the header and category bar with `ResizeObserver`, then writes `--kopi-header-height`, `--kopi-category-height`, and `--kopi-scroll-offset` onto the document. The category panel is sticky under the measured header height, and menu sections use the combined offset for reliable scroll alignment.

## Colors

The PDF `KOPI Menu-2.pdf` was rendered to PNGs with Poppler and sampled from the actual artwork. Theme variables in `app/globals.css` map to:

- `--kopi-primary: #4f332f`, from the SVG logo and the darkest PDF wordmark/body text.
- `--kopi-secondary` / `--kopi-accent: #a0806f`, from the PDF category headings and line icons.
- `--kopi-background: #f9f1e8`, from the warm parchment page background.
- `--kopi-surface: #fcf6ef`, from the lighter cream areas in the rendered pages.
- `--kopi-border: #e2d4c5`, chosen as a soft web companion to the PDF parchment texture.

## Logo

The source logo is `/Users/abdulrahman/Downloads/logo Kopi.svg`. It is copied into `public/logo-kopi.svg` for the header/footer and `app/icon.svg` for Next.js icon metadata. The header renders the SVG through `next/image` with a decorative alt because the wrapping link is already labelled; the footer renders it with `alt="Kopi"`.

## Adding a category or item

Add a category object to `menuCategories` in `app/lib/menu-data.ts`, choose a stable lowercase hyphenated `id`, set both English and Arabic names, and add item entries with stable IDs and prices. Do not duplicate JSX for a new language; the renderer selects localized values from the data.

## Assumptions

English item names and prices were copied from `docs/MENU_ITEMS.md`. Obvious display spellings such as “Dessert” and “Ice Coffee” are used for the user-facing category names, while the original source headings are retained in `sourceHeading`.
