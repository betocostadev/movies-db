import { accountServiceInstance } from '@/services/account-service'
import { TCollection } from '@/types/movies'
import { IUser } from '@/types/user'

export const registerUserMutationFn = async (
  user: Pick<IUser, 'name' | 'email' | 'password'>,
) => {
  const { name, email, password } = user
  return accountServiceInstance.registerUser({
    name,
    email,
    password,
  })
}

export const loginMutationFn = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  return accountServiceInstance.login(email, password)
}

export const saveToCollectionMutationFn = async ({
  id,
  collection,
}: {
  id: number
  collection: TCollection
}) => {
  return accountServiceInstance.saveToCollection({ id, collection })
}
