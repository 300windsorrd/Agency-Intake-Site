"use client";

import Image from "next/image";

const LogoSwap = () => {
  return (
    <span className="logo-content" aria-hidden="true">
      <Image
        className="logo-img logo-img-primary"
        src="/mainlogo.png"
        alt="Bite Sites logo"
        fill
        sizes="(max-width: 768px) 156px, 180px"
        priority
      />
      <Image
        className="logo-img logo-img-secondary"
        src="/mainlogo2.png"
        alt=""
        fill
        sizes="(max-width: 768px) 156px, 180px"
        priority
        aria-hidden="true"
      />
    </span>
  );
};

export default LogoSwap;
