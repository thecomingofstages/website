'use client'
import React from 'react'
import { Section } from '../base';
import background from './background.png';
import Text from './text.png';
import Gim from './Gim.png';
import Image from 'next/image';
const Conceptofourplay = () => {
    return (
        <>
            <div id="Concepofourplay">
                <Section className={{ wrapper: "relative", content: "px-0" }}>
                    <div className="absolute w-full h-screen top-0 left-0 bg-red-50">
                        <div id="background" className='w-full h-full object-contain'>
                            <Image alt="background" src={background} width={0} height={0} className='object-cover min-h-full' />
                        </div>
                        <div id="Details" className='absolute top-0 h-full'>
                            <Image alt="Details" src={Text} width={0} height={0} className='object-cover min-h-[80%]' />
                        </div>
                        <div id="gimmig" className='absolute min-h-full h-full top-0'>
                            <Image alt="gimmig" src={Gim} width={0} height={0} className='object-cover min-h-full' />
                        </div>
                    </div>
                </Section>
            </div>
        </>
    )
}

export default Conceptofourplay;