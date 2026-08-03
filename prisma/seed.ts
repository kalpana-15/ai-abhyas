import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log('🌱 Starting Comprehensive PostgreSQL Database Seeding for AI Abhyas...');

  // 1. Create / Verify Learner Accounts with Enriched Profile Settings
  const passwordHash = await bcrypt.hash('password123', 10);

  const kalpanaUser = await prisma.user.upsert({
    where: { email: 'kalpanadevi@gmail.com' },
    update: {
      name: 'Kalpana Devi',
      passwordHash,
      role: 'Student',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Kalpana',
      phone: '+1 (555) 382-9901',
      bio: 'Senior AI Engineer & Deep Learning Researcher focusing on RAG optimization, Multi-Agent Systems, and enterprise production LLM deployment.',
      organization: 'RedN AI Labs & AI Abhyas Global',
      githubUrl: 'https://github.com/kalpana-ai',
      linkedinUrl: 'https://linkedin.com/in/kalpana-devi-ai',
      preferences: { darkMode: true, emailNotifications: true, weeklyDigest: true, labReminders: true },
    },
    create: {
      name: 'Kalpana Devi',
      email: 'kalpanadevi@gmail.com',
      passwordHash,
      role: 'Student',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Kalpana',
      phone: '+1 (555) 382-9901',
      bio: 'Senior AI Engineer & Deep Learning Researcher focusing on RAG optimization, Multi-Agent Systems, and enterprise production LLM deployment.',
      organization: 'RedN AI Labs & AI Abhyas Global',
      githubUrl: 'https://github.com/kalpana-ai',
      linkedinUrl: 'https://linkedin.com/in/kalpana-devi-ai',
      preferences: { darkMode: true, emailNotifications: true, weeklyDigest: true, labReminders: true },
    },
  });
  console.log(`✅ Verified Learner Profile: ${kalpanaUser.name} (${kalpanaUser.email})`);

  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@aiabhyas.com' },
    update: {
      name: 'Alex Rivera (Demo Learner)',
      passwordHash,
      role: 'Student',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Alex',
      organization: 'AI Abhyas Community',
    },
    create: {
      name: 'Alex Rivera (Demo Learner)',
      email: 'demo@aiabhyas.com',
      passwordHash,
      role: 'Student',
      avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Alex',
      organization: 'AI Abhyas Community',
    },
  });

  // 2. Completely delete ALL previous courses and related tables as instructed by user
  console.log('🧹 Completely deleting ALL previous courses, modules, lessons, enrollments, and payments...');
  await prisma.lessonProgress.deleteMany({});
  await prisma.lesson.deleteMany({});
  await prisma.module.deleteMany({});
  await prisma.courseResource.deleteMany({});
  await prisma.liveSession.deleteMany({});
  await prisma.assignmentSubmission.deleteMany({});
  await prisma.assessmentAttempt.deleteMany({});
  await prisma.credentialCertificate.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.course.deleteMany({});
  console.log('✨ All previous courses completely deleted! Database is pristine and awaiting your new masterclass courses.');

  // 3. Load and Sync Course Catalog from JSON
  const coursesPath = path.join(__dirname, '../src/data/courses.json');
  const coursesRaw = fs.readFileSync(coursesPath, 'utf-8');
  const coursesData = JSON.parse(coursesRaw);

  console.log(`📚 Syncing ${coursesData.length} masterclass courses with rich YouTube curriculum and resources...`);
  for (const c of coursesData) {
    const course = await prisma.course.upsert({
      where: { id: c.id },
      update: {
        title: c.title,
        description: c.description,
        level: c.level || 'Intermediate',
        mode: c.mode || 'Online Interactive',
        status: c.status || 'Open',
        duration: c.duration || '8 Weeks (120 hrs)',
        fee: c.fee || '₹4,999 / $65',
        eligibility: c.eligibility || 'Basic proficiency in Python and Software Design Concepts.',
        skills: c.skills || ['Python', 'LangChain', 'RAG'],
        highlights: c.highlights || ['15 Complete Modules', 'Downloadable PDF Study Guides', 'Proctored Certificate'],
        students: String(c.students || '2,840'),
        rating: Number(c.rating || 4.9),
        image: c.image || '/Assets/images/generative ai.png',
        instructorName: c.instructor?.name || 'Nitish Singh',
        instructorTitle: c.instructor?.designation || 'Lead AI Architect & Senior Faculty',
        instructorBio: c.instructor?.bio || 'Senior AI Engineer specializing in LLM applications and RAG architectures.',
        instructorImage: c.instructor?.image || '/Assets/images/tutor/pexels-bymuratisikofficial-34762358.jpg',
      },
      create: {
        id: c.id,
        title: c.title,
        description: c.description,
        level: c.level || 'Intermediate',
        mode: c.mode || 'Online Interactive',
        status: c.status || 'Open',
        duration: c.duration || '8 Weeks (120 hrs)',
        fee: c.fee || '₹4,999 / $65',
        eligibility: c.eligibility || 'Basic proficiency in Python and Software Design Concepts.',
        skills: c.skills || ['Python', 'LangChain', 'RAG'],
        highlights: c.highlights || ['15 Complete Modules', 'Downloadable PDF Study Guides', 'Proctored Certificate'],
        students: String(c.students || '2,840'),
        rating: Number(c.rating || 4.9),
        image: c.image || '/Assets/images/generative ai.png',
        instructorName: c.instructor?.name || 'Nitish Singh',
        instructorTitle: c.instructor?.designation || 'Lead AI Architect & Senior Faculty',
        instructorBio: c.instructor?.bio || 'Senior AI Engineer specializing in LLM applications and RAG architectures.',
        instructorImage: c.instructor?.image || '/Assets/images/tutor/pexels-bymuratisikofficial-34762358.jpg',
      },
    });

    if (course.id === 'c1') {
      console.log('🚀 Populating Course 1: Generative AI Masterclass (15 HD Modules)...');
      const genAIModules = [
        {
          title: 'Module 1: GenAI Roadmap for Beginners',
          hours: 3,
          videoUrl: 'https://www.youtube.com/watch?v=pSVk-5WemQ0&list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0',
          duration: '34 mins',
          lessonTitle: '1.1 Generative AI Roadmap for 2027: Builder vs. User Perspective',
          resourceTitle: 'GenAI 2027 Comprehensive Roadmap & Architecture (PDF)',
          filename: 'mod1-genai-roadmap.pdf',
        },
        {
          title: 'Module 2: GenAI using LangChain Fundamentals',
          hours: 4,
          videoUrl: 'https://www.youtube.com/watch?v=_3ezSpJw2E8&list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=2',
          duration: '42 mins',
          lessonTitle: '2.1 Foundation Models & Internet-Scale LLM Integration',
          resourceTitle: 'Foundation Models & API Interaction Reference Manual (PDF)',
          filename: 'mod2-foundation-models.pdf',
        },
        {
          title: 'Module 3: Introduction to LangChain & Economic Impact',
          hours: 4,
          videoUrl: 'https://www.youtube.com/watch?v=nlz9j-r0U9U&list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=3',
          duration: '38 mins',
          lessonTitle: '3.1 Overcoming GenAI FOMO & The Rise of the AI Engineer Role',
          resourceTitle: 'Industry Use Cases: Support, Content, Education & Code (PDF)',
          filename: 'mod3-industry-impact.pdf',
        },
        {
          title: 'Module 4: LangChain Core Components & Modular Design',
          hours: 5,
          videoUrl: 'https://www.youtube.com/watch?v=-xSJA8-o6Eg&list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=4',
          duration: '45 mins',
          lessonTitle: '4.1 Modular AI Application Design & Component Architecture',
          resourceTitle: 'LangChain Component Schema & Pipeline Reference (PDF)',
          filename: 'mod4-langchain-components.pdf',
        },
        {
          title: 'Module 5: LangChain Models & API Wrappers',
          hours: 5,
          videoUrl: 'https://www.youtube.com/watch?v=HdcLE8JuMrA&list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=5',
          duration: '40 mins',
          lessonTitle: '5.1 Integrating OpenAI, Ollama, and Hugging Face Models',
          resourceTitle: 'LLM API Integration & Configuration Guide (PDF)',
          filename: 'mod5-model-wrappers.pdf',
        },
        {
          title: 'Module 6: Prompts in LangChain (Part 1 - Fundamentals)',
          hours: 4,
          videoUrl: 'https://www.youtube.com/watch?v=HdcLE8JuMrA&list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=5',
          duration: '36 mins',
          lessonTitle: '6.1 Prompt Engineering Syntax & Message Types in LangChain',
          resourceTitle: 'System, Human & AI Message Types Worksheet (PDF)',
          filename: 'mod6-prompt-basics.pdf',
        },
        {
          title: 'Module 7: Prompt Templates & Few-Shot In-Context Learning',
          hours: 5,
          videoUrl: 'https://youtu.be/y5EmRr1O1h4?si=oNXH1WRZC8MMJLgF',
          duration: '48 mins',
          lessonTitle: '7.1 Dynamic Prompt Templates & Few-Shot Prompt Chaining',
          resourceTitle: 'Advanced Few-Shot Prompt Templates Cheat Sheet (PDF)',
          filename: 'mod7-prompt-templates.pdf',
        },
        {
          title: 'Module 8: Structured Output in LangChain',
          hours: 5,
          videoUrl: 'https://www.youtube.com/watch?v=y5EmRr1O1h4&list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=7',
          duration: '44 mins',
          lessonTitle: '8.1 Enforcing JSON Schemas & Pydantic Validation from LLMs',
          resourceTitle: 'Structured JSON & Schema Validation Whitepaper (PDF)',
          filename: 'mod8-structured-output.pdf',
        },
        {
          title: 'Module 9: Output Parsers in LangChain',
          hours: 4,
          videoUrl: 'https://www.youtube.com/watch?v=Op6PbJZ5b2Q&list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=8',
          duration: '39 mins',
          lessonTitle: '9.1 StrOutputParser, PydanticOutputParser & Error Mitigation',
          resourceTitle: 'Output Parsers & Exception Handling Code Samples (PDF)',
          filename: 'mod9-output-parsers.pdf',
        },
        {
          title: 'Module 10: What are Runnables & LCEL Expression Language',
          hours: 6,
          videoUrl: 'https://www.youtube.com/watch?v=u3b-W1NgYa4&list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=10',
          duration: '52 mins',
          lessonTitle: '10.1 LangChain Expression Language (LCEL) & Runnable Piping',
          resourceTitle: 'LCEL Syntax & Runnable Sequence Manual (PDF)',
          filename: 'mod10-lcel-runnables.pdf',
        },
        {
          title: 'Module 11: Document Loaders (RAG Data Pipeline Preparation)',
          hours: 5,
          videoUrl: 'https://www.youtube.com/watch?v=bL92ALSZ2Cg&list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=12',
          duration: '45 mins',
          lessonTitle: '11.1 Loading PDF, Web HTML & YouTube Transcripts for RAG',
          resourceTitle: 'Enterprise Document Loader API Integration Notes (PDF)',
          filename: 'mod11-doc-loaders.pdf',
        },
        {
          title: 'Module 12: Text Splitters & Strategic Chunking for Embeddings',
          hours: 5,
          videoUrl: 'https://www.youtube.com/watch?v=SEWS9P4ODmc&list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=13',
          duration: '41 mins',
          lessonTitle: '12.1 Recursive Character Chunking & Semantic Window Splitting',
          resourceTitle: 'Chunking Strategies & Overlap Parameter Optimization (PDF)',
          filename: 'mod12-text-splitters.pdf',
        },
        {
          title: 'Module 13: Vector Stores & High-Dimensional Embeddings',
          hours: 6,
          videoUrl: 'https://www.youtube.com/watch?v=k13WK0bxQP0&list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=14',
          duration: '55 mins',
          lessonTitle: '13.1 Storing & Indexing Embeddings in Pinecone, Chroma & Milvus',
          resourceTitle: 'Vector Database Indexing & Cosine Similarity Guide (PDF)',
          filename: 'mod13-vector-stores.pdf',
        },
        {
          title: 'Module 14: Retrievers in LangChain (Dense & Hybrid Search)',
          hours: 5,
          videoUrl: 'https://www.youtube.com/watch?v=pJdMxwXBsk0&list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=15',
          duration: '46 mins',
          lessonTitle: '14.1 Maximal Marginal Relevance (MMR) & Multi-Query Retrieval',
          resourceTitle: 'Advanced Retriever Configurations & Hybrid RAG (PDF)',
          filename: 'mod14-retrievers.pdf',
        },
        {
          title: 'Module 15: Capstone - Autonomous Tools & YouTube Chatbot',
          hours: 8,
          videoUrl: 'https://www.youtube.com/watch?v=etnLX7m2MiA&list=PLKnIA16_RmvaTbihpo4MtzVm4XOQa0ER0&index=18',
          duration: '64 mins',
          lessonTitle: '15.1 Building an Autonomous LangChain Tool-Calling YouTube Chatbot',
          resourceTitle: 'Production Capstone Source Code & Deployment Architecture (PDF)',
          filename: 'mod15-capstone-chatbot.pdf',
        },
      ];

      let orderIdx = 1;
      for (const m of genAIModules) {
        const mod = await prisma.module.create({
          data: {
            courseId: course.id,
            title: m.title,
            hours: m.hours,
            orderIndex: orderIdx,
            lessons: {
              create: [
                {
                  title: m.lessonTitle,
                  duration: m.duration,
                  type: 'Video',
                  videoUrl: m.videoUrl,
                  orderIndex: 1,
                },
              ],
            },
          },
        });

        await prisma.courseResource.create({
          data: {
            courseId: course.id,
            moduleTitle: mod.title,
            title: m.resourceTitle,
            type: 'pdf',
            size: `${(1.4 + (orderIdx * 0.12)).toFixed(1)} MB`,
            filename: m.filename,
            url: `/resources/genai_study_guide.md`,
          },
        });
        orderIdx++;
      }
    }
  }

  // 4. Enroll Learner in Course 1 (c1)
  console.log('🏅 Enrolling Learners into Generative AI Masterclass (c1)...');
  await prisma.enrollment.create({
    data: { userId: kalpanaUser.id, courseId: 'c1', status: 'Active' },
  });
  await prisma.enrollment.create({
    data: { userId: demoUser.id, courseId: 'c1', status: 'Active' },
  });

  // Mark all 15 lessons as completed for both learners so course progress shows 100% and certificate is unlocked!
  const c1Lessons = await prisma.lesson.findMany({ where: { module: { courseId: 'c1' } } });
  const allUsers = [kalpanaUser, demoUser];

  for (const u of allUsers) {
    for (const l of c1Lessons) {
      await prisma.lessonProgress.create({
        data: { userId: u.id, lessonId: l.id, isCompleted: true, completedAt: new Date() },
      });
    }

    // Add realistic assessment attempts for Course 1
    console.log(`📝 Seeding realistic proctored assessment attempts for learner ${u.email}...`);
    await prisma.assessmentAttempt.createMany({
      data: [
        { userId: u.id, courseId: 'c1', quizTitle: 'Module 1: GenAI 2027 Roadmap & Foundation Models Exam', score: 96, total: 100, threshold: 70, status: 'passed', attemptedAt: new Date(Date.now() - 86400000 * 8) },
        { userId: u.id, courseId: 'c1', quizTitle: 'Module 4: LangChain Core Components & Schemas Test', score: 92, total: 100, threshold: 75, status: 'passed', attemptedAt: new Date(Date.now() - 86400000 * 6) },
        { userId: u.id, courseId: 'c1', quizTitle: 'Module 8: Structured JSON Output & Pydantic Parsing Eval', score: 94, total: 100, threshold: 75, status: 'passed', attemptedAt: new Date(Date.now() - 86400000 * 4) },
        { userId: u.id, courseId: 'c1', quizTitle: 'Module 10: LCEL Runnable Piping & Chaining Assessment', score: 98, total: 100, threshold: 75, status: 'passed', attemptedAt: new Date(Date.now() - 86400000 * 2) },
        { userId: u.id, courseId: 'c1', quizTitle: 'Module 14: RAG Dense & Hybrid MMR Retriever Quiz', score: 95, total: 100, threshold: 75, status: 'passed', attemptedAt: new Date(Date.now() - 86400000 * 1) },
      ],
    });

    // Add realistic project assignment submissions for Course 1
    console.log(`💼 Seeding practical hands-on assignment lab submissions for learner ${u.email}...`);
    await prisma.assignmentSubmission.createMany({
      data: [
        {
          userId: u.id,
          courseId: 'c1',
          title: 'Module 3 Lab: Industry Impact Assessment & RAG ROI AI Proposal',
          fileUrl: 'https://github.com/kalpana-ai/genai-enterprise-roi-proposal',
          status: 'Graded',
          score: 98,
          feedback: 'Instructor Nitish Singh: Outstanding executive proposal! Excellent breakdown of the Builder vs. User economic shifts and practical RAG call center automation benefits.',
          submittedAt: new Date(Date.now() - 86400000 * 7),
        },
        {
          userId: u.id,
          courseId: 'c1',
          title: 'Module 7 Lab: Designing Few-Shot Prompt Templates & In-Context Chaining',
          fileUrl: 'https://github.com/kalpana-ai/langchain-fewshot-prompting',
          status: 'Graded',
          score: 94,
          feedback: 'Instructor Nitish Singh: Very clean variable formatting and robust handling of dynamic few-shot example injection within LangChain PromptTemplates.',
          submittedAt: new Date(Date.now() - 86400000 * 5),
        },
        {
          userId: u.id,
          courseId: 'c1',
          title: 'Module 12 Lab: Recursive Character Text Splitter & Chunk Overlap Benchmarking',
          fileUrl: 'https://github.com/kalpana-ai/rag-chunking-benchmarks',
          status: 'Graded',
          score: 96,
          feedback: 'Instructor Nitish Singh: Your 10% semantic overlap threshold achieved optimal cosine similarity inside ChromaDB without duplicate tokens. Exceptional analytical methodology!',
          submittedAt: new Date(Date.now() - 86400000 * 3),
        },
        {
          userId: u.id,
          courseId: 'c1',
          title: 'Module 15 Capstone: End-to-End Autonomous YouTube Chatbot with Tool Calling',
          fileUrl: 'https://github.com/kalpana-ai/langchain-youtube-autonomous-agent',
          status: 'Graded',
          score: 100,
          feedback: 'Instructor Nitish Singh: Flawless execution of LCEL Runnables, Pydantic schema validation, and automated YouTube transcript scraping tools. Outstanding masterclass capstone performance!',
          submittedAt: new Date(Date.now() - 86400000 * 1),
        },
      ],
    });

    // Add Course Completion Diploma Certificate
    console.log(`🎓 Seeding officially proctored Course Completion Certificate for ${u.email}...`);
    await prisma.credentialCertificate.create({
      data: {
        userId: u.id,
        courseId: 'c1',
        credentialId: u.id === kalpanaUser.id ? 'AIABHYAS-2027-GENAI-9941' : 'AIABHYAS-2027-GENAI-7728',
        isUnlocked: true,
        issuedAt: new Date(),
      },
    });

    await prisma.payment.create({
      data: { userId: u.id, courseId: 'c1', courseTitle: 'Generative AI Masterclass', amount: '₹4,999 / $65', method: 'Credit Card (•••• 4242)', status: 'Paid', createdAt: new Date('2026-07-10T14:30:00Z') },
    });
  }

  // Add realistic Jupyter Notebook study lab materials
  console.log('📓 Seeding interactive Jupyter notebook resources for study materials...');
  await prisma.courseResource.createMany({
    data: [
      {
        courseId: 'c1',
        moduleTitle: 'Module 8: Structured Output in LangChain',
        title: 'Module 8 Lab: structured_json_pydantic_output.ipynb',
        type: 'ipynb',
        size: '2.4 MB',
        filename: 'structured_json_pydantic_output.ipynb',
        url: '/resources/genai_study_guide.md',
      },
      {
        courseId: 'c1',
        moduleTitle: 'Module 15: Capstone - Autonomous Tools & YouTube Chatbot',
        title: 'Module 15 Capstone Lab: autonomous_tool_calling_chatbot.ipynb',
        type: 'ipynb',
        size: '4.1 MB',
        filename: 'autonomous_tool_calling_chatbot.ipynb',
        url: '/resources/genai_study_guide.md',
      },
    ],
  });



  // 6. Seed Support Tickets & Helpdesk Conversations for /dashboard/support
  console.log('💬 Seeding help center tickets and instructor dialogues...');
  await prisma.supportTicket.deleteMany({ where: { userId: kalpanaUser.id } });
  await prisma.supportTicket.createMany({
    data: [
      {
        userId: kalpanaUser.id,
        subject: 'Requesting cloud compute GPU credits for Module 3 RAG scaling laboratory',
        category: 'Compute & Lab Environment',
        status: 'Resolved',
        messages: [
          { sender: 'user', name: 'Kalpana Devi', text: 'Hi support team, I am starting Module 3 and require an AWS Bedrock / A100 test instance key to run our hybrid chunking pipeline.', timestamp: '2026-07-25T10:15:00Z' },
          { sender: 'support', name: 'Dr. Sarah Chen (Faculty Lead)', text: 'Hello Kalpana! Your corporate academic compute allowance has been provisioned with 50 GPU hours. Check your profile settings for the cloud access credential token!', timestamp: '2026-07-25T11:05:00Z' },
        ],
        createdAt: new Date('2026-07-25T10:15:00Z'),
      },
      {
        userId: kalpanaUser.id,
        subject: 'Inquiry regarding capstone project topic selection in Healthcare ML',
        category: 'Academic Curriculum',
        status: 'In Progress',
        messages: [
          { sender: 'user', name: 'Kalpana Devi', text: 'Hello, I would like to propose a hybrid Vision-Language pathology triage assistant as my capstone submission. Could we review this during Thursday live office hours?', timestamp: '2026-07-30T15:20:00Z' },
          { sender: 'support', name: 'Academic Advisor Desk', text: 'Hi Kalpana, this sounds like an exceptional research topic! We have reserved a 15-minute slot for your project architecture review during Thursday upcoming live webinar.', timestamp: '2026-07-30T16:00:00Z' },
        ],
        createdAt: new Date('2026-07-30T15:20:00Z'),
      },
    ],
  });

  console.log('🌟 Comprehensive database seeding completed successfully with full domain data!');
}

main()
  .catch((e) => {
    console.error('❌ Error during database seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
