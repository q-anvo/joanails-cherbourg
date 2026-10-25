const tabsOf = (tablist: Element) => [...tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
const panelOf = (tab: Element) => document.getElementById(tab.getAttribute('aria-controls') ?? '');

/** One panel at a time: the selected tab's panel gets the `on` class. Scoped to one tablist. */
export function wireTabs(tablist: Element): void {
  const tabs = tabsOf(tablist);
  tabs.forEach((tab) =>
    tab.addEventListener('click', () =>
      tabs.forEach((other) => {
        other.setAttribute('aria-selected', String(other === tab));
        panelOf(other)?.classList.toggle('on', other === tab);
      })
    )
  );
}

/** Fills each tab's count badge, hidden at zero. */
export function showTabCounts(tablist: Element, counts: number[]): void {
  tabsOf(tablist).forEach((tab, index) => {
    const badge = tab.querySelector<HTMLElement>('[data-tab-count]');
    if (!badge) return;
    const count = counts[index] ?? 0;
    badge.hidden = !count;
    badge.textContent = String(count);
  });
}
