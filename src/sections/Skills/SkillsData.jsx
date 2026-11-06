import {
  FaHtml5,
  FaReact,
  FaAws,
  FaGitAlt,
  FaSalesforce,
} from "react-icons/fa";

import { RiCss3Line } from "react-icons/ri";

import { IoLogoJavascript, IoLogoDocker } from "react-icons/io5";

import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiWix,
  SiWebflow,
  SiGsap,
  SiMongodb,
  SiFirebase,
  SiExpress,
  SiNodedotjs,
  SiBigcommerce,
  SiWordpress,
  SiGithubactions,
} from "react-icons/si";
import { DiHeroku } from "react-icons/di";

import { AiFillApi } from "react-icons/ai";

import fish1 from "../../assets/fish/fish1.svg";
import fish2 from "../../assets/fish/fish2.svg";
import fish3 from "../../assets/fish/fish3.svg";
import fish4 from "../../assets/fish/fish4.svg";

export const skillsData = [
  {
    id: "frontend",
    title: "Frontend Skills",
    description:
      "Building responsive, accessible interfaces with modern JavaScript, thoughtful motion, and clean component architecture.",

    fish: {
      src: fish1,
      color: "#b28b78",
      aspectRatio: "1",

      motion: "swim",
      direction: "right",

      top: "14%",
      width: "150px",

      bob: 22,
      rotation: 4,
    },

    skills: [
      {
        skillName: "HTML",
        icon: <FaHtml5 />,
      },
      {
        skillName: "CSS",
        icon: <RiCss3Line />,
      },
      {
        skillName: "Tailwind CSS",
        icon: <SiTailwindcss />,
      },
      {
        skillName: "JavaScript",
        icon: <IoLogoJavascript />,
      },
      {
        skillName: "TypeScript",
        icon: <SiTypescript />,
      },
      {
        skillName: "React",
        icon: <FaReact />,
      },
      {
        skillName: "Next.js",
        icon: <SiNextdotjs />,
      },
      {
        skillName: "GSAP",
        icon: <SiGsap />,
      },
    ],
  },

  {
    id: "backend",
    title: "Backend Skills",
    description:
      "Building APIs and full-stack applications with modern server-side technologies, databases, and thoughtful application architecture.",

    fish: {
      src: fish2,
      color: "#8b6976",
      aspectRatio: "1",

      motion: "jellyfish",

      top: "82%",
      left: "42%",
      width: "195px",

      horizontalTravel: 120,
      verticalTravel: 520,

      rotation: 3,
    },

    skills: [
      {
        skillName: "Node.js",
        icon: <SiNodedotjs />,
      },
      {
        skillName: "Express.js",
        icon: <SiExpress />,
      },
      {
        skillName: "MongoDB",
        icon: <SiMongodb />,
      },
      {
        skillName: "Firebase",
        icon: <SiFirebase />,
      },
      {
        skillName: "REST APIs",
        icon: <AiFillApi />,
      },
    ],
  },

  {
    id: "devops",
    title: "Deployment & Infrastructure",
    description:
      "Deploying full-stack applications with cloud infrastructure, containerization, and automated CI/CD workflows.",

    fish: {
      src: fish3,
      color: "#536779",
      aspectRatio: "1",

      motion: "swim",
      direction: "right",

      top: "20%",
      width: "185px",

      bob: 16,
      rotation: 5,
    },

    skills: [
      {
        skillName: "AWS",
        icon: <FaAws />,
      },
      {
        skillName: "Docker",
        icon: <IoLogoDocker />,
      },
      {
        skillName: "Heroku",
        icon: <DiHeroku />,
      },
      {
        skillName: "Git",
        icon: <FaGitAlt />,
      },
      {
        skillName: "GitHub Actions",
        icon: <SiGithubactions />,
      },
    ],
  },

  {
    id: "platforms",
    title: "Platforms & Tools",
    description:
      "Working across CMS, commerce, marketing, and collaboration platforms to build and support real-world digital experiences.",

    fish: {
      src: fish4,
      color: "#7a5563",
      aspectRatio: "162 / 256",

      motion: "jellyfish",

      top: "78%",
      left: "28%",
      width: "220px",

      horizontalTravel: 140,
      verticalTravel: 460,

      rotation: 3,
    },

    skills: [
      {
        skillName: "WordPress",
        icon: <SiWordpress />,
      },
      {
        skillName: "Wix",
        icon: <SiWix />,
      },
      {
        skillName: "Webflow",
        icon: <SiWebflow />,
      },
      {
        skillName: "BigCommerce",
        icon: <SiBigcommerce />,
      },

      {
        skillName: "Pardot",
        icon: <FaSalesforce />,
      },
    ],
  },
];
