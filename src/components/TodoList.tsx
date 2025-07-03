
import React from 'react'
import Task from './Task'
import { IKorWord } from '@/types/IKorWord'

interface TodoListProps{
    korWord:IKorWord[]
}

const KoreanWordList: React.FC<TodoListProps> = ({korWord = []}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            <th className="px-4 py-3 border-0">Korean Words</th>
            <th className="px-4 py-3 border-0">Meaning</th>
            <th className="px-4 py-3 border-0 text-right">Actions</th>
          </tr>
        </thead>
      </table>
       {/* Scrollable table body */}
      <div className="max-h-[500px] overflow-y-auto border-t border-gray-200">
        <table className="min-w-full bg-white">
          <tbody className="text-gray-700 text-sm">
            {korWord.map((word) => (
              <Task key={word.id} word={word} />
            ))}
          </tbody>
        </table>
      </div>
    </div>

  )
}

export default KoreanWordList