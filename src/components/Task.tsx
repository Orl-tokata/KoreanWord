'use client';

import { ITask } from '@/types/tasks'
import React, { FormEventHandler, useEffect, useState } from 'react'
import { FiEdit, FiTrash, FiVolume2 } from 'react-icons/fi'
import Modal from './Modal'
import { useRouter } from 'next/navigation';
import { IKorWord } from '@/types/IKorWord';
import { deleteKorWord, editKorWord } from '@/app/api/korword/route';

interface TaskProp{
    task:IKorWord
}

const Task: React.FC<TaskProp> = ({task}) => {
    
    const [openModalEdit,setOpenModalEdit] = useState<boolean>(false);
    const [openModalDelete,setOpenModalDelete] = useState<boolean>(false);
    const [taskToEdit,setTaskToEdit] = useState<string>(task.kor_word);
    const [korWord, setKorWord] = useState<string>(task.kor_word);
    const [meaning, setMeaning] = useState<string>(task.desction);
    const router = useRouter();

    const handleSubmitEditWord:FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        
        if (!korWord.trim() && !meaning.trim()) return;

        await editKorWord({
            id:task.id,
            kor_word:korWord,
            desction:meaning
        })
        //setTaskToEdit("");
        setOpenModalEdit(false);
        router.refresh();
    }
    const handleDeleteTask = async (id:string)=>{
        await deleteKorWord(id);
        setOpenModalDelete(false);
        router.refresh();
    }

    const speakKorean = (text: string) => {
        const synth = window.speechSynthesis;

        const speakNow = () => {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ko-KR';
            utterance.volume = 1;
            utterance.rate = 1;
            utterance.pitch = 1;

            const voices = synth.getVoices();
            const koreanVoice = voices.find((v) => v.lang === 'ko-KR');
            if (koreanVoice) {
            utterance.voice = koreanVoice;
            console.log("✅ Using voice:", koreanVoice.name);
            }

            synth.cancel(); // 🧼 Clear any pending voices
            synth.speak(utterance);
        };

        if (synth.getVoices().length === 0) {
            synth.onvoiceschanged = () => speakNow();
        } else {
            speakNow();
        }
    };


    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.speechSynthesis.getVoices(); // triggers voice loading
        }
    }, []);


  return (
     <tr key={task.id} className="hover:bg-gray-50 border-0">
        {/* <td className="px-4 py-3">{task.word}</td> */}
        <td className="px-4 py-3 flex items-center gap-2">
        {task.kor_word}
        <FiVolume2
            size={20}
            className="text-violet-500 cursor-pointer hover:text-violet-700"
            title="Click to hear"
            onClick={() => {
                console.log("🔊 Clicked to speak:", task.kor_word);
                speakKorean(task.kor_word);
            }}
            />
        </td>
        <td className="px-4 py-3">{task.desction}</td>
        <td className="px-4 py-3  space-x-2 flex justify-end">
            <FiEdit size={20} cursor={'pointer'} className='text-blue-500 ' title="Click to edit"
                onClick={()=> setOpenModalEdit(true)}/>
            <Modal isOpen={openModalEdit} onClose={() => setOpenModalEdit(false)}>
                <form onSubmit={handleSubmitEditWord} className="space-y-4">
                    <h3 className="font-bold text-lg text-center">Edit Korean Word</h3>

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
            <FiTrash onClick={()=> setOpenModalDelete(true)} title="Click to delete" size={20} className='text-red-500'/>
            <Modal isOpen={openModalDelete} onClose={() => setOpenModalDelete(false)} >
               <h1 className='text-lg flex justify-center mt-4'>Are you sure, you want to delete this word?</h1>
               <div className='modal-action'>
                <button
                    onClick={()=> handleDeleteTask(task.id)}
                    className='btn'>
                    Yes
                </button>
               </div>
            </Modal>
        </td>
    </tr>
  )
}

export default Task