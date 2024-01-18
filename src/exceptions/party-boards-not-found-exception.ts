class PartyBoardsNotFoundException extends Error {
  constructor(readonly message: string) {
    super(message)

    this.name = 'PartyBoardsNotFoundException'
  }
}

export default PartyBoardsNotFoundException
