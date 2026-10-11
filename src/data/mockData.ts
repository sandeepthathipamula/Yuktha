import { AdminUser, Proposal, ProjectCatalogItem, StudentUser } from '../types';

export const ADMIN_CREDENTIALS: { user: AdminUser; pass: string }[] = [
  {
    user: {
      id: 'admin-1',
      name: 'Ganesh Kunche',
      username: 'ganesh',
      role: 'Founder & Project Lead',
      avatar: 'GK'
    },
    pass: 'ganesh@yuktha26'
  },
  {
    user: {
      id: 'admin-2',
      name: 'Sandeep Varma',
      username: 'sandeep',
      role: 'Co-Founder & Tech Architecture',
      avatar: 'SV'
    },
    pass: 'sandeep@yuktha26'
  },
  {
    user: {
      id: 'admin-3',
      name: 'Praveen Kumar',
      username: 'praveen',
      role: 'Co-Founder & IEEE Documentation Head',
      avatar: 'PK'
    },
    pass: 'praveen@yuktha26'
  },
  {
    user: {
      id: 'admin-4',
      name: 'Sai Kiran Reddy',
      username: 'saikiran',
      role: 'Co-Founder & Viva Coach',
      avatar: 'SK'
    },
    pass: 'saikiran@yuktha26'
  }
];

export const INITIAL_STUDENT: StudentUser | null = null;

export const INITIAL_PROPOSALS: Proposal[] = [
  {
    id: 'prop-1',
    refId: '#252791',
    studentName: 'Kavya Reddy',
    studentEmail: 'kavya.reddy@gmail.com',
    studentPhone: '9701369352',
    college: 'CVSR College of Engineering',
    title: 'IoT Smart Agriculture & Soil Health Monitoring',
    description: 'Autonomous multi-sensor monitoring pipeline and predictive crop health module with real-time analytics dashboard.',
    technologies: 'Python, ML, React, FastAPI, SQLite',
    projectType: 'Major Project',
    expectedDate: '20/11/2026',
    submittedAt: 'Oct 11, 2026 | 03:04 PM',
    status: 'New',
    guidanceCharges: 2499,
    reviewWindow: 'Within 1 Hour',
    teamUpdate: 'New student submission. Team Yuktha will review within 1 hour.',
    referenceFiles: ['Base_IEEE_Paper_2026.pdf', 'Abstract_Synopsis_Draft.docx']
  },
  {
    id: 'prop-2',
    refId: '#252784',
    studentName: 'Rohan Sharma',
    studentEmail: 'rohan.sharma@cbit.ac.in',
    studentPhone: '9848022334',
    college: 'CBIT, Hyderabad',
    title: 'AI Chatbot for Colleges',
    description: 'Campus query resolver using RAG with Vector DB and Gemini integration for admissions, syllabus, and exam notices.',
    technologies: 'Python, LangChain, React, FastAPI, ChromaDB',
    projectType: 'Major Project',
    expectedDate: '25/11/2026',
    submittedAt: 'Oct 11, 2026 | 02:00 PM',
    status: 'New',
    guidanceCharges: 2199,
    reviewWindow: 'Within 1 Hour',
    teamUpdate: 'Proposal logged. Assigned to Praveen Kumar for IEEE literature review.'
  },
  {
    id: 'prop-3',
    refId: '#252778',
    studentName: 'Ananya K',
    studentEmail: 'ananya.k@vbit.ac.in',
    studentPhone: '9989011223',
    college: 'VBIT, Hyderabad',
    title: 'Smart Attendance System',
    description: 'Facial recognition automated attendance with anti-spoofing liveness detection and automated email alerts to parents.',
    technologies: 'Python, OpenCV, PyTorch, Streamlit, SQLite',
    projectType: 'Major Project',
    expectedDate: '15/12/2026',
    submittedAt: 'Oct 11, 2026 | 12:15 PM',
    status: 'New',
    guidanceCharges: 1899,
    reviewWindow: 'Within 1 Hour',
    teamUpdate: 'Under architecture review by Sandeep Varma.'
  },
  {
    id: 'prop-4',
    refId: '#252765',
    studentName: 'Rohit Kumar',
    studentEmail: 'rohit.k@rgukt.ac.in',
    studentPhone: '9701445566',
    college: 'RGUKT, Basar',
    title: 'Food Menu App',
    description: 'Hostel mess digitization portal with pre-order tokens, nutrition tracking, and food wastage estimation algorithm.',
    technologies: 'React Native, Node.js, Express, MongoDB',
    projectType: 'Minor Project',
    expectedDate: '05/11/2026',
    submittedAt: 'Oct 11, 2026 | 11:00 AM',
    status: 'Contacted',
    guidanceCharges: 1499,
    reviewWindow: 'Within 1 Hour',
    teamUpdate: 'Called student via WhatsApp. Base paper outline dispatched, code walkthrough scheduled.'
  },
  {
    id: 'prop-5',
    refId: '#252750',
    studentName: 'Vikas Reddy',
    studentEmail: 'vikas.reddy@jntuh.ac.in',
    studentPhone: '9885112244',
    college: 'JNTU, Hyderabad',
    title: 'Decentralized Academic Credential Verification',
    description: 'Smart contract based degree and certificate tamper-proof verification on Ethereum testnet with QR validation.',
    technologies: 'Solidity, Ethereum, Web3.js, React, Tailwind CSS',
    projectType: 'Major Project',
    expectedDate: '20/11/2026',
    submittedAt: 'Oct 10, 2026 | 05:40 PM',
    status: 'Converted',
    guidanceCharges: 2499,
    reviewWindow: 'Active',
    teamUpdate: 'Full source code delivered. Scheduled mock viva session with Sai Kiran Reddy.'
  }
];

export const PROJECT_CATALOG: ProjectCatalogItem[] = [
  {
    id: 'proj-1',
    title: 'Early Crop Disease Detection using Vision Transformers',
    category: 'AI / ML',
    type: 'Major Project',
    difficulty: 'Advanced',
    techStack: ['Python', 'PyTorch', 'Vision Transformer (ViT)', 'FastAPI', 'React'],
    abstract: 'Identifies 38 leaf disease classes across 14 crops with 98.4% validation accuracy using attention maps for agricultural explainability.',
    features: ['Real-time photo upload & disease grading', 'Organic treatment recommendations', 'Confidence heatmaps via Grad-CAM', 'Offline mobile PWA cache'],
    ieeeDomain: 'IEEE Transactions on Artificial Intelligence 2026',
    basePaperAvailable: true,
    codeReady: true,
    recommendedPrice: 2499
  },
  {
    id: 'proj-2',
    title: 'Smart Health Monitoring & Heart Risk Prediction System',
    category: 'Python & Data Science',
    type: 'Major Project',
    difficulty: 'Intermediate',
    techStack: ['Python', 'XGBoost', 'Scikit-Learn', 'Flask', 'Chart.js'],
    abstract: 'Cardiovascular disease probability estimation system utilizing Framingham and UCI datasets with lifestyle intervention insights.',
    features: ['Interactive multi-factor health input form', 'Ensemble risk calculation', 'PDF health report generator', 'Doctor consultation referral pipeline'],
    ieeeDomain: 'IEEE Journal of Biomedical and Health Informatics',
    basePaperAvailable: true,
    codeReady: true,
    recommendedPrice: 1999
  },
  {
    id: 'proj-3',
    title: 'Cloud-Based Secure Medical Record Exchange with AES-256',
    category: 'Cloud & DevOps',
    type: 'Major Project',
    difficulty: 'Advanced',
    techStack: ['React', 'Node.js', 'Docker', 'AWS S3', 'AES-256 GCM'],
    abstract: 'Zero-knowledge encrypted electronic health record management system featuring role-based clinician access keys and audit logs.',
    features: ['Client-side AES encryption prior to S3 upload', 'Time-limited QR token sharing for doctors', 'Tamper-evident audit trail', 'Full IEEE report & SRS'],
    ieeeDomain: 'IEEE Transactions on Cloud Computing',
    basePaperAvailable: true,
    codeReady: true,
    recommendedPrice: 2499
  },
  {
    id: 'proj-4',
    title: 'Real-Time Driver Drowsiness and Distraction Alert System',
    category: 'AI / ML',
    type: 'Major Project',
    difficulty: 'Intermediate',
    techStack: ['Python', 'OpenCV', 'MediaPipe', 'Pygame', 'FastAPI'],
    abstract: 'Eye Aspect Ratio (EAR) and Mouth Aspect Ratio (MAR) webcam tracking to detect micro-sleeps and mobile phone distractions with audio alarms.',
    features: ['Sub-30ms landmark processing', 'Audio buzzer & vibration triggers', 'Daily driving fatigue analytics', 'Works in low-light infrared mode'],
    ieeeDomain: 'IEEE Intelligent Transportation Systems Magazine',
    basePaperAvailable: true,
    codeReady: true,
    recommendedPrice: 1999
  },
  {
    id: 'proj-5',
    title: 'Student Performance & Placement Predictor Dashboard',
    category: 'Python & Data Science',
    type: 'Minor Project',
    difficulty: 'Intermediate',
    techStack: ['Python', 'RandomForest', 'Streamlit', 'Pandas'],
    abstract: 'Analyzes semester GPAs, coding practice metrics, and mock aptitude scores to estimate campus placement probability with skill gap tips.',
    features: ['Personalized skill roadmap generator', 'Company tier suitability score', 'Resume keyword gap analysis', 'Interactive Streamlit UI'],
    ieeeDomain: 'IEEE Conference on Learning Analytics',
    basePaperAvailable: true,
    codeReady: true,
    recommendedPrice: 1499
  },
  {
    id: 'proj-6',
    title: 'IoT Smart Energy Meter with Real-Time Power Outage Alert',
    category: 'IoT & Embedded',
    type: 'Major Project',
    difficulty: 'Advanced',
    techStack: ['ESP32', 'Arduino C++', 'MQTT', 'Node.js', 'React Dashboard'],
    abstract: 'Hardware current sensing with wireless telemetry to detect power theft, monitor household load limits, and send automated SMS alerts.',
    features: ['Non-invasive current transformer calibration', 'Live kilowatt-hour cost calculation', 'Threshold trip relay automation', 'Simulation setup guide included'],
    ieeeDomain: 'IEEE Internet of Things Journal',
    basePaperAvailable: true,
    codeReady: true,
    recommendedPrice: 2499
  },
  {
    id: 'proj-7',
    title: 'Campus Lost and Found Portal with Image Similarity Matching',
    category: 'Web & Full Stack',
    type: 'Minor Project',
    difficulty: 'Intermediate',
    techStack: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'MobileNet'],
    abstract: 'Student community lost item recovery portal leveraging lightweight feature vector matching to auto-pair reported lost and found items.',
    features: ['Photo upload with automated tag extraction', 'Claim verification questionnaire', 'WhatsApp instant notify integration', 'Clean responsive mobile UI'],
    ieeeDomain: 'IEEE Software Engineering Notes',
    basePaperAvailable: true,
    codeReady: true,
    recommendedPrice: 1499
  },
  {
    id: 'proj-8',
    title: 'Network Intrusion Detection System using Deep Learning',
    category: 'Cyber Security',
    type: 'Major Project',
    difficulty: 'Advanced',
    techStack: ['Python', 'TensorFlow', 'NSL-KDD Dataset', 'Scapy', 'Dash'],
    abstract: 'Multilayer deep autoencoder classifier flagging zero-day DoS, probe, and privilege escalation packets from live PCAP streams.',
    features: ['Packet sniffing via Scapy', 'Confusion matrix & ROC curve visualizer', 'Automated IP firewall rule generator', 'Comprehensive viva defense guide'],
    ieeeDomain: 'IEEE Transactions on Information Forensics and Security',
    basePaperAvailable: true,
    codeReady: true,
    recommendedPrice: 2499
  }
];

export const VIVA_QUESTIONS_LIST = [
  {
    q: "Why did you choose this particular technology stack?",
    a: "Explain latency, ecosystem support, ease of deployment, and how the architecture meets project requirements compared to legacy alternatives."
  },
  {
    q: "What is your contribution compared to the base IEEE paper?",
    a: "Highlight optimizations made, real-world data collection, preprocessing improvements, or the addition of an intuitive user interface and cloud deployment."
  },
  {
    q: "How did you handle model overfitting / database indexing?",
    a: "Mention cross-validation, regularization techniques (dropout, L2), early stopping, and proper indexing on frequently queried foreign keys."
  },
  {
    q: "What are the limitations and future enhancements of your system?",
    a: "Demonstrates realistic engineering acumen. Acknowledge dataset constraints, hardware dependencies, and present clear 2-3 logical roadmap extensions."
  }
];
