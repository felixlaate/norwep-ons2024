'use client'

import { useEffect } from "react"

interface ImageProps {
    imageUrl: string
}

const Image: React.FC<ImageProps> = ({ imageUrl }) => {

    useEffect(() => {
        //console.log('imageUrl', imageUrl)
    }, [])

    if (!imageUrl) return <>Loading...</>

    return (
        <>
            <div className='pt-5 d-none d-md-block' style={{ position: 'relative', display: 'inline-block' }}>
                <img src={imageUrl} style={{ height: '500px', width: '100%', borderRadius: '0px 50px 50px 0px', objectFit: 'cover' }} />
            </div>
            <div className="pt-3 d-block d-md-none">
            </div>
        </>
    )
}

export default Image