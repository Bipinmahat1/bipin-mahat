
import { useState, useEffect } from 'react';
import { Moon, Sun, Github, Linkedin, Mail, Download, ExternalLink, Code, Cpu, Globe, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { toast } = useToast();

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const projects = [
    {
      title: "Nepali Dating App",
      description: "A fully working web-based dating platform with user profiles, matching, chatbox, and preference filtering",
      tech: ["HTML", "CSS", "JavaScript"],
      category: "Web Development"
    },
    {
      title: "Automatic Goalkeeper",
      description: "Raspberry Pi + OpenCV + servo motor-based real-time ball tracking system",
      tech: ["Python", "OpenCV", "Raspberry Pi"],
      category: "IoT & AI"
    },
    {
      title: "AI-Powered Job Application Bot",
      description: "Uses n8n and OpenAI API to auto-apply to IT jobs via LinkedIn",
      tech: ["n8n", "OpenAI API", "Automation"],
      category: "AI & Automation"
    },
    {
      title: "MountEverestClothing MERN Website",
      description: "Full-stack e-commerce platform built with MERN stack",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      category: "Full-Stack"
    },
    {
      title: "Photographer Portfolio Website",
      description: "Professional portfolio website for Siddhant Rai",
      tech: ["React", "CSS", "Responsive Design"],
      category: "Web Development"
    },
    {
      title: "Pet Adoption App",
      description: "Originally PHP-based application for pet adoption services",
      tech: ["PHP", "MySQL", "HTML", "CSS"],
      category: "Web Development"
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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon!"
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
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
      <section id="home" className="pt-20 pb-16 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="mb-8">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
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
              <Button asChild size="lg" className="hover-scale">
                <a href="#projects">View Projects</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="hover-scale">
                <a href="#contact">Get In Touch</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="hover-scale">
                <a href="/resume.pdf" download>
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
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">About Me</h2>
            
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Background</h3>
                <p className="text-muted-foreground mb-4">
                  I'm a passionate Software Developer with an Advanced Diploma in Computer Engineering Technology 
                  from Seneca College, Toronto. My journey in tech has been driven by curiosity and a desire to 
                  create innovative solutions.
                </p>
                <p className="text-muted-foreground mb-4">
                  Based in Toronto, Ontario, I specialize in full-stack development, AI automation, and IoT projects. 
                  I've worked as an IT Support Specialist at NEPTEC Corporation and served as a Lab Assistant & 
                  HyFlex Ambassador at Seneca College for over 3 semesters.
                </p>
                <p className="text-muted-foreground">
                  When I'm not coding, you might find me exploring the latest in ethical hacking, 
                  experimenting with Raspberry Pi projects, or diving deep into AI/ML technologies.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-6">Skills & Expertise</h3>
                <div className="grid grid-cols-2 gap-4">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-background border">
                      <skill.icon className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">{skill.name}</div>
                        <div className="text-xs text-muted-foreground">{skill.level}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
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
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Featured Projects</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card key={index} className="hover-scale transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary">{project.category}</Badge>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg" className="hover-scale">
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
      <section id="contact" className="py-20 bg-muted/30">
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
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Name</label>
                      <Input placeholder="Your name" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input type="email" placeholder="your.email@example.com" required />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Input placeholder="What's this about?" required />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Message</label>
                    <Textarea 
                      placeholder="Tell me about your project or idea..." 
                      rows={6} 
                      required 
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full hover-scale">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
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
