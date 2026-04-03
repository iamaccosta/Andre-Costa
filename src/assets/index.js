// Hero
import InstagramLineIcon from 'remixicon-react/InstagramLineIcon'
import LinkedInCircleLineIcon from 'remixicon-react/LinkedinLineIcon'
import GithubLineIcon from 'remixicon-react/GithubLineIcon'

/* eslint-disable react/jsx-key */
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
      'Completed the 1st year of the Integrated Master’s in Electrical and Computer Engineering at FEUP, Porto, Portugal.',
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
export const servicesData = [
  {
    title: 'Web Development',
    subtitle: 'Responsive, modern web applications',
    visual: '/services/web-dev.gif',
    description:
      'Design and develop responsive web applications with clean architecture and performance in mind. Focused on usability, maintainability, and scalable frontend structures.',
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: 'Backend & APIs',
    subtitle: 'Robust and scalable backend services',
    visual: '/services/backend.gif',
    description:
      'Design and implement backend systems and RESTful APIs to support web and mobile applications. Emphasis on data integrity, performance, and clear service architecture.',
    tech: ['Node.js', 'Spring Boot', 'REST APIs', 'SQL'],
  },
  {
    title: 'Full-Stack Development',
    subtitle: 'End-to-end application development',
    visual: '/services/fullstack.gif',
    description:
      'Build complete applications from frontend to backend, ensuring seamless integration between components and consistent data flow across the system.',
    tech: ['React', 'Node.js', 'Next.js', 'SQL'],
  },
  {
    title: 'Mobile Applications',
    subtitle: 'Android apps for real-world use',
    visual: '/services/mobile.gif',
    description:
      'Develop Android applications with structured architecture and user-focused design, tailored for practical use cases and consistent performance.',
    tech: ['Kotlin', 'Android'],
  },
  {
    title: 'Database Design',
    subtitle: 'Structured and efficient data systems',
    visual: '/services/database.gif',
    description:
      'Design relational database schemas and optimize data storage solutions to ensure consistency, scalability, and efficient querying.',
    tech: ['PostgreSQL', 'MySQL', 'SQL'],
  },
  {
    title: 'Bug Fixing & Optimization',
    subtitle: 'Debugging, refactoring, and performance improvements',
    visual: '/services/debugging.gif',
    description:
      'Identify, debug, and resolve issues in existing applications. Improve code quality, fix performance bottlenecks, and ensure system stability.',
    tech: ['Debugging', 'Code Review', 'Performance Optimization'],
  },
  {
    title: 'UI Implementation',
    subtitle: 'Clean and responsive user interfaces',
    visual: '/services/ui.gif',
    description:
      'Translate designs into responsive and consistent user interfaces, focusing on layout precision, responsiveness, and user experience.',
    tech: ['HTML', 'CSS', 'Tailwind CSS', 'React'],
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
    name: 'Hotel? Privago',
    summary:
      'Full-stack hotel search and information system designed to aggregate, query, and present global hospitality data.',
    highlights: [
      'Designed and implemented a structured backend for managing hotel data, search queries, and filtering logic.',
      'Developed a responsive frontend focused on usability and efficient data exploration.',
      'Handled integration between frontend and backend layers, ensuring consistent data flow and performance.',
    ],
    image: '/projects/image-1.jpg',
    domain: 'Fullstack',
    source: 'academic',
    tech: ['Python', 'SOLR', 'HTML', 'CSS', 'JavaScript', 'Node.js'],
    repoUrl: 'https://github.com/Fabio-A-Sa/Privago',
    status: 'completed',
  },
  {
    name: 'HandiMarket',
    summary:
      'Marketplace platform designed to support accessible commerce, focusing on usability and inclusive interaction patterns.',
    highlights: [
      'Implemented core marketplace features including product management, user interaction, and transactional flows.',
      'Focused on accessibility considerations and user-centric design principles.',
      'Collaborated in a team environment, contributing to both frontend and backend components.',
    ],
    image: '/projects/image-2.jpg',
    domain: 'Fullstack',
    source: 'academic',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'SQL'],
    repoUrl: 'https://github.com/LGP-FEUP-2024/SC25/tree/main',
    status: 'completed',
  },
  {
    name: 'OnlyFEUP',
    summary:
      'Social network platform tailored for FEUP students, enabling communication, content sharing, and community interaction.',
    highlights: [
      'Designed relational database schema to support user profiles, posts, and interactions.',
      'Implemented backend logic for authentication, data persistence, and social features.',
      'Integrated frontend and backend components into a cohesive full-stack application.',
    ],
    image: '/projects/image-3.jpg',
    domain: 'Fullstack',
    source: 'academic',
    tech: ['HTML', 'Laravel', 'PHP', 'SQL'],
    repoUrl:
      'https://github.com/Fabio-A-Sa/Y3S1-LabDBWeb/tree/main/Project',
    status: 'completed',
  },
  {
    name: 'Master Dissertation – Digital Twins in Industrial Environments',
    summary:
      'Research work focused on the application of standardized Digital Twins using Asset Administration Shell (AAS) in industrial production environments.',
    highlights: [
      'Designed and evaluated Digital Twin architectures aligned with Industry 4.0 standards.',
      'Applied Asset Administration Shell (AAS) concepts to represent and manage industrial assets.',
      'Explored integration of IIoT systems, communication protocols, and data pipelines for real-world scenarios.',
    ],
    image: '/projects/image-4.jpg',
    domain: 'Research',
    source: 'academic',
    tech: ['AAS', 'MQTT', 'Kafka', 'IIoT'],
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
    image: '/projects/image-5.jpg',
    domain: 'IoT',
    source: 'professional',
    tech: ['Java', 'Spring Boot', 'AAS', 'PLC', 'REST'],
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
    image: '/projects/image-6.jpg',
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
    image: '/projects/image-7.jpg',
    domain: 'Mobile',
    source: 'course',
    tech: ['Kotlin', 'Android'],
    repoUrl:
      'https://www.udemy.com/course/android-kotlin-developer/',
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
    image: '/projects/image-8.jpg',
    domain: 'Web',
    source: 'course',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    repoUrl:
      'https://www.udemy.com/course/build-portfolio-with-nextjs-framer-motion-tailwind-css/',
    status: 'completed',
  },
]

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

// Pricing Plans
export const pricingPlans = [
  {
    title: 'Website Dev. - Basic',
    pricing: '$500 - $1,000',
    features: [
      'Up to 5 pages',
      'Responsive design ',
      'Basic SEO ',
      'Contact form',
      'Social media links',
      '1 month support',
    ],
    recommended: 'Small businesses, personal websites, bloggers',
  },
  {
    title: 'Website Dev. - Premium',
    pricing: '$5,000 - $10,000',
    features: [
      'Unlimited pages',
      'Responsive design',
      'Comprehensive SEO',
      'Contact form ',
      'Social media links',
      'Advanced security',
      'E-commerce (unlimited products)',
      'Blog setup',
      'Google Analytics with custom reports',
      '6 months support',
    ],
    recommended: 'Medium-sized businesses, online stores, service providers',
  },
  {
    title: 'Website Dev. - Standard',
    pricing: '$1,500 - $3,000',
    features: [
      'Up to 10 pages',
      'Responsive design',
      'Advanced SEO',
      'CContact form',
      'Social media links',
      'E-commerce (20 products)',
      'Blog setup',
      'Google Analytics',
      '3 months support',
    ],
    recommended: 'Large businesses, complex e-commerce sites, custom web applications',
  },
]

import CheckLineIcon from 'remixicon-react/CheckLineIcon'

export const checkIcon = <CheckLineIcon />

// Q & A
export const questions = [
  {
    question: 'How much do you charge for a website?',
    answer:
      'Our website packages usually range from £2997 – £4997. However it really depends on what kind of website you need. We recently wrote a full guide on how much it costs for a website to give you an idea of the different options available.',
  },
  {
    question: 'Why are you so expensive?',
    answer:
      'he process we use to build your website takes a certain amount of time and a lot of planning and research. Unlike other agencies, we DON’T use templates. We build your website from scratch, which means you get a unique design tailored around your business. Buying a website from us should not just simply be seen as a business expense as your website is a sales tool that should earn you money',
  },
  {
    question: 'How long does it take to build a website?',
    answer:
      'It takes approximately 6-10 weeks to build a website from start to finish, providing we have all the information from you. Our full web design process is broken down here. Generally speaking, the website will only take a long time if we are still waiting for text and images from yourself.',
  },
  {
    question: 'How do we communicate throughout the website build?',
    answer:
      'Before we begin working together, we’ll usually have an initially chat on the phone or via Skype to discuss the project. Once we get started, most of the communication will take place over email. This makes the process a lot easier as we’ll have all of the information saved and can come back to it later. Once we’ve finished the project, we will book in your 1hr digital marketing training session.',
  },
  {
    question: 'What will you need from me?',
    answer:
      'It really depends on what type of website you want. We’ll be able to discuss this on our discovery call before we start working together. Depending on which package we agree on we could need…',
  },
  {
    question: 'What if I don’t like the website?',
    answer:
      'You’re in luck. We offer a risk-free guarantee. Before we build your new website, we’ll design a mockup of your homepage. We’ll design a layout in Photoshop first, that way you’ll get to see our initial designs within approximately ten days. This is your opportunity to give us feedback and if you really don’t like it, you don’t have to move forward. Best part is, this won’t cost you anything.',
  },
  {
    question: 'Do you offer a payment schedule?',
    answer:
      'Yes, we split the payment into two. The first 50% is usually taken once you have seen the mockup of your homepage and you’re happy to move forward. The following 50% is taken 30 days after this.',
  },
  {
    question: 'Can I make the final payment when the site is ready to go live?',
    answer:
      'No. In the past we have found that projects can take a lot longer than expected to complete. We might be waiting for information from you and this can delay the process. Sometimes these delays can take months. This is why we always invoice 30 days after the original payment. At this point we’ll be well on our way with your new website and you’ll be able to see the progress.',
  },
  {
    question: 'Who hosts the website?',
    answer:
      'If we build your website, we will generally manage the hosting for you so you don’t need to do anything. We use the same hosting company for our own website and for ALL our clients. Each website is managed individually to avoid any security issues. Every website we build has unlimited bandwidth, 20GB of disk space, 2GB Ram and 99.9% uptime. We’ve used the same company for 5 years and we don’t plan on changing this anytime soon.',
  },
  {
    question: 'Can I update the website myself once it’s been built?',
    answer:
      'Yes. We like to offer the ability for our clients to update the website themselves. We we’ll give you all the training and tools to be able to make website amendments. We use a easy to use platform called WordPress so you can add edit and delete content without paying us to do it for you.',
  },
  {
    question: 'What if I don’t want to manage the website at all. Can you do it all for me?',
    answer:
      'Yes, we can arrange a maintenance package to suit your needs. This can range from 1hr per month to 10 hours per month and we can discuss a package that’s right for you.',
  },
]

import ArrowDropDownLineIcon from 'remixicon-react/ArrowDropDownLineIcon'
export const questionArrow = <ArrowDropDownLineIcon />

// Navbar
import CopyrightLineIcon from 'remixicon-react/CopyrightLineIcon'

export const copyRightIcon = <CopyrightLineIcon />

import Home5LineIcon from 'remixicon-react/Home5LineIcon'
import UserLineIcon from 'remixicon-react/UserLineIcon'
import HistoryLineIcon from 'remixicon-react/HistoryLineIcon'
import BriefcaseLineIcon from 'remixicon-react/BriefcaseLineIcon'
import UserStarLineIcon from 'remixicon-react/UserStarLineIcon'
import ProjectorLineIcon from 'remixicon-react/ProjectorLineIcon'
import PriceTag3LineIcon from 'remixicon-react/PriceTag3LineIcon'
import ContactsBook2LineIcon from 'remixicon-react/ContactsBook2LineIcon'
import QuestionAnswerLineIcon from 'remixicon-react/QuestionAnswerLineIcon'

export const navbarData = [
  {
    id: 'home',
    name: 'Home',
    icon: <Home5LineIcon />,
  },
  {
    id: 'about',
    name: 'About',
    icon: <UserLineIcon />,
  },
  {
    id: 'experience',
    name: 'MyRoad',
    icon: <HistoryLineIcon />,
  },
  {
    id: 'skills',
    name: 'Skills',
    icon: <BriefcaseLineIcon />,
  },
  {
    id: 'reviews',
    name: 'Reviews',
    icon: <UserStarLineIcon />,
  },
  {
    id: 'projects',
    name: 'Projects',
    icon: <ProjectorLineIcon />,
  },
  {
    id: 'pricing',
    name: 'Pricing',
    icon: <PriceTag3LineIcon />,
  },
  {
    id: 'contact',
    name: 'Contact',
    icon: <ContactsBook2LineIcon />,
  },
  {
    id: 'questions',
    name: 'Questions',
    icon: <QuestionAnswerLineIcon />,
  },
]

// Toggle
import MoonFoggyFillIcon from 'remixicon-react/MoonFoggyFillIcon'
import SunFoggyFillIcon from 'remixicon-react/SunFoggyFillIcon'

export const sunIcon = <SunFoggyFillIcon />
export const moonIcon = <MoonFoggyFillIcon />
