import { type ReactElement } from 'react'

/**
 * Event that is emitted when the tooltip open state is updated.
 */
export default class TooltipOpenStateUpdateEvent {
  constructor(
    /**
     * Boolean that indicates whether or not the tooltip is open.
     */
    public readonly isOpen: boolean,
    /**
     * The trigger {@link ReactElement | element} that the tooltip is anchored to.
     */
    public readonly triggerElement: ReactElement,
    /**
     * Boolean that indicates whether or not the tooltip has an arrow element rendered.
     */
    public readonly hasArrow: boolean,
    /**
     * Boolean that indicates whether or not the hoverable content is disabled.
     */
    public readonly isHoverableContentDisabled: boolean | undefined,
    /**
     * The delay duration in milliseconds.
     */
    public readonly delay: number,
    /**
     * Boolean that indicates whether or not the tooltip is the open by default.
     */
    public readonly isDefaultOpen: boolean | undefined,
    /**
     * Boolean that indicates whether or not the delay duration has been skipped in the tooltip component.
     */
    public readonly isDelayDurationSkipped: boolean,
  ) {}
}
