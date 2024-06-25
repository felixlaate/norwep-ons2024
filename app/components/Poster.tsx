'use client'

import { useEffect } from "react"

interface PosterProps {
    videoUrl: string,
    imageUrl: string
}

const Poster: React.FC<PosterProps> = ({ imageUrl, videoUrl }) => {

    useEffect(() => {
        //console.log('imageUrl', imageUrl)
        //console.log('videoUrl', videoUrl)
    }, [])

    if (!imageUrl) return <>Loading...</>

    return (
        <>

            {/*<Promo videoURL={site[0].videoUrl} sponsors={site[0].sponsors} />*/}
            <div className='pt-5 d-none d-md-block' style={{ position: 'relative', display: 'inline-block' }}>
                <img src={imageUrl} style={{ height: '500px', width: '100%', borderRadius: '0px 50px 50px 0px', objectFit: 'cover' }} />
                <div className="poster-overlay">
                    <span style={{ fontSize: '1.5rem', lineHeight: '30px' }}>How to succeed in international markets? Meet key people from the operators, project developers and industry seniors, introducing you to business opportunities and challenges in each market. In cooperation with ONS.</span>
                </div>
            </div>
            <div className="pt-3 d-block d-md-none">
                <div className="poster-wrapper-small">
                </div>
            </div>

            {/*<div style={{ height: '500px', width: '100%', borderRadius: '0px 50px 50px 0px' }}>
                <video playsInline autoPlay muted loop poster={imageUrl} style={{ height: '500px', width: '100%', borderRadius: '0px 50px 50px 0px' }}>
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>*/}

        </>
    )
}

export default Poster