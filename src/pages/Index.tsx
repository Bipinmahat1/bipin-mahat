import { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Github, Linkedin, Mail, Download, ExternalLink, Code, Cpu, Globe, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const projectObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = projectRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1 && !visibleProjects.includes(index)) {
              setTimeout(() => {
                setVisibleProjects(prev => [...prev, index]);
              }, index * 150); // Staggered animation delay
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    projectRefs.current.forEach((ref) => {
      if (ref) projectObserver.observe(ref);
    });

    return () => projectObserver.disconnect();
  }, [visibleProjects]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const projects = [
    {
      title: "Nepali Dating App",
      description: "A fully working web-based dating platform with user profiles, matching, chatbox, and preference filtering",
      tech: ["HTML", "CSS", "JavaScript"],
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop"
    },
    {
      title: "Automatic Goalkeeper",
      description: "Raspberry Pi + OpenCV + servo motor-based real-time ball tracking system",
      tech: ["Python", "OpenCV", "Raspberry Pi"],
      category: "IoT & AI",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop"
    },
    {
      title: "AI-Powered Job Application Bot",
      description: "Uses n8n and OpenAI API to auto-apply to IT jobs via LinkedIn",
      tech: ["n8n", "OpenAI API", "Automation"],
      category: "AI & Automation",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=600&h=400&fit=crop"
    },
    {
      title: "MountEverestClothing MERN Website",
      description: "Full-stack e-commerce platform built with MERN stack",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      category: "Full-Stack",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
    },
    {
      title: "Photographer Portfolio Website",
      description: "Professional portfolio website for Siddhant Rai",
      tech: ["React", "CSS", "Responsive Design"],
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=600&h=400&fit=crop"
    },
    {
      title: "Pet Adoption App",
      description: "Originally PHP-based application for pet adoption services",
      tech: ["PHP", "MySQL", "HTML", "CSS"],
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop"
    }
  ];

  const skills = [
    { name: "JavaScript", icon: Code, level: "Advanced" },
    { name: "Python", icon: Code, level: "Advanced" },
    { name: "React", icon: Globe, level: "Advanced" },
    { name: "Node.js", icon: Cpu, level: "Intermediate" },
    { name: "MongoDB", icon: Database, level: "Intermediate" },
    { name: "AI/ML", icon: Cpu, level: "Intermediate" },
    { name: "C++", icon: Code, level: "Intermediate" },
    { name: "C#", icon: Code, level: "Intermediate" }
  ];

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formRef.current) {
      toast({
        title: "Error",
        description: "Form reference is missing. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData(formRef.current);
    const templateParams = {
      from_name: formData.get('name'),
      from_email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      to_email: 'Bipinmahat643@gmail.com'
    };

    try {
      // You'll need to set up EmailJS account and replace these with your actual IDs
      await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        templateParams,
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      );

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon!"
      });

      // Reset form
      formRef.current.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      
      // Fallback to mailto if EmailJS fails
      const mailtoLink = `mailto:Bipinmahat643@gmail.com?subject=${encodeURIComponent(formData.get('subject') as string || 'Portfolio Website Inquiry')}&body=${encodeURIComponent(`Name: ${formData.get('name')}\nEmail: ${formData.get('from_email')}\n\nMessage:\n${formData.get('message')}`)}`;
      window.location.href = mailtoLink;
      
      toast({
        title: "Redirecting to Email",
        description: "Opening your email client as a backup method."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20"></div>
        
        {/* Floating animated blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 floating-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 floating-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-pink-300 to-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 floating-blob animation-delay-4000"></div>
        <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-25 floating-blob"></div>
        <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-gradient-to-r from-green-300 to-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 floating-blob animation-delay-2000"></div>
        
        {/* Gradient mesh overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Bipin Mahat
          </h1>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6">
              {['home', 'about', 'projects', 'contact'].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className={`capitalize transition-colors hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {section}
                </a>
              ))}
            </div>
            <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 min-h-screen flex items-center relative overflow-hidden">
        {/* Additional animated elements for hero */}
        <div className="absolute top-1/4 -left-10 w-32 h-32 bg-gradient-to-br from-cyan-300 to-blue-400 rounded-full mix-blend-multiply filter blur-lg opacity-40 floating-blob"></div>
        <div className="absolute bottom-1/3 -right-10 w-40 h-40 bg-gradient-to-br from-violet-300 to-purple-400 rounded-full mix-blend-multiply filter blur-lg opacity-40 floating-blob animation-delay-4000"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="mb-8">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
                Software Developer
              </h2>
              <h3 className="text-2xl md:text-3xl text-muted-foreground mb-4">
                AI Enthusiast & Tech Innovator
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Computer Engineering Technology graduate from Seneca College, Toronto. 
                Passionate about building innovative solutions with AI, full-stack development, and IoT.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button asChild size="lg" className="hover-scale bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <a href="#projects">View Projects</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="hover-scale border-primary/20 hover:border-primary/40">
                <a href="#contact">Get In Touch</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="hover-scale border-primary/20 hover:border-primary/40">
                <a href="https://drive.google.com/file/d/1your-google-drive-file-id/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-2" />
                  Resume
                </a>
              </Button>
            </div>

            <div className="flex justify-center gap-6">
              <Button asChild variant="ghost" size="lg" className="hover-scale">
                <a href="https://github.com/bipinmahat1" target="_blank" rel="noopener noreferrer">
                  <Github className="h-6 w-6" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="lg" className="hover-scale">
                <a href="https://linkedin.com/in/bipinmahat" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-6 w-6" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="lg" className="hover-scale">
                <a href="mailto:bipin@example.com">
                  <Mail className="h-6 w-6" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background/60 backdrop-blur-sm relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">About Me</h2>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {/* Photo Column */}
              <div className="lg:col-span-1 flex flex-col items-center">
                <div className="relative mb-6 group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                  <img 
                    src="/lovable-uploads/b69c7e36-6ad3-4aad-a2d2-4d782a319819.png" 
                    alt="Bipin Mahat - Software Developer"
                    className="relative w-48 h-48 lg:w-56 lg:h-56 object-cover rounded-full border-4 border-background shadow-2xl hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              
              {/* Background Text Column */}
              <div className="lg:col-span-2 flex flex-col justify-center">
                <h3 className="text-2xl font-semibold mb-6 text-center lg:text-left">Background</h3>
                <div className="space-y-4 text-center lg:text-left">
                  <p className="text-muted-foreground">
                    I'm a passionate Software Developer with an Advanced Diploma in Computer Engineering Technology 
                    from Seneca College, Toronto. My journey in tech has been driven by curiosity and a desire to 
                    create innovative solutions.
                  </p>
                  <p className="text-muted-foreground">
                    Based in Toronto, Ontario, I specialize in full-stack development, AI automation, and IoT projects. 
                    I've worked as an IT Support Specialist at NEPTEC Corporation and served as a Lab Assistant & 
                    HyFlex Ambassador at Seneca College for over 3 semesters.
                  </p>
                  <p className="text-muted-foreground">
                    When I'm not coding, you might find me exploring the latest in ethical hacking, 
                    experimenting with Raspberry Pi projects, or diving deep into AI/ML technologies.
                  </p>
                </div>
              </div>
            </div>

            {/* Skills Section - Better integrated */}
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold mb-8 text-center">Skills & Expertise</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-background border hover:shadow-md transition-shadow">
                    <skill.icon className="h-5 w-5 text-primary flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="font-medium text-sm truncate">{skill.name}</div>
                      <div className="text-xs text-muted-foreground">{skill.level}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="text-center hover-scale">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-primary">3+</CardTitle>
                  <CardDescription>Years Experience</CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="text-center hover-scale">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-primary">15+</CardTitle>
                  <CardDescription>Projects Completed</CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="text-center hover-scale">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-primary">8+</CardTitle>
                  <CardDescription>Technologies Mastered</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    projectRefs.current[index] = el;
                  }}
                  className={`transform transition-all duration-700 ease-out ${
                    visibleProjects.includes(index)
                      ? 'translate-y-0 opacity-100 scale-100'
                      : 'translate-y-8 opacity-0 scale-95'
                  }`}
                  style={{ transitionDelay: visibleProjects.includes(index) ? `${index * 0.1}s` : '0s' }}
                >
                  <Card className="hover-scale transition-all duration-300 hover:shadow-xl bg-background/80 backdrop-blur-sm border-2 hover:border-primary/20 project-card-enter overflow-hidden">
                    <div className="relative overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = `https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                          {project.category}
                        </Badge>
                        <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                      </div>
                      <CardTitle className="text-xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                        {project.title}
                      </CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="text-xs hover:bg-primary/10 transition-colors">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg" className="hover-scale bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-primary/20 hover:border-primary/40">
                <a href="https://github.com/bipinmahat1" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  View All Projects on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Get In Touch</h2>
            
            <Card className="hover-scale">
              <CardHeader>
                <CardTitle>Let's Work Together</CardTitle>
                <CardDescription>
                  Have a project in mind or want to discuss opportunities? I'd love to hear from you!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form ref={formRef} onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Name</label>
                      <Input name="name" placeholder="Your name" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input name="email" type="email" placeholder="your.email@example.com" required />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Input name="subject" placeholder="What's this about?" required />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Message</label>
                    <Textarea 
                      name="message"
                      placeholder="Tell me about your project or idea..." 
                      rows={6} 
                      required 
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full hover-scale" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-background/60 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bipin Mahat
            </h3>
            <p className="text-muted-foreground mb-6">
              Software Developer • AI Enthusiast • Tech Innovator
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Toronto, Ontario • Also known as "Bips baby" 😉
            </p>
            <div className="flex justify-center gap-6 mb-6">
              <Button asChild variant="ghost">
                <a href="https://github.com/bipinmahat1" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="ghost">
                <a href="https://linkedin.com/in/bipinmahat" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="ghost">
                <a href="mailto:bipin@example.com">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              © 2024 Bipin Mahat. Coding the future, one project at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
