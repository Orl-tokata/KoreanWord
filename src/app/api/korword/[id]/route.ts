import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(req: Request, context: { params: { id: string } }) {
  const { id } = context.params
  const body = await req.json()

  const updatedWord = await prisma.korWord.update({
    where: { id },
    data: {
      kor_word: body.kor_word,
      desction: body.desction,
    },
  })

  return NextResponse.json(updatedWord)
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  const { id } = context.params

  await prisma.korWord.delete({
    where: { id },
  })

  return NextResponse.json({ message: 'Deleted successfully' })
}