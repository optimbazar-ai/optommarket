import { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Listen for beforeinstallprompt event
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Show prompt after 5 seconds
      setTimeout(() => {
        const dismissed = localStorage.getItem('pwa-install-dismissed');
        if (!dismissed) {
          setShowInstallPrompt(true);
        }
      }, 5000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if app was installed
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user's response
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show if already installed or no install prompt available
  if (isInstalled || !showInstallPrompt) {
    return null;
  }

  return (
    <>
      {/* Desktop/Mobile Banner */}
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-slide-up">
        <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl shadow-2xl p-4 text-white">
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-14 h-14 bg-white rounded-xl flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-primary-600" />
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">
                OptoMarket App'ni O'rnating
              </h3>
              <p className="text-sm text-blue-100 mb-3">
                Tezroq kirish va offline ishlash uchun ilovani telefon/kompyuteringizga o'rnating
              </p>

              <div className="flex gap-2">
                <button
                  onClick={handleInstallClick}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-primary-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm"
                >
                  <Download className="w-4 h-4" />
                  O'rnatish
                </button>
                <button
                  onClick={handleDismiss}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors text-sm"
                >
                  Keyinroq
                </button>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="font-semibold">⚡ Tez</div>
              <div className="text-blue-100">Instant yuklash</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">📴 Offline</div>
              <div className="text-blue-100">Internet yo'q</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">🔔 Push</div>
              <div className="text-blue-100">Notifications</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstallPWA;
