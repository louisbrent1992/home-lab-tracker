import { prisma } from '../../../lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import StepItem from '../../../components/StepItem'

export default async function LabPage(props: { params: Promise<{ labId: string }> }) {
  const params = await props.params
  const labId = parseInt(params.labId)
  
  if (isNaN(labId)) {
    return notFound()
  }

  const lab = await prisma.lab.findUnique({
    where: { id: labId },
    include: {
      module: true,
      steps: {
        orderBy: { order: 'asc' },
        include: {
          progresses: {
            where: { userId: 1 } // Hardcoded for simplicity
          }
        }
      }
    }
  })

  if (!lab) return notFound()

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 font-sans w-full pb-32">
      <Link 
        href="/" 
        className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-300 mb-10 text-sm font-medium"
      >
        <span className="transition-transform duration-300 group-hover:-translate-x-1">&larr;</span> Back to Curriculum
      </Link>
      
      <div className="mb-14 relative">
        <div className="inline-block px-3 py-1 bg-zinc-800/60 border border-zinc-700/50 rounded-lg text-xs font-semibold text-indigo-400 tracking-widest uppercase mb-4 shadow-sm">
          {lab.module.title}
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-white leading-tight">
          {lab.title}
        </h1>
        
        <div className="grid gap-4">
          {lab.objective && (
            <div className="p-5 rounded-xl border border-blue-900/30 bg-blue-900/10 backdrop-blur-sm">
              <h3 className="text-blue-400 font-semibold mb-1 text-sm uppercase tracking-wider">CompTIA Exam Objective</h3>
              <p className="text-lg text-blue-50/90 leading-relaxed font-light">{lab.objective}</p>
            </div>
          )}
          {lab.prerequisites && (
            <div className="p-5 rounded-xl border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-sm">
              <h3 className="text-zinc-500 font-semibold mb-1 text-sm uppercase tracking-wider">Prerequisites & Setup</h3>
              <p className="text-zinc-300 leading-relaxed font-light">{lab.prerequisites}</p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        {lab.steps.map((step, index) => {
          const progress = step.progresses[0]
          const isDone = progress?.status === 'DONE'
          
          return (
            <StepItem 
              key={step.id} 
              step={step} 
              isDone={isDone} 
              notes={progress?.notes || ''}
              answer={progress?.answer || ''}
              userId={1}
              totalSteps={lab.steps.length}
            />
          )
        })}
      </div>
    </div>
  )
}
