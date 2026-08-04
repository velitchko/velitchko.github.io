'use client';

import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';

interface ProfilePictureProps {
  className?: string;
}

export default function ProfilePicture({ className = 'object-cover w-full h-full' }: ProfilePictureProps) {
  const { theme } = useTheme();

  return (
    <Image
      src={theme === 'professional' ? '/nerd-professional.jpg' : '/nerd.jpg'}
      alt="Velitchko Filipov Profile"
      width={500}
      height={667}
      className={className}
      priority
    />
  );
}
