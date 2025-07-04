// import { NextResponse, type NextRequest } from 'next/server'
// import { prisma } from '@/lib/prisma'

// export async function PUT(
//   req: NextRequest, 
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await params
//   const body = await req.json()

//   const updatedWord = await prisma.korWord.update({
//     where: { id },
//     data: {
//       kor_word: body.kor_word,
//       desction: body.desction,
//     },
//   })

//   return NextResponse.json(updatedWord)
// }

// export async function DELETE(
//   req: NextRequest, 
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await params

//   await prisma.korWord.delete({
//     where: { id },
//   })

//   return NextResponse.json({ message: 'Deleted successfully' })
// }


import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()

    const updatedWord = await prisma.korWord.update({
      where: { id },
      data: {
        kor_word: body.kor_word,
        desction: body.desction,
      },
    })

    return NextResponse.json(updatedWord)
  } catch (error) {
    console.error('PUT Error:', error)
    return NextResponse.json(
      { error: 'Failed to update word' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.korWord.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Deleted successfully' })
  } catch (error) {
    console.error('DELETE Error:', error)
    return NextResponse.json(
      { error: 'Failed to delete word' },
      { status: 500 }
    )
  }
}