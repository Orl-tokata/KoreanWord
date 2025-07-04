import { IKorWord } from "@/types/IKorWord"

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return ''
  }
  return process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'
}

const baseUrl = getBaseUrl()

export const getAllKorWords = async (): Promise<IKorWord[]> => {
  const res = await fetch(`${baseUrl}/api/korword`, { cache: 'no-store' })
  return await res.json()
}

export const addKorWord = async (word: IKorWord): Promise<IKorWord> => {
  const res = await fetch(`${baseUrl}/api/korword`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(word),
  })
  return await res.json()
}

export const editKorWord = async (word: IKorWord): Promise<IKorWord> => {
  if (!word.id) throw new Error('Missing ID')
  const res = await fetch(`${baseUrl}/api/korword/${word.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(word),
  })
  return await res.json()
}

export const deleteKorWord = async (id: string): Promise<void> => {
  await fetch(`${baseUrl}/api/korword/${id}`, {
    method: 'DELETE',
  })
}
