export default class ObservableElementEvent {
  constructor(
    public readonly isTrackedElementIntoView: boolean,
    public readonly intersectionEntry: IntersectionObserverEntry,
    public readonly otherIntersectionEntries: IntersectionObserverEntry[],
    public readonly intersectionRootElement: Element | Document | null,
    public readonly threshold: number,
    public readonly thresholds: readonly number[],
  ) {}
}
