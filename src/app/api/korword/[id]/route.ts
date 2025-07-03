// src/app/api/korword/[id]/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json()
  const updated = await prisma.korWord.update({
    where: { id: String(params.id) },
    data: {
      kor_word: body.kor_word,
      desction: body.desction,
    },
  })
  return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.korWord.delete({
    where: { id: String(params.id) },
  })
  return NextResponse.json({ message: 'Deleted successfully' })
}