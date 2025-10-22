import { useState } from 'react'
import { Save, Store, Truck, DollarSign, Mail, Lock } from 'lucide-react'

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('store')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const [storeSettings, setStoreSettings] = useState({
    storeName: 'OptoMarket.uz',
    storeEmail: 'info@optommarket.uz',
    storePhone: '+998901234567',
    storeAddress: 'Toshkent, O\'zbekiston',
    currency: 'UZS'
  })

  const [shippingSettings, setShippingSettings] = useState({
    defaultShippingCost: 0,
    freeShippingThreshold: 100000,
    shippingNote: 'Yetkazib berish bepul'
  })

  const [taxSettings, setTaxSettings] = useState({
    taxRate: 0,
    taxEnabled: false
  })

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setMessage('Sozlamalar saqlandi!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage('Xatolik yuz berdi')
    } finally {
      setSaving(false)
    }
  }

  const tabs = [
    { id: 'store', label: 'Do\'kon', icon: Store },
    { id: 'shipping', label: 'Yetkazib berish', icon: Truck },
    { id: 'tax', label: 'Soliq', icon: DollarSign },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'security', label: 'Xavfsizlik', icon: Lock }
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Sozlamalar</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {message && (
              <div className={`mb-4 px-4 py-3 rounded ${
                message.includes('Xatolik')
                  ? 'bg-red-50 text-red-700'
                  : 'bg-green-50 text-green-700'
              }`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-6">
              {/* Store Settings */}
              {activeTab === 'store' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Do'kon Sozlamalari</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Do'kon nomi
                    </label>
                    <input
                      type="text"
                      value={storeSettings.storeName}
                      onChange={(e) => setStoreSettings({...storeSettings, storeName: e.target.value})}
                      className="input"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={storeSettings.storeEmail}
                        onChange={(e) => setStoreSettings({...storeSettings, storeEmail: e.target.value})}
                        className="input"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        value={storeSettings.storePhone}
                        onChange={(e) => setStoreSettings({...storeSettings, storePhone: e.target.value})}
                        className="input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Manzil
                    </label>
                    <textarea
                      value={storeSettings.storeAddress}
                      onChange={(e) => setStoreSettings({...storeSettings, storeAddress: e.target.value})}
                      className="input"
                      rows="3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valyuta
                    </label>
                    <select
                      value={storeSettings.currency}
                      onChange={(e) => setStoreSettings({...storeSettings, currency: e.target.value})}
                      className="input"
                    >
                      <option value="UZS">UZS - O'zbek so'mi</option>
                      <option value="USD">USD - Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Shipping Settings */}
              {activeTab === 'shipping' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Yetkazib Berish Sozlamalari</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Standart yetkazib berish narxi (so'm)
                    </label>
                    <input
                      type="number"
                      value={shippingSettings.defaultShippingCost}
                      onChange={(e) => setShippingSettings({...shippingSettings, defaultShippingCost: Number(e.target.value)})}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bepul yetkazish chegarasi (so'm)
                    </label>
                    <input
                      type="number"
                      value={shippingSettings.freeShippingThreshold}
                      onChange={(e) => setShippingSettings({...shippingSettings, freeShippingThreshold: Number(e.target.value)})}
                      className="input"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Ushbu summadan yuqori buyurtmalar uchun yetkazish bepul
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Yetkazish haqida eslatma
                    </label>
                    <textarea
                      value={shippingSettings.shippingNote}
                      onChange={(e) => setShippingSettings({...shippingSettings, shippingNote: e.target.value})}
                      className="input"
                      rows="3"
                    />
                  </div>
                </div>
              )}

              {/* Tax Settings */}
              {activeTab === 'tax' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Soliq Sozlamalari</h2>
                  
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="taxEnabled"
                      checked={taxSettings.taxEnabled}
                      onChange={(e) => setTaxSettings({...taxSettings, taxEnabled: e.target.checked})}
                      className="w-4 h-4"
                    />
                    <label htmlFor="taxEnabled" className="text-sm font-medium text-gray-700">
                      Soliqni yoqish
                    </label>
                  </div>

                  {taxSettings.taxEnabled && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Soliq stavkasi (%)
                      </label>
                      <input
                        type="number"
                        value={taxSettings.taxRate}
                        onChange={(e) => setTaxSettings({...taxSettings, taxRate: Number(e.target.value)})}
                        className="input"
                        min="0"
                        max="100"
                        step="0.1"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Email Settings */}
              {activeTab === 'email' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Email Sozlamalari</h2>
                  <p className="text-gray-600">
                    Email xabarnomalar sozlamalari. (Keyinroq implement qilinadi)
                  </p>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Xavfsizlik Sozlamalari</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Yangi parol
                    </label>
                    <input
                      type="password"
                      className="input"
                      placeholder="Yangi parol kiriting"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parolni tasdiqlash
                    </label>
                    <input
                      type="password"
                      className="input"
                      placeholder="Parolni qayta kiriting"
                    />
                  </div>
                </div>
              )}

              <div className="pt-4 border-t">
                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {saving ? 'Saqlanmoqda...' : 'Saqlash'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSettings
