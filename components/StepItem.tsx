'use client'

import { useOptimistic, useState } from 'react'
import { toggleStepProgress, saveStepNote } from '../app/actions'

export default function StepItem({ step, isDone: initialIsDone, notes, answer, userId, totalSteps }: any) {
  const [optimisticIsDone, addOptimisticIsDone] = useOptimistic(
    initialIsDone,
    (state, optimisticValue) => optimisticValue as boolean
  )
  
  const [isNoteOpen, setIsNoteOpen] = useState(false)
  const [noteValue, setNoteValue] = useState(notes)
  const [answerValue, setAnswerValue] = useState(answer || '')
  
  const handleToggle = async (formData: FormData) => {
    const newValue = !optimisticIsDone
    addOptimisticIsDone(newValue)
    await toggleStepProgress(userId, step.id, newValue, step.question ? answerValue : null)
  }

  const handleNoteSave = async () => {
    await saveStepNote(userId, step.id, noteValue)
    setIsNoteOpen(false)
  }

  return (
    <div 
      className={`relative overflow-hidden border rounded-2xl p-6 md:p-8 transition-all duration-500 shadow-xl ${
        optimisticIsDone 
          ? 'bg-zinc-900/40 border-green-500/20 shadow-green-900/10' 
          : 'bg-zinc-900/80 border-zinc-800 shadow-black'
      }`}
    >
      {/* Subtle background glow for completed states */}
      {optimisticIsDone && (
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-[80px] pointer-events-none" />
      )}
      
      <div className="relative flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="flex-1 w-full">
          <div className="flex items-center gap-3 mb-4">
            <span className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
              optimisticIsDone ? 'bg-green-500/20 text-green-400' : 'bg-zinc-800 text-zinc-400'
            }`}>
              {step.stepNumber}
            </span>
            <h3 className="text-xl font-bold tracking-tight text-zinc-100">Action Required</h3>
          </div>
          
          <p className="text-zinc-300 leading-relaxed font-light text-lg mb-6">{step.description}</p>
          
          {step.commands && (
            <div className="mb-6 relative group z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none" />
              <pre className="relative bg-black/50 p-5 rounded-xl overflow-x-auto border border-zinc-800/80 font-mono text-sm shadow-inner selection:bg-blue-500/30">
                <code className="text-zinc-300">{step.commands}</code>
              </pre>
            </div>
          )}
          
          {step.expectedResult && (
            <div className="flex items-start gap-3 text-sm bg-indigo-950/20 border border-indigo-900/30 p-4 rounded-xl text-indigo-400/90 font-light leading-relaxed mb-6">
              <svg className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span><strong className="font-semibold text-indigo-300">Expected:</strong> {step.expectedResult}</span>
            </div>
          )}

          {step.question && (
            <div className="bg-zinc-950/50 border border-zinc-800 p-5 rounded-xl">
              <label className="block text-sm font-semibold text-zinc-300 mb-3">{step.question}</label>
              <input 
                type="text" 
                className={`w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all ${optimisticIsDone ? 'opacity-75 cursor-not-allowed border-green-500/50 ring-1 ring-green-500/20' : ''}`}
                placeholder="Enter your system response..." 
                value={answerValue} 
                onChange={(e) => setAnswerValue(e.target.value)} 
                readOnly={optimisticIsDone}
              />
              <p className="text-xs text-zinc-500 mt-2 font-light">Your response is recorded when you mark the step as complete.</p>
            </div>
          )}
        </div>
        
        <div className="shrink-0 w-full md:w-auto relative z-20">
          <form action={handleToggle}>
              <button 
                type="submit"
                disabled={!optimisticIsDone && !!step.question && !answerValue.trim()}
                className={`w-full md:w-auto px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 border shadow-lg group ${
                  optimisticIsDone 
                   ? 'bg-green-500/10 border-green-500/30 text-green-400 shadow-green-900/20 cursor-pointer hover:bg-zinc-800 hover:border-zinc-600 hover:text-white' 
                   : (!optimisticIsDone && !!step.question && !answerValue.trim())
                     ? 'bg-zinc-800/50 border-zinc-800 text-zinc-500 cursor-not-allowed opacity-50'
                     : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:border-zinc-600 hover:text-white hover:scale-105 active:scale-95 cursor-pointer'
                }`}
              >
               {optimisticIsDone ? (
                 <>
                   <span className="flex items-center justify-center gap-2 group-hover:hidden">
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                     </svg>
                     Completed
                   </span>
                   <span className="hidden group-hover:flex items-center justify-center gap-2">
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                     </svg>
                     Retry Task
                   </span>
                 </>
               ) : 'Mark as Complete'}
             </button>
          </form>
        </div>
      </div>
      
      {optimisticIsDone && (
        <div className="relative mt-8 pt-6 border-t border-zinc-800/50">
          {!isNoteOpen ? (
            <div 
              className="flex justify-between items-center group cursor-pointer p-4 rounded-xl hover:bg-zinc-800/30 transition-colors border border-transparent hover:border-zinc-800" 
              onClick={() => setIsNoteOpen(true)}
            >
               <div className="text-sm text-zinc-400 font-light flex items-center gap-3">
                 <svg className="w-5 h-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                 </svg>
                 {noteValue ? <span><strong className="font-semibold text-zinc-300">Notes:</strong> {noteValue}</span> : 'Add study notes or troubleshooting steps taken...'}
               </div>
               <span className="text-sm text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity font-medium">Edit Notes</span>
            </div>
          ) : (
            <div className="space-y-4 duration-300 scale-100 origin-top">
              <textarea 
                className="w-full p-4 border border-zinc-700 rounded-xl bg-black/50 text-zinc-200 text-sm focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-zinc-600 font-light resize-y"
                rows={4} 
                value={noteValue} 
                onChange={(e) => setNoteValue(e.target.value)}
                placeholder="Document your practical findings, errors encountered, and exactly how you fixed them for the A+ exam..."
                autoFocus
              />
              <div className="flex justify-end gap-3 relative z-20">
                <button 
                  className="px-5 py-2.5 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer" 
                  onClick={() => setIsNoteOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-all shadow-lg shadow-indigo-900/50 hover:shadow-indigo-900 cursor-pointer" 
                  onClick={handleNoteSave}
                >
                  Save Documentation
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
