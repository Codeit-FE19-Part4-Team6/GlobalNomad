interface SpinnerProps {
  size?: number; // px 단위
  className?: string;
}

export const Spinner = ({ size = 40, className = '' }: SpinnerProps) => {
  return (
    <div
      className={`border-t-primary-500 animate-spin rounded-full border-4 border-gray-200 ${className}`}
      style={{ width: size, height: size }}
      role='status'
      aria-label='로딩 중'
    />
  );
};
