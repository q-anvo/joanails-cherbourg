/* on narrow screens, one category shows at a time; wide screens show them all and hide the tabs */

export function selectTab(selected: number) {
  document.querySelectorAll<HTMLElement>('[data-group]').forEach((group) => {
    group.classList.toggle('on', Number(group.dataset.group) === selected);
  });
  document.querySelectorAll<HTMLElement>('[data-tab]').forEach((tab) => {
    tab.setAttribute('aria-selected', String(Number(tab.dataset.tab) === selected));
  });
}

export function showTabCounts(counts: number[]) {
  document.querySelectorAll<HTMLElement>('[data-tab]').forEach((tab) => {
    const badge = tab.querySelector<HTMLElement>('[data-tab-count]');
    const count = counts[Number(tab.dataset.tab)] ?? 0;
    if (!badge) return;
    badge.hidden = !count;
    badge.textContent = String(count);
  });
}
