import React from 'react'
import { getAllKorWords } from './api/action';
import AddKoreanWord from '@/components/AddKoreanWord';
import KoreanWordList from '@/components/KoreanWordList';

export default async function HomePage() {
  let korWord: any[] = []
  let error: string | null = null

  try {
    korWord = await getAllKorWords()
    console.log('Fetched words:', korWord.length)
  } catch (err) {
    console.error('Error in HomePage:', err)
    error = 'Failed to load Korean words'
    korWord = [] // Fallback to empty array
  }

  return (
    <main className='max-w-4xl mx-auto mt-4'>
      <div className='my-5 flex flex-col gap-4'>
        <h1 className='text-2xl font-bold text-black mt-5 text-center'>Korean Language</h1>
        <AddKoreanWord/>
      </div>
      <KoreanWordList korWord={korWord}/>
    </main>
    
  )
}