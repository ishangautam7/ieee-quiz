// app/quiz-data.tsx
import { MessageCircle } from 'lucide-react';

export interface MCQOption {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  question: string;
  options: MCQOption[];
  correctAnswer: string;
  explanation: string;
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
        options: [
          { id: 'a', text: 'Central Intelligence Agency' },
          { id: 'b', text: 'Confidentiality, Integrity, Availability' },
          { id: 'c', text: 'Computer Information Access' },
          { id: 'd', text: 'Cyber Intelligence Analysis' }
        ],
        correctAnswer: 'b',
        explanation: 'CIA in cybersecurity refers to the three fundamental principles: Confidentiality (protecting data from unauthorized access), Integrity (ensuring data accuracy and completeness), and Availability (ensuring systems and data are accessible when needed).'
      },
      {
        id: 2,
        question: 'Which of the following is considered the strongest password?',
        options: [
          { id: 'a', text: 'password123' },
          { id: 'b', text: 'MyP@ssw0rd2024!' },
          { id: 'c', text: '12345678' },
          { id: 'd', text: 'admin' }
        ],
        correctAnswer: 'b',
        explanation: 'MyP@ssw0rd2024! is the strongest password as it contains uppercase letters, lowercase letters, numbers, and special characters, making it much harder to crack than simple passwords.'
      },
      {
        id: 3,
        question: 'What is phishing?',
        options: [
          { id: 'a', text: 'A type of malware' },
          { id: 'b', text: 'A social engineering attack to steal sensitive information' },
          { id: 'c', text: 'A network scanning technique' },
          { id: 'd', text: 'A password cracking method' }
        ],
        correctAnswer: 'b',
        explanation: 'Phishing is a social engineering attack where attackers impersonate legitimate entities to trick victims into revealing sensitive information like passwords, credit card numbers, or personal data.'
      },
      {
        id: 4,
        question: 'What does HTTPS provide that HTTP does not?',
        options: [
          { id: 'a', text: 'Faster loading times' },
          { id: 'b', text: 'Better search engine ranking' },
          { id: 'c', text: 'Encryption of data in transit' },
          { id: 'd', text: 'Automatic backups' }
        ],
        correctAnswer: 'c',
        explanation: 'HTTPS provides encryption of data in transit using SSL/TLS protocols, protecting sensitive information from being intercepted during transmission between the browser and server.'
      },
      {
        id: 5,
        question: 'Which type of malware can replicate itself without human intervention?',
        options: [
          { id: 'a', text: 'Virus' },
          { id: 'b', text: 'Trojan' },
          { id: 'c', text: 'Worm' },
          { id: 'd', text: 'Spyware' }
        ],
        correctAnswer: 'c',
        explanation: 'Worms can replicate themselves automatically across networks without requiring human intervention or host files, unlike viruses which need user action to spread.'
      },
      {
        id: 6,
        question: 'What is two-factor authentication (2FA)?',
        options: [
          { id: 'a', text: 'Using two different passwords' },
          { id: 'b', text: 'Logging in twice' },
          { id: 'c', text: 'Using two different verification methods' },
          { id: 'd', text: 'Having two user accounts' }
        ],
        correctAnswer: 'c',
        explanation: 'Two-factor authentication requires two different verification methods, typically something you know (password) and something you have (phone/token) or something you are (biometric).'
      },
      {
        id: 7,
        question: 'What is a firewall primarily used for?',
        options: [
          { id: 'a', text: 'Encrypting data' },
          { id: 'b', text: 'Filtering network traffic' },
          { id: 'c', text: 'Creating backups' },
          { id: 'd', text: 'Scanning for viruses' }
        ],
        correctAnswer: 'b',
        explanation: 'A firewall is primarily used for filtering network traffic, controlling which data packets are allowed to enter or leave a network based on predetermined security rules.'
      },
      {
        id: 8,
        question: 'What does SQL injection target?',
        options: [
          { id: 'a', text: 'Operating systems' },
          { id: 'b', text: 'Databases' },
          { id: 'c', text: 'Email servers' },
          { id: 'd', text: 'Web browsers' }
        ],
        correctAnswer: 'b',
        explanation: 'SQL injection attacks target databases by inserting malicious SQL code into application queries, potentially allowing attackers to access, modify, or delete database information.'
      },
      {
        id: 9,
        question: 'What is the main purpose of encryption?',
        options: [
          { id: 'a', text: 'To compress data' },
          { id: 'b', text: 'To protect data confidentiality' },
          { id: 'c', text: 'To speed up data transfer' },
          { id: 'd', text: 'To organize data' }
        ],
        correctAnswer: 'b',
        explanation: 'The main purpose of encryption is to protect data confidentiality by converting readable data into an unreadable format that can only be decrypted with the proper key.'
      },
      {
        id: 10,
        question: 'What is a zero-day vulnerability?',
        options: [
          { id: 'a', text: 'A vulnerability that takes zero days to exploit' },
          { id: 'b', text: 'A vulnerability with no known fix' },
          { id: 'c', text: 'A vulnerability that expires in zero days' },
          { id: 'd', text: 'A vulnerability found on day zero of testing' }
        ],
        correctAnswer: 'b',
        explanation: 'A zero-day vulnerability is a security flaw that is unknown to the software vendor and has no available patch or fix, making it particularly dangerous as there are zero days of protection available.'
      },
      {
        id: 11,
        question: 'What is social engineering in cybersecurity?',
        options: [
          { id: 'a', text: 'Building secure networks' },
          { id: 'b', text: 'Manipulating people to reveal information' },
          { id: 'c', text: 'Designing user interfaces' },
          { id: 'd', text: 'Creating security policies' }
        ],
        correctAnswer: 'b',
        explanation: 'Social engineering is the practice of manipulating people psychologically to trick them into revealing confidential information or performing actions that compromise security.'
      },
      {
        id: 12,
        question: 'What does DDoS stand for?',
        options: [
          { id: 'a', text: 'Direct Denial of Service' },
          { id: 'b', text: 'Distributed Denial of Service' },
          { id: 'c', text: 'Dynamic Denial of Service' },
          { id: 'd', text: 'Digital Denial of Service' }
        ],
        correctAnswer: 'b',
        explanation: 'DDoS stands for Distributed Denial of Service, an attack where multiple compromised systems are used to flood a target with traffic, making it unavailable to legitimate users.'
      },
      {
        id: 13,
        question: 'What is the primary function of antivirus software?',
        options: [
          { id: 'a', text: 'Speed up computer performance' },
          { id: 'b', text: 'Detect and remove malware' },
          { id: 'c', text: 'Manage network connections' },
          { id: 'd', text: 'Create system backups' }
        ],
        correctAnswer: 'b',
        explanation: 'The primary function of antivirus software is to detect, prevent, and remove malware including viruses, trojans, worms, and other malicious software that could harm computer systems.'
      },
      {
        id: 14,
        question: 'What is a VPN primarily used for?',
        options: [
          { id: 'a', text: 'Increasing internet speed' },
          { id: 'b', text: 'Creating secure, encrypted connections' },
          { id: 'c', text: 'Blocking advertisements' },
          { id: 'd', text: 'Managing passwords' }
        ],
        correctAnswer: 'b',
        explanation: 'A VPN (Virtual Private Network) is primarily used for creating secure, encrypted connections over the internet, protecting data privacy and allowing secure remote access to networks.'
      },
      {
        id: 15,
        question: 'What is ransomware?',
        options: [
          { id: 'a', text: 'Software that demands payment to unlock encrypted files' },
          { id: 'b', text: 'Software that steals passwords' },
          { id: 'c', text: 'Software that monitors user activity' },
          { id: 'd', text: 'Software that creates fake websites' }
        ],
        correctAnswer: 'a',
        explanation: 'Ransomware is malicious software that encrypts a victim\'s files and demands payment (ransom) in exchange for the decryption key to restore access to the files.'
      },
      {
        id: 16,
        question: 'What does PKI stand for in cybersecurity?',
        options: [
          { id: 'a', text: 'Private Key Infrastructure' },
          { id: 'b', text: 'Public Key Infrastructure' },
          { id: 'c', text: 'Protected Key Infrastructure' },
          { id: 'd', text: 'Primary Key Infrastructure' }
        ],
        correctAnswer: 'b',
        explanation: 'PKI stands for Public Key Infrastructure, a framework that manages digital keys and certificates for secure communication and authentication in digital environments.'
      },
      {
        id: 17,
        question: 'What is the main difference between symmetric and asymmetric encryption?',
        options: [
          { id: 'a', text: 'Speed of encryption' },
          { id: 'b', text: 'Number of keys used' },
          { id: 'c', text: 'Type of data encrypted' },
          { id: 'd', text: 'Level of security' }
        ],
        correctAnswer: 'b',
        explanation: 'The main difference is the number of keys used: symmetric encryption uses one shared key for both encryption and decryption, while asymmetric encryption uses a pair of keys (public and private).'
      },
      {
        id: 18,
        question: 'What is a honeypot in cybersecurity?',
        options: [
          { id: 'a', text: 'A type of malware' },
          { id: 'b', text: 'A decoy system to attract attackers' },
          { id: 'c', text: 'A password manager' },
          { id: 'd', text: 'An encryption algorithm' }
        ],
        correctAnswer: 'b',
        explanation: 'A honeypot is a decoy system designed to attract and detect attackers, allowing security professionals to study attack methods and gather intelligence about threats.'
      },
      {
        id: 19,
        question: 'What does SIEM stand for?',
        options: [
          { id: 'a', text: 'Security Information and Event Management' },
          { id: 'b', text: 'System Integration and Error Monitoring' },
          { id: 'c', text: 'Secure Internet and Email Management' },
          { id: 'd', text: 'Software Installation and Environment Management' }
        ],
        correctAnswer: 'a',
        explanation: 'SIEM stands for Security Information and Event Management, a solution that provides real-time analysis of security alerts and events generated by network hardware and applications.'
      },
      {
        id: 20,
        question: 'What is the principle of least privilege?',
        options: [
          { id: 'a', text: 'Giving users maximum access for convenience' },
          { id: 'b', text: 'Providing users only the minimum access needed for their job' },
          { id: 'c', text: 'Allowing temporary elevated access' },
          { id: 'd', text: 'Sharing administrative privileges among team members' }
        ],
        correctAnswer: 'b',
        explanation: 'The principle of least privilege means providing users, applications, and systems only the minimum level of access or permissions needed to perform their intended function, reducing security risks.'
      }
    ],
  },
];