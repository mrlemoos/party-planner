import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

await prisma.userPlan.createMany({
  data: [
    {
      name: 'Startup',
      price: '0',
      period: 'year',
      highlights: ['Story pointing', '15 session', '10 session members'],
    },
    {
      name: 'Agile Team',
      price: '9.97',
      period: 'year',
      highlights: [
        'Everything in <b>Scrum</b>',
        'Session dashboard',
        '<b>40</b> sessions',
        '<b>15</b> session members',
        'Import tasks from <b>JIRA</b>',
      ],
      isComingSoon: true,
    },
    {
      name: 'Big Tech',
      price: '29.97',
      period: 'year',
      highlights: [
        'Everything in <b>Startup</b> & <b>Agile Team</b>',
        '<b>Custom</b> session',
        '<b>Unlimited</b> sessions',
        '<b>Export</b> session data',
        'Vote history',
      ],
      isComingSoon: true,
    },
  ],
  skipDuplicates: true,
})
console.log('Seed user plans successfully executed 🌱')

await prisma.$disconnect()
