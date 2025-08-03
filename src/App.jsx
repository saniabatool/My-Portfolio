import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Linkedin, Github, Mail, Phone, MapPin, Code, Palette, Laptop } from 'lucide-react'; // Using lucide-react for icons

// Import all static assets from the src/assets folder
import profileImage from './assets/profile.jpg';
import resumePdf from './assets/resume.pdf';
import aiProposalImage from './assets/ai-proposal.png';
import cvGeneratorImage from './assets/cv-generator.png';
import portfolioImage from './assets/portfolio.png';

// Custom CSS for the animations
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  @keyframes float {
    0% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-10px) rotate(2deg);
    }
    100% {
      transform: translateY(0px) rotate(0deg);
    }
  }

  @keyframes pulse-slow {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.03);
    }
  }

  .animate-float-slow {
    animation: float 8s ease-in-out infinite;
  }

  .animate-pulse-slow {
    animation: pulse-slow 4s ease-in-out infinite;
  }

  /* New animation for the About, Education, Projects and Contact page backgrounds */
  @keyframes fade-in-float {
    0% {
      opacity: 0;
      transform: translateY(20px) scale(0.8);
    }
    100% {
      opacity: 0.2;
      transform: translateY(0px) scale(1);
    }
  }

  .animate-fade-in-float {
    animation: fade-in-float 10s ease-out forwards;
  }

  .bg-shape {
    position: absolute;
    background-color: white;
    border-radius: 50%;
    opacity: 0.1;
  }
`;

/**
 * Favicon component that dynamically injects a base64-encoded SVG favicon into the document's head.
 * This avoids the need for a separate image file.
 */
const Favicon = () => {
  useEffect(() => {
    // A stylized SVG with the initials "SB" for Sania Batool.
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <rect width="24" height="24" fill="#FF7F00" rx="4"/>
      <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-family="Poppins, sans-serif" font-size="14" font-weight="bold" fill="white">SB</text>
    </svg>`;

    const base64Svg = btoa(unescape(encodeURIComponent(svgString)));
    const faviconUri = `data:image/svg+xml;base64,${base64Svg}`;

    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    link.href = faviconUri;

    // Remove any existing favicons before adding the new one
    const existingFavicons = document.querySelectorAll('link[rel="icon"]');
    existingFavicons.forEach(el => el.remove());

    document.head.appendChild(link);

    // Cleanup function to remove the favicon when the component unmounts
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return null; // This component doesn't render any visible UI
};

/**
 * Main App component that manages the application state and renders the appropriate page.
 * We use a simple routing mechanism with useState and conditional rendering.
 */
const App = () => {
  // State to track the current page, initialized to 'home'
  const [currentPage, setCurrentPage] = useState('home');

  // Use useEffect to log when the App component mounts
  useEffect(() => {
    console.log("App component has mounted. Current page is:", currentPage);
  }, [currentPage]); // Added currentPage to dependency array for clarity

  // Function to render the correct component based on the currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <About />;
      case 'education':
        return <Education />;
      case 'experience':
        return <Experience />;
      case 'projects':
        return <Projects />;
      case 'contact':
        return <Contact />;
      case 'techstack':
        return <TechStack />;
      case 'home':
      default:
        return <Home />;
    }
  };

  return (
    // Main container with global styles and a smooth scroll behavior
    <div className="bg-[#F4F7FB] text-[#000000] font-['Poppins'] min-h-screen flex flex-col">
      <style>{styles}</style>
      <Favicon /> {/* Add the Favicon component here */}
      <Header setCurrentPage={setCurrentPage} />
      {/* The main content area where the different pages will be rendered */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {/* We wrap the rendered page with motion.div for page transitions */}
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

/**
 * Header component with a fixed navigation bar and mobile menu.
 * The links now update the currentPage state in the parent App component.
 */
const Header = ({ setCurrentPage }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (e, page) => {
    e.preventDefault(); // Prevent default link behavior
    setCurrentPage(page);
    setIsMenuOpen(false); // Close menu on navigation
  };

  const navLinks = [
    { name: 'Home', page: 'home' },
    { name: 'About', page: 'about' },
    { name: 'Education', page: 'education' },
    { name: 'Experience', page: 'experience' },
    { name: 'Projects', page: 'projects' },
    { name: 'Tech Stack', page: 'techstack' },
    { name: 'Contact', page: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or brand name with a text-based logo */}
        <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="flex items-center space-x-2 cursor-pointer">
          <span className="text-2xl font-bold">
            Sania <span className="text-[#FF7F00]">Batool</span>
          </span>
        </a>
        {/* Mobile menu button */}
        {isMobile && (
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 focus:outline-none">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        )}
        {/* Navigation links that change the page */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8 text-lg font-medium">
            {navLinks.map((link) => (
              <li key={link.page}>
                <a
                  href={`#${link.page}`}
                  onClick={(e) => handleNavClick(e, link.page)}
                  className="hover:text-[#FF7F00] transition-colors duration-300"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white mt-4 rounded-xl shadow-lg"
          >
            <ul className="flex flex-col space-y-4 p-4">
              {navLinks.map((link) => (
                <li key={link.page}>
                  <a
                    href={`#${link.page}`}
                    onClick={(e) => handleNavClick(e, link.page)}
                    className="block text-xl font-medium p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

/**
 * HeroImage component for the homepage.
 * This component contains the large image as requested by the user.
 * The image URL has been updated to use the imported 'profileImage' variable.
 */
const HeroImage = () => {
  return (
    <div className="md:w-1/2 flex items-center justify-center relative min-h-[500px]">
      {/* Large container for the image */}
      <div className="w-full h-full p-6 rounded-3xl shadow-xl flex items-center justify-center overflow-hidden">
        {/* The src attribute now uses the imported image variable */}
        <img
          src={profileImage}
          alt="Sania Batool as the hero image"
          className="w-full h-full object-cover rounded-3xl"
        />
      </div>
    </div>
  );
};

/**
 * Home component, containing the main hero section with the background shapes.
 * The right column now uses the HeroImage component.
 *
 * NOTE: The resume link's href has been updated to use the imported 'resumePdf' variable.
 */
const Home = () => {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center">
      {/* Large orange blob background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Adjusted the top positioning to eliminate the gap */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-bl-[50%] bg-[#FF7F00] opacity-80 transform translate-x-1/4 -translate-y-1/4"></div>
      </div>
      {/* Container for the main content, added pt-24 to push content down below the header */}
      <div className="container mx-auto px-6 pt-24 relative z-10 flex flex-col md:flex-row items-center justify-between space-y-10 md:space-y-0">
        {/* Left Column: Headline and text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
            Welcome to<br/>Sania Batool
          </h1>
          <p className="text-lg md:text-xl font-medium text-gray-600 mb-8">
            I'm a passionate software developer specializing in React and frontend technologies.
          </p>
          {/*
            The href now uses the imported 'resumePdf' variable.
          */}
          <a
            href={resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#000000] text-white text-lg font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-opacity-90 transition-colors duration-300"
          >
            Download Resume
          </a>
        </div>
        {/* Right Column: Hero Image container */}
        <HeroImage />
      </div>
    </section>
  );
};

/**
 * About component with a beautiful animated background.
 * The profile image has been updated to use the imported 'profileImage' variable.
 */
const About = () => {
  return (
    // Added pt-24 here to push the content down, since it was removed from the main element
    <section className="relative min-h-screen flex items-center justify-center bg-[#F4F7FB] overflow-hidden py-12 pt-24">
      {/* Animated shapes in the background of the About page */}
      <div className="bg-shape w-24 h-24 top-10 left-10 animate-fade-in-float" style={{ animationDelay: '0s' }}></div>
      <div className="bg-shape w-32 h-32 bottom-10 right-10 animate-fade-in-float" style={{ animationDelay: '1.5s' }}></div>
      <div className="bg-shape w-20 h-20 top-1/2 right-20 animate-fade-in-float" style={{ animationDelay: '3s' }}></div>
      <div className="bg-shape w-48 h-48 top-1/4 left-1/4 animate-fade-in-float" style={{ animationDelay: '2.5s', backgroundColor: '#FFAC41', opacity: 0.1 }}></div>
      <div className="bg-shape w-16 h-16 bottom-20 left-1/3 animate-fade-in-float" style={{ animationDelay: '5s' }}></div>
      <div className="bg-shape w-28 h-28 top-20 right-1/3 animate-fade-in-float" style={{ animationDelay: '4s', backgroundColor: '#000000', opacity: 0.1 }}></div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-[#000000] mb-6">About Me</h1>
          <div className="flex flex-col md:flex-row items-center md:space-x-12">
            {/* The image path now uses the imported image variable */}
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden mb-6 md:mb-0 shadow-lg">
              <img
                src={profileImage}
                alt="Sania Batool"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Text content about you */}
            <div className="md:flex-1">
              <p className="text-lg text-gray-700 leading-relaxed">
                I am Sania Batool, a dedicated and passionate software developer with a knack for creating beautiful, functional, and user-friendly web applications. My expertise lies in front-end development, where I leverage modern technologies like React, Tailwind CSS, and JavaScript to bring digital ideas to life. I thrive on solving complex problems and am always eager to learn new skills to stay at the forefront of the industry.
              </p>
              <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                Beyond coding, I enjoy staying up-to-date with the latest design trends and exploring new technologies. I believe that a great user experience starts with clean, efficient code and a thoughtful design. This portfolio is a showcase of my work and a testament to my commitment to building high-quality web solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Education component with beautiful animated background and details about academic background.
 */
const Education = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#F4F7FB] overflow-hidden py-12 pt-24">
      {/* Animated shapes in the background of the Education page */}
      <div className="bg-shape w-24 h-24 top-10 left-10 animate-fade-in-float" style={{ animationDelay: '0s' }}></div>
      <div className="bg-shape w-32 h-32 bottom-10 right-10 animate-fade-in-float" style={{ animationDelay: '1.5s' }}></div>
      <div className="bg-shape w-20 h-20 top-1/2 right-20 animate-fade-in-float" style={{ animationDelay: '3s' }}></div>
      <div className="bg-shape w-48 h-48 top-1/4 left-1/4 animate-fade-in-float" style={{ animationDelay: '2.5s', backgroundColor: '#FFAC41', opacity: 0.1 }}></div>
      <div className="bg-shape w-16 h-16 bottom-20 left-1/3 animate-fade-in-float" style={{ animationDelay: '5s' }}></div>
      <div className="bg-shape w-28 h-28 top-20 right-1/3 animate-fade-in-float" style={{ animationDelay: '4s', backgroundColor: '#000000', opacity: 0.1 }}></div>

      <div className="container mx-auto px-6 py-12 max-w-4xl relative z-10">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-[#000000] mb-12">My Education</h1>
        </div>

        <div className="space-y-10">
          {/* Bachelors Section */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border-l-4 border-[#FF7F00]">
            <h2 className="text-3xl font-bold text-[#000000] mb-2">Bachelor of Science in Software Engineering</h2>
            <p className="text-lg font-medium text-gray-600 mb-4">QUEST Nawabshah (Ongoing)</p>
            <p className="text-gray-700">
              I am currently pursuing my bachelor's degree in Software Engineering. This program has provided me with a strong foundation in computer science principles, software development methodologies, and practical skills in coding, problem-solving, and project management.
            </p>
          </div>

          {/* Intermediate Section */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border-l-4 border-[#FF7F00]">
            <h2 className="text-3xl font-bold text-[#000000] mb-2">Intermediate</h2>
            <p className="text-lg font-medium text-gray-600 mb-4">Govt Girls Degree College</p>
            <p className="text-gray-700">
              I completed my intermediate studies with high marks, gaining a solid understanding of fundamental subjects that prepared me for advanced studies in a technical field.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Experience component to display a timeline of work history.
 */
const Experience = () => {
  const experiences = [
    {
      id: 1,
      role: "Front-End Developer Intern",
      company: "Innovate Solutions",
      date: "Jan 2024 - Present",
      description: "Working on a team to develop and maintain a client-facing web application using React and Tailwind CSS. My responsibilities include creating reusable components, implementing new features, and optimizing the application for performance and responsiveness."
    },
    {
      id: 2,
      role: "Freelance Web Developer",
      company: "Self-Employed",
      date: "Jun 2023 - Jan 2024",
      description: "Developed and launched custom websites for small businesses and individuals. I worked with clients to understand their needs, designed wireframes, and built fully functional, responsive websites using HTML, CSS, and JavaScript."
    }
  ];

  return (
    <section className="relative min-h-screen bg-[#F4F7FB] py-12 pt-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-[#000000]">My Experience</h1>
        </div>
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 -translate-x-1/2 w-1 bg-[#FF7F00] h-full hidden md:block"></div>
          
          {experiences.map((exp, index) => (
            <div key={exp.id} className="mb-8 md:mb-16 flex flex-col md:flex-row items-center md:space-x-8">
              {/* Timeline dot and content container */}
              <div className="md:w-1/2 p-6 md:p-0 relative">
                {/* Timeline dot */}
                <span className="absolute top-0 md:top-1/2 left-1/2 -translate-x-1/2 md:left-full md:-translate-x-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-[#FF7F00] z-20 hidden md:block"></span>
                
                <motion.div 
                  className={`bg-white p-8 rounded-3xl shadow-lg border-l-4 border-[#FF7F00] md:w-full ${index % 2 === 0 ? 'md:border-r-0' : 'md:border-l-0 md:border-r-4'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold text-[#000000] mb-2">{exp.role}</h2>
                  <p className="text-lg font-medium text-gray-600 mb-2">{exp.company}</p>
                  <p className="text-sm text-gray-500 mb-4">{exp.date}</p>
                  <p className="text-gray-700">{exp.description}</p>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Projects component to showcase personal or professional projects.
 * This component uses the imported images.
 */
const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'AI Proposal Generator',
      description: 'A web application that helps users generate detailed project proposals using AI. Built with React and integrated with a generative AI API.',
      image: aiProposalImage,
      link: '#',
    },
    {
      id: 2,
      title: 'CV Generator',
      description: 'An interactive tool to help users create professional resumes and CVs easily. It features a modern interface and export functionality.',
      image: cvGeneratorImage,
      link: '#',
    },
    {
      id: 3,
      title: 'Personal Portfolio',
      description: 'The very portfolio you are viewing! Developed from scratch using React and Tailwind CSS to showcase my skills and projects.',
      image: portfolioImage,
      link: '#',
    },
  ];

  return (
    <section className="relative min-h-screen bg-[#F4F7FB] py-12 pt-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-[#000000]">My Projects</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#000000] mb-2">{project.title}</h3>
                <p className="text-gray-700 mb-4">{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[#FF7F00] font-semibold hover:underline"
                >
                  View Project &rarr;
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * TechStack component to list skills with icons.
 */
const TechStack = () => {
  const skills = [
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
  ];
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#F4F7FB] py-12 pt-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-[#000000]">My Tech Stack</h1>
          <p className="text-lg text-gray-600 mt-4">Technologies I've worked with and am passionate about.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center p-6 bg-white rounded-3xl shadow-lg transform hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img src={skill.icon} alt={skill.name} className="w-16 h-16 mb-4"/>
              <span className="text-lg font-medium text-gray-800">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Contact component with a form and contact details.
 * The contact form is a placeholder, and a real implementation would require a backend.
 */
const Contact = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#F4F7FB] overflow-hidden py-12 pt-24">
      {/* Animated shapes for the background */}
      <div className="bg-shape w-24 h-24 top-10 left-10 animate-fade-in-float" style={{ animationDelay: '0s' }}></div>
      <div className="bg-shape w-32 h-32 bottom-10 right-10 animate-fade-in-float" style={{ animationDelay: '1.5s' }}></div>
      <div className="bg-shape w-20 h-20 top-1/2 right-20 animate-fade-in-float" style={{ animationDelay: '3s' }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-[#000000]">Get in Touch</h1>
          <p className="text-lg text-gray-600 mt-4">I would love to hear from you!</p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-10">
          
          {/* Contact Details Card */}
          <motion.div
            className="md:w-1/3 bg-white p-8 rounded-3xl shadow-xl flex flex-col items-start space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-[#000000] mb-4">Contact Info</h2>
            <div className="flex items-center space-x-4">
              <Mail size={24} className="text-[#FF7F00]" />
              <a href="mailto:sania.batool@example.com" className="text-lg text-gray-700 hover:text-[#FF7F00]">sania.batool@example.com</a>
            </div>
            <div className="flex items-center space-x-4">
              <Phone size={24} className="text-[#FF7F00]" />
              <a href="tel:+1234567890" className="text-lg text-gray-700 hover:text-[#FF7F00]">+123 456 7890</a>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin size={24} className="text-[#FF7F00] mt-1" />
              <span className="text-lg text-gray-700">123 Software Lane, Karachi, Pakistan</span>
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-6 mt-8">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#0077B5] transition-colors duration-300">
                <Linkedin size={32} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#181717] transition-colors duration-300">
                <Github size={32} />
              </a>
            </div>
          </motion.div>
          
          {/* Contact Form Card */}
          <motion.div
            className="md:w-2/3 bg-white p-8 rounded-3xl shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-[#000000] mb-6">Send Me a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="sr-only">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-[#FF7F00] focus:ring-1 focus:ring-[#FF7F00] outline-none transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-[#FF7F00] focus:ring-1 focus:ring-[#FF7F00] outline-none transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Your Message"
                  className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-[#FF7F00] focus:ring-1 focus:ring-[#FF7F00] outline-none transition-all duration-300"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#000000] text-white text-lg font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-opacity-90 transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/**
 * Footer component for a consistent look at the bottom of every page.
 */
const Footer = () => {
  return (
    <footer className="bg-white py-8 px-6 mt-12 text-center shadow-inner">
      <div className="container mx-auto">
        <p className="text-gray-600">
          &copy; {new Date().getFullYear()} Sania Batool. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default App;