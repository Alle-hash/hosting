import Groq from 'groq-sdk';

// Initialize the Groq client with the API key
const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY,dangerouslyAllowBrowser: true });

export async function calculateCompatibilityScore(resumeUrl: string, requirements: string[]): Promise<number> {
  try {
    // Prepare the prompt to send to the Groq model
    const prompt = `Analyze the resume from ${resumeUrl} against these job requirements: ${requirements.join(', ')}.
      Return ONLY a numerical compatibility score between 0 and 100, where:
      - 0 means no match at all
      - 100 means perfect match
      - Score based on skills, experience, and requirement alignment
      Example output: 85`;

    // Call the Groq chat completion endpoint with the prompt
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "user", content: prompt }
      ],
      model: "llama3-8b-8192",  // Specify the LLaMA model
    });

    // Extract the compatibility score from the response (assuming it's a number in the response)
    const text = chatCompletion.choices[0]?.message?.content?.trim();
    const score = parseInt(text?.match(/\d+/)?.[0] || '0');  // Extract the first number

    // Ensure the score is between 0 and 100
    return Math.min(Math.max(score, 0), 100);
  } catch (error) {
    console.error('Error calculating compatibility score:', error);
    return 0;  // Default to 0 in case of an error
  }
}

export async function getResumeImprovementAdvice(
  resumeUrl: string,
  requirements: string[]
): Promise<string[]> {
  try {
    // Prepare the prompt for the Groq model
    const prompt = `Analyze the resume from ${resumeUrl} against the following job requirements: ${requirements.join(
      ', '
    )}.
    Provide specific advice to improve the resume's compatibility with these requirements.
    Limit your suggestions to 5 actionable items.
    Example output:
    - Add more details about your experience with JavaScript.
    - Highlight leadership roles in previous positions.`;

    // Call the Groq chat completion endpoint with the prompt
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama3-8b-8192', // Specify the LLaMA model
    });

    // Extract the advice from the response
    const text = chatCompletion.choices[0]?.message?.content?.trim();

    // Split the text into separate pieces of advice
    const adviceList = text?.split(/[\r\n]+/).map((item) => item.trim()).filter(Boolean) || [];
    for(let i=0;i<adviceList.length;i++){
      adviceList[i].replace("**",'')
    }
    // Return the advice list (up to 5 items)
    return adviceList.slice(1, 6)//.forEach((item) => {item.replace("*", "");});
  } catch (error) {
    console.error('Error generating resume improvement advice:', error);
    return ['An error occurred while generating advice. Please try again.'];
  }
}

