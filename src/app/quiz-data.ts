// app/quiz-data.tsx
import { MessageCircle } from 'lucide-react';


export interface Question {
  id: number;
  question: string;
  correctAnswer: string;
  explanation: string;
  acceptableAnswers?: string[]; // Alternative correct answers
}

export interface QuizLevel {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  questions: Question[];
}

export const quizLevels: QuizLevel[] = [
  {
    id: 'cybersecurity',
    title: 'Cybersecurity MCQ Quiz',
    description: 'Test your cybersecurity knowledge with 20 multiple choice questions',
    icon: MessageCircle,
    color: 'from-blue-500 to-purple-600',
    questions: [
      {
        id: 1,
        question: 'What does CIA stand for in cybersecurity?',
        correctAnswer: 'Confidentiality, Integrity, Availability',
        acceptableAnswers: ['confidentiality integrity availability', 'confidentiality, integrity, availability', 'cia triad'],
        explanation: 'CIA in cybersecurity refers to the three fundamental principles: Confidentiality (protecting data from unauthorized access), Integrity (ensuring data accuracy and completeness), and Availability (ensuring systems and data are accessible when needed).'
      },
      {
        id: 2,
        question: 'What are the key characteristics that make a password strong? (Name at least 3)',
        correctAnswer: 'Length, complexity, uppercase letters, lowercase letters, numbers, special characters',
        acceptableAnswers: ['long complex unique', 'length complexity uniqueness', 'uppercase lowercase numbers symbols'],
        explanation: 'Strong passwords should have sufficient length (12+ characters), complexity (mix of character types), uniqueness (not reused), and include uppercase letters, lowercase letters, numbers, and special characters.'
      },
      {
        id: 3,
        question: 'What is phishing?',
        correctAnswer: 'A social engineering attack to steal sensitive information',
        acceptableAnswers: ['social engineering attack', 'fraudulent attempt to steal information', 'deceptive attack to get credentials'],
        explanation: 'Phishing is a social engineering attack where attackers impersonate legitimate entities to trick victims into revealing sensitive information like passwords, credit card numbers, or personal data.'
      },
      {
        id: 4,
        question: 'What does HTTPS provide that HTTP does not?',
        correctAnswer: 'Encryption of data in transit',
        acceptableAnswers: ['encryption', 'secure communication', 'ssl/tls encryption', 'data protection'],
        explanation: 'HTTPS provides encryption of data in transit using SSL/TLS protocols, protecting sensitive information from being intercepted during transmission between the browser and server.'
      },
      {
        id: 5,
        question: 'Which type of malware can replicate itself without human intervention?',
        correctAnswer: 'Worm',
        acceptableAnswers: ['worms', 'computer worm'],
        explanation: 'Worms can replicate themselves automatically across networks without requiring human intervention or host files, unlike viruses which need user action to spread.'
      },
      {
        id: 6,
        question: 'What is two-factor authentication (2FA)?',
        correctAnswer: 'Using two different verification methods',
        acceptableAnswers: ['two verification methods', 'multi-factor authentication', 'dual authentication'],
        explanation: 'Two-factor authentication requires two different verification methods, typically something you know (password) and something you have (phone/token) or something you are (biometric).'
      },
      {
        id: 7,
        question: 'What is a firewall primarily used for?',
        correctAnswer: 'Filtering network traffic',
        acceptableAnswers: ['network traffic filtering', 'controlling network access', 'blocking unauthorized traffic'],
        explanation: 'A firewall is primarily used for filtering network traffic, controlling which data packets are allowed to enter or leave a network based on predetermined security rules.'
      },
      {
        id: 8,
        question: 'What does SQL injection target?',
        correctAnswer: 'Databases',
        acceptableAnswers: ['database', 'database systems', 'sql databases'],
        explanation: 'SQL injection attacks target databases by inserting malicious SQL code into application queries, potentially allowing attackers to access, modify, or delete database information.'
      },
      {
        id: 9,
        question: 'What is the main purpose of encryption?',
        correctAnswer: 'To protect data confidentiality',
        acceptableAnswers: ['protect data', 'data protection', 'secure data', 'confidentiality'],
        explanation: 'The main purpose of encryption is to protect data confidentiality by converting readable data into an unreadable format that can only be decrypted with the proper key.'
      },
      {
        id: 10,
        question: 'What is a zero-day vulnerability?',
        correctAnswer: 'A vulnerability with no known fix',
        acceptableAnswers: ['unknown vulnerability', 'unpatched vulnerability', 'vulnerability without fix'],
        explanation: 'A zero-day vulnerability is a security flaw that is unknown to the software vendor and has no available patch or fix, making it particularly dangerous as there are zero days of protection available.'
      },
      {
        id: 11,
        question: 'What is social engineering in cybersecurity?',
        correctAnswer: 'Manipulating people to reveal information',
        acceptableAnswers: ['psychological manipulation', 'human manipulation', 'tricking people'],
        explanation: 'Social engineering is the practice of manipulating people psychologically to trick them into revealing confidential information or performing actions that compromise security.'
      },
      {
        id: 12,
        question: 'What does DDoS stand for?',
        correctAnswer: 'Distributed Denial of Service',
        acceptableAnswers: ['distributed denial of service'],
        explanation: 'DDoS stands for Distributed Denial of Service, an attack where multiple compromised systems are used to flood a target with traffic, making it unavailable to legitimate users.'
      },
      {
        id: 13,
        question: 'What is the primary function of antivirus software?',
        correctAnswer: 'Detect and remove malware',
        acceptableAnswers: ['malware detection', 'virus protection', 'malware removal'],
        explanation: 'The primary function of antivirus software is to detect, prevent, and remove malware including viruses, trojans, worms, and other malicious software that could harm computer systems.'
      },
      {
        id: 14,
        question: 'What is a VPN primarily used for?',
        correctAnswer: 'Creating secure, encrypted connections',
        acceptableAnswers: ['secure connections', 'encrypted connections', 'privacy protection'],
        explanation: 'A VPN (Virtual Private Network) is primarily used for creating secure, encrypted connections over the internet, protecting data privacy and allowing secure remote access to networks.'
      },
      {
        id: 15,
        question: 'What is ransomware?',
        correctAnswer: 'Software that demands payment to unlock encrypted files',
        acceptableAnswers: ['malware that encrypts files for ransom', 'extortion malware', 'file encryption malware'],
        explanation: 'Ransomware is malicious software that encrypts a victim\'s files and demands payment (ransom) in exchange for the decryption key to restore access to the files.'
      },
      {
        id: 16,
        question: 'What does PKI stand for in cybersecurity?',
        correctAnswer: 'Public Key Infrastructure',
        acceptableAnswers: ['public key infrastructure'],
        explanation: 'PKI stands for Public Key Infrastructure, a framework that manages digital keys and certificates for secure communication and authentication in digital environments.'
      },
      {
        id: 17,
        question: 'What is the main difference between symmetric and asymmetric encryption?',
        correctAnswer: 'Number of keys used',
        acceptableAnswers: ['key usage', 'symmetric uses one key asymmetric uses two', 'single key vs key pair'],
        explanation: 'The main difference is the number of keys used: symmetric encryption uses one shared key for both encryption and decryption, while asymmetric encryption uses a pair of keys (public and private).'
      },
      {
        id: 18,
        question: 'What is a honeypot in cybersecurity?',
        correctAnswer: 'A decoy system to attract attackers',
        acceptableAnswers: ['decoy system', 'trap for attackers', 'security trap'],
        explanation: 'A honeypot is a decoy system designed to attract and detect attackers, allowing security professionals to study attack methods and gather intelligence about threats.'
      },
      {
        id: 19,
        question: 'What does SIEM stand for?',
        correctAnswer: 'Security Information and Event Management',
        acceptableAnswers: ['security information and event management'],
        explanation: 'SIEM stands for Security Information and Event Management, a solution that provides real-time analysis of security alerts and events generated by network hardware and applications.'
      },
      {
        id: 20,
        question: 'What is the principle of least privilege?',
        correctAnswer: 'Providing users only the minimum access needed for their job',
        acceptableAnswers: ['minimum access needed', 'minimal necessary permissions', 'least access required'],
        explanation: 'The principle of least privilege means providing users, applications, and systems only the minimum level of access or permissions needed to perform their intended function, reducing security risks.'
      }
    ],
  },
];