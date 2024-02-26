// Define a function to initialize Google Generative AI
async function initializeGenerativeAI(API_KEY, modelName) {
  let model = null;
  try {
    // Dynamically import the module
    const { GoogleGenerativeAI } = await import("@google/generative-ai");

    // Access your API key
     const genAI = new GoogleGenerativeAI(API_KEY,modelName,GenerationConfig,safetySettings);
     model = genAI.getGenerativeModel({model:modelName});
    // const prompt = "Write a story about a magic backpack.";

    // Generate content
    // const result = await model.generateContent(prompt);
    // const response = await result.response;
    // const text = await response.text();
    // console.log(text);
  } catch (error) {
    console.error("Error initializing Google Generative AI:", error);
  }
  return model;
}

let GenerationConfig = {
  temperature: 0,
  top_p: 1,
  top_k:1,
  max_output_tokens: 400
}

let safetySettings = [
  {
    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    threshold: "BLOCK_NONE",
  },
  {
    category: "HARM_CATEGORY_HATE_SPEECH",
    threshold: "BLOCK_NONE",
  },
  {
    category: "HARM_CATEGORY_HARASSMENT",
    threshold: "BLOCK_NONE",
  },
  {
    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
    threshold: "BLOCK_NONE",
  },
];

export { initializeGenerativeAI };

