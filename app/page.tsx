import { prisma } from '../lib/prisma'
import Link from 'next/link'

export default async function Home() {
  let user = await prisma.user.findFirst()
  if (!user) user = await prisma.user.create({ data: { name: 'Demo User' } })
  const userId = user.id

  const modules = await prisma.module.findMany({
    orderBy: { order: 'asc' },
    include: {
      labs: { 
        orderBy: { order: 'asc' },
        include: {
          steps: {
            include: {
              progresses: { where: { userId } }
            }
          }
        }
      }
    }
  })

  let totalLabs = 0
  let completedLabsCount = 0

  const structuredModules = modules.map(mod => {
    const enrichedLabs = mod.labs.map(lab => {
      totalLabs++
      const totalSteps = lab.steps.length
      const completedSteps = lab.steps.filter(s => s.progresses[0]?.status === 'DONE').length
      const isCompleted = totalSteps > 0 && completedSteps === totalSteps
      const percentage = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0
      
      if (isCompleted) completedLabsCount++
      
      return { ...lab, isCompleted, percentage, totalSteps, completedSteps }
    })
    return { ...mod, labs: enrichedLabs }
  })

  const globalPercentage = totalLabs > 0 ? Math.round((completedLabsCount / totalLabs) * 100) : 0

  return (
    <div className="max-w-5xl mx-auto p-8 font-sans w-full">
      <div className="py-16 md:py-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          CompTIA A+ Certification Prep
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-gradient-to-br from-white via-zinc-200 to-zinc-600 text-transparent bg-clip-text">
          Interactive Lab Tracker
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 leading-relaxed font-light mb-10">
          Master IT fundamentals, networking, and troubleshooting with hands-on labs designed for the CompTIA A+ exam. Select a curriculum module to begin.
        </p>

        {/* Global Progress Bar */}
        <div className="max-w-md mx-auto bg-zinc-900/60 border border-zinc-800/80 p-5 rounded-2xl shadow-xl backdrop-blur-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-zinc-300 font-medium tracking-tight">Course Progress</span>
            <span className={`font-bold ${globalPercentage === 100 ? 'text-green-400' : 'text-blue-400'}`}>
              {globalPercentage}% ({completedLabsCount}/{totalLabs} Labs)
            </span>
          </div>
          <div className="w-full bg-zinc-800/50 rounded-full h-3.5 overflow-hidden border border-zinc-900 shadow-inner">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${
                globalPercentage === 100 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-400' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-400'
              }`}
              style={{ width: `${globalPercentage}%` }}
            >
              <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite] -skew-x-12 translate-x-[-100%]" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-10">
        {structuredModules.map(mod => {
          const modTotalLabs = mod.labs.length;
          const modCompletedLabs = mod.labs.filter(l => l.isCompleted).length;
          const modIsFullyComplete = modTotalLabs > 0 && modCompletedLabs === modTotalLabs;

          return (
            <div 
              key={mod.id} 
              className={`group relative border bg-zinc-900/40 backdrop-blur-xl rounded-2xl p-8 transition-all duration-500 shadow-2xl shadow-black/50 ${
                modIsFullyComplete 
                  ? 'border-green-500/20 hover:border-green-500/40 hover:bg-zinc-900/60' 
                  : 'border-zinc-800/60 hover:border-zinc-700 hover:bg-zinc-900/80'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-2xl transition-all duration-500 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-3">
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white transition-colors duration-300">
                    {mod.title}
                  </h2>
                  <div className="shrink-0 text-sm font-medium px-3 py-1 rounded-full border bg-zinc-950/50 flex items-center gap-2 w-max">
                    {modIsFullyComplete ? (
                      <>
                        <span className="text-green-400">&#10003;</span>
                        <span className="text-green-500/90 tracking-wide">COMPLETED</span>
                      </>
                    ) : (
                      <>
                        <span className="text-zinc-500">MODULE PROGRESS</span>
                        <span className="text-indigo-400">{modCompletedLabs}/{modTotalLabs}</span>
                      </>
                    )}
                  </div>
                </div>

                <p className="text-zinc-400 mb-8 font-light text-sm md:text-base leading-relaxed">
                  {mod.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mod.labs.map(lab => (
                    <Link 
                      key={lab.id} 
                      href={`/labs/${lab.id}`} 
                      className={`flex flex-col p-5 border rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden ${
                        lab.isCompleted 
                          ? 'border-green-500/30 bg-green-500/5 hover:border-green-500/50 hover:bg-green-500/10 hover:shadow-green-500/10' 
                          : 'border-zinc-800 bg-black/40 hover:border-indigo-500/50 hover:bg-indigo-500/5 hover:shadow-indigo-500/10'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <span className="font-semibold text-zinc-100 truncate pr-6">{lab.title}</span>
                        {lab.isCompleted ? (
                          <div className="shrink-0 absolute top-4 right-4 text-green-400 bg-green-400/10 rounded-full p-0.5">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                          </div>
                        ) : lab.percentage > 0 ? (
                          <div className="shrink-0 absolute top-4 right-4 text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                            {lab.percentage}%
                          </div>
                        ) : null}
                      </div>

                      <span className="text-sm text-zinc-500 line-clamp-2 leading-relaxed">{lab.objective}</span>
                      
                      {/* Sub-progress bar purely for the lab card */}
                      {!lab.isCompleted && lab.percentage > 0 && (
                        <div className="w-full h-1 bg-zinc-800 rounded-full mt-4 overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${lab.percentage}%` }} />
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
