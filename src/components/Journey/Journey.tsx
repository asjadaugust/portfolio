'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import clsx from 'clsx';
import styles from './Journey.module.scss';
import { LOCATIONS } from './data/journey.data';
import { useJourneyStore } from './store/useJourneyStore';
import GlobeScene from './globe/GlobeScene';
import LocationMarker from './globe/LocationMarker';
import FlightArc from './globe/FlightArc';
import GlobeStarField from './globe/GlobeStarField';
import JourneyPanel from './panel/JourneyPanel';

const AUTO_TOUR_INTERVAL_MS = 9000;

export default function Journey() {
  const activeId = useJourneyStore((s) => s.activeId);
  const isPaused = useJourneyStore((s) => s.isPaused);
  const setActive = useJourneyStore((s) => s.setActive);
  const pause = useJourneyStore((s) => s.pause);
  const resume = useJourneyStore((s) => s.resume);

  const [progress, setProgress] = useState(0);

  const activeLocation = LOCATIONS.find((l) => l.id === activeId) ?? LOCATIONS[0];
  const activeIndex = LOCATIONS.findIndex((l) => l.id === activeId);

  const goToIndex = useCallback(
    (index: number) => {
      const normalized = ((index % LOCATIONS.length) + LOCATIONS.length) % LOCATIONS.length;
      setActive(LOCATIONS[normalized].id);
    },
    [setActive]
  );

  useEffect(() => {
    if (isPaused) {
      setProgress(0);
      return;
    }

    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / AUTO_TOUR_INTERVAL_MS) * 100, 100);
      setProgress(pct);
    }, 50);

    const advanceTimer = setTimeout(() => {
      goToIndex(activeIndex + 1);
    }, AUTO_TOUR_INTERVAL_MS);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(advanceTimer);
    };
  }, [activeId, activeIndex, isPaused, goToIndex]);

  // Manual select: jump to a location AND stop auto-tour until user explicitly resumes
  const handleManualSelect = useCallback(
    (id: string) => {
      setActive(id);
      pause();
    },
    [setActive, pause]
  );

  const handlePrev = useCallback(() => {
    goToIndex(activeIndex - 1);
    pause();
  }, [goToIndex, activeIndex, pause]);

  const handleNext = useCallback(() => {
    goToIndex(activeIndex + 1);
    pause();
  }, [goToIndex, activeIndex, pause]);

  const handlePlayPauseToggle = useCallback(() => {
    if (isPaused) {
      resume();
    } else {
      pause();
    }
  }, [isPaused, pause, resume]);

  return (
    <section id="journey" className={styles.journey}>
      <div className={styles.header}>
        <div className={styles.label}>02. Journey</div>
        <h2 className={styles.title}>How I got here</h2>
      </div>

      <div className={styles.container}>
        <div className={styles.globeColumn}>
          <div className={styles.globeWrapper}>
            <Suspense fallback={null}>
              <GlobeScene>
                <GlobeStarField />
                {LOCATIONS.map((loc) => (
                  <LocationMarker
                    key={loc.id}
                    lat={loc.lat}
                    lon={loc.lon}
                    color={loc.color}
                    isActive={loc.id === activeId}
                    onClick={() => handleManualSelect(loc.id)}
                  />
                ))}
                <FlightArc
                  startLat={LOCATIONS[0].lat}
                  startLon={LOCATIONS[0].lon}
                  endLat={LOCATIONS[1].lat}
                  endLon={LOCATIONS[1].lon}
                  color={LOCATIONS[1].color}
                />
                <FlightArc
                  startLat={LOCATIONS[1].lat}
                  startLon={LOCATIONS[1].lon}
                  endLat={LOCATIONS[2].lat}
                  endLon={LOCATIONS[2].lon}
                  color={LOCATIONS[2].color}
                />
              </GlobeScene>
            </Suspense>
          </div>

          <div className={styles.navDots}>
            {LOCATIONS.map((loc, idx) => (
              <div key={loc.id} className={styles.navDotWrap}>
                <button
                  type="button"
                  className={clsx(styles.navDot, loc.id === activeId && styles.active)}
                  style={{ color: loc.color }}
                  onClick={() => handleManualSelect(loc.id)}
                  aria-label={`Show ${loc.city}, ${loc.country}`}
                >
                  <div
                    className={styles.navDotCircle}
                    style={{ background: loc.color }}
                  />
                  <span className={styles.navDotLabel}>{loc.country}</span>
                </button>
                {idx < LOCATIONS.length - 1 && <div className={styles.navSeparator} />}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.panelColumn}>
          <JourneyPanel location={activeLocation} />

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.controlButton}
              onClick={handlePrev}
              aria-label="Previous location"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              type="button"
              className={clsx(styles.controlButton, styles.playPause)}
              onClick={handlePlayPauseToggle}
              aria-label={isPaused ? 'Resume auto-tour' : 'Pause auto-tour'}
            >
              {isPaused ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="6 4 20 12 6 20 6 4" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              )}
            </button>

            <button
              type="button"
              className={styles.controlButton}
              onClick={handleNext}
              aria-label="Next location"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${isPaused ? 0 : progress}%`,
                  background: activeLocation.color,
                }}
              />
            </div>

            <div
              className={clsx(styles.modeLabel, isPaused && styles.modeLabelPaused)}
            >
              {isPaused ? 'manual' : 'auto'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
