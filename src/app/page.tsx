

import { getAllTodos } from '@/api/api'
import AddTask from '@/components/AddTask'
import TodoList from '@/components/TodoList'
import React from 'react'

export default async function HomePage() {
  const tasks = await getAllTodos();
  console.log(tasks);

  return (
    <main className='max-w-4xl mx-auto mt-4'>
      <div className='my-5 flex flex-col gap-4'>
        <h1 className='text-2xl font-bold text-black mt-5 text-center'>Korean Language</h1>
        <AddTask/>
      </div>
      <TodoList tasks={tasks}/>
    </main>
    
  )
}