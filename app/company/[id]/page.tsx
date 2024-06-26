import { PortableText, PortableTextComponents } from '@portabletext/react'
import { BsLink } from "react-icons/bs"
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import CompanyContacts from '../../components/CompanyContacts'
import { client } from '../../lib/clients/eventsSanity'

export default async function Company({ params }: { params: { id: string } }) {

    const data = await client.fetch<any>(`
         *[ _type=='company' && _id==$id ][0] {
             _id,
            name,
            "imageUrl": logo.asset->url,
            link
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

                    <div className='mt-5 pt-5 pb-5'>
                        <div className='row'>
                            <div className="col-md-2"></div>
                            <div className="col-md-6">
                                <h3>{data.name}</h3>
                            </div>
                            <div className="col-md-4 border-start">
                                <div className='mb-5'>
                                    <img src={data.imageUrl} className='img-fluid' />
                                </div>
                                <BsLink /> <a href={data.link} target="_blank">Visit website</a>
                                <div>
                                    <h6 className='pt-5 pb-3'>Contacts</h6>
                                    <CompanyContacts id={params.id} />
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