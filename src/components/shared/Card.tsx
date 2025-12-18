import React, { type HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  noPadding?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  hover = false,
  noPadding = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'bg-white rounded-lg shadow-sm border border-gray-200';
  const hoverClasses = hover ? 'hover:shadow-md transition-shadow duration-200 cursor-pointer' : '';
  const paddingClasses = noPadding ? '' : 'p-6';

  return (
    <div className={`${baseClasses} ${hoverClasses} ${paddingClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
