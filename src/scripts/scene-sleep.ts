const DESKTOP = matchMedia('(min-width: 1024px)');

/**
 * Calls back whenever the sheet starts or stops covering the fixed scene, i.e. when the
 * transparent window above the sheet leaves or enters the screen. On desktop the scene
 * sits beside the sheet and never sleeps.
 */
export function watchSceneCover(opening: Element, onChange: (asleep: boolean) => void): void {
  let windowVisible = true;
  let asleep = false;

  const update = () => {
    const next = !DESKTOP.matches && !windowVisible;
    if (next === asleep) return;
    asleep = next;
    onChange(asleep);
  };

  /* the margin keeps the scene awake behind the sheet's rounded top corners */
  new IntersectionObserver(
    ([entry]) => {
      windowVisible = entry.isIntersecting;
      update();
    },
    { rootMargin: '48px 0px 0px 0px' }
  ).observe(opening);
  DESKTOP.addEventListener('change', update);
}
