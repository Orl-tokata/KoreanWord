


import AddTask from '@/components/AddKoreanWord'
import TodoList from '@/components/KoreanWordList'
import React from 'react'
import { getAllKorWords } from './api/action';

export default async function HomePage() {
  const korWord = await getAllKorWords();
  console.log(korWord);

  return (
    <main className='max-w-4xl mx-auto mt-4'>
      <div className='my-5 flex flex-col gap-4'>
        <h1 className='text-2xl font-bold text-black mt-5 text-center'>Korean Language</h1>
        <AddTask/>
      </div>
      <TodoList korWord={korWord}/>
    </main>
    
  )
}