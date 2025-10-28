const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI with multiple keys support
let geminiInstances = [];
let currentKeyIndex = 0;

const initializeGemini = () => {
  const apiKeys = process.env.GEMINI_API_KEY?.split(',').map(key => key.trim()).filter(Boolean) || [];
  
  if (apiKeys.length === 0) {
    console.log('⚠️  GEMINI_API_KEY not configured - AI description generator disabled');
    return false;
  }

  geminiInstances = apiKeys.map(key => new GoogleGenerativeAI(key));
  console.log(`✓ Gemini: ${apiKeys.length} ta API key yuklandi`);
  console.log('✓ Gemini AI initialized with model: gemini-2.0-flash-exp');
  return true;
};

// Get next Gemini instance (rotation for rate limiting)
const getGeminiInstance = () => {
  if (geminiInstances.length === 0) {
    initializeGemini();
  }
  
  if (geminiInstances.length === 0) return null;
  
  const instance = geminiInstances[currentKeyIndex];
  currentKeyIndex = (currentKeyIndex + 1) % geminiInstances.length;
  return instance;
};

// Generate short product description
const generateShortDescription = async (productName, category, brand, price) => {
  const genAI = getGeminiInstance();
  if (!genAI) return null;

  const prompt = `
Mahsulot uchun qisqa va jozibali tavsif yozing (60-80 so'z):

Mahsulot: ${productName}
Kategoriya: ${category}
Brend: ${brand || 'Noma\'lum'}
Narx: ${price} so'm

Talablar:
- O'zbek tilida yozing
- Qisqa va aniq bo'lsin (60-80 so'z)
- Mijozlarni jalb qiluvchi
- Emoji ishlatish mumkin (2-3 ta)
- Faqat tavsif yozing, boshqa hech narsa yo'q
`.trim();

  try {
    console.log('🤖 Trying Gemini AI...');
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    const result = await model.generateContent(prompt);
    const description = result.response.text().trim();
    
    console.log('✅ Gemini AI success');
    console.log('🤖 AI Raw Response:', { 
      provider: 'Gemini', 
      textLength: description.length,
      sourcesCount: 0 
    });
    
    return description;
  } catch (error) {
    console.error('✗ Gemini AI failed:', error.message);
    return null;
  }
};

// Generate detailed product description
const generateDetailedDescription = async (productName, category, brand, price, features = []) => {
  const genAI = getGeminiInstance();
  if (!genAI) return null;

  const featuresText = features.length > 0 ? `\nXususiyatlari:\n${features.join('\n')}` : '';

  const prompt = `
Mahsulot uchun to'liq va professional tavsif yozing (200-300 so'z):

Mahsulot: ${productName}
Kategoriya: ${category}
Brend: ${brand || 'Noma\'lum'}
Narx: ${price} so'm${featuresText}

Talablar:
- O'zbek tilida professional yozing
- 200-300 so'z hajmida
- Mahsulotning afzalliklarini ta'kidlang
- Nima uchun xarid qilish kerakligini tushuntiring
- SEO uchun optimallashtiring
- Emoji ishlatish mumkin (3-5 ta)
- Faqat tavsif yozing, sarlavha yo'q
`.trim();

  try {
    console.log('🤖 Trying Gemini AI...');
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    const result = await model.generateContent(prompt);
    const description = result.response.text().trim();
    
    console.log('✅ Gemini AI success');
    console.log('🤖 AI Raw Response:', { 
      provider: 'Gemini', 
      textLength: description.length,
      sourcesCount: 0 
    });
    
    return description;
  } catch (error) {
    console.error('✗ Gemini AI failed:', error.message);
    return null;
  }
};

// Generate product description (auto-detect type)
const generateProductDescription = async ({ 
  productName, 
  category, 
  brand, 
  price, 
  type = 'short',
  features = []
}) => {
  console.log('📥 AI Description Request:', {
    productName,
    category,
    brand,
    price,
    type,
    user: 'optombazar4@gmail.com'
  });

  let description = null;

  if (type === 'detailed') {
    description = await generateDetailedDescription(productName, category, brand, price, features);
  } else {
    description = await generateShortDescription(productName, category, brand, price);
  }

  if (description) {
    // Clean up the description
    const cleaned = description
      .replace(/^["']|["']$/g, '') // Remove quotes
      .replace(/\*\*/g, '') // Remove markdown bold
      .replace(/\n\n+/g, '\n\n') // Normalize line breaks
      .trim();
    
    console.log(`✅ Cleaned Description: ${cleaned.substring(0, 60)}...`);
    return cleaned;
  }

  console.log('⚠️  AI description generation failed - using fallback');
  return `${productName} - ${category}. ${brand ? `Brend: ${brand}.` : ''} Narx: ${price.toLocaleString('uz-UZ')} so'm. Sifatli va arzon!`;
};

// Initialize on module load
initializeGemini();

module.exports = {
  generateProductDescription,
  generateShortDescription,
  generateDetailedDescription,
  initializeGemini
};
