import { KopiMenu } from "./components/kopi-menu";
import { externalLinks } from "./lib/i18n";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: "Kopi",
    hasMap: externalLinks.maps,
    sameAs: [externalLinks.instagram],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <KopiMenu />
    </>
  );
}
