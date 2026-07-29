import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui';
import { Eye, EyeOff, XCircle, Key, WifiOff } from 'lucide-react';
import { useEffect, useState } from 'react';

type AuthStep = 'login' | 'failed' | 'reset';

export function LoginFlow() {
  const { login } = useAuth();
  const [step, setStep] = useState<AuthStep>('login');
  const [username, setUsername] = useState(() => localStorage.getItem('sh_saved_user') || '');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(!!localStorage.getItem('sh_saved_user'));
  const [lastUsername, setLastUsername] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || ''}/api/health`)
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(() => setBackendOnline(true))
      .catch(() => setBackendOnline(false));
  }, [step]);

  async function submit() {
    if (!username.trim() || !password) {
      setErrorMsg('Vui lòng nhập tài khoản và mật khẩu.');
      return;
    }
    setErrorMsg('');
    setSubmitting(true);
    setLastUsername(username.trim());
    try {
      if (remember) localStorage.setItem('sh_saved_user', username.trim());
      else localStorage.removeItem('sh_saved_user');
      await login(username.trim(), password);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Đăng nhập thất bại');
      setStep('failed');
    } finally {
      setSubmitting(false);
    }
  }

  if (step === 'failed') {
    const isNetwork = errorMsg.includes('Không kết nối') || errorMsg.includes('Failed to fetch');
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 flex items-center justify-center p-4 font-[Inter,sans-serif]">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {isNetwork ? <WifiOff size={36} className="text-red-600" /> : <XCircle size={36} className="text-red-600" />}
          </div>
          <h2 className="text-xl font-bold text-red-700 mb-2">
            {isNetwork ? 'Không Kết Nối Backend' : 'Đăng Nhập Thất Bại'}
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            {isNetwork ? (
              <>Backend chưa chạy hoặc frontend không gọi được API.<br />Terminal 1: <code className="text-xs bg-gray-100 px-1">cd backend &amp;&amp; npm start</code><br />Terminal 2: <code className="text-xs bg-gray-100 px-1">npm run dev</code></>
            ) : (
              <>Tài khoản <strong>&quot;{lastUsername}&quot;</strong> hoặc mật khẩu không đúng.<br />Local: <strong>admin / admin123</strong> · Production: mật khẩu Cognito</>
            )}
          </p>
          {errorMsg && !isNetwork && <p className="text-xs text-red-500 mb-4">{errorMsg}</p>}
          <button type="button" onClick={() => { setStep('login'); setErrorMsg(''); }} className="w-full bg-blue-600 text-white py-2.5 rounded font-semibold hover:bg-blue-700 transition-colors cursor-pointer">
            Thử Lại
          </button>
        </div>
      </div>
    );
  }

  if (step === 'reset') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 flex items-center justify-center p-4 font-[Inter,sans-serif]">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Key size={32} className="text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Đặt Lại Mật Khẩu</h2>
          <p className="text-gray-500 text-sm mb-5">Liên hệ admin để reset mật khẩu.</p>
          <button type="button" onClick={() => setStep('login')} className="w-full bg-blue-600 text-white py-2.5 rounded font-semibold hover:bg-blue-700 transition-colors cursor-pointer">
            Quay Lại Đăng Nhập
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 flex items-center justify-center p-4 font-[Inter,sans-serif]">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-7">
          <div className="text-5xl mb-3">🏠</div>
          <h1 className="text-2xl font-bold text-gray-900">SmartHome</h1>
          <p className="text-gray-500 text-sm mt-1">Hệ thống quản lý nhà thông minh · AWS IoT</p>
        </div>
        <div className="space-y-4">
          {backendOnline === false && (
            <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded text-amber-800 text-xs">
              <WifiOff size={16} className="shrink-0 mt-0.5" />
              <span>Backend chưa chạy. Mở terminal: <code>cd backend</code> → <code>npm start</code>, rồi <code>npm run dev</code> ở thư mục gốc.</span>
            </div>
          )}
          {errorMsg && step === 'login' && (
            <p className="text-xs text-red-600">{errorMsg}</p>
          )}
          <Input label="Tên đăng nhập" value={username} onChange={setUsername} placeholder="admin" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                onKeyDown={(e) => e.key === 'Enter' && submit()}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10 bg-white"
              />
              <button type="button" onClick={() => setShowPass((s) => !s)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="rounded" />
              Nhớ tên đăng nhập
            </label>
            <button type="button" onClick={() => setStep('reset')} className="text-sm text-blue-600 hover:underline font-medium cursor-pointer">
              Quên mật khẩu?
            </button>
          </div>
          <button type="button" onClick={submit} disabled={submitting} className="w-full bg-blue-600 text-white py-2.5 rounded font-semibold hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-60">
            {submitting ? 'Đang đăng nhập...' : 'Đăng Nhập'}
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">Local dev: admin / admin123 · Production: Cognito</p>
      </div>
    </div>
  );
}
