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
