"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Fragment,
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  exhibitionRoleHeights,
  type ExhibitionArtwork,
  type ExhibitionGallery,
  type VisualGalleryId,
  visualGalleries,
} from "@/data/visuals";
import { Navbar } from "@/components/navbar";
import styles from "./visuals.module.css";

type FocusedArtwork = ExhibitionArtwork & {
  galleryLabel: string;
};

function getDisplayHeight(work: ExhibitionArtwork) {
  return work.height ?? exhibitionRoleHeights[work.role];
}

function getDisplayWidth(work: ExhibitionArtwork) {
  const height = getDisplayHeight(work);
  return Math.round((work.naturalWidth / work.naturalHeight) * height);
}

function GalleryLandmark({ gallery }: { gallery: ExhibitionGallery }) {
  const logoRatio = gallery.logo.naturalHeight / gallery.logo.naturalWidth;
  const logoWidth = gallery.logo.layout.width;
  const logoHeight = Math.round(logoWidth * logoRatio);

  return (
    <div
      aria-label={`${gallery.label} gallery landmark`}
      className={`${styles.landmark} ${styles.revealTarget}`}
      style={
        {
          "--accent": gallery.accent,
          "--landmark-left": `${gallery.logo.layout.x}px`,
          "--landmark-top": `${gallery.logo.layout.y}px`,
          "--landmark-rotate": `${gallery.logo.layout.rotation}deg`,
          "--landmark-width": `${logoWidth}px`,
          "--landmark-z": gallery.logo.layout.zIndex ?? 1,
        } as CSSProperties
      }
    >
      <Image
        alt={gallery.logo.alt}
        className={styles.logoImage}
        height={logoHeight}
        priority={gallery.id === "drift"}
        src={gallery.logo.src}
        width={logoWidth}
      />
    </div>
  );
}

function ExhibitionPiece({
  gallery,
  onFocus,
  priority,
  registerArtwork,
  work,
}: {
  gallery: ExhibitionGallery;
  onFocus: (work: FocusedArtwork) => void;
  priority: boolean;
  registerArtwork: (node: HTMLButtonElement | null) => void;
  work: ExhibitionArtwork;
}) {
  const displayHeight = getDisplayHeight(work);
  const displayWidth = getDisplayWidth(work);

  return (
    <button
      aria-label={`Inspect ${work.title}`}
      className={styles.artwork}
      data-role={work.role}
      onClick={() => onFocus({ ...work, galleryLabel: gallery.label })}
      ref={registerArtwork}
      style={
        {
          "--accent": gallery.accent,
          "--art-height": `${displayHeight}px`,
          "--art-left": `${work.layout.x}px`,
          "--art-top": `${work.layout.y}px`,
          "--art-width": `${displayWidth}px`,
          "--art-rotate": `${work.layout.rotation}deg`,
          "--art-z": work.layout.zIndex ?? 1,
        } as CSSProperties
      }
      type="button"
    >
      <span className={styles.artworkImageWrap}>
        <Image
          alt={work.alt}
          className={styles.artworkImage}
          height={work.naturalHeight}
          loading={priority ? "eager" : "lazy"}
          priority={priority}
          sizes="(max-width: 760px) 84vw, (max-width: 1100px) 54vw, 700px"
          src={work.src}
          width={work.naturalWidth}
        />
      </span>
      <span className={styles.artworkLabel}>
        <span>{work.title}</span>
        <span>{work.role}</span>
      </span>
    </button>
  );
}

function FocusView({
  focusedArtwork,
  onClose,
}: {
  focusedArtwork: FocusedArtwork | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!focusedArtwork) {
      return;
    }

    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [focusedArtwork, onClose]);

  if (!focusedArtwork) {
    return null;
  }

  return (
    <div
      aria-label={`${focusedArtwork.title} focus view`}
      aria-modal="true"
      className={styles.focusOverlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
    >
      <div className={styles.focusFrame}>
        <button
          className={styles.focusClose}
          onClick={onClose}
          ref={closeRef}
          type="button"
        >
          Close
        </button>
        <div className={styles.focusImageWrap}>
          <Image
            alt={focusedArtwork.alt}
            className={styles.focusImage}
            height={focusedArtwork.naturalHeight}
            sizes="(max-width: 760px) 92vw, 72vw"
            src={focusedArtwork.src}
            width={focusedArtwork.naturalWidth}
          />
        </div>
        <aside className={styles.focusMeta}>
          <p>{focusedArtwork.galleryLabel}</p>
          <h2>{focusedArtwork.title}</h2>
          <dl>
            <div>
              <dt>Year</dt>
              <dd>{focusedArtwork.year}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{focusedArtwork.role}</dd>
            </div>
            <div>
              <dt>Medium</dt>
              <dd>{focusedArtwork.medium}</dd>
            </div>
            <div>
              <dt>Tools</dt>
              <dd>{focusedArtwork.tools.join(", ")}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}

export default function VisualsPage() {
  const [activeGallery, setActiveGallery] = useState(visualGalleries[0].id);
  const [focusedArtwork, setFocusedArtwork] = useState<FocusedArtwork | null>(
    null,
  );
  const galleryRefs = useRef<Record<string, HTMLElement | null>>({});
  const artworkRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const horizontalRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const dragState = useRef({
    active: false,
    moved: false,
    pointerId: 0,
    scrollLeft: 0,
    x: 0,
  });
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  const handleFocus = useCallback((work: FocusedArtwork) => {
    lastFocusedElement.current = document.activeElement as HTMLElement | null;
    setFocusedArtwork(work);
  }, []);

  const handleCloseFocus = useCallback(() => {
    setFocusedArtwork(null);
    window.setTimeout(() => lastFocusedElement.current?.focus(), 0);
  }, []);

  const handleViewportPointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) {
        return;
      }

      const target = event.target as HTMLElement;
      if (target.closest(`.${styles.artwork}`)) {
        return;
      }

      dragState.current = {
        active: true,
        moved: false,
        pointerId: event.pointerId,
        scrollLeft: event.currentTarget.scrollLeft,
        x: event.clientX,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [],
  );

  const handleViewportPointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (
        !dragState.current.active ||
        dragState.current.pointerId !== event.pointerId
      ) {
        return;
      }

      const deltaX = event.clientX - dragState.current.x;
      if (Math.abs(deltaX) > 4) {
        dragState.current.moved = true;
      }

      event.currentTarget.scrollLeft =
        dragState.current.scrollLeft - deltaX;
    },
    [],
  );

  const handleViewportPointerUp = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (dragState.current.pointerId === event.pointerId) {
        dragState.current.active = false;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
      }
    },
    [],
  );

  const handleViewportClickCapture = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement;
      if (target.closest(`.${styles.artwork}`)) {
        dragState.current.moved = false;
        return;
      }

      if (!dragState.current.moved) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      dragState.current.moved = false;
    },
    [],
  );

  const handleGalleryNavClick = useCallback((galleryId: VisualGalleryId) => {
    setActiveGallery(galleryId);
  }, []);

  useLayoutEffect(() => {
    window.scrollTo({ left: 0, top: 0 });
  }, []);

  useEffect(() => {
    const artworkNodes = Object.values(artworkRefs.current).filter(
      (node): node is HTMLButtonElement => Boolean(node),
    );
    const revealNodes = Array.from(
      document.querySelectorAll<HTMLElement>(`.${styles.revealTarget}`),
    );
    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.isRevealed);
            revealObserver.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    for (const node of artworkNodes) {
      revealObserver.observe(node);
    }
    for (const node of revealNodes) {
      revealObserver.observe(node);
    }

    const updateActiveGallery = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestGallery: VisualGalleryId | null = null;
      let closestDistance = Number.POSITIVE_INFINITY;

      for (const [id, node] of Object.entries(galleryRefs.current)) {
        if (!node) {
          continue;
        }

        const rect = node.getBoundingClientRect();
        const intersectsViewport = rect.bottom > 0 && rect.top < window.innerHeight;
        if (!intersectsViewport) {
          continue;
        }

        const distance = Math.abs(rect.top - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestGallery = id as VisualGalleryId;
        }
      }

      if (closestGallery) {
        setActiveGallery(closestGallery);
      }
    };

    const galleryObserver = new IntersectionObserver(updateActiveGallery, {
      rootMargin: "0px",
      threshold: [0, 0.2, 0.5, 0.8, 1],
    });

    for (const node of Object.values(galleryRefs.current)) {
      if (node) {
        galleryObserver.observe(node);
      }
    }
    updateActiveGallery();

    return () => {
      revealObserver.disconnect();
      galleryObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const cleanup: Array<() => void> = [];

    for (const viewport of Object.values(horizontalRefs.current)) {
      if (!viewport) {
        continue;
      }

      viewport.scrollLeft = Math.max(
        0,
        (viewport.scrollWidth - viewport.clientWidth) / 2,
      );

      const onWheel = (event: WheelEvent) => {
        if (!event.shiftKey || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
          return;
        }

        viewport.scrollLeft += event.deltaY;
        event.preventDefault();
      };

      viewport.addEventListener("wheel", onWheel, { passive: false });
      cleanup.push(() => viewport.removeEventListener("wheel", onWheel));
    }

    return () => {
      for (const remove of cleanup) {
        remove();
      }
    };
  }, []);

  return (
    <main className={styles.page}>
      <Navbar />
      <section aria-labelledby="visuals-page-title" className={styles.opening}>
        <div className={styles.openingInner}>
          <p className={styles.eyebrow}>2023 - Present</p>
          <h1 className={styles.openingTitle} id="visuals-page-title">
            VISUALS
          </h1>
          <p>A curated exhibition of selected visual work.</p>
        </div>
      </section>

      <nav aria-label="Active gallery" className={styles.galleryTracker}>
        {visualGalleries.map((gallery) => (
          <a
            aria-current={activeGallery === gallery.id ? "true" : undefined}
            href={`#${gallery.id}`}
            key={gallery.id}
            onClick={() => handleGalleryNavClick(gallery.id)}
            style={{ "--accent": gallery.accent } as CSSProperties}
          >
            {gallery.label}
          </a>
        ))}
      </nav>

      {visualGalleries.map((gallery, galleryIndex) => (
        <Fragment key={gallery.id}>
          <section
            aria-labelledby={`${gallery.id}-title`}
            className={styles.gallery}
            data-gallery-id={gallery.id}
            id={gallery.id}
            ref={(node) => {
              galleryRefs.current[gallery.id] = node;
            }}
            style={
              {
                "--accent": gallery.accent,
                "--gallery-height": `${gallery.canvasHeight}px`,
              } as CSSProperties
            }
          >
            <div
              className={`${styles.roomContext} ${styles.revealTarget}`}
            >
              <p>{gallery.atmosphere}</p>
              <h2 id={`${gallery.id}-title`}>{gallery.label}</h2>
              <span>{gallery.summary}</span>
            </div>

            <div aria-hidden="true" className={styles.roomLight} />

            <div
              aria-label={`${gallery.label} horizontal exhibition canvas`}
              className={styles.galleryViewport}
              onClickCapture={handleViewportClickCapture}
              onPointerCancel={handleViewportPointerUp}
              onPointerDown={handleViewportPointerDown}
              onPointerLeave={handleViewportPointerUp}
              onPointerMove={handleViewportPointerMove}
              onPointerUp={handleViewportPointerUp}
              ref={(node) => {
                horizontalRefs.current[gallery.id] = node;
              }}
              tabIndex={0}
            >
              <div className={styles.canvas}>
                <GalleryLandmark gallery={gallery} />
                {gallery.works.map((work, workIndex) => (
                  <ExhibitionPiece
                    gallery={gallery}
                    key={work.id}
                    onFocus={handleFocus}
                    priority={galleryIndex === 0 && workIndex === 0}
                    registerArtwork={(node) => {
                      artworkRefs.current[work.id] = node;
                    }}
                    work={work}
                  />
                ))}
              </div>
            </div>
          </section>

          {galleryIndex < visualGalleries.length - 1 ? (
            <div aria-hidden="true" className={styles.roomPause} />
          ) : null}
        </Fragment>
      ))}

      <section className={`${styles.closing} ${styles.revealTarget}`}>
        <p>Thanks for visiting.</p>
        <Link href="/">Back Home</Link>
      </section>

      <FocusView
        focusedArtwork={focusedArtwork}
        onClose={handleCloseFocus}
      />
    </main>
  );
}
