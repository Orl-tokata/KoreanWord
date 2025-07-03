import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

// ✅ Define the correct context type
interface Context {
  params: { id: string }
}

export async function PUT(req: NextRequest, { params }: Context) {
  const { id } = params
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

export async function DELETE(req: NextRequest, { params }: Context) {
  const { id } = params

  await prisma.korWord.delete({
    where: { id },
  })

  return NextResponse.json({ message: 'Deleted successfully' })
}