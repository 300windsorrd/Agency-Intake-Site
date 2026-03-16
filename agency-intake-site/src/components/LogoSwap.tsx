'use client'

import Image from 'next/image'
import lightNormal from '../../images/bg-removed/7.png'
import lightHover from '../../images/bg-removed/8.png'

const LogoSwap = () => {
  return (
    <span className="logo-content" style={{ display: 'block', width: '100%', height: '100%' }}>
      <Image className="logo-img state-normal" src={lightNormal} alt="logo" fill sizes="120px" priority />
      <Image className="logo-img state-hover" src={lightHover} alt="logo hover" fill sizes="120px" priority />
    </span>
  )
}

export default LogoSwap


