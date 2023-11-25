interface UserHandleProps {
  at?: string
}

function UserHandle({ at: userHandle }: UserHandleProps): JSX.Element {
  return (
    <div className='flex items-center'>
      <span>@{userHandle}</span>
    </div>
  )
}

export default UserHandle
