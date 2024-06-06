import { cookies } from 'next/headers'
 
export function getDataFromCookie(data) {
  const cookieStore = cookies()
  const key = cookieStore.get(data)
  return key
}