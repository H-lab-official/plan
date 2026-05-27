interface ToastProps {
  message: string;
  visible: boolean;
  isError?: boolean;
}

export function Toast({ message, visible, isError = false }: ToastProps) {
  return (
    <div
      className={`fixed top-5 right-5 ${isError ? 'bg-red-500' : 'bg-green-500'} text-white px-6 py-3 rounded-lg shadow-xl transform transition-all duration-300 z-50 flex items-center gap-2 ${
        visible ? 'toast-enter' : 'toast-exit -translate-y-20 opacity-0'
      }`}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <span>{message}</span>
    </div>
  );
}
