import { BsLink } from "react-icons/bs"
import { IoEarthOutline } from "react-icons/io5"
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import CompanyContacts from '../../components/CompanyContacts'
import CompanyDescription from '../../components/CompanyDescription'
import CompanyUvps from '../../components/CompanyUvps'
import { client } from '../../lib/clients/eventsSanity'

export default async function Company({ params }: { params: { id: string } }) {

    const data = await client.fetch<any>(`
         *[ _type=='company' && _id==$id ][0] {
             _id,
            name,
            "imageUrl": logo.asset->url,
            link,
            enonicCompany->{
               _id,
               enonicId
            } 
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

    if (!data) <>Loading...</>

    return (
        <main>
            <div>
                <div className="container">
                    <Navbar />

                    <div className='mt-5 pt-5 pb-5'>
                        <div className='row'>
                            <div className="col-md-1"></div>
                            <div className="col-md-8">
                                <h3>{data.name}</h3>

                                {data.enonicCompany &&
                                    <>
                                        <div>
                                            <CompanyDescription id={data.enonicCompany.enonicId} />
                                        </div>
                                        <div className="pt-5">
                                            <h6 className="mb-3">Company value propositions</h6>
                                            <CompanyUvps id={data.enonicCompany.enonicId} />
                                        </div>
                                    </>
                                }
                            </div>
                            <div className="col-md-3 border-start">
                                <div className='mb-5'>
                                    <img src={data.imageUrl} className='img-fluid' />
                                </div>
                                <IoEarthOutline /> <a href={data.link} target="_blank">Visit website</a>
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