"use client";

import Image from "next/image";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react";
import { copy, externalLinks, languageOptions } from "../lib/i18n";
import { menuCategories, totalMenuItems, type Language } from "../lib/menu-data";

type IconProps = ComponentPropsWithoutRef<"svg">;

const DEFAULT_LANGUAGE: Language = "en";
const LANGUAGE_STORAGE_KEY = "kopi-language";
const INITIAL_CATEGORY_ID = menuCategories[0]?.id ?? "";

function isLanguage(value: string | null): value is Language {
  return value === "en" || value === "ar";
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function MapPinIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M12 12.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function InstagramIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" {...props}>
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M17.2 6.9h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="2.3" />
    </svg>
  );
}

function ArrowIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function KopiLogo({ decorative = false }: { decorative?: boolean }) {
  return (
    <Image
      className="kopi-logo"
      src="/logo-kopi.svg"
      alt={decorative ? "" : "Kopi"}
      width={132}
      height={49}
      priority
    />
  );
}

export function KopiMenu() {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);
  const [activeCategory, setActiveCategory] = useState(INITIAL_CATEGORY_ID);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [stickyOffset, setStickyOffset] = useState(172);

  const headerRef = useRef<HTMLElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const categoryNavRef = useRef<HTMLElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const categoryButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const hasHydratedLanguageRef = useRef(false);
  const programmaticScrollRef = useRef(false);
  const programmaticScrollTimeoutRef = useRef<number | null>(null);

  const dir = language === "ar" ? "rtl" : "ltr";
  const t = copy[language];

  const itemSummary = useMemo(() => {
    const categoryLabel =
      menuCategories.length === 1 ? t.categoryCount : t.categoryCountPlural;
    const itemLabel = totalMenuItems === 1 ? t.itemCount : t.itemsCount;

    return `${menuCategories.length} ${categoryLabel} · ${totalMenuItems} ${itemLabel}`;
  }, [t.categoryCount, t.categoryCountPlural, t.itemCount, t.itemsCount]);

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

      hasHydratedLanguageRef.current = true;

      if (isLanguage(storedLanguage)) {
        setLanguage(storedLanguage);
      }
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;

    if (hasHydratedLanguageRef.current) {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    }
  }, [dir, language]);

  useEffect(() => {
    const updateHeaderState = () => {
      setHasScrolled(window.scrollY > 8);
    };

    let animationFrame = 0;
    const onScroll = () => {
      if (animationFrame) {
        return;
      }

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        updateHeaderState();
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    const categoryNav = categoryNavRef.current;

    if (!header || !categoryNav) {
      return;
    }

    let animationFrame = 0;
    const updateMeasurements = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        const headerHeight = Math.ceil(header.getBoundingClientRect().height);
        const categoryHeight = Math.ceil(categoryNav.getBoundingClientRect().height);
        const nextStickyOffset = headerHeight + categoryHeight;

        document.documentElement.style.setProperty("--kopi-header-height", `${headerHeight}px`);
        document.documentElement.style.setProperty("--kopi-category-height", `${categoryHeight}px`);
        document.documentElement.style.setProperty("--kopi-scroll-offset", `${nextStickyOffset}px`);
        setStickyOffset((currentOffset) =>
          currentOffset === nextStickyOffset ? currentOffset : nextStickyOffset,
        );
      });
    };

    updateMeasurements();

    const ResizeObserverConstructor = globalThis.ResizeObserver;

    if (typeof ResizeObserverConstructor === "undefined") {
      window.addEventListener("resize", updateMeasurements);

      return () => {
        window.cancelAnimationFrame(animationFrame);
        window.removeEventListener("resize", updateMeasurements);
      };
    }

    const resizeObserver = new ResizeObserverConstructor(updateMeasurements);
    resizeObserver.observe(header);
    resizeObserver.observe(categoryNav);
    window.addEventListener("resize", updateMeasurements);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateMeasurements);
    };
  }, [language]);

  useEffect(() => {
    const sections = menuCategories
      .map((category) => sectionRefs.current[category.id])
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0 || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (programmaticScrollRef.current) {
          return;
        }

        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              Math.abs(first.boundingClientRect.top - stickyOffset) -
              Math.abs(second.boundingClientRect.top - stickyOffset),
          )[0];

        const nextCategory = visibleEntry?.target.getAttribute("data-category-id");

        if (nextCategory) {
          setActiveCategory((currentCategory) =>
            currentCategory === nextCategory ? currentCategory : nextCategory,
          );
        }
      },
      {
        root: null,
        rootMargin: `-${stickyOffset + 12}px 0px -55% 0px`,
        threshold: [0, 0.12, 0.35, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [stickyOffset]);

  useEffect(() => {
    const activeButton = categoryButtonRefs.current[activeCategory];

    activeButton?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeCategory, language]);

  useEffect(() => {
    const shell = shellRef.current;
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    shell?.setAttribute("data-reveal-ready", "true");

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((element) => {
        element.dataset.visible = "true";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = "true";
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      shell?.removeAttribute("data-reveal-ready");
    };
  }, [language]);

  const handleLanguageChange = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
  };

  const handleCategorySelect = (categoryId: string) => {
    const section = sectionRefs.current[categoryId];

    if (!section) {
      return;
    }

    setActiveCategory(categoryId);
    programmaticScrollRef.current = true;
    section.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });

    if (programmaticScrollTimeoutRef.current) {
      window.clearTimeout(programmaticScrollTimeoutRef.current);
    }

    programmaticScrollTimeoutRef.current = window.setTimeout(
      () => {
        programmaticScrollRef.current = false;
      },
      prefersReducedMotion() ? 120 : 720,
    );
  };

  return (
    <div ref={shellRef} className="kopi-shell" dir={dir}>
      <a className="skip-link" href="#kopi-menu">
        {t.skipToMenu}
      </a>

      <header
        ref={headerRef}
        className={`site-header ${hasScrolled ? "site-header--scrolled" : ""}`}
      >
        <div className="site-header__inner">
          <a className="site-header__brand" href="#top" aria-label={t.brand}>
            <KopiLogo decorative />
          </a>

          <div className="site-header__actions" aria-label={t.headerMenu}>
            <a
              className="icon-link"
              href={externalLinks.maps}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.openLocation}
              title={t.location}
            >
              <MapPinIcon className="icon-link__icon" />
            </a>
            <a
              className="icon-link"
              href={externalLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.openInstagram}
              title={t.instagram}
            >
              <InstagramIcon className="icon-link__icon" />
            </a>
            <div className="language-switcher" aria-label={t.switchLanguage}>
              {languageOptions.map((option) => (
                <button
                  key={option.code}
                  className="language-switcher__button"
                  type="button"
                  data-active={language === option.code}
                  aria-pressed={language === option.code}
                  onClick={() => handleLanguageChange(option.code)}
                >
                  {option.code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main id="top" className="kopi-main">
        <section className="hero-section" data-reveal>
          <p className="hero-section__eyebrow">{t.heroEyebrow}</p>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroDescription}</p>
          <div className="hero-section__meta">
            <span>{itemSummary}</span>
          </div>
          <div className="hero-section__actions">
            <a
              className="action-link action-link--primary"
              href={externalLinks.maps}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPinIcon className="action-link__icon" />
              <span>{t.location}</span>
              <ArrowIcon className="action-link__arrow" />
            </a>
            <a
              className="action-link"
              href={externalLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon className="action-link__icon" />
              <span>{t.instagram}</span>
              <ArrowIcon className="action-link__arrow" />
            </a>
          </div>
        </section>

        <section ref={categoryNavRef} className="category-panel" aria-labelledby="categories-title">
          <div className="category-panel__inner">
            <div className="category-panel__heading">
              <h2 id="categories-title">{t.categoriesHeading}</h2>
              <span>{menuCategories.length}</span>
            </div>
            <nav className="category-scroll" aria-label={t.categoriesLabel} dir={dir}>
              {menuCategories.map((category) => {
                const isActive = activeCategory === category.id;

                return (
                  <button
                    key={category.id}
                    ref={(element) => {
                      categoryButtonRefs.current[category.id] = element;
                    }}
                    className="category-button"
                    type="button"
                    data-active={isActive}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <span className="category-button__dot" aria-hidden="true" />
                    <span>{category.name[language]}</span>
                    {isActive ? <span className="sr-only">, {t.currentCategory}</span> : null}
                  </button>
                );
              })}
            </nav>
          </div>
        </section>

        <section id="kopi-menu" className="menu-list" aria-labelledby="menu-title">
          <div className="menu-list__title">
            <p>{t.heroEyebrow}</p>
            <h2 id="menu-title">{t.menuHeading}</h2>
          </div>

          {menuCategories.map((category) => (
            <section
              key={category.id}
              id={category.id}
              ref={(element) => {
                sectionRefs.current[category.id] = element;
              }}
              className="menu-section"
              data-category-id={category.id}
              data-reveal
              aria-labelledby={`${category.id}-title`}
            >
              <div className="menu-section__header">
                <div>
                  <p>{t.categoryEyebrow}</p>
                  <h3 id={`${category.id}-title`}>{category.name[language]}</h3>
                </div>
                <span>
                  {category.items.length}{" "}
                  {category.items.length === 1 ? t.itemCount : t.itemsCount}
                </span>
              </div>

              {category.items.length > 0 ? (
                <div className="menu-grid">
                  {category.items.map((menuItem) => (
                    <article key={menuItem.id} className="menu-card" data-reveal>
                      <div className="menu-card__content">
                        <h4>{menuItem.name[language]}</h4>
                        {menuItem.description ? (
                          <p>{menuItem.description[language]}</p>
                        ) : null}
                      </div>
                      <div className="menu-card__price" aria-label={`${menuItem.price} ${t.priceUnit}`}>
                        <bdi>
                          {menuItem.price} {t.priceUnit}
                        </bdi>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="empty-state">{t.emptyCategory}</p>
              )}
            </section>
          ))}
        </section>
      </main>

      <footer className="site-footer">
        <KopiLogo />
        <p>{t.footerTagline}</p>
        <p>{t.footerNote}</p>
        <div className="site-footer__links">
          <a href={externalLinks.maps} target="_blank" rel="noopener noreferrer">
            {t.location}
          </a>
          <a href={externalLinks.instagram} target="_blank" rel="noopener noreferrer">
            {t.instagram}
          </a>
        </div>
      </footer>
    </div>
  );
}
