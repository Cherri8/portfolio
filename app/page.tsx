'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion'
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  Code, 
  Shield, 
  Brain,
  Award,
  MapPin,
  Calendar,
  ChevronDown,
  Menu,
  X
} from 'lucide-react'
import Image from 'next/image'
import profilePic from '../charan_image 1.jpg'
import volleyballPic from '../Volleyball Image.jpg'

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement | null>(null)
  const trailLayerRef = useRef<HTMLDivElement | null>(null)
  const starFieldRef = useRef<HTMLDivElement | null>(null)
  // Scroll progress bar
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Create twinkling stars once
  useEffect(() => {
    if (!starFieldRef.current) return
    const field = starFieldRef.current
    if (field.childElementCount > 0) return
    const stars = 60
    for (let i = 0; i < stars; i++) {
      const s = document.createElement('div')
      s.className = 'star'
      s.style.left = Math.random() * 100 + '%'
      s.style.top = Math.random() * 100 + '%'
      s.style.animationDelay = (Math.random() * 3).toFixed(2) + 's'
      field.appendChild(s)
    }
  }, [])

  // Cursor trail only within hero
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    const handler = (e: MouseEvent) => {
      if (!trailLayerRef.current) return
      const dot = document.createElement('span')
      dot.className = 'trail-dot'
      dot.style.left = e.clientX - el.getBoundingClientRect().left + 'px'
      dot.style.top = e.clientY - el.getBoundingClientRect().top + 'px'
      trailLayerRef.current.appendChild(dot)
      setTimeout(() => dot.remove(), 700)
    }
    el.addEventListener('mousemove', handler)
    return () => el.removeEventListener('mousemove', handler)
  }, [])

  // Stagger variants for Achievements
  const achievContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }
  const achievItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
      setIsMenuOpen(false)
    }
  }

  const downloadResume = () => {
    // Open direct download link from Google Drive
    window.open('https://drive.google.com/uc?export=download&id=1q6yHSDVGYQNrBA4u9c9TWG1cZ1vkH6hq', '_blank')
  }

  const openGitHub = (url: string) => {
    window.open(url, '_blank')
  }

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'skills', label: 'Skills' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'contact', label: 'Contact' }
  ]

  return (
    <div className="min-h-screen bg-dark-900 text-white relative overflow-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[60] origin-left"
        style={{ scaleX, background: 'linear-gradient(90deg,#60a5fa,#2563eb)' }}
      />
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 gradient-bg opacity-20"></div>
        <div 
          className="absolute w-96 h-96 bg-primary-500 rounded-full opacity-10 blur-3xl"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: 'all 0.3s ease'
          }}
        ></div>
        {/* Floating blob accents */}
        <div className="blob blob-animate blob-slow w-[28rem] h-[28rem] bg-blue-700/40 -top-24 -left-24"></div>
        <div className="blob blob-animate blob-fast w-[22rem] h-[22rem] bg-indigo-600/40 bottom-16 -right-20"></div>
        <div className="blob blob-animate w-[18rem] h-[18rem] bg-cyan-600/30 top-1/3 right-1/3"></div>
        {/* Star field */}
        <div ref={starFieldRef} className="star-field"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-gradient"
            >
              CR
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors nav-glow ${
                    activeSection === item.id 
                      ? 'text-primary-400 bg-primary-900/20' 
                      : 'text-gray-300 hover:text-primary-400'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-effect border-t border-white/10"
            >
              <div className="px-4 py-2 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-3 py-2 text-gray-300 hover:text-primary-400"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="min-h-screen flex items-center justify-center relative z-10 pt-20">
        <div ref={trailLayerRef} className="absolute inset-0 pointer-events-none z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">Charan Reddy</span>
            </h1>
            <div className="text-xl md:text-2xl text-gray-300 mb-8 h-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="typing-animation"
              >
                Full Stack Developer | Cybersecurity Enthusiast | AI Explorer
              </motion.div>
            </div>
            <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
              B.Tech Cyber Security student at Manipal Institute of Technology with hands-on experience 
              in full-stack web development, AI/ML, and cybersecurity practices.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 bg-primary-600 hover:bg-primary-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <Code size={20} />
                Explore Projects
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadResume}
                className="px-8 py-4 border border-primary-600 hover:bg-primary-600/10 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <Download size={20} />
                Download Resume
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="animate-bounce" size={32} />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">About Me</h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-8xl font-bold">
                <Image
                  src={profilePic}
                  alt="Profile photo"
                  width={320}
                  height={320}
                  className="rounded-full object-cover w-80 h-80"
                  priority
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a passionate B.Tech Cyber Security student at Manipal Institute of Technology 
                with a strong foundation in full-stack web development, artificial intelligence, 
                and cybersecurity practices.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Through internships at DRDO and Cranes Varsity, I've gained valuable experience 
                in distributed systems, machine learning workflows, and security implementations. 
                My projects range from GitHub repository analyzers to secure authentication systems, 
                showcasing my ability to build comprehensive solutions.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm passionate about creating technology that makes a difference, whether it's 
                through innovative web applications, AI-powered tools, or robust security systems.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-400">15+</div>
                  <div className="text-gray-400">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-400">2</div>
                  <div className="text-gray-400">Internships</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-400">5+</div>
                  <div className="text-gray-400">Certifications</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-dark-800/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Education</h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass-effect rounded-2xl p-8 card-hover">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award size={32} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-primary-400 mb-2">
                    Manipal Institute of Technology, Bengaluru
                  </h3>
                  <p className="text-xl text-gray-300 mb-2">
                    B.Tech in Computer Science (Cyber Security Specialization)
                  </p>
                  <div className="flex items-center gap-2 text-gray-400 mb-4">
                    <Calendar size={16} />
                    <span>2021 - 2025</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin size={16} />
                    <span>Bengaluru, India</span>
                  </div>
                  <div className="px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full text-sm">
                    GPA: 7.52/10
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-200">Relevant Coursework:</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Full-Stack Web Development',
                        'Artificial Intelligence',
                        'Machine Learning',
                        'Natural Language Processing',
                        'Cryptography',
                        'Big Data Analytics'
                      ].map((course) => (
                        <span
                          key={course}
                          className="px-3 py-1 bg-dark-700 text-gray-300 rounded-full text-sm"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Professional Experience</h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto"></div>
          </motion.div>

          <div className="space-y-8">
            {/* DRDO Internship */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-effect rounded-2xl p-8 card-hover"
            >
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield size={32} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-primary-400 mb-2">Research Intern</h3>
                  <p className="text-xl text-gray-300 mb-2">DRDL-DRDO</p>
                  <div className="flex items-center gap-2 text-gray-400 mb-4">
                    <Calendar size={16} />
                    <span>May 2024 - July 2024</span>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      Designed distributed system simulations to analyze network attack resilience
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      Built UDP-based frameworks for traffic testing & automation
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      Contributed to defense research projects focusing on cybersecurity
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Cranes Varsity Internship */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-effect rounded-2xl p-8 card-hover"
            >
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Brain size={32} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-primary-400 mb-2">Data Science Intern</h3>
                  <p className="text-xl text-gray-300 mb-2">Cranes Varsity Pvt. Ltd.</p>
                  <div className="flex items-center gap-2 text-gray-400 mb-4">
                    <Calendar size={16} />
                    <span>June 2023 - August 2023</span>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      Developed ML workflows including classification, clustering, and regression
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      Conducted exploratory data analysis and model validation
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      Presented insights via interactive dashboards and visualizations
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-dark-800/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Featured Projects</h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* GitHub Repository Analyzer */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-effect rounded-2xl p-8 card-hover"
            >
              <div className="flex items-center gap-4 mb-4">
                <Github className="text-primary-400" size={32} />
                <h3 className="text-2xl font-bold text-primary-400">GitHub Repository Analyzer</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Comprehensive repository analysis tool with GitHub REST APIs integration, 
                featuring commit activity analysis and contributor statistics.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['React', 'Node.js', 'Docker', 'Chart.js', 'HTML/CSS'].map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full text-sm"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => openGitHub('https://github.com/Cherri8/GitHub-Repository-Analyzer')}
                  className="flex items-center gap-2 px-4 py-2 border border-primary-600 hover:bg-primary-600/10 rounded-lg transition-colors"
                >
                  <Github size={16} />
                  Code
                </button>
              </div>
            </motion.div>

            {/* Movie Recommendation System */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-effect rounded-2xl p-8 card-hover"
            >
              <div className="flex items-center gap-4 mb-4">
                <Brain className="text-primary-400" size={32} />
                <h3 className="text-2xl font-bold text-primary-400">Movie Recommendation System</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Content-based filtering system using cosine similarity with an intuitive 
                frontend for personalized movie recommendations.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Python', 'Pandas', 'Flask', 'Scikit-learn', 'HTML/CSS'].map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full text-sm"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => openGitHub('https://github.com/Cherri8/Learnoverse-YouTube-Video-Player-Demo')}
                  className="flex items-center gap-2 px-4 py-2 border border-primary-600 hover:bg-primary-600/10 rounded-lg transition-colors"
                >
                  <Github size={16} />
                  Code
                </button>
              </div>
            </motion.div>

            {/* Cosmetics Data Analysis Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-effect rounded-2xl p-8 card-hover"
            >
              <div className="flex items-center gap-4 mb-4">
                <Code className="text-primary-400" size={32} />
                <h3 className="text-2xl font-bold text-primary-400">Cosmetics Data Analysis Dashboard</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Real-time dashboard with sentiment analysis of product reviews using spaCy NLP, 
                built with Django and interactive Dash components.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Django', 'Dash', 'PostgreSQL', 'spaCy', 'NLP'].map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full text-sm"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => openGitHub('https://github.com/Cherri8/Financial_Analytical')}
                  className="flex items-center gap-2 px-4 py-2 border border-primary-600 hover:bg-primary-600/10 rounded-lg transition-colors"
                >
                  <Github size={16} />
                  Code
                </button>
              </div>
            </motion.div>

            {/* Encryption with MFA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-effect rounded-2xl p-8 card-hover"
            >
              <div className="flex items-center gap-4 mb-4">
                <Shield className="text-primary-400" size={32} />
                <h3 className="text-2xl font-bold text-primary-400">Encryption with MFA</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Secure authentication system with SHA-256 hashing, AES encryption, and TOTP 
                multi-factor authentication, protected against replay attacks.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Flask', 'Cryptography', 'TOTP', 'Security', 'Python'].map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full text-sm"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => openGitHub('https://github.com/Cherri8/Encryption-with-MFA-Authentication')}
                  className="flex items-center gap-2 px-4 py-2 border border-primary-600 hover:bg-primary-600/10 rounded-lg transition-colors"
                >
                  <Github size={16} />
                  Code
                </button>
              </div>
            </motion.div>
          </div>

          {/* Additional Projects */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-effect rounded-2xl p-8 card-hover"
          >
            <div className="flex items-center gap-4 mb-4">
              <Code className="text-primary-400" size={32} />
              <h3 className="text-2xl font-bold text-primary-400">Open Browser Extension Scanner</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Security tool to analyze browser extensions for permissions and potential risks.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {['Python', 'Security', 'CLI'].map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full text-sm"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => openGitHub('https://github.com/Cherri8/open-browser-extension-scanner')}
                className="flex items-center gap-2 px-4 py-2 border border-primary-600 hover:bg-primary-600/10 rounded-lg transition-colors"
              >
                <Github size={16} />
                Code
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass-effect rounded-2xl p-8 card-hover"
          >
            <div className="flex items-center gap-4 mb-4">
              <Shield className="text-primary-400" size={32} />
              <h3 className="text-2xl font-bold text-primary-400">MITM Attack Implementation</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Educational project demonstrating Man-in-the-Middle attack techniques in a controlled lab setup.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {['Networking', 'Security', 'Python'].map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full text-sm"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => openGitHub('https://github.com/Cherri8/MITM_ATTACK_IMPLEMENTATION')}
                className="flex items-center gap-2 px-4 py-2 border border-primary-600 hover:bg-primary-600/10 rounded-lg transition-colors"
              >
                <Github size={16} />
                Code
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass-effect rounded-2xl p-8 card-hover"
          >
            <div className="flex items-center gap-4 mb-4">
              <Code className="text-primary-400" size={32} />
              <h3 className="text-2xl font-bold text-primary-400">SaaS Notes App</h3>
            </div>
            <p className="text-gray-300 mb-4">
              A modern SaaS-style notes application with authentication and rich text editing.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {['Next.js', 'TypeScript', 'Tailwind'].map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full text-sm"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => openGitHub('https://github.com/Cherri8/SaaS-Notes-App')}
                className="flex items-center gap-2 px-4 py-2 border border-primary-600 hover:bg-primary-600/10 rounded-lg transition-colors"
              >
                <Github size={16} />
                Code
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Certifications</h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Google Cybersecurity Professional Certificate', provider: 'Google', icon: Shield },
              { name: 'Python for Data Science', provider: 'IBM', icon: Code },
              { name: 'Advanced Data Analysis with Python', provider: 'NPTEL', icon: Brain },
              { name: 'Machine Learning Specialization', provider: 'Coursera', icon: Brain },
              { name: 'Wireshark Network Analysis', provider: 'Coursera', icon: Shield }
            ].map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect rounded-xl p-6 card-hover text-center"
              >
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <cert.icon size={32} />
                </div>
                <h3 className="text-lg font-semibold text-primary-400 mb-2">{cert.name}</h3>
                <p className="text-gray-400">{cert.provider}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-dark-800/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Skills & Technologies</h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                category: 'Frontend',
                skills: ['React.js', 'TypeScript', 'Material UI', 'Chart.js', 'HTML/CSS'],
                color: 'from-blue-500 to-cyan-500'
              },
              {
                category: 'Backend',
                skills: ['Node.js', 'Express', 'Flask', 'Django', 'REST APIs'],
                color: 'from-green-500 to-emerald-500'
              },
              {
                category: 'Database & Tools',
                skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Git/GitHub', 'Docker'],
                color: 'from-purple-500 to-pink-500'
              },
              {
                category: 'Cybersecurity',
                skills: ['AES/RSA', 'MFA', 'Wireshark', 'Secure Auth', 'Cryptography'],
                color: 'from-red-500 to-orange-500'
              }
            ].map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect rounded-xl p-6"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${skillGroup.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Code size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary-400 mb-4">{skillGroup.category}</h3>
                <div className="space-y-2">
                  {skillGroup.skills.map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -6 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-gray-300">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <h3 className="text-2xl font-bold text-center mb-8 text-primary-400">Programming Languages</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Python', level: 90 },
                { name: 'JavaScript', level: 85 },
                { name: 'C/C++', level: 80 },
                { name: 'SQL', level: 85 }
              ].map((lang) => (
                <div key={lang.name} className="text-center">
                  <div className="text-lg font-semibold text-gray-300 mb-2">{lang.name}</div>
                  <div className="w-full bg-dark-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.level}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="bg-gradient-to-r from-primary-500 to-primary-400 h-2 rounded-full skill-bar"
                    ></motion.div>
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{lang.level}%</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Achievements</h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto"></div>
          </motion.div>

          <motion.div
            variants={achievContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-5xl mx-auto space-y-8"
          >
            {/* Volleyball */}
            <motion.div variants={achievItem} className="glass-effect rounded-2xl p-8 card-hover">
              <h3 className="text-2xl font-bold text-primary-400 mb-4">Volleyball Captain - MIT Bengaluru</h3>
              <p className="text-gray-300 mb-6">
                Led the college volleyball team as captain, organizing training sessions and
                representing the institute in inter-collegiate tournaments.
              </p>
              <div className="relative w-full h-72 rounded-xl overflow-hidden">
                <Image src={volleyballPic} alt="On the volleyball court" fill className="object-cover" />
              </div>
            </motion.div>

            {/* CTF */}
            <motion.div variants={achievItem} className="glass-effect rounded-2xl p-8 card-hover">
              <h3 className="text-2xl font-bold text-primary-400 mb-4 flex items-center gap-2">
                <Shield size={20} aria-hidden className="text-primary-400" />
                <span>CTF Participation & Wins</span>
              </h3>
              <p className="text-gray-300">
                Participated in cybersecurity Capture The Flag events focusing on web exploitation,
                cryptography, and forensics. Secured top finishes in multiple college-level contests.
              </p>
            </motion.div>

            {/* Hackathons */}
            <motion.div variants={achievItem} className="glass-effect rounded-2xl p-8 card-hover">
              <h3 className="text-2xl font-bold text-primary-400 mb-4 flex items-center gap-2">
                <Code size={20} aria-hidden className="text-primary-400" />
                <span>Hackathons</span>
              </h3>
              <p className="text-gray-300">
                Built end-to-end prototypes under time pressure, collaborating with cross-functional
                teams to solve real-world problems using full‑stack and AI/ML solutions.
              </p>
            </motion.div>

            {/* Cricket */}
            <motion.div variants={achievItem} className="glass-effect rounded-2xl p-8 card-hover">
              <h3 className="text-2xl font-bold text-primary-400 mb-4 flex items-center gap-2">
                <Award size={20} aria-hidden className="text-primary-400" />
                <span>Cricket</span>
              </h3>
              <p className="text-gray-300">
                Active member of college cricket events, contributing as an all‑rounder and promoting
                teamwork, discipline, and sportsmanship.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Get In Touch</h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, collaborations, or just having a chat about technology!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.a
              href="mailto:charancherri733@gmail.com"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-effect rounded-xl p-8 card-hover text-center group social-glow"
            >
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-glow">
                <Mail size={32} />
              </div>
              <h3 className="text-xl font-bold text-primary-400 mb-2">Email</h3>
              <p className="text-gray-300">charancherri733@gmail.com</p>
            </motion.a>

            <motion.a
              href="https://github.com/Cherri8"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-effect rounded-xl p-8 card-hover text-center group social-glow"
            >
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-glow">
                <Github size={32} />
              </div>
              <h3 className="text-xl font-bold text-primary-400 mb-2">GitHub</h3>
              <p className="text-gray-300">github.com/Cherri8</p>
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/t-charan-reddy-457662260"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-effect rounded-xl p-8 card-hover text-center group social-glow"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-glow">
                <Linkedin size={32} />
              </div>
              <h3 className="text-xl font-bold text-primary-400 mb-2">LinkedIn</h3>
              <p className="text-gray-300">Connect with me</p>
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-16"
          >
            <p className="text-gray-400 mb-4">
              2024 Charan Reddy. Built with Next.js, TypeScript, and Tailwind CSS.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="mailto:charancherri733@gmail.com" className="text-gray-400 hover:text-primary-400 transition-colors social-glow">
                <Mail size={24} />
              </a>
              <a href="https://github.com/Cherri8" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors social-glow">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com/in/t-charan-reddy-457662260" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors social-glow">
                <Linkedin size={24} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
