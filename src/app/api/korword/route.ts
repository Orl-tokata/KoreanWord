// import { NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'

// export async function GET() {
//   try {
//     const words = await prisma.korWord.findMany()
//     return NextResponse.json(words)
//   } catch (error) {
//     console.error('[GET ERROR]', error)
//     return NextResponse.json({ error: 'Failed to fetch words' }, { status: 500 })
//   }
// }

// export async function POST(req: Request) {
//   try {
//     const body = await req.json()
//     const newWord = await prisma.korWord.create({
//       data: {
//         kor_word: body.kor_word,
//         desction: body.desction,
//       },
//     })
//     return NextResponse.json(newWord)
//   } catch (error) {
//     console.error('[POST ERROR]', error)
//     return NextResponse.json({ error: 'Failed to add word' }, { status: 500 })
//   }
// }


import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    console.log('=== Database Connection Test ===')
    
    // Check environment
    console.log('NODE_ENV:', process.env.NODE_ENV)
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL)
    console.log('DATABASE_URL starts with:', process.env.DATABASE_URL?.substring(0, 15))
    
    // Test basic connection
    console.log('Testing $connect...')
    await prisma.$connect()
    console.log('✓ Database connection successful')
    
    // Test raw query
    console.log('Testing raw query...')
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('✓ Raw query successful:', result)
    
    // Test table existence
    console.log('Testing table existence...')
    const tableExists = await prisma.$queryRaw`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'korWord'
      );
    `
    console.log('✓ Table check result:', tableExists)
    
    // Alternative table name check
    const tableExists2 = await prisma.$queryRaw`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'kor_words'
      );
    `
    console.log('✓ Alternative table check result:', tableExists2)
    
    return NextResponse.json({
      status: 'success',
      connection: 'ok',
      rawQuery: result,
      tableCheck: tableExists,
      altTableCheck: tableExists2,
      env: {
        nodeEnv: process.env.NODE_ENV,
        hasDbUrl: !!process.env.DATABASE_URL,
      }
    })
    
  } catch (error) {
    console.error('=== Database Test Error ===')
    console.error('Error:', error)
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error')
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack')
    
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : String(error),
      type: error instanceof Error ? error.constructor.name : typeof error,
      env: {
        nodeEnv: process.env.NODE_ENV,
        hasDbUrl: !!process.env.DATABASE_URL,
        dbUrlPreview: process.env.DATABASE_URL?.substring(0, 20) + '...'
      }
    }, { status: 500 })
  }
}