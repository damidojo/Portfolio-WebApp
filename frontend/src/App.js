import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Cloud, 
  Code, 
  Shield, 
  Zap, 
  Monitor, 
  Server, 
  Database, 
  Globe, 
  Award, 
  Users, 
  TrendingUp, 
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin
} from 'lucide-react';
import './App.css';

const App = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const [activeProject, setActiveProject] = useState(0);

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const projects = [
    {
      id: 1,
      title: "Cloud-Native Microservices Migration",
      description: "Transitioned monolithic applications to a serverless architecture on Azure, improving scalability and reducing operational overhead by 30%. Utilized Azure Functions and Cosmos DB for efficiency.",
      image: "https://images.unsplash.com/photo-1664526937033-fe2c11f1be25?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxtaWNyb3NlcnZpY2VzfGVufDB8fHxibHVlfDE3NTI1MzU0NDZ8MA&ixlib=rb-4.1.0&q=85",
      technologies: ["Azure Functions", "Cosmos DB", "Azure Service Bus", "Docker", "Kubernetes"],
      impact: "30% reduction in operational overhead",
      metrics: [
        { label: "Scalability Improvement", value: "300%" },
        { label: "Response Time", value: "40ms avg" },
        { label: "Cost Savings", value: "$85K annually" }
      ]
    },
    {
      id: 2,
      title: "CI/CD Pipeline Automation & IaC Integration",
      description: "Designed and deployed a fully automated CI/CD pipeline using Jenkins, Docker, and Kubernetes, reducing deployment failures by 40%. Integrated Infrastructure-as-Code (Terraform) for streamlined cloud provisioning.",
      image: "https://images.unsplash.com/photo-1651340527836-263c5072968e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwzfHxtaWNyb3NlcnZpY2VzfGVufDB8fHxibHVlfDE3NTI1MzU0NDZ8MA&ixlib=rb-4.1.0&q=85",
      technologies: ["Jenkins", "Docker", "Kubernetes", "Terraform", "Azure DevOps"],
      impact: "40% reduction in deployment failures",
      metrics: [
        { label: "Deployment Success Rate", value: "99.2%" },
        { label: "Release Frequency", value: "5x faster" },
        { label: "Recovery Time", value: "< 15 min" }
      ]
    },
    {
      id: 3,
      title: "Disaster Recovery Implementation",
      description: "Designed comprehensive disaster recovery solutions with Azure Site Recovery, achieving stringent RTO and RPO targets while ensuring full regulatory compliance.",
      image: "https://images.unsplash.com/photo-1611722341858-acb609fb3d71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMHNlY3VyaXR5fGVufDB8fHxibHVlfDE3NTI1MzU0NzB8MA&ixlib=rb-4.1.0&q=85",
      technologies: ["Azure Site Recovery", "Azure Backup", "PowerShell", "Azure Monitor"],
      impact: "99.9% uptime guarantee achieved",
      metrics: [
        { label: "RTO Target", value: "< 2 hours" },
        { label: "RPO Target", value: "< 15 minutes" },
        { label: "Compliance Score", value: "100%" }
      ]
    },
    {
      id: 4,
      title: "Multi-Cloud Strategy Implementation",
      description: "Deployed workloads across AWS and Google Cloud to improve redundancy and reduce latency by 10%, significantly enhancing end-user experience and system resilience.",
      image: "https://images.unsplash.com/photo-1652365789688-9e41adee2355?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxjbG91ZCUyMGFyY2hpdGVjdHVyZXxlbnwwfHx8Ymx1ZXwxNzUyNTM1NDMwfDA&ixlib=rb-4.1.0&q=85",
      technologies: ["AWS", "Google Cloud", "Azure", "Terraform", "Kubernetes"],
      impact: "10% latency reduction",
      metrics: [
        { label: "Global Latency", value: "< 100ms" },
        { label: "Redundancy", value: "99.99%" },
        { label: "User Experience", value: "4.8/5.0" }
      ]
    },
    {
      id: 5,
      title: "Azure Environment Management & Cost Optimization",
      description: "Identified 35 unused Standard_DS4_v4 Reserved Instances and implemented strategic cost optimization, recovering $49,857 in credit. Created comprehensive monitoring dashboards.",
      image: "https://images.unsplash.com/photo-1573271061382-3ce7f905cabf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxBenVyZSUyMGRhc2hib2FyZHxlbnwwfHx8Ymx1ZXwxNzUyNTM1NDU1fDA&ixlib=rb-4.1.0&q=85",
      technologies: ["Azure Cost Management", "Azure Workbooks", "Log Analytics", "PowerBI"],
      impact: "$49,857 cost recovery",
      metrics: [
        { label: "Cost Savings", value: "$49,857" },
        { label: "Resource Optimization", value: "35 instances" },
        { label: "Monitoring Coverage", value: "12+ subscriptions" }
      ]
    },
    {
      id: 6,
      title: "Infrastructure Monitoring & Observability",
      description: "Implemented comprehensive monitoring using Prometheus and ELK Stack, enabling proactive issue resolution and reducing response time by 25% through enhanced observability.",
      image: "https://images.unsplash.com/photo-1590560711594-85381f33d036?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxtb25pdG9yaW5nJTIwaW5mcmFzdHJ1Y3R1cmV8ZW58MHx8fGJsdWV8MTc1MjUzNTQ2M3ww&ixlib=rb-4.1.0&q=85",
      technologies: ["Prometheus", "ELK Stack", "Grafana", "Azure Monitor", "Kibana"],
      impact: "25% faster response time",
      metrics: [
        { label: "MTTR", value: "< 10 minutes" },
        { label: "Alert Accuracy", value: "98%" },
        { label: "Uptime", value: "99.95%" }
      ]
    },
    {
      id: 7,
      title: "Cloud Security & Compliance Enhancement",
      description: "Implemented comprehensive Entra ID security measures and collaborated with security teams to enhance compliance scoring by 40%, ensuring regulatory adherence.",
      image: "https://images.unsplash.com/flagged/photo-1573603867114-76112e1d7a23?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHx0ZWNobm9sb2d5JTIwcHJvZmVzc2lvbmFsfGVufDB8fHxibHVlfDE3NTI1MzU0Mzh8MA&ixlib=rb-4.1.0&q=85",
      technologies: ["Entra ID", "Azure Security Center", "Conditional Access", "Azure Sentinel"],
      impact: "40% increase in secure score compliance",
      metrics: [
        { label: "Security Score", value: "95%" },
        { label: "Compliance Rating", value: "A+" },
        { label: "Threat Detection", value: "99.8%" }
      ]
    },
    {
      id: 8,
      title: "Self-Healing Infrastructure Automation",
      description: "Developed advanced self-healing infrastructure automation systems, reducing downtime incidents by 50% through intelligent monitoring and automated recovery processes.",
      image: "https://images.unsplash.com/photo-1636979648933-6d06b1ce9ad7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb3NlcnZpY2VzfGVufDB8fHxibHVlfDE3NTI1MzU0NDZ8MA&ixlib=rb-4.1.0&q=85",
      technologies: ["Azure Automation", "PowerShell", "Logic Apps", "Azure Functions"],
      impact: "50% reduction in downtime incidents",
      metrics: [
        { label: "Auto-Recovery Rate", value: "94%" },
        { label: "Incident Reduction", value: "50%" },
        { label: "System Availability", value: "99.97%" }
      ]
    }
  ];

  const skills = [
    { name: "Microsoft Azure", level: 95, icon: Cloud },
    { name: "DevOps & CI/CD", level: 92, icon: Code },
    { name: "Infrastructure as Code", level: 90, icon: Server },
    { name: "Kubernetes & Docker", level: 88, icon: Database },
    { name: "Cloud Security", level: 85, icon: Shield },
    { name: "Monitoring & Observability", level: 87, icon: Monitor },
    { name: "Multi-Cloud Strategy", level: 82, icon: Globe },
    { name: "Automation & Scripting", level: 89, icon: Zap }
  ];

  const achievements = [
    {
      metric: "$49,857",
      description: "Cost savings through Azure optimization",
      icon: TrendingUp
    },
    {
      metric: "40%",
      description: "Reduction in deployment failures",
      icon: CheckCircle
    },
    {
      metric: "50%",
      description: "Decrease in downtime incidents",
      icon: Shield
    },
    {
      metric: "6+",
      description: "Years of cloud architecture experience",
      icon: Award
    }
  ];

  const testimonials = [
    {
      name: "Ihuoma Luke",
      role: "Virtual Technical Advisor Azure App Service Dev",
      company: "Azure Cloud Engineer | Azure DevOps Engineer",
      testimonial: "I highly recommend Dami as a Cloud Engineer. He possesses an exceptional grasp of cloud technologies, demonstrating expertise in Azure showcasing both technical acumen and collaborative skills. He is a reliable team member, consistently delivering high-quality solutions aligned with best practices.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Abiodun Ibrahim",
      role: "SRE | DevOps Engineer",
      company: "MTN Nigeria Ex-Atos | 7x Azure | Microsoft Certified Trainer",
      testimonial: "I am delighted to recommend Damilola Adejobi for any Cloud/DevOps role. I have known Damilola for five years, and in that time, he has consistently demonstrated exceptional skills and dedication. Specializing in Azure DevOps and AWS, Damilola's technical proficiency and ability to design and optimize cloud solutions are outstanding. His expertise, combined with three years of experience, makes him a valuable asset to any team.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Mary Ajayi",
      role: "Cloud/DevOps Engineer | IAM Specialist",
      company: "Technical Support | Multi Cloud Certified (AWS, Azure and GCP)",
      testimonial: "Damilola's attention to detail and commitment to excellence shine through in every project. From designing scalable infrastructures to optimizing system performance. His collaborative nature and strong communication skills make him an asset to any team. I recommend Damilola for any cloud engineering role; his dedication and technical proficiency make him a standout professional in the field.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b9611080?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Oluwatosin Ajala",
      role: "Subject Matter Expert",
      company: "Tek Experts | Azure IAM Engineer | CyberSecurity Enthusiast",
      testimonial: "Damilola possesses a deep understanding of cloud computing principles and has demonstrated exceptional proficiency in designing, implementing, and optimizing cloud-based infrastructure. His technical expertise extends across a wide range of cloud platforms, including Azure/AWS, and consistently leverages this knowledge to deliver high-quality solutions that align with business objectives. I wholeheartedly recommend Damilola for any role in Cloud Operations.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Afeez Ojuolape",
      role: "IT Service Delivery | Operations Management",
      company: "IT Management Professional | Customer Service Management",
      testimonial: "I am pleased to recommend Damilola without reservation. He is a consummate support professional who consistently demonstrates a high level of expertise and dedication in his work.",
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-slate-900/90 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1652365789679-ca6fd1624637?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGFyY2hpdGVjdHVyZXxlbnwwfHx8Ymx1ZXwxNzUyNTM1NDMwfDA&ixlib=rb-4.1.0&q=85"
            alt="Cloud Architecture"
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
          <motion.h1 
            className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Cloud Solutions
            </span>
            <br />
            <span className="text-white">Architect</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transforming businesses through scalable Azure solutions, DevOps excellence, and strategic cloud architecture. 
            <span className="font-semibold text-cyan-300"> 6+ years</span> of delivering measurable impact.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button className="group bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <span className="flex items-center justify-center gap-2">
                View My Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="border-2 border-blue-400 text-blue-400 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-400 hover:text-white transition-all duration-300 backdrop-blur-sm">
              Let's Connect
            </button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-900 to-blue-900">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Results-Driven 
                <span className="text-blue-400"> Cloud Expert</span>
              </h2>
              <p className="text-lg text-blue-100 mb-6 leading-relaxed">
                Results-driven Cloud Solutions Architect and DevOps Engineer with over 6 years of experience, 
                specialized in designing, deploying, and optimizing scalable, high-availability, and secure cloud solutions 
                primarily on Microsoft Azure.
              </p>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                Proven expertise in ensuring efficient software delivery, managing critical Azure environments, 
                and leveraging modern DevOps tools. Track record of significantly improving cloud efficiency, 
                reducing operational costs, and leading successful cloud transformation projects.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-blue-500/20">
                  <h3 className="text-2xl font-bold text-blue-400 mb-1">99.9%</h3>
                  <p className="text-blue-100">Uptime Achieved</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-blue-500/20">
                  <h3 className="text-2xl font-bold text-blue-400 mb-1">$150K+</h3>
                  <p className="text-blue-100">Cost Savings Delivered</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="relative">
              <div className="relative overflow-hidden rounded-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1652105425180-3cc628d303cf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwcHJvZmVzc2lvbmFsfGVufDB8fHxibHVlfDE3NTI1MzU0Mzh8MA&ixlib=rb-4.1.0&q=85"
                  alt="Professional Cloud Architect"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Technical <span className="text-blue-400">Expertise</span>
          </motion.h2>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {skills.map((skill, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 group"
              >
                <skill.icon className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold mb-3">{skill.name}</h3>
                <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
                <p className="text-blue-300 text-sm">{skill.level}%</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-900 to-blue-900">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Featured <span className="text-blue-400">Projects</span>
          </motion.h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {project.impact}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-blue-100 mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {project.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="text-center">
                        <div className="text-lg font-bold text-blue-400">{metric.value}</div>
                        <div className="text-xs text-blue-200">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Key <span className="text-blue-400">Achievements</span>
          </motion.h2>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {achievements.map((achievement, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 text-center group"
              >
                <achievement.icon className="w-12 h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-3xl font-bold text-white mb-2">{achievement.metric}</h3>
                <p className="text-blue-100">{achievement.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gradient-to-t from-slate-900 to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Build <span className="text-blue-400">Together?</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            I'm seeking opportunities to contribute my cloud architecture expertise to innovative teams. 
            Let's discuss how I can help drive your cloud transformation journey.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button className="group bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <span className="flex items-center justify-center gap-2">
                <Mail className="w-5 h-5" />
                Download Resume
              </span>
            </button>
            <button className="border-2 border-blue-400 text-blue-400 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-400 hover:text-white transition-all duration-300 backdrop-blur-sm">
              <span className="flex items-center justify-center gap-2">
                <Linkedin className="w-5 h-5" />
                Connect on LinkedIn
              </span>
            </button>
          </motion.div>
          
          <motion.div 
            className="flex justify-center gap-8 text-blue-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <span>your.email@example.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>Remote/Hybrid</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default App;