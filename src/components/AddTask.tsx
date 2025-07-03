"use client";

import React, { FormEventHandler, useState } from 'react'
import Modal from './Modal'
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { addKorWord } from '@/app/api/korword/route';

const AddTask = () => {
  
  const [modalOpen, setModalOpen] = useState(false);
  const [korWord, setKorWord] = useState<string>('');
  const [meaning, setMeaning] = useState<string>('');
  const router = useRouter();

  const openModal = () => {
    setModalOpen(true);
  };

  const handleSubmitNewTodo:FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!korWord.trim() && !meaning.trim()) return;

    await addKorWord({
      id:uuidv4(),
      kor_word:korWord,
      desction:meaning
    })
    setKorWord('');
    setMeaning('');
    setModalOpen(false);
    router.refresh();
  }

  return (
    <div >
      <button onClick={openModal} className="mb-6 px-6 py-3 bg-violet-700 hover:bg-violet-800 text-white rounded w-full">
        Add New word <span className="ml-2">＋</span>{/*<AiOutlinePlus size={18} className='ml-2'/> */}
      </button>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
      <form onSubmit={handleSubmitNewTodo} className="space-y-4">
        <h3 className="font-bold text-lg text-center">Add Korean Word</h3>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Korean Word (한글)</span>
          </label>
          <input
            type="text"
            placeholder="예: 사랑 (love)"
            value={korWord}
            onChange={(e) => setKorWord(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Meaning</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Love, Khmer: ស្រលាញ់"
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="modal-action">
          <button type="submit" className="btn btn-primary w-full">
            Submit
          </button>
        </div>
      </form>
    </Modal>

    </div>
    
  )
}

export default AddTask