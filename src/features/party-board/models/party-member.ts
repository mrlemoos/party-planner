interface PartyMember {
  id: string
  userId: string
  userDisplayName: string
  networkStatus: 'ONLINE' | 'OFFLINE'
}

export default PartyMember
