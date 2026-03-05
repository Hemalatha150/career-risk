export const roleSkills = {

    FrontendDeveloper: [
        "HTML", "CSS", "JavaScript", "TypeScript",
        "React", "Next.js", "Vue", "Nuxt.js",
        "Angular", "Bootstrap", "Tailwind CSS",
        "Material UI", "Redux", "Zustand",
        "jQuery", "SASS", "SCSS",
        "Webpack", "Vite", "Babel",
        "Responsive Design", "UI/UX",
        "REST API Integration"
    ],

    BackendDeveloper: [
        "Node.js", "Express.js", "NestJS",
        "Python", "Django", "FastAPI", "Flask",
        "Java", "Spring Boot", "Kotlin", "javascript",
        "C#", ".NET Core",
        "PHP", "Laravel",
        "Ruby on Rails",
        "Golang", "Rust",
        "REST API", "GraphQL",
        "Authentication", "JWT",
        "Microservices",
        "Redis", "Kafka"
    ],

    FullStackDeveloper: [
        "React", "Angular", "Vue",
        "Node.js", "Express",
        "Django", "SpringBoot",
        "MongoDB", "MySQL",
        "PostgreSQL",
        "REST API", "GraphQL",
        "Docker", "AWS"
    ],

    MLEngineer: [
        "Python", "Machine Learning",
        "Deep Learning",
        "TensorFlow", "PyTorch",
        "Keras", "Scikit-learn",
        "OpenCV", "NLP",
        "Computer Vision",
        "Pandas", "NumPy",
        "Matplotlib", "Seaborn",
        "LLM", "Transformers",
        "HuggingFace",
        "MLOps", "MLflow",
        "Data Engineering"
    ],

    CybersecurityEngineer: [
        "Network Security",
        "Ethical Hacking",
        "Penetration Testing",
        "Cryptography",
        "SIEM", "SOC",
        "Kali Linux",
        "Firewall",
        "Malware Analysis",
        "Threat Intelligence",
        "OWASP",
        "Zero Trust",
        "Cloud Security"
    ],

    DevOpsEngineer: [
        "Docker", "Kubernetes",
        "AWS", "Azure", "GCP",
        "CI/CD", "Jenkins",
        "Terraform", "Ansible",
        "Linux", "Shell Scripting",
        "Monitoring",
        "Prometheus", "Grafana",
        "Nginx", "Apache"
    ],

    BlockchainDeveloper: [
        "Blockchain",
        "Ethereum", "Solidity",
        "Smart Contracts",
        "Web3.js", "Hardhat",
        "Hyperledger",
        "Cryptography",
        "DeFi", "NFT",
        "IPFS"
    ],

    Database: [
        "MySQL", "PostgreSQL",
        "MongoDB", "Oracle",
        "SQL Server",
        "SQLite",
        "Redis",
        "Cassandra",
        "DynamoDB",
        "Firebase",
        "Neo4j",
        "Elasticsearch"
    ]
};

export const careerShifts = {
    "WebDeveloper": [
        {
            "to": "FullStackDeveloper",
            "match": 80,
            "bridge": "Node.js & Databases",
            "links": ["https://nodejs.org/", "https://www.mongodb.com/"],
            "skills_comparison": [
                { "subject": "UI/UX", "A": 90, "B": 70, "fullMark": 100 },
                { "subject": "Backend", "A": 20, "B": 85, "fullMark": 100 },
                { "subject": "Database", "A": 15, "B": 80, "fullMark": 100 },
                { "subject": "DevOps", "A": 10, "B": 75, "fullMark": 100 }
            ]
        }
    ],
    "SoftwareEngineer": [
        {
            "to": "SystemArchitect",
            "match": 70,
            "bridge": "System Design & Distributed Systems",
            "links": ["https://github.com/donnemartin/system-design-primer"],
            "skills_comparison": [
                { "subject": "Coding", "A": 95, "B": 70, "fullMark": 100 },
                { "subject": "Design Patterns", "A": 60, "B": 90, "fullMark": 100 },
                { "subject": "Scalability", "A": 40, "B": 95, "fullMark": 100 },
                { "subject": "Infrastructure", "A": 30, "B": 85, "fullMark": 100 }
            ]
        }
    ],
    "DataScientist": [
        {
            "to": "MLEngineer",
            "match": 85,
            "bridge": "MLOps & Model Deployment",
            "links": ["https://ml-ops.org/"],
            "skills_comparison": [
                { "subject": "Analysis", "A": 95, "B": 70, "fullMark": 100 },
                { "subject": "Modeling", "A": 90, "B": 85, "fullMark": 100 },
                { "subject": "Deployment", "A": 20, "B": 90, "fullMark": 100 },
                { "subject": "Engineering", "A": 30, "B": 85, "fullMark": 100 }
            ]
        }
    ],
    "FrontendDeveloper": [
        {
            "to": "FullStackDeveloper",
            "match": 85,
            "bridge": "Node.js & MongoDB",
            "links": ["https://www.mongodb.com/basics/node-js", "https://expressjs.com/"],
            "skills_comparison": [
                { "subject": "UI Design", "A": 90, "B": 70, "fullMark": 100 },
                { "subject": "State Mgmt", "A": 85, "B": 80, "fullMark": 100 },
                { "subject": "Backend", "A": 10, "B": 85, "fullMark": 100 },
                { "subject": "Database", "A": 5, "B": 80, "fullMark": 100 },
                { "subject": "APIs", "A": 40, "B": 90, "fullMark": 100 }
            ]
        },
        {
            "to": "MobileAppDeveloper",
            "match": 75,
            "bridge": "React Native",
            "links": ["https://reactnative.dev/docs/getting-started"],
            "skills_comparison": [
                { "subject": "React", "A": 90, "B": 95, "fullMark": 100 },
                { "subject": "Native Features", "A": 10, "B": 80, "fullMark": 100 },
                { "subject": "Mobile UI", "A": 60, "B": 90, "fullMark": 100 },
                { "subject": "Architecture", "A": 70, "B": 80, "fullMark": 100 }
            ]
        }
    ],
    "BackendDeveloper": [
        {
            "to": "FullStackDeveloper",
            "match": 85,
            "bridge": "React or Angular",
            "links": ["https://react.dev/", "https://angular.io/"],
            "skills_comparison": [
                { "subject": "Backend", "A": 90, "B": 85, "fullMark": 100 },
                { "subject": "Database", "A": 85, "B": 80, "fullMark": 100 },
                { "subject": "Frontend UI", "A": 15, "B": 90, "fullMark": 100 },
                { "subject": "CSS/Design", "A": 10, "B": 85, "fullMark": 100 },
                { "subject": "Client State", "A": 20, "B": 80, "fullMark": 100 }
            ]
        },
        {
            "to": "DevOpsEngineer",
            "match": 65,
            "bridge": "Docker & CI/CD",
            "links": ["https://www.docker.com/get-started", "https://github.com/features/actions"],
            "skills_comparison": [
                { "subject": "Coding", "A": 90, "B": 60, "fullMark": 100 },
                { "subject": "Infrastructure", "A": 20, "B": 90, "fullMark": 100 },
                { "subject": "CI/CD", "A": 30, "B": 95, "fullMark": 100 },
                { "subject": "Monitoring", "A": 15, "B": 85, "fullMark": 100 },
                { "subject": "Automation", "A": 40, "B": 90, "fullMark": 100 }
            ]
        }
    ],
    "FullStackDeveloper": [
        {
            "to": "DevOpsEngineer",
            "match": 75,
            "bridge": "Kubernetes & Terraform",
            "links": ["https://kubernetes.io/", "https://www.terraform.io/"],
            "skills_comparison": [
                { "subject": "App Logic", "A": 95, "B": 40, "fullMark": 100 },
                { "subject": "Orchestration", "A": 20, "B": 95, "fullMark": 100 },
                { "subject": "IaC", "A": 15, "B": 90, "fullMark": 100 },
                { "subject": "Scale/Security", "A": 40, "B": 85, "fullMark": 100 }
            ]
        },
        {
            "to": "MLEngineer",
            "match": 60,
            "bridge": "Python & Machine Learning",
            "links": ["https://scikit-learn.org/", "https://www.tensorflow.org/"],
            "skills_comparison": [
                { "subject": "Web Build", "A": 95, "B": 40, "fullMark": 100 },
                { "subject": "Math/Stats", "A": 25, "B": 90, "fullMark": 100 },
                { "subject": "Data Models", "A": 20, "B": 95, "fullMark": 100 },
                { "subject": "Algorithm", "A": 50, "B": 85, "fullMark": 100 }
            ]
        }
    ],
    "MLEngineer": [
        {
            "to": "DataEngineer",
            "match": 80,
            "bridge": "ETL Pipelines & Spark",
            "links": ["https://spark.apache.org/", "https://airflow.apache.org/"],
            "skills_comparison": [
                { "subject": "Modeling", "A": 95, "B": 40, "fullMark": 100 },
                { "subject": "ETL/Spark", "A": 30, "B": 95, "fullMark": 100 },
                { "subject": "Storage", "A": 50, "B": 90, "fullMark": 100 },
                { "subject": "Pipelining", "A": 40, "B": 90, "fullMark": 100 }
            ]
        },
        { "to": "AIOpsEngineer", "match": 75, "bridge": "MLflow & Deployment" }
    ],
    "CybersecurityEngineer": [
        {
            "to": "DevSecOps",
            "match": 80,
            "bridge": "Automation & CI/CD Security",
            "links": ["https://www.hcltech.com/cloud-native-security", "https://snyk.io/learn/what-is-devsecops/"],
            "skills_comparison": [
                { "subject": "Auditing", "A": 95, "B": 80, "fullMark": 100 },
                { "subject": "Automation", "A": 30, "B": 90, "fullMark": 100 },
                { "subject": "CI/CD Pipe", "A": 20, "B": 95, "fullMark": 100 },
                { "subject": "Cloud Policy", "A": 60, "B": 85, "fullMark": 100 }
            ]
        },
        { "to": "CloudArchitect", "match": 60, "bridge": "AWS/Azure Solutions" }
    ],
    "DevOpsEngineer": [
        {
            "to": "SiteReliabilityEngineer",
            "match": 90,
            "bridge": "Advanced Monitoring",
            "links": ["https://sre.google/", "https://prometheus.io/"],
            "skills_comparison": [
                { "subject": "Deployment", "A": 95, "B": 85, "fullMark": 100 },
                { "subject": "Monitoring", "A": 80, "B": 95, "fullMark": 100 },
                { "subject": "Availability", "A": 70, "B": 90, "fullMark": 100 },
                { "subject": "On-call/Perf", "A": 65, "B": 90, "fullMark": 100 }
            ]
        },
        { "to": "CloudSecurityEngineer", "match": 70, "bridge": "IAM & Encryption" }
    ],
    "BlockchainDeveloper": [
        {
            "to": "FullStackDeveloper",
            "match": 75,
            "bridge": "Traditional Databases",
            "links": ["https://www.postgresql.org/", "https://www.mongodb.com/"],
            "skills_comparison": [
                { "subject": "Contracts", "A": 95, "B": 10, "fullMark": 100 },
                { "subject": "Web Dev", "A": 40, "B": 95, "fullMark": 100 },
                { "subject": "SQL/NoSQL", "A": 20, "B": 90, "fullMark": 100 },
                { "subject": "Auth/Security", "A": 85, "B": 80, "fullMark": 100 }
            ]
        },
        { "to": "CybersecurityEngineer", "match": 65, "bridge": "Smart Contract Auditing" }
    ],
    "Database": [
        {
            "to": "DataEngineer",
            "match": 85,
            "bridge": "Big Data Tools (Hadoop)",
            "links": ["https://hadoop.apache.org/", "https://www.snowflake.com/"],
            "skills_comparison": [
                { "subject": "SQL/Design", "A": 95, "B": 80, "fullMark": 100 },
                { "subject": "Big Data", "A": 20, "B": 95, "fullMark": 100 },
                { "subject": "Spark/Scala", "A": 15, "B": 90, "fullMark": 100 },
                { "subject": "ETL Pipes", "A": 40, "B": 90, "fullMark": 100 }
            ]
        },
        { "to": "BackendDeveloper", "match": 70, "bridge": "API Development (Node/Python)" }
    ],
    "MobileAppDeveloper": [
        {
            "to": "FullStackDeveloper",
            "match": 80,
            "bridge": "Node.js & Databases",
            "links": ["https://nodejs.org/", "https://www.mongodb.com/"],
            "skills_comparison": [
                { "subject": "Client Code", "A": 95, "B": 90, "fullMark": 100 },
                { "subject": "Server Side", "A": 15, "B": 95, "fullMark": 100 },
                { "subject": "DB Design", "A": 10, "B": 90, "fullMark": 100 },
                { "subject": "REST/Graph", "A": 60, "B": 90, "fullMark": 100 }
            ]
        },
        { "to": "FrontendDeveloper", "match": 85, "bridge": "Next.js & Web Optimization" }
    ]
};

// NEW: Learning Resources Data Dictionary
export const learningResources = {
    // Top Bridge Skills
    "python": {
        why: "The #1 lingua franca for Machine Learning, Data Engineering, and Backend Automation.",
        levels: {
            "Junior": [
                { title: "Python for Beginners (Programming with Mosh)", url: "https://www.youtube.com/watch?v=kqtD5dpn9C8" },
                { title: "Automate the Boring Stuff (Free Book)", url: "https://automatetheboringstuff.com/" }
            ],
            "Mid-Level": [
                { title: "Real Python Advanced Tutorials", url: "https://realpython.com/" },
                { title: "Clean Code in Python", url: "https://github.com/zedr/clean-code-python" }
            ],
            "Senior": [
                { title: "Fluent Python (O'Reilly)", url: "https://www.oreilly.com/library/view/fluent-python-2nd/9781492056348/" },
                { title: "Python Application Architecture Patterns", url: "https://www.cosmicpython.com/" }
            ]
        }
    },
    "docker": {
        why: "Essential for containerization, ensuring software runs exactly the same everywhere.",
        levels: {
            "Junior": [
                { title: "Docker Crash Course (Traversy Media)", url: "https://www.youtube.com/watch?v=3c-iZaI7nLE" },
                { title: "Official Docker 101 Tutorial", url: "https://docs.docker.com/get-started/" }
            ],
            "Mid-Level": [
                { title: "Docker Best Practices for Node/Python apps", url: "https://docs.docker.com/develop/develop-images/dockerfile_best-practices/" },
                { title: "Docker Mastery Course (Udemy)", url: "https://www.udemy.com/course/docker-mastery/" }
            ],
            "Senior": [
                { title: "Advanced Container Orchestration Architecture", url: "https://medium.com/engineering" },
                { title: "Securing Docker Container Environments", url: "https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html" }
            ]
        }
    },
    "kubernetes": {
        why: "The industry standard for managing containerized applications at massive global scale.",
        levels: {
            "Junior": [
                { title: "Kubernetes in 100 Seconds", url: "https://www.youtube.com/watch?v=VnvRFRk_51k" },
                { title: "Kubernetes Basics (Interactive Tutorial)", url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/" }
            ],
            "Mid-Level": [
                { title: "Cloud Native DevOps with Kubernetes", url: "https://www.oreilly.com/library/view/cloud-native-devops/9781492040705/" },
                { title: "CKS/CKA Certification Prep", url: "https://kodekloud.com/" }
            ],
            "Senior": [
                { title: "Kubernetes Patterns for Distributed Systems", url: "https://k8spatterns.io/" },
                { title: "Managing K8s across Multi-Cloud architectures", url: "https://aws.amazon.com/architecture/" }
            ]
        }
    },
    "react": {
        why: "The dominant UI rendering library required for modern Full Stack web apps.",
        levels: {
            "Junior": [
                { title: "React Official Quick Start", url: "https://react.dev/learn" },
                { title: "Scrimba Interactive React Course", url: "https://scrimba.com/learn/learnreact" }
            ],
            "Mid-Level": [
                { title: "Advanced React Patterns (Kent C. Dodds)", url: "https://epicreact.dev/" },
                { title: "React Server Components Deep Dive", url: "https://nextjs.org/docs" }
            ],
            "Senior": [
                { title: "Micro-Frontend Architectures with React", url: "https://martinfowler.com/articles/micro-frontends.html" },
                { title: "Designing Resilient React Component Systems", url: "https://componentdriven.org/" }
            ]
        }
    },
    "aws": {
        why: "The largest cloud provider; cloud computing is a mandatory skill for infrastructure security.",
        levels: {
            "Junior": [
                { title: "AWS Certified Cloud Practitioner Bootcamp", url: "https://aws.amazon.com/training/digital/" },
                { title: "AWS in 10 Minutes (Fireship)", url: "https://www.youtube.com/watch?v=JIbIYCM48to" }
            ],
            "Mid-Level": [
                { title: "AWS Certified Solutions Architect Associate", url: "https://cantrill.io/" },
                { title: "Hands-on Serverless Apps (AWS Workshops)", url: "https://workshops.aws/" }
            ],
            "Senior": [
                { title: "AWS Well-Architected Framework", url: "https://aws.amazon.com/architecture/well-architected/" },
                { title: "Designing Multi-Region Active-Active Systems", url: "https://aws.amazon.com/blogs/architecture/" }
            ]
        }
    },
    "node.js": {
        why: "Extremely popular for scalable real-time APIs using JavaScript outside the browser.",
        levels: {
            "Junior": [
                { title: "Node.js documentation for beginners", url: "https://nodejs.org/en/learn" },
                { title: "Build a REST API with Node (Fireship)", url: "https://www.youtube.com/watch?v=ENrzD9HAZK4" }
            ],
            "Mid-Level": [
                { title: "Node.js Design Patterns", url: "https://www.nodejsdesignpatterns.com/" },
                { title: "Scaling Node.js Microservices", url: "https://blog.logrocket.com/" }
            ],
            "Senior": [
                { title: "V8 Engine Internals & Async Performance", url: "https://v8.dev/" },
                { title: "Enterprise Node & Security Strategies", url: "https://owasp.org/www-project-node-js/" }
            ]
        }
    },
    "mongodb": {
        why: "The leading NoSQL document database, common in agile Full Stack environments.",
        levels: {
            "Junior": [
                { title: "MongoDB University Basics (Free)", url: "https://learn.mongodb.com/" },
                { title: "MERN Stack Tutorial", url: "https://www.youtube.com/watch?v=O3BUHvfpr94" }
            ],
            "Mid-Level": [
                { title: "Advanced Aggregation Pipelines", url: "https://www.mongodb.com/docs/manual/core/aggregation-pipeline/" },
                { title: "Indexes and Performance Tuning", url: "https://www.mongodb.com/docs/manual/indexes/" }
            ],
            "Senior": [
                { title: "MongoDB Sharding & Replication Architecture", url: "https://www.mongodb.com/docs/manual/sharding/" },
                { title: "Data Modeling Policies for Enterprise apps", url: "https://www.mongodb.com/blog/channel/data-modeling" }
            ]
        }
    },
    "machine learning": {
        why: "Driving almost all modern software innovations, making applications truly intelligent.",
        levels: {
            "Junior": [
                { title: "Machine Learning for Everybody (FreeCodeCamp)", url: "https://www.youtube.com/watch?v=i_LwzRmA_08" },
                { title: "Kaggle Intro to Machine Learning", url: "https://www.kaggle.com/learn/intro-to-machine-learning" }
            ],
            "Mid-Level": [
                { title: "DeepLearning.AI Specialization (Coursera)", url: "https://www.coursera.org/specializations/deep-learning" },
                { title: "Hugging Face NLP Course", url: "https://huggingface.co/course/" }
            ],
            "Senior": [
                { title: "Designing Machine Learning Systems (Chip Huyen)", url: "https://huyenchip.com/machine-learning-systems-design/toc.html" },
                { title: "MLOps & Model Governance Architecture", url: "https://ml-ops.org/" }
            ]
        }
    },
    // Adding more key skills for other roles
    "typescript": {
        why: "Provides type safety to JavaScript, significantly reducing runtime errors in large-scale apps.",
        levels: {
            "Junior": [
                { title: "TypeScript Course for Beginners", url: "https://www.youtube.com/watch?v=BwuLxPH8IDs" },
                { title: "Official TS Handbook", url: "https://www.typescriptlang.org/docs/handbook/intro.html" }
            ],
            "Mid-Level": [
                { title: "Advanced TypeScript Types (Frontend Masters)", url: "https://frontendmasters.com/courses/advanced-typescript/" },
                { title: "Effective TypeScript (Book)", url: "https://effectivetypescript.com/" }
            ],
            "Senior": [
                { title: "TypeScript Compiler Internals", url: "https://basarat.gitbook.io/typescript/overview" },
                { title: "Designing Enterprise Type Systems", url: "https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html" }
            ]
        }
    },
    "next.js": {
        why: "The React framework for production, essential for SEO and performant web apps.",
        levels: {
            "Junior": [
                { title: "Next.js App Router Crash Course", url: "https://www.youtube.com/watch?v=ZVnjOPwW4ZA" },
                { title: "Learn Next.js (Official)", url: "https://nextjs.org/learn" }
            ],
            "Mid-Level": [
                { title: "Mastering Next.js 14 (Codevolution)", url: "https://www.udemy.com/" },
                { title: "Server Actions and DB Mutations", url: "https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations" }
            ],
            "Senior": [
                { title: "Next.js Architectural Patterns", url: "https://vercel.com/blog" },
                { title: "Optimizing Web Vitals in Next.js", url: "https://nextjs.org/docs/app/building-your-application/optimizing" }
            ]
        }
    },
    "postgresql": {
        why: "The most advanced open-source relational database, preferred for full-stack applications.",
        levels: {
            "Junior": [
                { title: "PostgreSQL Tutorial for Beginners", url: "https://www.youtube.com/watch?v=qw--VYLpxG4" },
                { title: "PostgreSQL Exercises", url: "https://pgexercises.com/" }
            ],
            "Mid-Level": [
                { title: "Advanced SQL Queries", url: "https://www.postgresqltutorial.com/" },
                { title: "Indexing and Performance Optimization", url: "https://useTheIndexLuke.com/" }
            ],
            "Senior": [
                { title: "PostgreSQL High Availability Architecture", url: "https://www.postgresql.org/docs/current/high-availability.html" },
                { title: "Database Sharding and Scaling", url: "https://www.citusdata.com/blog/" }
            ]
        }
    },
    "ci/cd": {
        why: "Automates software delivery, reducing human error and deployment times.",
        levels: {
            "Junior": [
                { title: "GitHub Actions Crash Course", url: "https://www.youtube.com/watch?v=R8_veQiYBjI" },
                { title: "GitLab CI/CD Basics", url: "https://docs.gitlab.com/ee/ci/" }
            ],
            "Mid-Level": [
                { title: "Jenkins Pipeline Tutorial", url: "https://www.jenkins.io/doc/book/pipeline/" },
                { title: "Building Robust CI/CD Workflows", url: "https://circleci.com/blog/" }
            ],
            "Senior": [
                { title: "Enterprise DevSecOps Strategies", url: "https://www.sonarqube.org/" },
                { title: "Zero Downtime Deployment Architectures", url: "https://martinfowler.com/bliki/BlueGreenDeployment.html" }
            ]
        }
    },
    "linux": {
        why: "The OS that runs the cloud and most backend infrastructure.",
        levels: {
            "Junior": [
                { title: "Linux Command Line for Beginners", url: "https://linuxjourney.com/" },
                { title: "Ubuntu Server Crash Course", url: "https://www.youtube.com/watch?v=v_1qaXPsJA8" }
            ],
            "Mid-Level": [
                { title: "Bash Scripting Masterclass", url: "https://www.udemy.com/course/bash-scripting/" },
                { title: "Linux System Administration", url: "https://www.cyberciti.biz/" }
            ],
            "Senior": [
                { title: "Linux Kernel Internals", url: "https://kernelnewbies.org/" },
                { title: "Advanced eBPF for Tracing and Security", url: "https://ebpf.io/" }
            ]
        }
    },
    "golang": {
        why: "High performance language ideal for distributed systems and cloud-native tools.",
        levels: {
            "Junior": [
                { title: "Go Tutorial (FreeCodeCamp)", url: "https://www.youtube.com/watch?v=YS4e4q9oBaU" },
                { title: "A Tour of Go", url: "https://go.dev/tour/welcome/1" }
            ],
            "Mid-Level": [
                { title: "Go Concurrency Patterns", url: "https://go.dev/blog/pipelines" },
                { title: "Building Microservices in Go", url: "https://www.practical-go-lessons.com/" }
            ],
            "Senior": [
                { title: "Go Memory Management & Garbage Collection", url: "https://go.dev/doc/gc-guide" },
                { title: "Advanced Go Architecture", url: "https://threedots.tech/" }
            ]
        }
    },
    "java": {
        why: "The bedrock of enterprise backend systems globally.",
        levels: {
            "Junior": [
                { title: "Java Programming Basics", url: "https://www.codecademy.com/learn/learn-java" },
                { title: "Java OOP Concepts", url: "https://www.youtube.com/watch?v=eIrMbAQSU34" }
            ],
            "Mid-Level": [
                { title: "Spring Boot Masterclass", url: "https://spring.academy/courses" },
                { title: "Effective Java (Book)", url: "https://www.oreilly.com/library/view/effective-java/9780134686097/" }
            ],
            "Senior": [
                { title: "JVM Performance Tuning", url: "https://www.baeldung.com/jvm-performance-tuning" },
                { title: "Designing Resilient Spring Microservices", url: "https://microservices.io/" }
            ]
        }
    },
    "angular": {
        why: "A robust, opinionated framework preferred by large enterprises.",
        levels: {
            "Junior": [
                { title: "Angular Crash Course", url: "https://www.youtube.com/watch?v=3qBXWUpoPHo" },
                { title: "Angular Official Tutorial", url: "https://angular.dev/tutorials/learn-angular" }
            ],
            "Mid-Level": [
                { title: "RxJS in Angular", url: "https://rxjs.dev/guide/overview" },
                { title: "Angular State Management (NgRx)", url: "https://ngrx.io/guide/store" }
            ],
            "Senior": [
                { title: "Angular Enterprise Architecture Patterns", url: "https://blog.angular-university.io/" },
                { title: "Optimizing Angular Performance", url: "https://angular.dev/best-practices/runtime-performance" }
            ]
        }
    },
    "cloud": { // General cloud concepts if AWS/Azure specific isn't matched
        why: "Essential knowledge for deploying scaling and managing modern applications.",
        levels: {
            "Junior": [
                { title: "Cloud Computing Basics", url: "https://www.youtube.com/watch?v=RWgW-CgdIk0" },
                { title: "Intro to Cloud Architecture", url: "https://www.ibm.com/cloud/learn/cloud-computing" }
            ],
            "Mid-Level": [
                { title: "Infrastructure as Code (Terraform)", url: "https://learn.hashicorp.com/terraform" },
                { title: "Serverless Application Development", url: "https://serverless.com/" }
            ],
            "Senior": [
                { title: "Multi-Cloud System Design", url: "https://martinfowler.com/articles/multi-cloud.html" },
                { title: "Enterprise Cloud Governance", url: "https://cloud.google.com/architecture/framework" }
            ]
        }
    }
};