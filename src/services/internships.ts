import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Internship } from '../types';
import { calculateCompatibilityScore } from './ai';

export async function fetchInternships(userResumeUrl?: string): Promise<Internship[]> {
  const querySnapshot = await getDocs(collection(db, 'internships'));
  const internshipData = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Internship[];

  if (userResumeUrl) {
    const scoredInternships = await Promise.all(
      internshipData.map(async (internship) => ({
        ...internship,
        compatibilityScore: await calculateCompatibilityScore(userResumeUrl, internship.requirements)
      }))
    );

    return scoredInternships.sort((a, b) => 
      (b.compatibilityScore || 0) - (a.compatibilityScore || 0)
    );
  }

  return internshipData;
}