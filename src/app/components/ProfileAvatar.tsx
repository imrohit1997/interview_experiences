"use client";

import { useEffect, useState } from "react";

const PHOTO_EXTENSIONS = ["jpg", "png", "webp"];

interface ProfileAvatarProps {
  size?: number;
  className?: string;
}

export default function ProfileAvatar({ size = 160, className = "" }: ProfileAvatarProps) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    // Try each extension to see if a profile photo exists
    let cancelled = false;

    async function probe() {
      for (const ext of PHOTO_EXTENSIONS) {
        const url = `/profile/photo.${ext}`;
        try {
          const res = await fetch(url, { method: "HEAD" });
          if (res.ok && !cancelled) {
            setPhotoUrl(url);
            return;
          }
        } catch {
          // Not found, try next
        }
      }
    }

    probe();
    return () => { cancelled = true; };
  }, []);

  const px = `${size}px`;

  if (photoUrl) {
    return (
      <div
        className={`profile-avatar-ring ${className}`}
        style={{ width: px, height: px }}
      >
        <img
          src={photoUrl}
          alt="Rohit Rambansh Yadav"
          className="profile-avatar-img"
          style={{ width: px, height: px }}
        />
      </div>
    );
  }

  // Initials fallback
  return (
    <div
      className={`profile-avatar-initials ${className}`}
      style={{ width: px, height: px, fontSize: `${size * 0.38}px` }}
    >
      <span>RY</span>
    </div>
  );
}
