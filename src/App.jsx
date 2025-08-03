import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Linkedin, Github, Mail, Phone, MapPin, Code, Palette, Laptop } from 'lucide-react'; // Using lucide-react for icons

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
 * The image URL has been updated to use the 'profile.jpg' from the assets.
 */
const HeroImage = () => {
  return (
    <div className="md:w-1/2 flex items-center justify-center relative min-h-[500px]">
      {/* Large container for the image */}
      <div className="w-full h-full p-6 rounded-3xl shadow-xl flex items-center justify-center overflow-hidden">
        {/* The src attribute is now updated to use your uploaded image */}
        <img
          src="profile.jpg"
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
            Hello<br/>I'm Sania 
          </h1>
          <p className="text-lg md:text-xl font-medium text-gray-600 mb-8">
            Software Engineer | Web Developer | AI Enthusiast
          </p>
          <a
            href="resume.pdf"
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
 * The profile image has been updated to use the 'profile.jpg' from the assets.
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
            {/* Placeholder for your image */}
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden mb-6 md:mb-0 shadow-lg">
              <img
                src="profile.jpg"
                alt="Sania Batool"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Text content about you */}
            <div className="md:flex-1">
              <p className="text-lg text-gray-700 leading-relaxed">
                I’m Sania Batool, a passionate Software Engineer and Web Developer with a strong interest in artificial intelligence. Currently focused on full-stack development using the MERN stack (MongoDB, Express, React, Node.js), I specialize in creating user-friendly, responsive, and efficient web applications.
              </p>
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
    // Added pt-24 here to push the content down, since it was removed from the main element
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
              I’m currently pursuing a bachelor’s degree in Software Engineering. This program has given me a solid foundation in computer science, software development, and practical skills like coding, problem-solving, and project management.
            </p>
          </div>

          {/* Intermediate Section */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border-l-4 border-[#FF7F00]">
            <h2 className="text-3xl font-bold text-[#000000] mb-2">Intermediate</h2>
            <p className="text-lg font-medium text-gray-600 mb-4">Govt Girls Degree College</p>
            <p className="text-gray-700">
             I completed my intermediate studies in Pre-Engineering with high marks, which gave me a strong understanding of core subjects and prepared me well for my bachelor's in Software Engineering.
            </p>
          </div>

          {/* Matriculation Section */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border-l-4 border-[#FF7F00]">
            <h2 className="text-3xl font-bold text-[#000000] mb-2">Matriculation</h2>
            <p className="text-lg font-medium text-gray-600 mb-4">HM Khoja School</p>
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
 * This component has been updated with the information from your provided image.
 */
const Experience = () => {
  return (
    // Added pt-24 here to push the content down, since it was removed from the main element
    <section className="relative min-h-screen flex items-center justify-center bg-[#F4F7FB] overflow-hidden py-12 pt-24">
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
            <p className="text-lg font-medium text-gray-600 mb-2">iCreativez | Part-time</p>
            <p className="text-sm text-gray-500 mb-4">2025 - Present (8 months)</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4">
              <li>Proficient in MERN Stack development.</li>
              <li>Developed and maintained responsive web applications.</li>
            </ul>
          </div>

          {/* Intern Section */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border-l-4 border-[#FF7F00]">
            <h2 className="text-3xl font-bold text-[#000000] mb-2">Intern</h2>
            <p className="text-lg font-medium text-gray-600 mb-2">iCreativez Technologies Nawabshah | Part-time</p>
            <p className="text-sm text-gray-500 mb-4">Jan 2025 - Feb 2025 (2 months)</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4">
              <li>Gained hands-on experience with HTML5 and CSS.</li>
              <li>Developed foundational web development skills.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Projects component with animated background and project cards.
 * The project images have been updated to use the uploaded files.
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
      description: "A tool that allows users to easily generate and customize their professional resumes and CVs.",
      link: "https://cvgenerat.netlify.app/",
      image: "cv-generator.png"
    },
    {
      title: "Portfolio Website",
      description: "This portfolio website is a showcase of my skills and projects, built with modern web technologies.",
      link: "https://saniabatool.github.io/waseema-s-portfolio/",
      image: "portfolio.png"
    },
  ];

  return (
    // Added pt-24 here to push the content down, since it was removed from the main element
    <section className="relative min-h-screen flex items-center justify-center bg-[#F4F7FB] overflow-hidden py-12 pt-24">
      {/* Animated shapes in the background of the Projects page */}
      <div className="bg-shape w-24 h-24 top-10 left-10 animate-fade-in-float" style={{ animationDelay: '0s' }}></div>
      <div className="bg-shape w-32 h-32 bottom-10 right-10 animate-fade-in-float" style={{ animationDelay: '1.5s' }}></div>
      <div className="bg-shape w-20 h-20 top-1/2 right-20 animate-fade-in-float" style={{ animationDelay: '3s' }}></div>
      <div className="bg-shape w-48 h-48 top-1/4 left-1/4 animate-fade-in-float" style={{ animationDelay: '2.5s', backgroundColor: '#FFAC41', opacity: 0.1 }}></div>
      <div className="bg-shape w-16 h-16 bottom-20 left-1/3 animate-fade-in-float" style={{ animationDelay: '5s' }}></div>
      <div className="bg-shape w-28 h-28 top-20 right-1/3 animate-fade-in-float" style={{ animationDelay: '4s', backgroundColor: '#000000', opacity: 0.1 }}></div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-[#000000] mb-12">My Projects</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-3xl shadow-lg overflow-hidden p-6 hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded-2xl mb-4"
              />
              <h2 className="text-2xl font-bold text-[#000000] mb-2">{project.title}</h2>
              <p className="text-gray-700 mb-4">{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#000000] text-white font-medium py-2 px-6 rounded-full hover:bg-opacity-80 transition-colors duration-300"
              >
                View Project
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * TechStack component with a clean, card-based layout that is now updated with the new technologies.
 */
const TechStack = () => {
  const technologies = [
    { name: 'C', icon: 'M12 21.5l-9-2.5v-10l9-2.5l9 2.5v10l-9 2.5zM12 1.5l-9 2.5l-9 2.5l9 2.5zM12 16.5l-9-2.5v-10', color: '#00599c' },
    { name: 'C++', icon: 'M12 21.5l-9-2.5v-10l9-2.5l9 2.5v10l-9 2.5zM12 1.5l-9 2.5l-9 2.5l9 2.5zM12 16.5l-9-2.5v-10', color: '#659ad2' },
    { name: 'Java', icon: 'M12 22.5h0a10.5 10.5 0 01-10.5-10.5v0A10.5 10.5 0 0112 1.5h0a10.5 10.5 0 0110.5 10.5v0a10.5 10.5 0 01-10.5 10.5zM12 1.5c-4.9 0-9 4.1-9 9l0 11.5c0 1.1.9 2 2 2h4l-2 3.5m4-3.5h0c4.9 0 9-4.1 9-9l0-11.5c0-1.1-.9-2-2-2h-4l2-3.5', color: '#e67a00' },
    { name: 'HTML', icon: 'M12 21.5l-9-2.5v-10l9-2.5l9 2.5v10l-9 2.5zM12 1.5l-9 2.5l-9 2.5l9 2.5zM12 16.5l-9-2.5v-10', color: '#e34f26' },
    { name: 'CSS', icon: 'M12 21.5l-9-2.5v-10l9-2.5l9 2.5v10l-9 2.5zM12 1.5l-9 2.5l-9 2.5l9 2.5zM12 16.5l-9-2.5v-10', color: '#1572b6' },
    { name: 'JavaScript', icon: 'M12 22.5h0a10.5 10.5 0 01-10.5-10.5v0A10.5 10.5 0 0112 1.5h0a10.5 10.5 0 0110.5 10.5v0a10.5 10.5 0 01-10.5 10.5zM9 9.5h-1.5l1.5 5h-1.5M16 14.5c0-.5-.3-1-.7-1s-1 .5-1 1c0 .5-.3 1-.7 1s-1-.5-1-1v-5h1.5v5c0 .5.3 1 .7 1s1-.5 1-1c0-.5.3-1 .7-1s1 .5 1 1v5h1.5V9.5h-1.5', color: '#f7df1e' },
    { name: 'React', icon: 'M13.5 10.5L20 8M4 8l6.5 2.5M10.5 13.5l-2.5 6.5M10.5 13.5l-2.5 6.5M13.5 10.5l-2.5 6.5', color: '#61dafb' },
    { name: 'Express.js', icon: 'M12 22.5c-4.9 0-9-4.1-9-9s4.1-9 9-9s9 4.1 9 9s-4.1 9-9 9zM12 1.5v21M1.5 13.5h21M12 6.5l5 3-5 5-5-3 5-5z', color: '#000000' },
    { name: 'Node.js', icon: 'M12 22.5h0a10.5 10.5 0 01-10.5-10.5v0A10.5 10.5 0 0112 1.5h0a10.5 10.5 0 0110.5 10.5v0a10.5 10.5 0 01-10.5 10.5zM12 1.5l5 8.5l-5 8.5l-5-8.5l5-8.5z', color: '#68a063' },
  ];

  return (
    // Added pt-24 here to push the content down, since it was removed from the main element
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#F4F7FB] overflow-hidden py-12 pt-24">
      {/* Animated shapes in the background of the TechStack page */}
      <div className="bg-shape w-24 h-24 top-10 left-10 animate-fade-in-float" style={{ animationDelay: '0s' }}></div>
      <div className="bg-shape w-32 h-32 bottom-10 right-10 animate-fade-in-float" style={{ animationDelay: '1.5s' }}></div>
      <div className="bg-shape w-20 h-20 top-1/2 right-20 animate-fade-in-float" style={{ animationDelay: '3s' }}></div>
      <div className="bg-shape w-48 h-48 top-1/4 left-1/4 animate-fade-in-float" style={{ animationDelay: '2.5s', backgroundColor: '#FFAC41', opacity: 0.1 }}></div>
      <div className="bg-shape w-16 h-16 bottom-20 left-1/3 animate-fade-in-float" style={{ animationDelay: '5s' }}></div>
      <div className="bg-shape w-28 h-28 top-20 right-1/3 animate-fade-in-float" style={{ animationDelay: '4s', backgroundColor: '#000000', opacity: 0.1 }}></div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-[#000000] mb-4">My Tech Stack</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            I am proficient in a range of modern web development technologies and tools. Here are some of the key technologies I work with.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-3xl shadow-md border border-gray-200 flex flex-col items-center justify-center text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Using inline SVG for a clean look */}
              <div className="w-16 h-16 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={tech.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={tech.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-[#000000]">{tech.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


/**
 * Contact component with a simple contact form.
 *
 * This version of the Contact component has been updated to use the formsubmit.co
 * service to send emails without needing a backend. It's a simple and effective
 * way to get messages from visitors.
 */
const Contact = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#F4F7FB] overflow-hidden py-12 pt-24">
      {/* Animated shapes in the background of the Contact page */}
      <div className="bg-shape w-24 h-24 top-10 left-10 animate-fade-in-float" style={{ animationDelay: '0s' }}></div>
      <div className="bg-shape w-32 h-32 bottom-10 right-10 animate-fade-in-float" style={{ animationDelay: '1.5s' }}></div>
      <div className="bg-shape w-20 h-20 top-1/2 right-20 animate-fade-in-float" style={{ animationDelay: '3s' }}></div>
      <div className="bg-shape w-48 h-48 top-1/4 left-1/4 animate-fade-in-float" style={{ animationDelay: '2.5s', backgroundColor: '#FFAC41', opacity: 0.1 }}></div>
      <div className="bg-shape w-16 h-16 bottom-20 left-1/3 animate-fade-in-float" style={{ animationDelay: '5s' }}></div>
      <div className="bg-shape w-28 h-28 top-20 right-1/3 animate-fade-in-float" style={{ animationDelay: '4s', backgroundColor: '#000000', opacity: 0.1 }}></div>

      <div className="container mx-auto px-6 py-12 relative z-10 max-w-3xl">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-[#000000] mb-12">Get in Touch</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10">
            Feel free to reach out for work, ideas, or collaborations.
          </p>
        </div>

        {/* The form, now updated to send emails using formsubmit.co */}
        <div className="bg-white p-8 rounded-3xl shadow-lg border-l-4 border-[#FF7F00]">
          {/* We're using a standard HTML form element which submits to the formsubmit.co service.
              This bypasses React's state management for a simple, serverless solution. */}
          <form action="https://formsubmit.co/saniabatoolabro14@gmail.com" method="POST" className="space-y-6">

            {/* Hidden field to set the email subject */}
            <input type="hidden" name="_subject" value="New message from your portfolio!" />

            {/* Hidden field to disable reCAPTCHA for simpler forms */}
            <input type="hidden" name="_captcha" value="false" />

            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
              <input type="text" id="name" name="name" required
                     className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF7F00]" />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
              <input type="email" id="email" name="email" required
                     className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF7F00]" />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea id="message" name="message" rows="5" required
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF7F00]"></textarea>
            </div>
            <button type="submit" className="w-full bg-[#000000] text-white font-semibold py-3 px-6 rounded-full hover:bg-opacity-80 transition-colors duration-300">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

/**
 * Footer component with social media links and copyright information.
 */
const Footer = () => {
  return (
    <footer className="bg-[#000000] text-white py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} Sania Batool. All rights reserved.</p>
        </div>
        <div className="flex space-x-6">
          <a href="https://www.linkedin.com/in/sania-batool-406a1a338/" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF7F00] transition-colors duration-300">
            <Linkedin size={24} />
          </a>
          <a href="https://github.com/saniabatool" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF7F00] transition-colors duration-300">
            <Github size={24} />
          </a>
          <a href="mailto:saniabatoolabro14@gmail.com" className="hover:text-[#FF7F00] transition-colors duration-300">
            <Mail size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default App;
