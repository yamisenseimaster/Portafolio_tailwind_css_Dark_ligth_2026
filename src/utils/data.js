import {
    Code2,
    GraduationCap,
    Briefcase,
    Award,
    Rocket,
    Heart,
    Coffee,
    BookOpen,
    Zap,
    Database,
    Server,
    Cloud,
    Mail,
    MapPin,
    Phone,
} from "lucide-react";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

import PROJECT_IMG_1 from "../assets/imgens/proyecto1.png";
import PROJECT_IMG_2 from "../assets/imgens/proyecto2.png";
import PROJECT_IMG_3 from "../assets/imgens/proyecto3.png";
import PROJECT_IMG_4 from "../assets/imgens/proyecto4.png";
import PROJECT_IMG_5 from "../assets/imgens/proyecto5.jpg";
import PROJECT_IMG_6 from "../assets/imgens/proyecto6.jpg";
import PROJECT_IMG_7 from "../assets/imgens/proyecto7.jpg";
export const SKILLS_CATEGORY = [
    {
        title: "Desarrollo Frontend",
        icons: Code2,
        description: "Creación de sitios web modernos y responsivos utilizando tecnologías como React, HTML, CSS y JavaScript.",
        skills: [
            {name: "React", level: 90, color: "bg-blue-500"},
            {name: "TypeScript", level: 98, color: "bg-blue-600"},
            {name: "Next.js", level: 80, color: "bg-gray-800"},
            {name: "JavaScript", level: 90, color: "bg-pink-500"},
            {name: "Tailwind CSS", level: 85, color: "bg-cyan-500"},
        ],
    },
    {
        title: "Desarrollo Backend",
        icons: Server,
        description: "Desarrollo de APIs y servicios backend utilizando Node.js, Express y bases de datos como MongoDB.",
        skills: [
            {name: "Node.js", level: 85, color: "bg-green-500"},
            {name: "Express", level: 80, color: "bg-gray-800"},
            {name: "MongoDB", level: 75, color: "bg-green-600"},
            {name: "SQL", level: 70, color: "bg-yellow-500"},
            {name: "RESTful APIs", level: 80, color: "bg-purple-500"},
        ],
    },
    {
        title: "Gestión de Bases de Datos",
        icons: Database,
        description: "Diseño y gestión de bases de datos relacionales y no relacionales para garantizar un almacenamiento eficiente de datos.",
        skills: [
            {name: "MongoDB", level: 80, color: "bg-green-600"},
            {name: "MySQL", level: 70, color: "bg-yellow-500"},
            {name: "PostgreSQL", level: 75, color: "bg-blue-500"},
            {name: "SQL Server", level: 60, color: "bg-red-500"},
            {name: "NoSQL", level: 85, color: "bg-pink-500"},
    
        ],
    },
    {
        title: "DevOps",
        icons: Cloud,
        description: "Implementación de prácticas DevOps para mejorar la colaboración entre equipos de desarrollo y operaciones, utilizando herramientas como Docker y CI/CD.",
        skills: [
            {name: "Docker", level: 80, color: "bg-blue-500"},
            {name: "Kubernetes", level: 70, color: "bg-green-500"},
            {name: "CI/CD", level: 75, color: "bg-purple-500"},
            {name: "AWS", level: 65, color: "bg-yellow-500"},
            {name: "Azure", level: 60, color: "bg-red-500"},
        ],
    },

];

export const TECH_STACK = [
    "JavaScript",
    "HTML5",
    "CSS3",
    "Sass",
    "Webpack",
    "vite",
    "jest",
    "Cypress",
    "Figma",
    "Adobe XD",
    "Notion",
    "Stack",
];
export const STATS = [
    {number: "50+", label: "Proyectos Completados"},
    {number: "5", label: "Años de Experiencia"},
    {number: "20+", label: "Clientes Satisfechos"},
    {number: "10", label: "Certificaciones Obtenidas"},
];

export const PROJECTS = [
    {
        id: 1,
        title: "E-commerce React",
        description: "Desarrollo de una tienda en línea utilizando React, con funcionalidades de carrito de compras, integración de pasarelas de pago y diseño responsivo.",
        image: PROJECT_IMG_1,
        tags: ["React", "Tailwind", "MongoDB"],
        liveUrl: "https://ecommerce-react.vercel.app/",
        githubUrl: "#",
        featured: false,
        category: "Full Stack",
    },
    {
        id: 2,
        title: "Portafolio Personal",
        description: "Desarrollo de mi propio portafolio utilizando React, con secciones interactivas, animaciones, diseño responsivo y una presentación clara de proyectos y habilidades.",
        image: PROJECT_IMG_2,
        tags: ["React", "Tailwind", "MongoDB"],
        liveUrl: "https://yamilcazon.vercel.app/",
        githubUrl: "#",
        featured: true,
        category: "Full Stack",
    },
    {
        id: 3,
        title: "Blog con Next.js",
        description: "Creación de un blog personal utilizando Next.js, con funcionalidades de generación de contenido dinámico, optimización SEO y diseño responsivo.",
        image: PROJECT_IMG_3,
        tags: ["Next.js", "Tailwind", "MongoDB"],
        liveUrl: "https://blog-nextjs.vercel.app/",
        githubUrl: "#",
        featured: false,
        category: "Frontend",
    },
    {
        id: 4,
        title: "Panel de Analíticas",
        description: "Desarrollo de un panel de analíticas utilizando React y Chart.js, con visualización de datos en tiempo real y diseño responsivo.",
        image: PROJECT_IMG_4,
        tags: ["React", "Tailwind", "MongoDB"],
        liveUrl: "https://dashboard-analiticas.vercel.app/",
        githubUrl: "#",
        featured: false,
        category: "Frontend",
    },
    {
        id: 5,
        title: "API RESTful con Node.js",
        description: "Desarrollo de una API RESTful utilizando Node.js y Express, con funcionalidades de autenticación, manejo de errores y conexión a una base de datos MongoDB.",
        image: PROJECT_IMG_5,
        tags: ["Node.js", "Express", "MongoDB"],
        liveUrl: "https://api-restful-nodejs.vercel.app/",
        githubUrl: "#",
        featured: false,
        category: "Backend",
    },
    {
        id: 6,
        title: "Aplicación de Chat en Tiempo Real",
        description: "Desarrollo de una aplicación de chat en tiempo real utilizando React y Socket.io, con funcionalidades de salas de chat, mensajes privados y diseño responsivo.",
        image: PROJECT_IMG_6,
        tags: ["React", "Socket.io", "MongoDB"],
        liveUrl: "https://chat-tiempo-real.vercel.app/",
        githubUrl: "#",
        featured: false,
        category: "Full Stack",
    },
];
export  const JOURNEY_STEPS = [
    {
        year: "2018",
        title: "Inicio de mi Carrera",
        company: "Desarrollo Web",
        description: "Comencé mi carrera como desarrollador web, aprendiendo HTML, CSS y JavaScript a través de cursos en línea y proyectos personales.",
        icon: Code2,
        color: "bg-blue-500",
    },
    {
        year: "2019",
        title: "Primeros Proyectos Freelance",
        company: "Freelance",
        description: "Empecé a trabajar en proyectos freelance, desarrollando sitios web para pequeñas empresas y clientes individuales, lo que me permitió ganar experiencia práctica.",
        icon: Briefcase,
        color: "bg-green-500",
    },
    {
        year: "2020",
        title: "Especialización en Frontend",
        company: "Desarrollo Web",
        description: "Me especialicé en desarrollo frontend, aprendiendo frameworks como React y Next.js, y mejorando mis habilidades en diseño responsivo y experiencia de usuario.",
        icon: GraduationCap,
        color: "bg-purple-500",
    },
    {
        year: "2021",
        title: "Primer Proyecto Profesional",
        company: "Desarrollo Web",
        description: "Desarrollé un sitio web profesional utilizando React, Next.js, Tailwind CSS y MongoDB, lo que me permitió crear una experiencia funcional y elegante.",
        icon: Rocket,
        color: "bg-orange-500",
    },     
    {
        year: "2022",
        title: "Expansión a Backend",
        company: "Desarrollo Web",
        description: "Amplié mis habilidades al desarrollo backend, aprendiendo Node.js, Express y bases de datos como MongoDB, lo que me permitió crear aplicaciones web completas.",
        icon: Award,
        color: "bg-pink-500",
    },
    {
        year: "2023",
        title: "Desarrollo de Proyectos Personales",
        company: "Desarrollo Web",
        description: "Desarrollé varios proyectos personales, incluyendo un portafolio personal y una aplicación de chat en tiempo real, lo que me permitió aplicar mis habilidades y experimentar con nuevas tecnologías.",
        icon: Zap,
        color: "bg-cyan-500",
    },  
];
export const PASSIONS = [
    {
        icon: Heart,
        title: "Desarrollo Web",
        description: "Me apasiona crear sitios web modernos y funcionales utilizando tecnologías como React, Next.js y Tailwind CSS.",
    },
    {
        icon: Coffee,
        title: "Aprendizaje Continuo",
        description: "Disfruto aprender nuevas tecnologías y mejorar mis habilidades a través de cursos, tutoriales y proyectos personales.",
    },
    {
        icon: BookOpen,
        title: "Compartir Conocimiento",
        description: "Me gusta compartir lo que he aprendido a través de blogs, tutoriales y charlas, ayudando a otros a crecer en su carrera de desarrollo web.",
    },
];
export const SOCIAL_LINKS = [
    {
        name: "GitHub",
        icon: FiGithub,
        url: "https://github.com",
        color:"hover:text-gray-400",
        bgcolor:"hover:bg-gray-800", 
    },
    {
        name: "LinkedIn",
        icon: FiLinkedin,
        url: "https://www.linkedin.com/in/yamil-cazon-9b1a4b1b3/",
        color:"hover:text-blue-400",
        bgcolor:"hover:bg-blue-500/10", 
    },
    {
        name: "Twitter",
        icon: FiTwitter,
        url: "https://twitter.com/Umblella",
        color:"hover:text-sky-400",
        bgcolor:"hover:bg-sky-500/10",
    },
    {
        name: "Correo",
        icon: Mail,
        url: "mailto:H6NlW@example.com",
        color:"hover:text-green-400",
        bgcolor:"hover:bg-green-500/10",
    },
];
export const CONTACT_INFO = [
    {
        icon: MapPin,
        label: "Ubicación",
        value: "Buenos Aires, Argentina",

    },
    {
        icon: Phone,
        label: "Teléfono",
        value: "+54 9 11 1234 5678",
    },
    {
        icon: Mail,
        label: "Correo",
        value: "H6NlW@example.com",
    },
]
