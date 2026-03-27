import { prisma } from '../lib/prisma'
import Link from 'next/link'

export default async function Home() {
  const modules = await prisma.module.findMany({
    orderBy: { order: 'asc' },
    include: {
      labs: { orderBy: { order: 'asc' } }
    }
  })

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
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 leading-relaxed font-light">
          Master IT fundamentals, networking, and troubleshooting with hands-on labs designed for the CompTIA A+ exam. Select a curriculum module to begin.
        </p>
      </div>
      
      <div className="space-y-10">
        {modules.map(mod => (
          <div 
            key={mod.id} 
            className="group relative border border-zinc-800/60 bg-zinc-900/40 backdrop-blur-xl rounded-2xl p-8 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all duration-500 shadow-2xl shadow-black/50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-2xl transition-all duration-500 pointer-events-none" />
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight text-white group-hover:text-blue-400 transition-colors duration-300">
                {mod.title}
              </h2>
              <p className="text-zinc-400 mb-8 font-light text-sm md:text-base leading-relaxed">
                {mod.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mod.labs.map(lab => (
                  <Link 
                    key={lab.id} 
                    href={`/labs/${lab.id}`} 
                    className="flex flex-col p-5 border border-zinc-800 bg-black/40 rounded-xl hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10"
                  >
                    <span className="font-semibold text-zinc-100 mb-2 truncate">{lab.title}</span>
                    <span className="text-sm text-zinc-500 line-clamp-2 leading-relaxed">{lab.objective}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
