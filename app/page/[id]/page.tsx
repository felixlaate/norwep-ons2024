import { PortableText, PortableTextComponents } from '@portabletext/react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import Image from '../../components/Image'
import { client } from '../../lib/clients/sanity'

export default async function Page({ params }: { params: { id: string } }) {

    const data = await client.fetch<any>(`
        *[_type=="page" && _id == $id ][0] {
            _id,
            title,
            description,
            "imageUrl": image.asset->url,
            "videoUrl": video.asset->url
        }
        `,
        {
            id: params.id
        },
        {
            next: {
                revalidate: 0 // look for updates to revalidate cache every xx
            }
        }
    )

    const portableTextComponents: PortableTextComponents = {
        types: {
            image: ({ value }) => <img src={value.imageUrl} />,
            callToAction: ({ value, isInline }) =>
                isInline ? (
                    <a href={value.url}>{value.text}</a>
                ) : (
                    <div className="callToAction">{value.text}</div>
                ),
        },
        marks: {
            link: ({ children, value }) => {
                const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
                return (
                    <a href={value.href} rel={rel}>
                        {children}
                    </a>
                )
            },
        },
    }

    if (!data) <>Loading...</>

    return (
        <main>
            <div>
                <div className="container">
                    <Navbar />
                    <div className=''>
                        <Image imageUrl={data.imageUrl} />
                    </div>
                    <div className='pt-5 pb-5'>
                        <div className='row'>
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                <h3>{data.title}</h3>
                                <div className="pt-3">
                                    <PortableText
                                        value={data.description}
                                        components={portableTextComponents}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="contact" className='pb-5'>
                    <Footer />
                </div>

            </div>



        </main>

    )
}