// app/quiz-data.tsx
import { Shield, Zap, Target } from 'lucide-react';

export interface Question {
  id: number;
  question: string;
  answer: string;
}

export interface QuizLevel {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  difficulty: string;
  questions: Question[];
}

export const quizLevels: QuizLevel[] = [
  {
    id: 'beginner',
    title: 'Beginner Level',
    description: 'Start your cybersecurity journey with fundamental concepts and basic security principles',
    icon: Shield,
    color: 'from-green-500 to-emerald-500',
    difficulty: 'Easy',
    questions: [
      {
        id: 1,
        question: 'What is a password and why is it important in cybersecurity?',
        answer:
          'A password is a secret word, phrase, or string of characters used to authenticate and gain access to a system or account. It serves as the first line of defense against unauthorized access and is crucial for protecting personal and sensitive information from cybercriminals.',
      },
      {
        id: 2,
        question: 'Explain what antivirus software does and why it is essential for computer security.',
        answer:
          'Antivirus software is designed to detect, prevent, and remove malicious software (malware) from computer systems. It continuously monitors the system for threats, scans files and programs, and provides real-time protection against viruses, trojans, worms, and other malicious code that could compromise system security.',
      },
      {
        id: 3,
        question: 'What does HTTPS stand for and how does it protect web communications?',
        answer:
          'HTTPS stands for HyperText Transfer Protocol Secure. It is the secure version of HTTP that encrypts data transmission between a web browser and server using SSL/TLS protocols. This encryption protects sensitive information like passwords, credit card numbers, and personal data from being intercepted by attackers during transmission.',
      },
      {
        id: 4,
        question: 'What are the characteristics of a strong password and why are they important?',
        answer:
          'A strong password should combine uppercase letters, lowercase letters, numbers, and special symbols. It should be at least 12 characters long, avoid common words or personal information, and be unique for each account. These characteristics make passwords difficult to guess or crack through brute force attacks, significantly improving account security.',
      },
      {
        id: 5,
        question: 'How should you handle suspicious emails to maintain cybersecurity?',
        answer:
          'When receiving suspicious emails, you should never click on links or download attachments from unknown sources. Instead, delete the email or report it as spam to your email provider. Verify the sender through alternative means if the email claims to be from a known contact, and always be cautious of urgent requests for personal information or money.',
      },
    ],
  },
  {
    id: 'intermediate',
    title: 'Intermediate Level',
    description: 'Advance your knowledge with network security, encryption, and common attack vectors',
    icon: Zap,
    color: 'from-blue-500 to-cyan-500',
    difficulty: 'Medium',
    questions: [
      {
        id: 1,
        question: 'Explain what a Man-in-the-Middle (MITM) attack is and how it works.',
        answer:
          'A Man-in-the-Middle attack occurs when an attacker secretly intercepts and potentially alters communication between two parties who believe they are communicating directly with each other. The attacker positions themselves between the victim and the intended recipient, allowing them to eavesdrop on conversations, steal sensitive data, or inject malicious content without either party knowing.',
      },
      {
        id: 2,
        question: 'What is two-factor authentication (2FA) and why is it more secure than passwords alone?',
        answer:
          'Two-factor authentication adds an extra layer of security beyond just passwords by requiring a second form of verification. This typically involves something you know (password) and something you have (phone, token) or something you are (biometric). Even if a password is compromised, attackers cannot access the account without the second factor, significantly reducing the risk of unauthorized access.',
      },
      {
        id: 3,
        question: 'Describe SQL injection attacks and how they can compromise database security.',
        answer:
          'SQL injection is an attack where malicious SQL code is inserted into application queries through user input fields. This allows attackers to manipulate database queries, potentially accessing, modifying, or deleting sensitive data. The attack exploits poor input validation and can lead to complete database compromise, data theft, or system takeover.',
      },
      {
        id: 4,
        question: 'What is a digital certificate and what security functions does it provide?',
        answer:
          'A digital certificate is an electronic document that uses cryptographic signatures to bind a public key to an identity. It provides identity verification, ensuring you are communicating with the intended party, and enables encryption for secure data transmission. Digital certificates are essential for establishing trust in online communications and are used in HTTPS, email encryption, and digital signatures.',
      },
      {
        id: 5,
        question: 'Explain the difference between computer viruses and worms in terms of how they spread.',
        answer:
          'The main difference is in their propagation method: viruses require host files to spread and need human action (like opening an infected file) to replicate, while worms can replicate and spread independently across networks without needing to attach to host files or requiring user interaction. Worms are generally more dangerous because they can spread automatically and rapidly across connected systems.',
      },
    ],
  },
  {
    id: 'advanced',
    title: 'Advanced Level',
    description: 'Master complex security concepts, advanced threats, and enterprise-level security measures',
    icon: Target,
    color: 'from-purple-500 to-pink-500',
    difficulty: 'Hard',
    questions: [
      {
        id: 1,
        question: 'What is a zero-day vulnerability and why is it particularly dangerous for organizations?',
        answer:
          'A zero-day vulnerability is a security flaw that is unknown to the software vendor and has no available patch or fix. It is particularly dangerous because attackers can exploit it without detection, as security systems are not configured to defend against unknown threats. Organizations have zero days to prepare defenses, making these vulnerabilities highly valuable to cybercriminals and nation-state actors.',
      },
      {
        id: 2,
        question: 'Explain the concept of perfect forward secrecy in cryptography and its importance.',
        answer:
          'Perfect forward secrecy ensures that session keys remain secure even if the long-term private keys are later compromised. Each communication session uses unique, ephemeral keys that are not derived from long-term keys. This means that even if an attacker obtains the server’s private key, they cannot decrypt past communications, providing protection against future key compromises and retroactive surveillance.',
      },
      {
        id: 3,
        question: 'Describe Advanced Persistent Threats (APTs) and their typical attack methodology.',
        answer:
          'An APT is a prolonged, stealthy cyberattack where sophisticated adversaries (often nation-states or organized crime groups) gain unauthorized access to networks and remain undetected for extended periods. They typically use multiple attack vectors, establish persistence through various backdoors, move laterally through networks, and exfiltrate data slowly to avoid detection. APTs focus on high-value targets and use advanced techniques to evade traditional security measures.',
      },
      {
        id: 4,
        question: 'What are side-channel attacks and how do they extract sensitive information?',
        answer:
          'Side-channel attacks extract sensitive information by analyzing physical characteristics of a system’s implementation rather than breaking the cryptographic algorithm itself. They measure and analyze power consumption, electromagnetic emissions, timing variations, or acoustic signatures during cryptographic operations. These physical "side channels" can reveal secret keys or other sensitive data, bypassing traditional cryptographic protections.',
      },
      {
        id: 5,
        question: 'Explain homomorphic encryption and its significance for privacy-preserving computation.',
        answer:
          'Homomorphic encryption allows computations to be performed on encrypted data without first decrypting it, with the results remaining encrypted. This enables privacy-preserving cloud computing where sensitive data can be processed by third parties without exposing the actual data. It’s significant for applications like secure voting systems, private medical data analysis, and confidential financial computations while maintaining data privacy throughout the process.',
      },
    ],
  },
];