class SelectNameSuggestionEvent {
  constructor(
    /**
     * The name of the party which was selected.
     */
    public readonly name: string,
  ) {}
}

export default SelectNameSuggestionEvent
