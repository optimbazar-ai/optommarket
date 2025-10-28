import { MapPin } from 'lucide-react'

// O'zbekiston viloyatlari
const regions = [
  { name: 'Toshkent shahri', code: 'TAS', deliveryPrice: 0, deliveryDays: '1-2 kun' },
  { name: 'Toshkent viloyati', code: 'TOS', deliveryPrice: 30000, deliveryDays: '2-3 kun' },
  { name: 'Andijon viloyati', code: 'AND', deliveryPrice: 50000, deliveryDays: '3-5 kun' },
  { name: 'Buxoro viloyati', code: 'BUX', deliveryPrice: 45000, deliveryDays: '3-5 kun' },
  { name: 'Jizzax viloyati', code: 'JIZ', deliveryPrice: 35000, deliveryDays: '2-4 kun' },
  { name: 'Qashqadaryo viloyati', code: 'QAS', deliveryPrice: 50000, deliveryDays: '4-6 kun' },
  { name: 'Navoiy viloyati', code: 'NAV', deliveryPrice: 45000, deliveryDays: '3-5 kun' },
  { name: 'Namangan viloyati', code: 'NAM', deliveryPrice: 50000, deliveryDays: '3-5 kun' },
  { name: 'Samarqand viloyati', code: 'SAM', deliveryPrice: 40000, deliveryDays: '2-4 kun' },
  { name: 'Surxondaryo viloyati', code: 'SUR', deliveryPrice: 55000, deliveryDays: '4-6 kun' },
  { name: 'Sirdaryo viloyati', code: 'SIR', deliveryPrice: 35000, deliveryDays: '2-3 kun' },
  { name: 'Farg\'ona viloyati', code: 'FAR', deliveryPrice: 50000, deliveryDays: '3-5 kun' },
  { name: 'Xorazm viloyati', code: 'XOR', deliveryPrice: 55000, deliveryDays: '4-6 kun' },
  { name: 'Qoraqalpog\'iston Respublikasi', code: 'QOR', deliveryPrice: 60000, deliveryDays: '5-7 kun' }
];

const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
};

const RegionSelector = ({ value, onChange, error, required = false, showDeliveryInfo = true }) => {
  const selectedRegion = regions.find(r => r.code === value);

  return (
    <div>
      <div className="relative">
        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none ${
            error
              ? 'border-red-500 dark:border-red-500'
              : 'border-gray-200 dark:border-dark-border'
          } bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text cursor-pointer`}
        >
          <option value="">Viloyatni tanlang</option>
          {regions.map((region) => (
            <option key={region.code} value={region.code}>
              {region.name}
            </option>
          ))}
        </select>
        
        {/* Custom arrow */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
      
      {/* Delivery Info */}
      {showDeliveryInfo && selectedRegion && (
        <div className="mt-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-dark-text mb-1">
                {selectedRegion.name}
              </p>
              <div className="space-y-1 text-sm">
                <p className="text-gray-600 dark:text-dark-muted">
                  🚚 Yetkazish: {' '}
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    {selectedRegion.deliveryPrice === 0 
                      ? 'BEPUL' 
                      : formatPrice(selectedRegion.deliveryPrice)
                    }
                  </span>
                </p>
                <p className="text-gray-600 dark:text-dark-muted">
                  ⏱️ Muddat: {' '}
                  <span className="font-semibold text-gray-900 dark:text-dark-text">
                    {selectedRegion.deliveryDays}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegionSelector;
export { regions };
