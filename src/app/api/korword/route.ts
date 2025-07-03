import { IKorWord } from "@/types/IKorWord"


import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const words = await prisma.korWord.findMany()
    return NextResponse.json(words)
  } catch (error) {
    console.error('[GET ERROR]', error)
    return NextResponse.json({ error: 'Failed to fetch words' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const newWord = await prisma.korWord.create({
      data: {
        kor_word: body.kor_word,
        desction: body.desction,
      },
    })
    return NextResponse.json(newWord)
  } catch (error) {
    console.error('[POST ERROR]', error)
    return NextResponse.json({ error: 'Failed to add word' }, { status: 500 })
  }
}

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    // On client: use relative path
    return ''
  }
  // On server (e.g., Vercel or local)
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
