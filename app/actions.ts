'use server'

import { prisma } from '../lib/prisma'
import { revalidatePath } from 'next/cache'

export async function toggleStepProgress(userId: number, stepId: number, isDone: boolean, answer: string | null = null) {
  const status = isDone ? 'DONE' : 'IN_PROGRESS'
  await prisma.stepProgress.upsert({
    where: {
      userId_stepId: {
        userId,
        stepId
      }
    },
    update: {
      status,
      ...(answer !== null && { answer })
    },
    create: {
      userId,
      stepId,
      status,
      ...(answer !== null && { answer })
    }
  })
  
  revalidatePath('/labs/[labId]', 'page')
  revalidatePath('/')
}

export async function saveStepNote(userId: number, stepId: number, notes: string) {
  await prisma.stepProgress.upsert({
    where: {
      userId_stepId: { userId, stepId }
    },
    update: { notes },
    create: {
      userId,
      stepId,
      notes,
      status: 'DONE'
    }
  })
  revalidatePath('/labs/[labId]', 'page')
  revalidatePath('/')
}
