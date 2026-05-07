import React,{memo, useMemo} from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import animation from '../../../assets/animation.lottie';

const Aianimation =memo( () => {
    const src = useMemo(()=>animation,[])
  return (
    <div>
    <DotLottieReact
      src={src}
      loop
      autoplay
     style={{ width: '400px', height: '400px' }}
    />
    </div>
  )
})

export default Aianimation
