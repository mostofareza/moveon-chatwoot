import { useAdminGetSession } from "src/lib/core-react"
import { useMemo } from "react"

export const useIsMe = (userId: string | undefined) => {
  const { user } = useAdminGetSession()

  const isMe = useMemo(() => {
    return user?.id === userId
  }, [user, userId])

  return isMe
}