// O'zbekiston telefon raqamlarini validatsiya qilish

export const UZBEK_OPERATORS = {
  '90': 'Beeline',
  '91': 'Beeline',
  '93': 'Ucell',
  '94': 'Ucell',
  '95': 'Uzmobile',
  '97': 'Uzmobile',
  '98': 'Uzmobile',
  '99': 'Uzmobile',
  '33': 'Humans',
  '88': 'Perfectum',
  '77': 'Mobiuz'
};

/**
 * O'zbek telefon raqamini validatsiya qilish
 * @param {string} phone - Telefon raqami
 * @returns {object} - { isValid, formatted, operator }
 */
export const validateUzbekPhone = (phone) => {
  // Faqat raqamlarni qoldirish
  const cleaned = phone.replace(/\D/g, '');
  
  // 998 bilan boshlansa, uni olib tashlash
  let phoneNumber = cleaned;
  if (phoneNumber.startsWith('998')) {
    phoneNumber = phoneNumber.substring(3);
  }
  
  // Uzunlik tekshirish (9 ta raqam bo'lishi kerak)
  if (phoneNumber.length !== 9) {
    return {
      isValid: false,
      message: 'Telefon raqami 9 ta raqamdan iborat bo\'lishi kerak'
    };
  }
  
  // Operator kodi tekshirish
  const operatorCode = phoneNumber.substring(0, 2);
  if (!UZBEK_OPERATORS[operatorCode]) {
    return {
      isValid: false,
      message: 'Noto\'g\'ri operator kodi. O\'zbekiston operatorlaridan birini tanlang'
    };
  }
  
  return {
    isValid: true,
    formatted: `+998 ${phoneNumber.substring(0, 2)} ${phoneNumber.substring(2, 5)}-${phoneNumber.substring(5, 7)}-${phoneNumber.substring(7)}`,
    raw: `+998${phoneNumber}`,
    operator: UZBEK_OPERATORS[operatorCode],
    operatorCode
  };
};

/**
 * Telefon raqamini format qilish
 * @param {string} phone - Telefon raqami
 * @returns {string} - Formatlangan telefon
 */
export const formatUzbekPhone = (phone) => {
  const result = validateUzbekPhone(phone);
  return result.isValid ? result.formatted : phone;
};

/**
 * Input field uchun telefon mask
 * @param {string} value - Input qiymati
 * @returns {string} - Masklangan qiymat
 */
export const maskUzbekPhone = (value) => {
  const cleaned = value.replace(/\D/g, '');
  
  let masked = '+998 ';
  
  if (cleaned.length >= 3) {
    const number = cleaned.startsWith('998') ? cleaned.substring(3) : cleaned;
    
    if (number.length <= 2) {
      masked += number;
    } else if (number.length <= 5) {
      masked += number.substring(0, 2) + ' ' + number.substring(2);
    } else if (number.length <= 7) {
      masked += number.substring(0, 2) + ' ' + number.substring(2, 5) + '-' + number.substring(5);
    } else {
      masked += number.substring(0, 2) + ' ' + number.substring(2, 5) + '-' + number.substring(5, 7) + '-' + number.substring(7, 9);
    }
  }
  
  return masked;
};
