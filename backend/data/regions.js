export const uzbekistanRegions = [
  {
    name: 'Toshkent shahri',
    code: 'TAS',
    deliveryPrice: 0, // Bepul yetkazish
    deliveryDays: '1-2 kun'
  },
  {
    name: 'Toshkent viloyati',
    code: 'TOS',
    deliveryPrice: 30000,
    deliveryDays: '2-3 kun'
  },
  {
    name: 'Andijon viloyati',
    code: 'AND',
    deliveryPrice: 50000,
    deliveryDays: '3-5 kun'
  },
  {
    name: 'Buxoro viloyati',
    code: 'BUX',
    deliveryPrice: 45000,
    deliveryDays: '3-5 kun'
  },
  {
    name: 'Jizzax viloyati',
    code: 'JIZ',
    deliveryPrice: 35000,
    deliveryDays: '2-4 kun'
  },
  {
    name: 'Qashqadaryo viloyati',
    code: 'QAS',
    deliveryPrice: 50000,
    deliveryDays: '4-6 kun'
  },
  {
    name: 'Navoiy viloyati',
    code: 'NAV',
    deliveryPrice: 45000,
    deliveryDays: '3-5 kun'
  },
  {
    name: 'Namangan viloyati',
    code: 'NAM',
    deliveryPrice: 50000,
    deliveryDays: '3-5 kun'
  },
  {
    name: 'Samarqand viloyati',
    code: 'SAM',
    deliveryPrice: 40000,
    deliveryDays: '2-4 kun'
  },
  {
    name: 'Surxondaryo viloyati',
    code: 'SUR',
    deliveryPrice: 55000,
    deliveryDays: '4-6 kun'
  },
  {
    name: 'Sirdaryo viloyati',
    code: 'SIR',
    deliveryPrice: 35000,
    deliveryDays: '2-3 kun'
  },
  {
    name: 'Farg\'ona viloyati',
    code: 'FAR',
    deliveryPrice: 50000,
    deliveryDays: '3-5 kun'
  },
  {
    name: 'Xorazm viloyati',
    code: 'XOR',
    deliveryPrice: 55000,
    deliveryDays: '4-6 kun'
  },
  {
    name: 'Qoraqalpog\'iston Respublikasi',
    code: 'QOR',
    deliveryPrice: 60000,
    deliveryDays: '5-7 kun'
  }
];

export const getRegionByCode = (code) => {
  return uzbekistanRegions.find(region => region.code === code);
};

export const getDeliveryPrice = (code) => {
  const region = getRegionByCode(code);
  return region ? region.deliveryPrice : 0;
};
