
import { useState, useEffect } from 'react';
import { calculateCompatibilityScore } from '../services/ai';
import { getResumeImprovementAdvice } from '../services/ai';  // Import the updated AI function
import type { Internship } from '../types';
import InternshipCard from './InternshipCard';

export default function InternshipList() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [advice, setAdvice] = useState<string[]>([]); // State for advice
  const [adviceLoading, setAdviceLoading] = useState(false); // State for advice loading


  const fetchAdvice = async (resumeUrl: string, requirements: string[]) => {
    setAdviceLoading(true);
    try {
      const generatedAdvice = await getResumeImprovementAdvice(resumeUrl, requirements);
      setAdvice(generatedAdvice);
    } catch (error) {
      console.error('Error fetching resume advice:', error);
    } finally {
      setAdviceLoading(false);
    }
  };


  const fetchInternships = async (userResumeUrl?: string): Promise<Internship[]> => {
    const MOCK_INTERNSHIPS: Internship[] = [
      {
        id: '1',
        title: 'Frontend Developer Intern',
        company: 'Tech Corp',
        description: 'Join our team to build modern web applications using React and TypeScript.',
        requirements: ['React', 'TypeScript', 'HTML/CSS', 'Git'],
        location: 'Remote',
        compatibilityScore: 75
      },
      {
        id: '2',
        title: 'Backend Developer Intern',
        company: 'Data Systems Inc',
        description: 'Work on scalable backend services using Node.js and PostgreSQL.',
        requirements: ['Node.js', 'SQL', 'REST APIs', 'Express'],
        location: 'New York, NY',
        compatibilityScore: 85
      },
      {
        id: '3',
        title: 'Full Stack Developer Intern',
        company: 'StartupCo',
        description: 'Help build our next-generation web platform from ground up.',
        requirements: ['JavaScript', 'Python', 'React', 'MongoDB'],
        location: 'San Francisco, CA',
        compatibilityScore: 90
      },
      {
        id: '4',
        title: 'Data Science Intern',
        company: 'Analytics Global',
        description: 'Analyze complex datasets and develop machine learning models.',
        requirements: ['Python', 'Machine Learning', 'Pandas', 'Scikit-learn'],
        location: 'Boston, MA',
        compatibilityScore: 80
      },
      {
        id: '5',
        title: 'Cloud Engineering Intern',
        company: 'CloudNative Solutions',
        description: 'Support cloud infrastructure and develop automation scripts.',
        requirements: ['AWS', 'Terraform', 'Docker', 'Kubernetes'],
        location: 'Seattle, WA',
        compatibilityScore: 70
      },
      {
        id: '6',
        title: 'Cybersecurity Intern',
        company: 'SecureNet Technologies',
        description: 'Assist in vulnerability assessments and security monitoring.',
        requirements: ['Network Security', 'Linux', 'Wireshark', 'Ethical Hacking'],
        location: 'Remote',
        compatibilityScore: 65
      },
      {
        id: '7',
        title: 'Digital Marketing Intern',
        company: 'Growth Hackers Media',
        description: 'Create and manage social media campaigns and content strategies.',
        requirements: ['Social Media Marketing', 'Content Creation', 'Analytics', 'Google Ads'],
        location: 'Los Angeles, CA',
        compatibilityScore: 60
      },
      {
        id: '8',
        title: 'UI/UX Design Intern',
        company: 'Creative Solutions Design',
        description: 'Design user-centric interfaces for web and mobile applications.',
        requirements: ['Figma', 'Adobe XD', 'User Research', 'Wireframing'],
        location: 'Chicago, IL',
        compatibilityScore: 55
      },
      {
        id: '9',
        title: 'Product Management Intern',
        company: 'InnovateTech',
        description: 'Support product development lifecycle and market research.',
        requirements: ['Product Strategy', 'Market Analysis', 'Agile Methodologies', 'Roadmapping'],
        location: 'Austin, TX',
        compatibilityScore: 50
      },
      {
        id: '10',
        title: 'AI Research Intern',
        company: 'Cognitive Systems Lab',
        description: 'Contribute to cutting-edge AI and machine learning research projects.',
        requirements: ['Python', 'TensorFlow', 'Deep Learning', 'Research Writing'],
        location: 'Cambridge, MA',
        compatibilityScore: 45
      },
      {
        id: '11',
        title: 'Technical Writing Intern',
        company: 'DocuTech Solutions',
        description: 'Create comprehensive documentation and user guides for software products.',
        requirements: ['Technical Writing', 'Markdown', 'API Documentation', 'LaTeX'],
        location: 'Remote',
        compatibilityScore: 40
      }
    ];


    if (userResumeUrl) {
      const scoredInternships = await Promise.all(
        MOCK_INTERNSHIPS.map(async (internship) => ({
          ...internship,
          compatibilityScore: await calculateCompatibilityScore(userResumeUrl, internship.requirements),
        }))
      );

      return scoredInternships.sort((a, b) => (b.compatibilityScore || 0) - (a.compatibilityScore || 0));
    }

    return MOCK_INTERNSHIPS;
  };

  useEffect(() => {
    const loadInternshipsAndAdvice = async () => {
      setLoading(true);
      try {
        const userResumeUrl = 'https://example.com/resume.pdf'; // Example resume URL
        const internshipsData = await fetchInternships(userResumeUrl);
        setInternships(internshipsData);

        // Fetch advice for the first internship's requirements (can be customized)
        if (internshipsData.length > 0) {
          await fetchAdvice(userResumeUrl, internshipsData[0].requirements);
        }
      } catch (error) {
        console.error('Error loading internships or advice:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInternshipsAndAdvice();
  }, []);


  if (loading) {
    return <div>Loading internships...</div>;
  }
  return (
    <>
      {loading ? (
        <div className="text-lg text-center mt-12 text-gray-600">Loading internships...</div>
      ) : (
        <>
          {/* Render internships here */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {internships.map((internship) => (
              <InternshipCard key={internship.id} internship={internship} />
            ))}
          </div>
  
          {/* Render Resume Improvement Advice */}
          <div className="max-w-7xl mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Resume Improvement Advice</h2>
            {adviceLoading ? (
              <p className="text-lg text-gray-600 text-center">Loading advice...</p> 
            ) : (
              <ul className="space-y-4">
                {advice.length > 0 ? (
                  advice.map((tip, index) => (
                    <li key={index} className="text-lg text-gray-700 bg-gray-50 p-4 rounded-md shadow-sm">
                      {tip}
                    </li>  
                  ))
                ) : (
                  <p className="text-center text-gray-500 text-lg">No advice available.</p>  
                )}
              </ul>
            )}
          </div>
        </>
      )}
    </>
  );
  
  
  
}
