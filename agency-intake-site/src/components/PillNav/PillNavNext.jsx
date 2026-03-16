/*
  Modified from https://reactbits.dev/default/ for Next.js compatibility
*/

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { gsap } from "gsap";
import { useBackground } from "@/contexts/BackgroundContext";
import "./PillNav.css";

/**
 * @typedef {Object} PillNavItem
 * @property {string} href
 * @property {string} label
 * @property {string} [ariaLabel]
 * @property {PillNavItem[]} [children]
 */

/**
 * @typedef {Object} PillNavProps
 * @property {import('react').ReactNode | string} logo
 * @property {string} [logoAlt]
 * @property {PillNavItem[]} items
 * @property {PillNavItem[]} [desktopItems]
 * @property {string} activeHref
 * @property {string} [className]
 * @property {string} [ease]
 * @property {string} [baseColor]
 * @property {string} [pillColor]
 * @property {string} [hoveredPillTextColor]
 * @property {string} [pillTextColor]
 * @property {string} [logoHref]
 * @property {() => void} [onMobileMenuClick]
 * @property {boolean} [initialLoadAnimation]
 * @property {import('react').ReactNode} [rightListItem]
 * @property {import('react').ReactNode} [slotItem]
 * @property {number|null} [slotIndex]
 * @property {import('react').ReactNode} [slotAfterNode]
 * @property {import('react').ReactNode} [rightSlot]
 * @property {import('react').ReactNode} [leftSlot]
 * @property {boolean} [sticky]
 * @property {number} [topOffset]
 */

/** @param {PillNavProps} props */
const PillNav = ({
  logo,
  items,
  desktopItems,
  activeHref,
  className = "",
  ease = "power3.easeOut",
  baseColor = "#fff",
  pillColor = "#060010",
  hoveredPillTextColor = "#060010",
  pillTextColor,
  logoHref,
  onMobileMenuClick,
  initialLoadAnimation = true,
  rightListItem = null,
  slotItem,
  slotIndex,
  slotAfterNode = null,
  rightSlot,
  leftSlot,
  sticky = true,
  topOffset = 14,
}) => {
  const { getButtonColor } = useBackground();
  const submenuBaseId = useId();
  const desktopNavItems = desktopItems ?? items;
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openDropdownHref, setOpenDropdownHref] = useState(null);
  const circleRefs = useRef([]);
  const tlRefs = useRef([]);
  const activeTweenRefs = useRef([]);
  const hamburgerRef = useRef(null);
  const mobileOverlayRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileListRef = useRef(null);
  const navItemsRef = useRef(null);
  const logoRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta =
          Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector(".pill-label");
        const white = pill.querySelector(".pill-label-hover");

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(
          circle,
          { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" },
          0,
        );

        if (label) {
          tl.to(
            label,
            { y: -(h + 8), duration: 2, ease, overwrite: "auto" },
            0,
          );
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(
            white,
            { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" },
            0,
          );
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener("resize", onResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    const menu = mobileMenuRef.current;
    const overlay = mobileOverlayRef.current;
    if (overlay) {
      gsap.set(overlay, { visibility: "hidden", opacity: 0 });
    }
    if (menu) {
      gsap.set(menu, { xPercent: 100, opacity: 1 });
    }

    if (initialLoadAnimation) {
      const logo = logoRef.current;
      const navItems = navItemsRef.current;

      if (logo) {
        gsap.set(logo, { scale: 0 });
        gsap.to(logo, {
          scale: 1,
          duration: 0.6,
          ease,
        });
      }

      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: "hidden" });
        gsap.to(navItems, {
          width: "auto",
          duration: 0.6,
          ease,
          onComplete: () => {
            gsap.set(navItems, { clearProps: "width,overflow" });
          },
          onInterrupt: () => {
            gsap.set(navItems, { clearProps: "width,overflow" });
          },
        });
      }
    }

    return () => window.removeEventListener("resize", onResize);
  }, [desktopNavItems, ease, initialLoadAnimation]);

  useEffect(() => {
    setIsMounted(true);

    // Detect mobile viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Listen for resize events
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Lock/unlock body scroll when pill mobile menu opens/closes
  useEffect(() => {
    if (typeof document === "undefined") return;
    const body = document.body;
    const previousOverflow = body.style.overflow;
    if (isMobileMenuOpen) {
      body.style.overflow = "hidden";
    }
    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  // Close menu on route changes to avoid persistent scroll lock
  useEffect(() => {
    if (isMobileMenuOpen) {
      forceCloseMobileMenu();
    }
  }, [activeHref]);

  useEffect(() => {
    setOpenDropdownHref(null);
  }, [activeHref, isMobile]);

  // Add click outside handler to close mobile menu
  useEffect(() => {
    if (!isMobileMenuOpen || !isMounted) return;

    const handleClickOutside = (event) => {
      const hamburger = hamburgerRef.current;
      const menu = mobileMenuRef.current;

      // Don't close if clicking on the hamburger button itself
      if (hamburger && hamburger.contains(event.target)) {
        return;
      }

      // Don't close if clicking inside the mobile menu
      if (menu && menu.contains(event.target)) {
        return;
      }

      // Close the menu if clicking outside
      forceCloseMobileMenu();
    };

    // Use a small delay to prevent immediate closure from the same click that opened the menu
    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleClickOutside, { passive: true });
      document.addEventListener("touchstart", handleClickOutside, {
        passive: true,
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMobileMenuOpen, isMounted]);

  useEffect(() => {
    if (!openDropdownHref || isMobile || !isMounted) return;

    const handlePointerDown = (event) => {
      const target = event.target;
      if (target.closest("[data-pill-dropdown]")) {
        return;
      }
      setOpenDropdownHref(null);
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setOpenDropdownHref(null);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [openDropdownHref, isMobile, isMounted]);

  // Add escape key handler to close mobile menu
  useEffect(() => {
    if (!isMobileMenuOpen || !isMounted) return;

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        forceCloseMobileMenu();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isMobileMenuOpen, isMounted]);

  // Handle clicks on background customization elements that should close the mobile menu
  useEffect(() => {
    if (!isMobileMenuOpen || !isMounted) return;

    const handleBackgroundCustomizationClick = (event) => {
      // Check if the click is on a background customization element
      const target = event.target;
      const isBackgroundButton =
        target.closest("[data-background-customization]") ||
        target.closest(".background-slider") ||
        target.closest("[data-background]") ||
        target.closest(".style-selector");

      if (isBackgroundButton) {
        // Close the mobile menu when background customization is clicked
        forceCloseMobileMenu();
      }
    };

    // Use a small delay to ensure the event listener is added after the current click event
    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleBackgroundCustomizationClick, {
        passive: true,
      });
    }, 50);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleBackgroundCustomizationClick);
    };
  }, [isMobileMenuOpen, isMounted]);

  // Force close mobile menu function for external use
  const forceCloseMobileMenu = () => {
    if (!isMobileMenuOpen) return;

    setIsMobileMenuOpen(false);

    // Reset menu state
    const menu = mobileMenuRef.current;
    const overlay = mobileOverlayRef.current;
    if (menu) {
      gsap.killTweensOf(menu);
      gsap.set(menu, { xPercent: 100, opacity: 1 });
    }
    if (overlay) {
      gsap.killTweensOf(overlay);
      gsap.set(overlay, { visibility: "hidden", opacity: 0 });
    }
  };

  const handleEnter = (i) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: "auto",
    });
  };

  const handleLeave = (i) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: "auto",
    });
  };

  // [Modified] Toggle animation for wrapped menu
  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;

    // Prevent rapid toggling that could cause state inconsistencies
    if (newState && isMobileMenuOpen) return;
    if (!newState && !isMobileMenuOpen) return;

    setIsMobileMenuOpen(newState);

    const overlay = mobileOverlayRef.current;
    const menu = mobileMenuRef.current;
    const list = mobileListRef.current;

    if (overlay && menu) {
      if (newState) {
        gsap.killTweensOf(overlay);
        gsap.killTweensOf(menu);
        gsap.set(overlay, { visibility: "visible", opacity: 0 });
        gsap.set(menu, { xPercent: 100, opacity: 1 });

        const tl = gsap.timeline({ defaults: { overwrite: "auto" } });
        tl.to(overlay, { opacity: 1, duration: 0.28, ease: "power2.out" }, 0);
        tl.to(menu, { xPercent: 0, duration: 0.42, ease: "power3.out" }, 0);

        if (list) {
          const links = list.querySelectorAll(
            ".pill-mobile-link, .pill-mobile-sublink",
          );
          if (links && links.length) {
            gsap.set(links, { opacity: 0, x: 24 });
            tl.to(
              links,
              {
                opacity: 1,
                x: 0,
                duration: 0.3,
                stagger: 0.04,
                ease: "power2.out",
              },
              0.1,
            );
          }
        }
      } else {
        gsap.killTweensOf(overlay);
        gsap.killTweensOf(menu);
        const tl = gsap.timeline({ defaults: { overwrite: "auto" } });
        tl.to(
          menu,
          {
            xPercent: 100,
            duration: 0.24,
            ease: "power2.in",
          },
          0,
        );
        tl.to(
          overlay,
          {
            opacity: 0,
            duration: 0.2,
            ease: "power2.out",
            onComplete: () => {
              gsap.set(overlay, { visibility: "hidden" });
            },
          },
          0.04,
        );
      }
    }

    onMobileMenuClick?.();
  };

  const isExternalLink = (href) =>
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#");

  const isRouterLink = (href) => href && !isExternalLink(href);

  const isItemCurrent = (item) => activeHref === item?.href;

  const isItemActive = (item) => {
    if (!item?.href) return false;
    if (isItemCurrent(item)) return true;
    if (item.href !== "/" && activeHref?.startsWith(`${item.href}/`))
      return true;
    return item.children?.some((child) => isItemActive(child)) ?? false;
  };

  const renderPillLabel = (item, i, showCaret = false) => (
    <>
      <span
        className="hover-circle"
        aria-hidden="true"
        ref={(el) => {
          circleRefs.current[i] = el;
        }}
      />
      <span className="label-stack">
        <span className="pill-label">{item.label}</span>
        <span className="pill-label-hover" aria-hidden="true">
          {item.label}
        </span>
      </span>
      {showCaret ? (
        <span className="pill-caret pill-caret-inline" aria-hidden="true">
          +
        </span>
      ) : null}
    </>
  );

  const cssVars = {
    ["--base"]: baseColor,
    ["--pill-bg"]: pillColor,
    ["--hover-text"]: hoveredPillTextColor,
    ["--pill-text"]: resolvedPillTextColor,
  };

  const containerStyle = sticky
    ? {
        position: "fixed",
        top: `${topOffset}px`,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: "var(--z-nav)",
        width: "max-content",
      }
    : {
        position: "static",
        top: "auto",
        left: "auto",
        transform: "none",
        margin: "0 auto",
        width: "max-content",
        marginTop: `${topOffset}px`,
      };

  return (
    <div
      className={`pill-nav-container${isMobileMenuOpen ? " menu-open" : ""}`}
      style={containerStyle}
    >
      <nav
        className={`pill-nav ${className}`}
        aria-label="Primary navigation"
        style={cssVars}
        role="navigation"
      >
        {/* Logo - Only render on desktop */}
        {!isMobile && (
          <>
            {isRouterLink(logoHref ?? items?.[0]?.href) ? (
              <Link
                className="pill-logo"
                href={logoHref ?? items[0].href}
                aria-label="Home - Navigate to homepage"
                role="menuitem"
                tabIndex={0}
                ref={(el) => {
                  logoRef.current = el;
                }}
              >
                <span className="logo-text">{logo}</span>
              </Link>
            ) : (
              <a
                className="pill-logo"
                href={(logoHref ?? items?.[0]?.href) || "#"}
                aria-label="Home - Navigate to homepage"
                tabIndex={0}
                ref={(el) => {
                  logoRef.current = el;
                }}
              >
                <span className="logo-text">{logo}</span>
              </a>
            )}
          </>
        )}

        {/* Left Slot - Only render on desktop */}
        {!isMobile && leftSlot ? (
          <div className="pill-left-slot">{leftSlot}</div>
        ) : null}

        {/* Desktop Navigation - Only render on desktop */}
        {!isMobile && (
          <div className="pill-nav-items desktop-only" ref={navItemsRef}>
            <ul className="pill-list" role="menubar">
              {desktopNavItems.map((item, i) => (
                <li key={item.href || `item-${i}`} role="none">
                  {typeof slotIndex === "number" &&
                  i === slotIndex &&
                  slotItem ? (
                    <>
                      <div role="none" style={{ display: "inline-block" }}>
                        {slotItem}
                      </div>
                      {slotAfterNode ? (
                        <div
                          role="none"
                          className="pill-selector-inline"
                          style={{ display: "inline-block" }}
                        >
                          {slotAfterNode}
                        </div>
                      ) : null}
                    </>
                  ) : null}
                  <div
                    className={`pill-dropdown${item.children?.length ? " has-children" : ""}${openDropdownHref === item.href ? " is-open" : ""}`}
                    data-pill-dropdown={item.href}
                  >
                    {item.children?.length ? (
                      isRouterLink(item.href) ? (
                        <Link
                          role="menuitem"
                          href={item.href}
                          className={`pill pill-dropdown-trigger${isItemActive(item) ? " is-active" : ""}`}
                          onMouseEnter={() => {
                            handleEnter(i);
                            setOpenDropdownHref(item.href);
                          }}
                          onMouseLeave={() => {
                            handleLeave(i);
                            setOpenDropdownHref(null);
                          }}
                          aria-label={item.ariaLabel || item.label}
                          aria-haspopup="menu"
                          aria-expanded={openDropdownHref === item.href}
                          aria-controls={`${submenuBaseId}-${i}`}
                          style={
                            isItemActive(item)
                              ? {
                                  backgroundColor: getButtonColor(),
                                  color: "#ffffff",
                                }
                              : {}
                          }
                        >
                          {renderPillLabel(item, i, true)}
                        </Link>
                      ) : (
                        <a
                          role="menuitem"
                          href={item.href}
                          className={`pill pill-dropdown-trigger${isItemActive(item) ? " is-active" : ""}`}
                          onMouseEnter={() => {
                            handleEnter(i);
                            setOpenDropdownHref(item.href);
                          }}
                          onMouseLeave={() => {
                            handleLeave(i);
                            setOpenDropdownHref(null);
                          }}
                          aria-label={item.ariaLabel || item.label}
                          aria-haspopup="menu"
                          aria-expanded={openDropdownHref === item.href}
                          aria-controls={`${submenuBaseId}-${i}`}
                          style={
                            isItemActive(item)
                              ? {
                                  backgroundColor: getButtonColor(),
                                  color: "#ffffff",
                                }
                              : {}
                          }
                        >
                          {renderPillLabel(item, i, true)}
                        </a>
                      )
                    ) : isRouterLink(item.href) ? (
                      <Link
                        role="menuitem"
                        href={item.href}
                        className={`pill${isItemActive(item) ? " is-active" : ""}`}
                        aria-label={item.ariaLabel || item.label}
                        aria-current={isItemCurrent(item) ? "page" : undefined}
                        onMouseEnter={() => handleEnter(i)}
                        onMouseLeave={() => handleLeave(i)}
                        tabIndex={0}
                        style={
                          isItemActive(item)
                            ? {
                                backgroundColor: getButtonColor(),
                                color: "#ffffff",
                              }
                            : {}
                        }
                      >
                        {renderPillLabel(item, i)}
                      </Link>
                    ) : (
                      <a
                        role="menuitem"
                        href={item.href}
                        className={`pill${isItemActive(item) ? " is-active" : ""}`}
                        aria-label={item.ariaLabel || item.label}
                        aria-current={isItemCurrent(item) ? "page" : undefined}
                        onMouseEnter={() => handleEnter(i)}
                        onMouseLeave={() => handleLeave(i)}
                        tabIndex={0}
                        style={
                          isItemActive(item)
                            ? {
                                backgroundColor: getButtonColor(),
                                color: "#ffffff",
                              }
                            : {}
                        }
                      >
                        {renderPillLabel(item, i)}
                      </a>
                    )}
                    {item.children?.length ? (
                      <div
                        className="pill-submenu"
                        role="menu"
                        id={`${submenuBaseId}-${i}`}
                        aria-label={`${item.label} submenu`}
                      >
                        {isRouterLink(item.href) ? (
                          <Link
                            href={item.href}
                            role="menuitem"
                            className={`pill-submenu-link pill-submenu-link-overview${isItemCurrent(item) ? " is-active" : ""}`}
                            onClick={() => setOpenDropdownHref(null)}
                          >
                            All Services
                          </Link>
                        ) : (
                          <a
                            href={item.href}
                            role="menuitem"
                            className={`pill-submenu-link pill-submenu-link-overview${isItemCurrent(item) ? " is-active" : ""}`}
                            onClick={() => setOpenDropdownHref(null)}
                          >
                            All Services
                          </a>
                        )}
                        {item.children.map((child) =>
                          isRouterLink(child.href) ? (
                            <Link
                              key={child.href}
                              href={child.href}
                              role="menuitem"
                              className={`pill-submenu-link${isItemActive(child) ? " is-active" : ""}`}
                              onClick={() => setOpenDropdownHref(null)}
                            >
                              {child.label}
                            </Link>
                          ) : (
                            <a
                              key={child.href}
                              href={child.href}
                              role="menuitem"
                              className={`pill-submenu-link${isItemActive(child) ? " is-active" : ""}`}
                              onClick={() => setOpenDropdownHref(null)}
                            >
                              {child.label}
                            </a>
                          ),
                        )}
                      </div>
                    ) : null}
                  </div>
                </li>
              ))}
              {rightListItem ? <li role="none">{rightListItem}</li> : null}
            </ul>
          </div>
        )}

        {/* Right Slot - Only render on desktop */}
        {!isMobile && rightSlot}

        {/* Mobile Navigation - Only render on mobile */}
        {isMobile && (
          <div className="pill-nav-mobile">
            <button
              className={`pill-hamburger${isMobileMenuOpen ? " is-open" : ""}`}
              onClick={toggleMobileMenu}
              type="button"
              aria-expanded={isMobileMenuOpen}
              aria-label={
                isMobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-controls="mobile-navigation-menu"
              tabIndex={0}
              ref={hamburgerRef}
            >
              <span className="pill-hamburger-logo">{logo}</span>
            </button>

            {isMounted &&
              createPortal(
                <div
                  className={`pill-mobile-overlay${isMobileMenuOpen ? " is-open" : ""}`}
                  ref={mobileOverlayRef}
                  aria-hidden={!isMobileMenuOpen}
                  onClick={forceCloseMobileMenu}
                >
                  <div
                    className={`pill-mobile-menu${isMobileMenuOpen ? " is-open" : ""}`}
                    ref={mobileMenuRef}
                    id="mobile-navigation-menu"
                    role="menu"
                    aria-hidden={!isMobileMenuOpen}
                    style={cssVars}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <ul className="pill-mobile-list" ref={mobileListRef}>
                      {items.map((item, i) => (
                        <li
                          key={item.href || `mobile-item-${i}`}
                          role="none"
                          className={`pill-mobile-item${item.children?.length ? " has-children" : ""}`}
                        >
                          {isRouterLink(item.href) ? (
                            <Link
                              href={item.href}
                              className={`pill-mobile-link${
                                isItemActive(item) ? " is-active" : ""
                              }`}
                              aria-label={item.ariaLabel || item.label}
                              aria-current={
                                isItemCurrent(item) ? "page" : undefined
                              }
                              role="menuitem"
                              tabIndex={0}
                              onClick={forceCloseMobileMenu}
                            >
                              {item.label}
                            </Link>
                          ) : (
                            <a
                              href={item.href}
                              className={`pill-mobile-link${
                                isItemActive(item) ? " is-active" : ""
                              }`}
                              aria-label={item.ariaLabel || item.label}
                              aria-current={
                                isItemCurrent(item) ? "page" : undefined
                              }
                              role="menuitem"
                              tabIndex={0}
                              onClick={forceCloseMobileMenu}
                            >
                              {item.label}
                            </a>
                          )}
                          {item.children?.length ? (
                            <div
                              className="pill-mobile-submenu"
                              role="group"
                              aria-label={`${item.label} links`}
                            >
                              {item.children.map((child) =>
                                isRouterLink(child.href) ? (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    className={`pill-mobile-sublink${isItemActive(child) ? " is-active" : ""}`}
                                    role="menuitem"
                                    tabIndex={0}
                                    onClick={forceCloseMobileMenu}
                                  >
                                    {child.label}
                                  </Link>
                                ) : (
                                  <a
                                    key={child.href}
                                    href={child.href}
                                    className={`pill-mobile-sublink${isItemActive(child) ? " is-active" : ""}`}
                                    role="menuitem"
                                    tabIndex={0}
                                    onClick={forceCloseMobileMenu}
                                  >
                                    {child.label}
                                  </a>
                                ),
                              )}
                            </div>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>,
                document.body,
              )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default PillNav;
