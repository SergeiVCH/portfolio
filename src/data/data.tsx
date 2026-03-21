// src/data.ts

export const developerProfile = {
  name: 'Сергей',
  title: 'Frontend Developer | React Specialist',
  about:
    'Я создаю быстрые, доступные и красивые интерфейсы. Мой фокус — чистый код, производительность и отличный UX. Специализируюсь на экосистеме React, но всегда открыт новому.',
  email: 'your.email@email.com',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
}

// export const skills = [
//   'React 19',
//   'TypeScript',
//   'Next.js',
//   'Zustand / Redux',
//   'TanStack Query',
//   'Tailwind CSS',
//   'Framer Motion',
//   'Git',
//   'REST API',
// ]

export const projects = [
  {
    title: 'Auto-diag-service',
    description: 'Диагностика Вашего авто',
    tech: ['React', 'TypeScript', 'Zustand', 'Tailwind'],
    liveUrl: 'https://aesthetic-khapse-9ed129.netlify.app/',
    repoUrl: 'https://github.com/SergeiVCH/auto-diag-pro.git',
    image: 'https://i.ibb.co.com/jP5rcThD/Screenshocct-1.jpg', // Замени на скриншот
  },
  {
    title: 'Baby mart',
    description: 'Забота о вашем ребенке',
    tech: ['React', 'Storybook', 'SCSS'],
    liveUrl: 'https://ubiquitous-naiad-0f2504.netlify.app/', // Если нет демо
    repoUrl: 'https://github.com/SergeiVCH/baby-store.git',
    image: 'https://i.ibb.co.com/JXC2rRc/Screenshot-2.jpg',
  },
   {
    title: 'Baby mart',
    description: 'Забота о вашем ребенке',
    tech: ['React', 'Storybook', 'SCSS'],
    liveUrl: 'https://ubiquitous-naiad-0f2504.netlify.app/', // Если нет демо
    repoUrl: 'https://github.com/SergeiVCH/baby-store.git',
    image: 'https://i.ibb.co.com/JXC2rRc/Screenshot-2.jpg',
  },
  // Добавь еще 1-2 проекта
]

export const techStack = [
  {
    category: 'Frontend',
    technologies: [
      'React 19',
      'TypeScript',
      'JavaScript (ES6+)',
      'Redux / Zustand',
      'MUI v6',
      'Tailwind CSS',
      'HTML5 & CSS3',
    ],
  },
  {
    category: 'Backend & DB',
    technologies: [
      'Node.js',
      'Express.js',
      'REST API',
      'PostgreSQL',
      'MongoDB',
    ],
  },
  {
    category: 'Tools & DevOps',
    technologies: [
      'Git / GitHub',
      'Vite',
      'Webpack',
      'Vercel / Netlify',
      'Docker',
      'Agile / Scrum',
    ],
  },
]
