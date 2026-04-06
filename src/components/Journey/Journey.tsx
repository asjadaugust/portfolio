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

const AUTO_TOUR_INTERVAL_MS = 4000;
const RESUME_DELAY_MS = 6000;

export default function Journey() {
  const activeId = useJourneyStore((s) => s.activeId);
  const isPaused = useJourneyStore((s) => s.isPaused);
  const setActive = useJourneyStore((s) => s.setActive);
  const pause = useJourneyStore((s) => s.pause);
  const resume = useJourneyStore((s) => s.resume);

  const [progress, setProgress] = useState(0);

  const activeLocation = LOCATIONS.find((l) => l.id === activeId) ?? LOCATIONS[0];

  const advance = useCallback(() => {
    const currentIndex = LOCATIONS.findIndex((l) => l.id === activeId);
    const nextIndex = (currentIndex + 1) % LOCATIONS.length;
    setActive(LOCATIONS[nextIndex].id);
  }, [activeId, setActive]);

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
      advance();
    }, AUTO_TOUR_INTERVAL_MS);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(advanceTimer);
    };
  }, [activeId, isPaused, advance]);

  const handleManualSelect = useCallback(
    (id: string) => {
      setActive(id);
      pause();
      setTimeout(() => resume(), RESUME_DELAY_MS);
    },
    [setActive, pause, resume]
  );

  const handleGlobeHover = useCallback(() => pause(), [pause]);
  const handleGlobeLeave = useCallback(() => {
    setTimeout(() => resume(), RESUME_DELAY_MS);
  }, [resume]);

  return (
    <section id="journey" className={styles.journey}>
      <div className={styles.header}>
        <div className={styles.label}>02. Journey</div>
        <h2 className={styles.title}>How I got here</h2>
      </div>

      <div className={styles.container}>
        <div
          className={styles.globeColumn}
          onMouseEnter={handleGlobeHover}
          onMouseLeave={handleGlobeLeave}
        >
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
              <div key={loc.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button
                  type="button"
                  className={clsx(styles.navDot, loc.id === activeId && styles.active)}
                  style={{ color: loc.color }}
                  onClick={() => handleManualSelect(loc.id)}
                  aria-label={`Show ${loc.city}`}
                >
                  <div
                    className={styles.navDotCircle}
                    style={{ background: loc.color }}
                  />
                  <span className={styles.navDotLabel}>{loc.country.toUpperCase()}</span>
                </button>
                {idx < LOCATIONS.length - 1 && <div className={styles.navSeparator} />}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.panelColumn}>
          <JourneyPanel location={activeLocation} />
          <div className={styles.progressBar}>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${progress}%`,
                  background: activeLocation.color,
                }}
              />
            </div>
            <div className={styles.progressLabel}>{isPaused ? 'paused' : 'auto'}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
