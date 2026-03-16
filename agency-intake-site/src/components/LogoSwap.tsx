'use client'

import Image from 'next/image'

const LogoSwap = () => {
  return (
    <span className="logo-content" style={{ display: 'block', width: '100%', height: '100%' }}>
      <Image
        className="logo-img state-normal"
        src="/favicon.png"
        alt="Bite Sites logo"
        fill
        sizes="46px"
        priority
      />
      <Image
        className="logo-img state-hover"
        src="/favicon.png"
        alt=""
        fill
        sizes="46px"
        priority
        aria-hidden="true"
      />
    </span>
  )
}

export default LogoSwap


