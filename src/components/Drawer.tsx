import { X, Mail, Shield, FileText, LogOut, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type MenuItem = {
  icon: JSX.Element;
  label: string;
  onClick: () => void;
};

export function Drawer({ isOpen, onClose }: Props) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    onClose();
  };

  const menuItems: MenuItem[] = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: 'お問い合わせ',
      onClick: () => {
        window.location.href = 'mailto:contact@takusa.app';
        onClose();
      },
    },
    {
      icon: <Shield className="h-5 w-5" />,
      label: 'プライバシーポリシー',
      onClick: () => {
        window.location.href = '/privacy';
        onClose();
      },
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: '利用規約',
      onClick: () => {
        window.location.href = '/terms';
        onClose();
      },
    },
    {
      icon: <LogOut className="h-5 w-5" />,
      label: 'ログアウト',
      onClick: handleLogout,
    },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-72 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center float-end px-4">
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-3">
          <nav className="space-y-0.5">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="group flex w-full items-center justify-between rounded-lg px-2 py-2.5 text-gray-600 transition-all hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-gray-900"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-50 text-gray-500 transition-colors group-hover:bg-white group-hover:text-indigo-600 group-hover:shadow-sm">
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.label}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-gray-600" />
              </button>
            ))}
          </nav>
        </div>
        <div className="absolute bottom-0 w-full border-t bg-gray-50/50 p-3">
          <div className="text-center text-xs text-gray-500">
            Takusa v0.0.1
          </div>
        </div>
      </div>
    </>
  );
}
