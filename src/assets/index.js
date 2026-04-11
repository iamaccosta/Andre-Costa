// ─── Shared animation variants ───────────────────────────────────────────────
// Import these instead of defining locally in each component.

export const easeSmooth = [0.22, 1, 0.36, 1]

export const fadeUp = {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeSmooth } },
}

export const stagger = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
import InstagramLineIcon from 'remixicon-react/InstagramLineIcon'
import LinkedInCircleLineIcon from 'remixicon-react/LinkedinLineIcon'
import GithubLineIcon from 'remixicon-react/GithubLineIcon'

export const heroIcons = [
  {
    icon: <InstagramLineIcon />,
    link: 'https://www.instagram.com/andre11costa11/'
  },
  {
    icon: <LinkedInCircleLineIcon />,
    link: 'https://www.linkedin.com/in/iamaccosta/'
  },
  {
    icon: <GithubLineIcon />,
    link: 'https://github.com/iamaccosta'
  },
]

export const heroRoles = [
  "Software Engineer",
  "Full-Stack Developer",
  "IIoT Researcher",
  "UI / UX Enthusiast",
]

export const heroTechBadges = [
  { label: "React",      color: "#61dafb", style: { top: "-16px",   left: "18px"    } },
  { label: "Next.js",    color: "#e4e4e7", style: { top: "10%",     right: "-22px"  } },
  { label: "Tailwind",   color: "#38bdf8", style: { bottom: "12%",  right: "-26px"  } },
  { label: "Node.js",    color: "#6abf69", style: { bottom: "-14px",left: "22%"     } },
]

// About Me
import GithubFillIcon from 'remixicon-react/GithubFillIcon'
import Projector2LineIcon from 'remixicon-react/Projector2LineIcon'
import GroupLineIcon from 'remixicon-react/GroupLineIcon'
import AwardFillIcon from 'remixicon-react/AwardFillIcon'

export const aboutData = [
  {
    title: 'Github Repos',
    amount: 35,
    icon: <GithubFillIcon />,
  },
  {
    title: 'Successful Projects',
    amount: 22,
    icon: <Projector2LineIcon />,
  },
  {
    title: 'Satisfied clients',
    amount: 20,
    icon: <GroupLineIcon />,
  },
  {
    title: 'Certifications',
    amount: 8,
    icon: <AwardFillIcon />,
  },
]

import DownloadLineIcon from 'remixicon-react/DownloadLineIcon'
import ArrowLeftSFillIcon from 'remixicon-react/ArrowLeftSFillIcon'

export const downloadIcon = <DownloadLineIcon />
export const arrowLeftIcon = <ArrowLeftSFillIcon />

// Experience
import BookOpenLineIcon from 'remixicon-react/BookOpenLineIcon'
import Building2LineIcon from 'remixicon-react/Building2LineIcon'
import FlaskLineIcon from 'remixicon-react/FlaskLineIcon'
import Medal2FillIcon from 'remixicon-react/Medal2FillIcon'

export const experienceIcons = {
  education: <BookOpenLineIcon />,
  work:      <Building2LineIcon />,
  research:  <FlaskLineIcon />,
  award:     <Medal2FillIcon />,
}

export const aboutHighlights = [
  "Full-Stack Development",
  "IIoT & Digital Twins",
  "Software Architecture",
  "REST API Design",
  "React & Next.js",
  "Research & Innovation",
]

// About Me
export const aboutText = "I'm André Costa, an Informatics and Computing Engineer with a strong focus on building production-grade software and scalable systems. Currently working as a Junior Researcher at INESC TEC, I develop Digital Twin solutions using Asset Administration Shell (AAS) and IIoT architectures, bridging research with real industrial applications.\n\nI have a solid background in full-stack development and software architecture, with hands-on experience across modern technologies including React, Node.js, Docker, and data-driven systems. I approach engineering with precision and ownership, aiming not just to write code, but to design reliable, maintainable solutions that deliver real impact.\n\nDriven by continuous improvement, I invest heavily in learning, personal projects, and refining both technical and problem-solving skills—always pushing to operate at a higher level each iteration."

// Experience
export const experienceData = [
  {
    year: 2019,
    title: 'High School Diploma in Science and Technology',
    education:
      'Completed secondary education in Science and Technology at António Sérgio Secondary School, Vila Nova de Gaia, Porto, Portugal.',
    experience: [
      'Built a strong foundation in mathematics, physics, and analytical problem-solving.',
      'Had early exposure to programming concepts, including Visual Basic.',
    ],
    work: false,
  },
  {
    year: 2020,
    title: 'Electrical and Computer Engineering - 1st Year',
    education:
      'Completed the 1st year of the Integrated Master\'s in Electrical and Computer Engineering at FEUP, Porto, Portugal.',
    experience: [
      'Developed core engineering fundamentals in mathematics, physics, and computational thinking.',
      'Strengthened programming foundations through work in Assembly and C.',
    ],
    work: false,
  },
  {
    year: 2023,
    title: "Bachelor's in Informatics and Computing Engineering",
    education:
      "Completed a Bachelor's degree in Informatics and Computing Engineering at FEUP, Porto, Portugal.",
    experience: [
      'Built a solid foundation in computer science, software development, and software testing.',
      'Strengthened problem-solving, collaboration, and engineering discipline through academic projects.',
    ],
    work: false,
  },
  {
    year: 2025,
    title: "Master's in Informatics and Computing Engineering",
    education:
      "Completed a Master's degree in Informatics and Computing Engineering at FEUP, Porto, Portugal.",
    experience: [
      'Specialized in software architecture, requirements engineering, agile methodologies, and Industry 4.0 technologies.',
      'Combined research work with practical software development in applied engineering contexts.',
    ],
    work: false,
  },
  {
    year: 2025,
    title: 'Fellow Researcher at INESC TEC',
    education:
      'Worked for 2 years as a Scholarship Researcher at INESC TEC, Porto, Portugal.',
    experience: [
      'Developed Digital Twin solutions and IIoT architectures for industrial contexts.',
      'Applied the Asset Administration Shell (AAS) to represent and manage industrial assets.',
      'Integrated industrial communication protocols into data-driven software systems.',
      'Developed monitoring dashboards and visualization solutions using Grafana.',
    ],
    work: true,
  },
  {
    year: 'Today',
    title: 'Junior Researcher at INESC TEC',
    education:
      'Currently working as a Junior Researcher at INESC TEC, Porto, Portugal.',
    experience: [
      'Contribute to the preparation of European research and innovation project proposals.',
      'Provide technological consulting to industrial partners.',
    ],
    work: true,
  },
]

// Skills
export const skillsData = [
  {
    name: 'Figma',
    icon: '/skills/figma.png',
  },
  {
    name: 'Photoshop',
    icon: '/skills/photoshop.png',
  },
  {
    name: 'Blender',
    icon: '/skills/blender.png',
  },
  {
    name: 'VS Code',
    icon: '/skills/vscode.png',
  },
  {
    name: 'HTML',
    icon: '/skills/html.png',
  },
  {
    name: 'CSS',
    icon: '/skills/css.png',
  },
  {
    name: 'JavaScript',
    icon: '/skills/js.png',
  },
  {
    name: 'TailwindCSS',
    icon: '/skills/tailwind.png',
  },
  {
    name: 'Vite',
    icon: '/skills/vite.png',
  },
  {
    name: 'ReactJS',
    icon: '/skills/react.png',
  },
  {
    name: 'TypeScript',
    icon: '/skills/ts.png',
  },
  {
    name: 'AI',
    icon: '/skills/ai.png',
  },
  {
    name: 'Framer Motion',
    icon: '/skills/framer.png',
  },
  {
    name: 'ThreeJS',
    icon: '/skills/threejs.png',
  },
  {
    name: 'NextJS',
    icon: '/skills/nextjs.png',
  },
  {
    name: 'NodeJS',
    icon: '/skills/nodejs.png',
  },
  {
    name: 'MongoDB',
    icon: '/skills/mongodb.png',
  },
  {
    name: 'Github',
    icon: '/skills/github.png',
  },
]

import StoreIcon from 'remixicon-react/StoreLineIcon'
export const storeIcon = <StoreIcon />

// Services
import CodeBoxLineIcon   from 'remixicon-react/CodeBoxLineIcon'
import ServerLineIcon    from 'remixicon-react/ServerLineIcon'
import Layout3LineIcon   from 'remixicon-react/Layout3LineIcon'
import DatabaseLineIcon  from 'remixicon-react/DatabaseLineIcon'
import BugLineIcon       from 'remixicon-react/BugLineIcon'
import PaintBrushLineIcon from 'remixicon-react/PaintBrushLineIcon'

export const servicesData = [
  {
    title: 'Web Development',
    subtitle: 'Responsive, modern web applications',
    icon: <CodeBoxLineIcon />,
    accent: '#f59e0b',
    description:
      'Design and develop responsive web applications with clean architecture and performance in mind. Focused on usability, maintainability, and scalable frontend structures.',
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: 'Backend & APIs',
    subtitle: 'Robust and scalable backend services',
    icon: <ServerLineIcon />,
    accent: '#10b981',
    description:
      'Design and implement backend systems and RESTful APIs to support web and mobile applications. Emphasis on data integrity, performance, and clear service architecture.',
    tech: ['Node.js', 'Spring Boot', 'REST APIs', 'SQL'],
  },
  {
    title: 'Full-Stack Development',
    subtitle: 'End-to-end application development',
    icon: <Layout3LineIcon />,
    accent: '#818cf8',
    description:
      'Build complete applications from frontend to backend, ensuring seamless integration between components and consistent data flow across the system.',
    tech: ['React', 'Node.js', 'Next.js', 'SQL'],
  },
  {
    title: 'Database Design',
    subtitle: 'Structured and efficient data systems',
    icon: <DatabaseLineIcon />,
    accent: '#60a5fa',
    description:
      'Design relational database schemas and optimize data storage solutions to ensure consistency, scalability, and efficient querying.',
    tech: ['PostgreSQL', 'MySQL', 'SQL'],
  },
  {
    title: 'Bug Fixing & Optimization',
    subtitle: 'Debugging, refactoring, and performance improvements',
    icon: <BugLineIcon />,
    accent: '#f87171',
    description:
      'Identify, debug, and resolve issues in existing applications. Improve code quality, fix performance bottlenecks, and ensure system stability.',
    tech: ['Debugging', 'Code Review', 'Performance Optimization'],
  },
  {
    title: 'UI Implementation',
    subtitle: 'Clean and responsive user interfaces',
    icon: <PaintBrushLineIcon />,
    accent: '#c084fc',
    description:
      'Translate designs into responsive and consistent user interfaces, focusing on layout precision, responsiveness, and user experience.',
    tech: ['HTML', 'CSS', 'Tailwind CSS', 'React'],
  },
]

export const serviceDemos = [
  {
    key: 'portfolio',
    label: 'Portfolio Website',
    description: 'A personal showcase site — hero section, animated role cycling, social links, and a smooth scroll experience.',
  },
  {
    key: 'gallery',
    label: 'Digital Gallery',
    description: 'A filterable media gallery with category pills, search, and card hover interactions.',
  },
  {
    key: 'shop',
    label: 'Online Shop',
    description: 'A product page with color selector, quantity control, add-to-cart feedback, and wishlist toggle.',
  },
  {
    key: 'menu',
    label: 'Restaurant Menu',
    description: 'A categorized restaurant menu with item cards, dietary tags, and a clean ordering UI.',
  },
  {
    key: 'business',
    label: 'Business Website',
    description: 'A corporate landing page with navbar, hero headline, stats row, and a services grid.',
  },
]

// Reviews
import StarFillIcon from 'remixicon-react/StarFillIcon'
import StarHalfLineIcon from 'remixicon-react/StarHalfLineIcon'
import ArrowLeftSLineIcon from 'remixicon-react/ArrowLeftSLineIcon'
import ArrowRightSLineIcon from 'remixicon-react/ArrowRightSLineIcon'

/* eslint-disable react/jsx-key */
export const starIcons = [<StarFillIcon />, <StarHalfLineIcon />]
export const arrowIcons = [<ArrowLeftSLineIcon />, <ArrowRightSLineIcon />]

export const reviewsData = []

// Projects
export const projectsData = [
  {
    name: 'Master Dissertation - Digital Twins in Industrial Environments',
    summary:
      'Research work focused on the application of standardized Digital Twins using Asset Administration Shell (AAS) in industrial production environments.',
    highlights: [
      'Designed and evaluated Digital Twin architectures aligned with Industry 4.0 standards.',
      'Applied Asset Administration Shell (AAS) concepts to represent and manage industrial assets.',
      'Explored integration of IIoT systems, communication protocols, and data pipelines for real-world scenarios.',
    ],
    domain: 'Research',
    source: 'academic',
    tech: ['AAS', 'MQTT', 'Kafka', 'Grafana', 'IIoT'],
    repoUrl:
      'https://repositorio-aberto.up.pt/handle/10216/169157',
    status: 'completed',
  },
  {
    name: 'AAS-PLC Pipeline',
    summary:
      'Industrial application connecting Asset Administration Shell-based Digital Twins with Siemens S7 PLCs for real-time monitoring and control.',
    highlights: [
      'Developed a RESTful backend using Spring Boot to enable bidirectional communication between AAS models and PLC systems.',
      'Integrated industrial communication protocols to support real-time data acquisition and control.',
      'Enabled monitoring and remote operation of industrial assets through a Digital Twin abstraction layer.',
    ],
    domain: 'IoT',
    source: 'professional',
    tech: ['Java', 'Spring Boot', 'AAS', 'PLC Drivers', 'REST'],
    status: 'prototype',
  },
  {
    name: 'AAS for Bio-Products in Aquaculture',
    summary:
      'Ongoing research project focused on developing Asset Administration Shell templates for aquaculture production systems, with application to seaweed cultivation.',
    highlights: [
      'Designed AAS templates to model biological growth processes and cultivation environments.',
      'Applied Digital Twin concepts to non-traditional industrial domains (aquaculture).',
      'Contributed to structuring data models and semantic representations for biological production systems.',
    ],
    domain: 'Research',
    source: 'professional',
    tech: ['AAS', 'Digital Twins', 'IIoT'],
    status: 'in-progress',
  },
  {
    name: 'GymNote',
    summary:
      'Mobile application for workout tracking and training management, initially based on an Android development course and later extended into a personal product.',
    highlights: [
      'Designed application structure and data models for tracking workouts, exercises, and progress.',
      'Extended beyond course baseline by adapting features to real personal use cases.',
      'Focused on usability and consistency for day-to-day usage in training routines.',
    ],
    domain: 'Mobile',
    source: 'course',
    tech: ['Kotlin', 'Android'],
    status: 'completed',
  },
  {
    name: 'Web Portfolio',
    summary:
      'Personal portfolio website built with modern web technologies to present projects, experience, and technical profile.',
    highlights: [
      'Designed and implemented a responsive UI with structured content and clear information hierarchy.',
      'Customized beyond the original course baseline with additional sections, improved layout, and tailored content.',
      'Focused on performance, maintainability, and clean component architecture.',
    ],
    domain: 'Web',
    source: 'course',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    repoUrl:
      'https://www.udemy.com/course/build-portfolio-with-nextjs-framer-motion-tailwind-css/',
    status: 'completed',
  },
]

export const projectDomainConfig = {
  Web:       { color: '#3b82f6', icon: '🌐' },
  Mobile:    { color: '#8b5cf6', icon: '📱' },
  Fullstack: { color: '#f59e0b', icon: '⚡' },
  Backend:   { color: '#10b981', icon: '🗄️' },
  AI:        { color: '#ec4899', icon: '🤖' },
  IoT:       { color: '#06b6d4', icon: '📡' },
  Research:  { color: '#6366f1', icon: '🔬' },
}

export const projectDomains = [
  'All',
  'Web',
  'Mobile',
  'Fullstack',
  'Backend',
  'AI',
  'IoT',
  'Research',
]

import ExternalLinkLineIcon from 'remixicon-react/ExternalLinkLineIcon'
import GithubFill2Icon from 'remixicon-react/GithubFillIcon'

export const projectLinkIcon = <ExternalLinkLineIcon />
export const projectGithubIcon = <GithubFill2Icon />

export const projectStatusConfig = {
  completed:   { label: 'Completed',   color: '#10b981', bg: 'rgba(16,185,129,0.10)' },
  prototype:   { label: 'Prototype',   color: '#f59e0b', bg: 'rgba(245,158,11,0.10)' },
  'in-progress': { label: 'In Progress', color: '#818cf8', bg: 'rgba(129,140,248,0.10)' },
}

export const projectSourceConfig = {
  academic:     { label: 'Academic',     color: '#60a5fa' },
  professional: { label: 'Professional', color: '#34d399' },
  course:       { label: 'Course',       color: '#f472b6' },
}

// Pricing Plans
import CheckLineIcon    from 'remixicon-react/CheckLineIcon'
import RocketLineIcon   from 'remixicon-react/RocketLineIcon'
import AwardLineIcon    from 'remixicon-react/AwardLineIcon'
import VipCrownLineIcon from 'remixicon-react/VipCrownLineIcon'

export const checkIcon = <CheckLineIcon />

export const pricingPlans = [
  {
    tier: 'Basic',
    title: 'Website Dev. — Basic',
    pricing: '$400 - $800',
    icon: <RocketLineIcon />,
    accent: '#f59e0b',
    isPopular: false,
    features: [
      'Up to 5 pages',
      'Responsive design',
      'Basic SEO',
      'Contact form',
      'Social media links',
      '1 month of support',
    ],
    recommended: 'Personal websites, bloggers, small local businesses',
  },
  {
    tier: 'Standard',
    title: 'Website Dev. — Standard',
    pricing: '$1,200 - $2,200',
    icon: <AwardLineIcon />,
    accent: '#ef4444',
    isPopular: true,
    features: [
      'Up to 10 pages',
      'Responsive design',
      'Advanced SEO',
      'Contact form',
      'Social media links',
      'E-commerce (up to 20 products)',
      'Blog setup',
      'Google Analytics',
      '3 months of support',
    ],
    recommended: 'Growing businesses, service providers, online stores',
  },
  {
    tier: 'Premium',
    title: 'Website Dev. — Premium',
    pricing: '$3,500 - $7,000',
    icon: <VipCrownLineIcon />,
    accent: '#818cf8',
    isPopular: false,
    features: [
      'Unlimited pages',
      'Responsive design',
      'Comprehensive SEO',
      'Contact form',
      'Social media links',
      'Advanced security',
      'E-commerce (unlimited products)',
      'Blog setup',
      'Google Analytics with custom reports',
      '6 months of support',
    ],
    recommended: 'Large businesses, enterprises, complex web applications',
  },
]

// Q & A
export const questions = [
  {
    question: "How do we communicate throughout the project?",
    answer: "Before we start, we have a discovery call to align on scope and expectations. During the build, communication takes place primarily over email or messaging, keeping everything written and trackable. I provide regular progress updates and welcome feedback at each milestone.",
  },
  {
    question: "How long does it take to build a website?",
    answer: "It typically takes 4 to 8 weeks from kickoff to delivery, depending on the complexity and scope. The timeline is heavily influenced by how quickly content, assets, and feedback are provided on your side. I will always give you a clear estimate before we begin.",
  },
  {
    question: "What do you need from me to get started?",
    answer: "To kick off the project I need a clear brief covering your goals, target audience, and any design references you like. Depending on the scope, I may also need copy (text), images or brand assets, and access to any existing tools or platforms you use.",
  },
  {
    question: "Who hosts the website and handles deployment?",
    answer: "I handle the full deployment process. For most projects I recommend Vercel or Netlify, both are fast, reliable, and have generous free tiers. If you already have a preferred hosting provider, I can work with that too. You will always have full ownership and access to your infrastructure.",
  },
  {
    question: "Can I update the website myself after it is delivered?",
    answer: "Yes. I build with maintainability in mind and can integrate a CMS (like Sanity or Contentful) so you can manage content without touching code. I also provide a handover walkthrough so you feel confident making day-to-day edits on your own.",
  },
  {
    question: "What happens if I am not happy with the result?",
    answer: "Satisfaction is a priority. I share design mockups and work-in-progress previews before full implementation, so you can give feedback early. If something does not meet expectations after delivery, I offer a revision round to address it. The goal is always a result you are proud of.",
  },
]

import ArrowDropDownLineIcon from 'remixicon-react/ArrowDropDownLineIcon'
export const questionArrow = <ArrowDropDownLineIcon />

// Navbar
import CopyrightLineIcon from 'remixicon-react/CopyrightLineIcon'

export const copyRightIcon = <CopyrightLineIcon />

import Home5LineIcon       from 'remixicon-react/Home5LineIcon'
import UserLineIcon         from 'remixicon-react/UserLineIcon'
import RoadMapLineIcon      from 'remixicon-react/RoadMapLineIcon'
import Folder3LineIcon      from 'remixicon-react/Folder3LineIcon'
import BriefcaseLineIcon    from 'remixicon-react/BriefcaseLineIcon'
import PriceTag3LineIcon    from 'remixicon-react/PriceTag3LineIcon'
import MailLineIcon         from 'remixicon-react/MailLineIcon'
import QuestionLineIcon     from 'remixicon-react/QuestionLineIcon'
// Reserved for future sections (Skills, Reviews)
export { default as CpuLineIcon }       from 'remixicon-react/CpuLineIcon'
export { default as ChatQuoteLineIcon } from 'remixicon-react/ChatQuoteLineIcon'

export const navbarData = [
  { id: 'home',       name: 'Home',      icon: <Home5LineIcon />      },
  { id: 'about',      name: 'About',     icon: <UserLineIcon />       },
  { id: 'experience', name: 'MyRoad',    icon: <RoadMapLineIcon />    },
  { id: 'projects',   name: 'Projects',  icon: <Folder3LineIcon />    },
  { id: 'services',   name: 'Services',  icon: <BriefcaseLineIcon />  },
  { id: 'contact',    name: 'Contact',   icon: <MailLineIcon />       },
  { id: 'questions',  name: 'FAQ',       icon: <QuestionLineIcon />   },
]

// Toggle
import MoonFoggyFillIcon from 'remixicon-react/MoonFoggyFillIcon'
import SunFoggyFillIcon from 'remixicon-react/SunFoggyFillIcon'

export const sunIcon = <SunFoggyFillIcon />
export const moonIcon = <MoonFoggyFillIcon />
