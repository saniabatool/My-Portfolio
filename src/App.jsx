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
            Hi, <br/>I’m Sania
          </h1>
          <p className="text-lg md:text-xl font-medium text-gray-600 mb-8">
           Software Engineer | Web Developer | AI Enthusiast
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
                I’m Sania Batool, a passionate Software Engineer and Web Developer with a strong interest in artificial intelligence. Currently focused on full-stack development using the MERN stack (MongoDB, Express, React, Node.js), I specialize in creating user-friendly, responsive, and efficient web applications. I enjoy turning ideas into smooth digital experiences and solving complex problems through clean, maintainable code.</p>
              <p className="mt-4 text-lg text-gray-700 leading-relaxed">
   Beyond development, I actively explore the latest design trends and emerging technologies. I believe that great software combines functionality with thoughtful design, and I’m always eager to learn and innovate. This portfolio showcases my journey, skills, and commitment to building high-quality, modern web solutions.
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
        <section className="relative pt-24 min-h-screen flex items-center justify-center bg-[#F4F7FB] overflow-hidden">
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
                        <p className="text-lg font-medium text-gray-600 mb-4">QUEST Nawabshah 2024-Present</p>
                        <p className="text-gray-700">
                           I’m currently pursuing a bachelor’s degree in Software Engineering. This program has given me a solid foundation in computer science, software development, and practical skills like coding, problem-solving, and project management.
                        </p>
                    </div>

                    {/* Intermediate Section */}
                    <div className="bg-white p-8 rounded-3xl shadow-lg border-l-4 border-[#FF7F00]">
                        <h2 className="text-3xl font-bold text-[#000000] mb-2">Intermediate</h2>
                        <p className="text-lg font-medium text-gray-600 mb-4">Govt Degree College 2020-2022</p>
                        <p className="text-gray-700">
                            I completed my intermediate studies in Pre-Engineering with high marks, which gave me a strong understanding of core subjects and prepared me well for my bachelor's in Software Engineering.
                        </p>
                    </div>

                    {/* Matriculation Section */}
                    <div className="bg-white p-8 rounded-3xl shadow-lg border-l-4 border-[#FF7F00]">
                        <h2 className="text-3xl font-bold text-[#000000] mb-2">Matriculation</h2>
                        <p className="text-lg font-medium text-gray-600 mb-4">HM Khoja School  - 2020</p>
                        <p className="text-gray-700">
                            I successfully completed my matriculation with 3rd position in the Nawabshah Board, showing strong academic discipline and a passion for learning from an early stage.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
/**
 * Experience component with beautiful animated background and details about professional experience.
 */
const Experience = () => {
    return (
        <section className="relative pt-24 min-h-screen flex items-center justify-center bg-[#F4F7FB] overflow-hidden">
            {/* Animated shapes in the background of the Experience page */}
            <div className="bg-shape w-24 h-24 top-10 left-10 animate-fade-in-float" style={{ animationDelay: '0s' }}></div>
            <div className="bg-shape w-32 h-32 bottom-10 right-10 animate-fade-in-float" style={{ animationDelay: '1.5s' }}></div>
            <div className="bg-shape w-20 h-20 top-1/2 right-20 animate-fade-in-float" style={{ animationDelay: '3s' }}></div>
            <div className="bg-shape w-48 h-48 top-1/4 left-1/4 animate-fade-in-float" style={{ animationDelay: '2.5s', backgroundColor: '#FFAC41', opacity: 0.1 }}></div>
            <div className="bg-shape w-16 h-16 bottom-20 left-1/3 animate-fade-in-float" style={{ animationDelay: '5s' }}></div>
            <div className="bg-shape w-28 h-28 top-20 right-1/3 animate-fade-in-float" style={{ animationDelay: '4s', backgroundColor: '#000000', opacity: 0.1 }}></div>

            <div className="container mx-auto px-6 py-12 max-w-4xl relative z-10">
                <div className="text-center">
                    <h1 className="text-5xl font-extrabold text-[#000000] mb-12">My Experience</h1>
                </div>
                
                <div className="space-y-10">
                    {/* Junior Web Developer Section */}
                    <div className="bg-white p-8 rounded-3xl shadow-lg border-l-4 border-[#FF7F00]">
                        <h2 className="text-3xl font-bold text-[#000000] mb-2">Junior Web Developer</h2>
                        <p className="text-lg font-medium text-gray-600 mb-2">iCreativez · Part-time</p>
                        <p className="text-gray-500 mb-4">2025 - Present · 8 mos</p>
                        <p className="text-gray-700">
                            Key Skills:
                            <span className="inline-block bg-[#D1D5DB] text-[#000000] text-sm font-semibold px-2 py-1 rounded-full ml-2">MERN Stack</span>
                        </p>
                    </div>

                    {/* Intern Section */}
                    <div className="bg-white p-8 rounded-3xl shadow-lg border-l-4 border-[#FF7F00]">
                        <h2 className="text-3xl font-bold text-[#000000] mb-2">Intern</h2>
                        <p className="text-lg font-medium text-gray-600 mb-2">iCreativez Technologies Nawabshah · Part-time</p>
                        <p className="text-gray-500 mb-4">Jan 2025 - Feb 2025 · 2 mos · On-site</p>
                        <p className="text-gray-700">
                            Key Skills:
                            <span className="inline-block bg-[#D1D5DB] text-[#000000] text-sm font-semibold px-2 py-1 rounded-full ml-2">HTML5</span>
                            <span className="inline-block bg-[#D1D5DB] text-[#000000] text-sm font-semibold px-2 py-1 rounded-full ml-2">CSS</span>
                            <span className="inline-block bg-[#D1D5DB] text-[#000000] text-sm font-semibold px-2 py-1 rounded-full ml-2">Javascript</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

/**
 * Projects component with animated background and project cards.
 */
const Projects = () => {
  const projects = [
    {
      title: "AI Proposal Writer",
      description: "A web application that leverages AI to assist users in writing professional and effective proposals.",
      link: "https://ai-proposal-writer-bysania.netlify.app/",
      image: "ai-proposal.png"
    },
    {
      title: "CV Generator",
      description: "An intuitive web tool that helps users create and customize their resumes and CVs with ease.",
      link: "https://cvgenerat.netlify.app/",
      image: "cv-generator.png",
    },
    {
      title: "Waseema's Portfolio",
      description: "A modern and responsive personal portfolio website showcasing the skills and projects of Waseema.",
      link: "https://saniabatool.github.io/waseema-s-portfolio/",
      image: "portfolio.png"
    },
  ];

  return (
    <section className="relative pt-24 min-h-screen flex items-center justify-center bg-[#F4F7FB] overflow-hidden">
      {/* Animated shapes in the background of the Projects page */}
      <div className="bg-shape w-28 h-28 top-5 left-1/4 animate-fade-in-float" style={{ animationDelay: '0s' }}></div>
      <div className="bg-shape w-20 h-20 bottom-10 right-1/4 animate-fade-in-float" style={{ animationDelay: '1.5s', backgroundColor: '#FFAC41', opacity: 0.1 }}></div>
      <div className="bg-shape w-36 h-36 top-1/2 left-10 animate-fade-in-float" style={{ animationDelay: '3s' }}></div>
      <div className="bg-shape w-16 h-16 bottom-1/4 right-20 animate-fade-in-float" style={{ animationDelay: '2.5s', backgroundColor: '#000000', opacity: 0.1 }}></div>
      <div className="bg-shape w-48 h-48 top-20 right-20 animate-fade-in-float" style={{ animationDelay: '5s' }}></div>
      <div className="bg-shape w-24 h-24 bottom-20 left-20 animate-fade-in-float" style={{ animationDelay: '4s', backgroundColor: '#FF7F00', opacity: 0.1 }}></div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-[#000000]">My Projects</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <img 
                src={project.image} 
                alt={`Screenshot of ${project.title}`} 
                className="w-full h-auto object-cover" 
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#000000] mb-2">{project.title}</h3>
                <p className="text-gray-700 mb-4">{project.description}</p>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block bg-[#FF7F00] text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-opacity-90 transition-colors duration-300"
                >
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * TechStack component with a beautiful animated background and details about the tech stack.
 */
const TechStack = () => {
    const techStackItems = [
        { name: "React", icon: "⚛️", description: "A JavaScript library for building user interfaces." },
        { name: "JavaScript", icon: "📜", description: "A high-level, interpreted programming language." },
        { name: "HTML5", icon: "🌐", description: "The latest version of the Hypertext Markup Language." },
        { name: "CSS3", icon: "🎨", description: "A style sheet language used for describing the presentation of a document." },
        { name: "Tailwind CSS", icon: "💨", description: "A utility-first CSS framework for rapidly building custom designs." },
        { name: "Bootstrap", icon: "🅱️", description: "A popular CSS framework for developing responsive and mobile-first websites." },
        { name: "Node.js", icon: "🟢", description: "A JavaScript runtime built on Chrome's V8 engine for building scalable network applications." },
        { name: "Express", icon: "🚀", description: "A minimal and flexible Node.js web application framework." },
        { name: "C", icon: "💻", description: "A general-purpose, procedural computer programming language." },
        { name: "C++", icon: "⚙️", description: "An extension of the C language with object-oriented features." },
        { name: "Java", icon: "☕", description: "A high-level, class-based, object-oriented programming language." },
    ];

    return (
        <section className="relative pt-24 min-h-screen flex items-center justify-center bg-[#F4F7FB] overflow-hidden">
            {/* Animated shapes in the background of the Tech Stack page */}
            <div className="bg-shape w-24 h-24 top-10 left-10 animate-fade-in-float" style={{ animationDelay: '0s' }}></div>
            <div className="bg-shape w-32 h-32 bottom-10 right-10 animate-fade-in-float" style={{ animationDelay: '1.5s' }}></div>
            <div className="bg-shape w-20 h-20 top-1/2 right-20 animate-fade-in-float" style={{ animationDelay: '3s' }}></div>
            <div className="bg-shape w-48 h-48 top-1/4 left-1/4 animate-fade-in-float" style={{ animationDelay: '2.5s', backgroundColor: '#FFAC41', opacity: 0.1 }}></div>
            <div className="bg-shape w-16 h-16 bottom-20 left-1/3 animate-fade-in-float" style={{ animationDelay: '5s' }}></div>
            <div className="bg-shape w-28 h-28 top-20 right-1/3 animate-fade-in-float" style={{ animationDelay: '4s', backgroundColor: '#000000', opacity: 0.1 }}></div>

            <div className="container mx-auto px-6 py-12 max-w-6xl relative z-10">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-[#000000]">My Tech Stack</h1>
                    <p className="text-gray-600 mt-4">Technologies I have worked with and am proficient in.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {techStackItems.map((item, index) => (
                        <div 
                            key={index} 
                            className="bg-white p-8 rounded-3xl shadow-lg border-l-4 border-[#FF7F00] transition-transform duration-300 hover:scale-105"
                        >
                            <div className="flex items-center mb-4">
                                <span className="text-5xl mr-4">{item.icon}</span>
                                <h3 className="text-2xl font-bold text-[#000000]">{item.name}</h3>
                            </div>
                            <p className="text-gray-700">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/**
 * Contact component with animated background and a contact form.
 */
const Contact = () => {
    // State to manage form inputs
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    // State to manage the message box
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted with data:", formData);
        // Set the message and show the custom message box
        setMessage("Thank you for your message! I will get back to you shortly.");
        setShowMessage(true);
        // Clear the form after submission
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <section className="relative pt-24 min-h-screen flex items-center justify-center bg-[#F4F7FB] overflow-hidden">
            {/* Animated shapes in the background of the Contact page */}
            <div className="bg-shape w-24 h-24 top-10 left-10 animate-fade-in-float" style={{ animationDelay: '0s' }}></div>
            <div className="bg-shape w-32 h-32 bottom-10 right-10 animate-fade-in-float" style={{ animationDelay: '1.5s' }}></div>
            <div className="bg-shape w-20 h-20 top-1/2 right-20 animate-fade-in-float" style={{ animationDelay: '3s' }}></div>
            <div className="bg-shape w-48 h-48 top-1/4 left-1/4 animate-fade-in-float" style={{ animationDelay: '2.5s', backgroundColor: '#FFAC41', opacity: 0.1 }}></div>
            <div className="bg-shape w-16 h-16 bottom-20 left-1/3 animate-fade-in-float" style={{ animationDelay: '5s' }}></div>
            <div className="bg-shape w-28 h-28 top-20 right-1/3 animate-fade-in-float" style={{ animationDelay: '4s', backgroundColor: '#000000', opacity: 0.1 }}></div>

            <div className="container mx-auto px-6 py-12 max-w-lg relative z-10">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-[#000000]">Get in Touch</h1>
                    <p className="text-gray-600 mt-4">I would love to hear from you!</p>
                </div>

                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Your Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-[#FF7F00] focus:border-[#FF7F00]"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">Your Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-[#FF7F00] focus:border-[#FF7F00]"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">Message</label>
                            <textarea 
                                id="message" 
                                name="message" 
                                value={formData.message}
                                onChange={handleChange}
                                rows="5" 
                                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-[#FF7F00] focus:border-[#FF7F00]"
                                required
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="inline-block bg-[#FF7F00] text-white text-lg font-semibold py-3 px-10 rounded-full shadow-lg hover:bg-opacity-90 transition-colors duration-300"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {/* Custom Message Box Modal */}
            {showMessage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm text-center">
                        <p className="text-xl font-semibold mb-6">{message}</p>
                        <button
                            onClick={() => setShowMessage(false)}
                            className="bg-[#FF7F00] text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-opacity-90 transition-colors duration-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};


/**
 * Footer component for the portfolio.
 */
const Footer = () => {
    return (
        <footer className="bg-[#000000] text-white py-12 mt-12 border-t-4 border-[#FF7F00]">
            <div className="container mx-auto px-6 text-center">
                <div className="flex justify-center space-x-6 mb-4">
                    {/* LinkedIn */}
                    <a
                        href="https://www.linkedin.com/in/sania-batool-406a1a338/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#FF7F00] transition-colors duration-300"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.765s.784-1.765 1.75-1.765 1.75.79 1.75 1.765-.783 1.765-1.75 1.765zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                    </a>

                    {/* GitHub */}
                    <a
                        href="https://github.com/saniabatool"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#FF7F00] transition-colors duration-300"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.465-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.6.809.576 4.765-1.589 8.204-6.095 8.204-11.385 0-6.627-5.373-12-12-12z"/>
                        </svg>
                    </a>

                    {/* Gmail */}
                    <a
                        href="mailto:saniabatoolabro14@gmail.com"
                        className="text-white hover:text-[#FF7F00] transition-colors duration-300"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 512 512">
                            <path d="M502.3 190.8 327.4 338.6c-18.6 15.9-45.7 15.9-64.3 0L9.7 190.8c-9.4-8-9.7-22.3-.7-30.6l41.4-39.8c8.7-8.3 22.5-8.5 31.4-.3l174.1 147.8c8.6 7.3 21.2 7.3 29.8 0l174.1-147.8c8.9-8.2 22.7-8 31.4 .3l41.4 39.8c9 8.3 8.7 22.6-.7 30.6z"/>
                        </svg>
                    </a>
                </div>
                <p className="text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} Sania Batool. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default App;