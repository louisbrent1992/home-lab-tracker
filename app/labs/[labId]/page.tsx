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

  let user = await prisma.user.findFirst()
  if (!user) {
    user = await prisma.user.create({ data: { name: 'Demo User' } })
  }
  const userId = user.id

  const lab = await prisma.lab.findUnique({
    where: { id: labId },
    include: {
      module: true,
      steps: {
        orderBy: { order: 'asc' },
        include: {
          progresses: {
            where: { userId: userId }
          }
        }
      }
    }
  })

  if (!lab) return notFound()

  // Fetch all labs to implement next/prev navigation correctly based on curriculum order
  const allLabs = await prisma.lab.findMany({
    orderBy: [
      { module: { order: 'asc' } },
      { order: 'asc' }
    ],
    select: { id: true, title: true }
  })
  
  const currentLabIndex = allLabs.findIndex(l => l.id === labId)
  const prevLab = currentLabIndex > 0 ? allLabs[currentLabIndex - 1] : null
  const nextLab = currentLabIndex < allLabs.length - 1 ? allLabs[currentLabIndex + 1] : null

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
        
        {/* Lab Progress Indicator */}
        <div className="mt-8 bg-zinc-900/60 border border-zinc-800/80 p-5 rounded-xl shadow-lg backdrop-blur-sm">
          {(() => {
            const totalSteps = lab.steps.length;
            const completedSteps = lab.steps.filter(s => s.progresses[0]?.status === 'DONE').length;
            const percentage = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
            
            return (
              <>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-zinc-300 font-medium">Lab Progress</span>
                  <span className={`font-bold ${percentage === 100 ? 'text-green-400' : 'text-indigo-400'}`}>
                    {percentage}% ({completedSteps}/{totalSteps} Steps)
                  </span>
                </div>
                <div className="w-full bg-zinc-800/50 rounded-full h-2.5 overflow-hidden border border-zinc-900">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${
                      percentage === 100 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-400' 
                        : 'bg-gradient-to-r from-indigo-600 to-indigo-400'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </>
            );
          })()}
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
              userId={userId}
              totalSteps={lab.steps.length}
            />
          )
        })}
      </div>

      {/* Navigation Footer */}
      <div className="mt-16 flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-zinc-800/50">
        {prevLab ? (
          <Link href={`/labs/${prevLab.id}`} className="w-full md:w-auto flex items-center justify-start gap-4 px-6 py-4 rounded-xl border border-zinc-800 bg-zinc-900/40 text-left hover:bg-zinc-800 hover:border-zinc-700 transition-all shadow-lg">
            <span className="text-zinc-500 text-2xl">&larr;</span>
            <div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Previous</div>
              <div className="text-zinc-300 font-medium">{prevLab.title}</div>
            </div>
          </Link>
        ) : <div className="hidden md:block w-full md:w-1/2" />}

        {nextLab ? (
          <Link href={`/labs/${nextLab.id}`} className="w-full md:w-auto flex items-center justify-end gap-4 px-6 py-4 rounded-xl border border-zinc-800 bg-zinc-900/40 text-right hover:bg-indigo-500/10 hover:border-indigo-500/50 transition-all shadow-lg group">
            <div>
              <div className="text-xs text-indigo-400 uppercase tracking-wider mb-1">Next Up</div>
              <div className="text-zinc-100 font-medium group-hover:text-indigo-300 transition-colors">{nextLab.title}</div>
            </div>
            <span className="text-indigo-500 text-2xl group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        ) : (
          <Link href="/" className="w-full md:w-auto flex items-center justify-end gap-4 px-6 py-4 rounded-xl border border-green-500/30 bg-green-500/10 text-right hover:bg-green-500/20 hover:border-green-500/50 transition-all shadow-lg">
            <div>
              <div className="text-xs text-green-400 uppercase tracking-wider mb-1">Finish Course</div>
              <div className="text-green-100 font-medium">Return to Dashboard</div>
            </div>
            <span className="text-green-500 text-2xl">&#10003;</span>
          </Link>
        )}
      </div>
    </div>
  )
}
