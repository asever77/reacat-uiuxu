import React, { useState } from 'react';
import * as Icons from '../components/icons';
import './IconShowcase.css';

interface IconShowcaseProps {
  size?: number;
  showColorVariants?: boolean;
}

type IconComponent = React.FC<{
  className?: string;
  size?: number;
}>;

export const IconShowcase: React.FC<IconShowcaseProps> = ({ 
  size = 24, 
  showColorVariants = false 
}) => {
  const [copiedIcon, setCopiedIcon] = useState<string>('');

  // 아이콘 목록 가져오기
  const iconEntries = Object.entries(Icons);
  
  // 색상 변형 목록
  const colorVariants = [
    { name: 'Default', className: '' },
    { name: 'Primary', className: 'text-blue-600' },
    { name: 'Success', className: 'text-green-600' },
    { name: 'Warning', className: 'text-yellow-600' },
    { name: 'Danger', className: 'text-red-600' },
    { name: 'Muted', className: 'text-gray-400' },
  ];

  const copyToClipboard = async (iconName: string) => {
    const importText = `import { ${iconName} } from '@/components/icons';`;
    try {
      await navigator.clipboard.writeText(importText);
      setCopiedIcon(iconName);
      setTimeout(() => setCopiedIcon(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const renderIcon = (IconComponent: IconComponent, iconName: string, className = '') => (
    <div
      key={`${iconName}-${className}`}
      className="icon-card"
      onClick={() => copyToClipboard(iconName)}
      title={`Click to copy import statement for ${iconName}`}
    >
      <div className="icon-container">
        <IconComponent size={size} className={className} />
      </div>
      <div className="icon-info">
        <span className="icon-name">{iconName}</span>
        {className && <span className="icon-variant">{className}</span>}
        {copiedIcon === iconName && <span className="copied-indicator">Copied!</span>}
      </div>
    </div>
  );

  return (
    <div className="icon-showcase">
      <div className="showcase-header">
        <h2>Icon Library</h2>
        <p>Click on any icon to copy its import statement</p>
        <div className="icon-stats">
          <span>Total Icons: {iconEntries.length}</span>
          <span>Size: {size}px</span>
        </div>
      </div>

      {showColorVariants ? (
        // 색상 변형 보기
        <div className="color-variants-showcase">
          {colorVariants.map((variant) => (
            <div key={variant.name} className="color-section">
              <h3 className="color-title">{variant.name}</h3>
              <div className="icons-grid">
                {iconEntries.map(([iconName, IconComponent]) => 
                  renderIcon(IconComponent, iconName, variant.className)
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // 기본 아이콘 그리드
        <div className="icons-grid">
          {iconEntries.map(([iconName, IconComponent]) => 
            renderIcon(IconComponent, iconName)
          )}
        </div>
      )}

      <div className="usage-guide">
        <h3>Usage</h3>
        <pre className="code-example">
{`import { BackArrow, HomeIcon } from '@/components/icons';

// Basic usage
<BackArrow size={24} />

// With custom styling
<HomeIcon size={20} className="text-blue-500" />`}
        </pre>
      </div>
    </div>
  );
};