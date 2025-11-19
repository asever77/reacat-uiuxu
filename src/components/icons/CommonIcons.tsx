import React from "react";

interface IconProps {
  className?: string;
  size?: number; // rem 단위 (1rem = 10px 기준)
}

// BackArrow 아이콘
export const BackArrow: React.FC<IconProps> = ({
  className = "",
  size = 2.4, // 2.4rem = 24px
}) => {
  return (
    <svg
      width={`${size}rem`}
      height={`${size}rem`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M19 12H5M5 12L12 19M5 12L12 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// ForwardArrow 아이콘
export const ForwardArrow: React.FC<IconProps> = ({
  className = "",
  size = 2.4, // 2.4rem = 24px
}) => {
  return (
    <svg
      width={`${size}rem`}
      height={`${size}rem`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5 12H19M19 12L12 5M19 12L12 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// UpArrow 아이콘
export const UpArrow: React.FC<IconProps> = ({
  className = "",
  size = 2.4,
}) => {
  return (
    <svg
      width={`${size}rem`}
      height={`${size}rem`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 19V5M12 5L5 12M12 5L19 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// DownArrow 아이콘
export const DownArrow: React.FC<IconProps> = ({
  className = "",
  size = 2.4, // 2.4rem = 24px
}) => {
  return (
    <svg
      width={`${size}rem`}
      height={`${size}rem`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 5V19M12 19L19 12M12 19L5 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// 공통 아이콘들
export const HomeIcon: React.FC<IconProps> = ({
  className = "",
  size = 2.4, // 2.4rem = 24px
}) => (
  <svg
    width={`${size}rem`}
    height={`${size}rem`}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M3 12L5 10M5 10L12 3L19 10M5 10V20A1 1 0 0 0 6 21H9M19 10L21 12M19 10V20A1 1 0 0 1 18 21H15M9 21V16A1 1 0 0 1 10 15H14A1 1 0 0 1 15 16V21M9 21H15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const UserIcon: React.FC<IconProps> = ({
  className = "",
  size = 2.4, // 2.4rem = 24px
}) => (
  <svg
    width={`${size}rem`}
    height={`${size}rem`}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M20 21V19A4 4 0 0 0 16 15H8A4 4 0 0 0 4 19V21M16 7A4 4 0 1 1 8 7A4 4 0 0 1 16 7Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({
  className = "",
  size = 2.4, // 2.4rem = 24px
}) => (
  <svg
    width={`${size}rem`}
    height={`${size}rem`}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    <path
      d="M19.4 15A1.65 1.65 0 0 0 18.7 13.8L19.4 15ZM20.6 9A1.65 1.65 0 0 0 19.9 10.2L20.6 9ZM17.6 6.9A1.65 1.65 0 0 0 16.4 6.1L17.6 6.9ZM6.4 17.1A1.65 1.65 0 0 0 7.6 17.9L6.4 17.1ZM3.4 9A1.65 1.65 0 0 0 4.1 10.2L3.4 9ZM4.6 15A1.65 1.65 0 0 0 5.3 13.8L4.6 15Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({
  className = "",
  size = 2.4, // 2.4rem = 24px
}) => (
  <svg
    width={`${size}rem`}
    height={`${size}rem`}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
    <path
      d="M21 21L16.65 16.65"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({
  className = "",
  size = 2.4, // 2.4rem = 24px
}) => (
  <svg
    width={`${size}rem`}
    height={`${size}rem`}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
