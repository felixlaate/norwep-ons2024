import About from './components/About'
import Delegations from './components/Delegations'
import Footer from './components/Footer'
import HostingCompanies from './components/HostingCompanies'
import Navbar from './components/Navbar'
import Poster from './components/Poster'
import { client } from './lib/clients/sanity'

export default async function Home() {

  const site = await client.fetch<any[]>(`
    *[_type=="site" && _id == 'd6ced41a-c310-414f-b878-c25b01ad4f4a' ] {
      _id,
      _updatedAt,
      title,
      slogan,
      description,
      contacts[]->{
        _id,
        firstName,
        lastName,
        position,
        company,
        code,
        phone,
        email,
        "imageUrl": image.asset->url
      },
      "imageUrl": image.asset->url,
      "videoUrl": video.asset->url,
      pages[]->{
        _id,
        title,
        description,
        image,      
        slug
      },  
      promos[]->{
        _id,
        title,
        description,
        image,
        video,
        page->{
          _id,
          title,
          description,
          image,
          slug
        }
      }, 
      sponsors[]->{
        _id,
        title,
        company->{
          _id,
          name,
          "imageUrl": logo.asset->url,
          url
        },
        level,
        slug
      },
      links[]->{
        _id,
        name,
        url,
      },      
    }
    `,
    {},
    {
      next: {
        revalidate: 0 // look for updates to revalidate cache every xx
      }
    }
  )

  //if (site) dispatch({ type: "setSite", site: site })

  return (
    <main>
      <div>
        <div className="container">
          <Navbar />
          <div className='pb-5'>
            <Poster imageUrl={site[0].imageUrl} videoUrl={site[0].videoUrl} />
          </div>
          <div id="delegations" className='pb-5'>
            <Delegations />
          </div>
          <div id="hostingCompanies" className='pb-5'>
            <HostingCompanies />
          </div>
          <div id="about" className='pb-5'>
            <About description={site[0].description} />
          </div>
        </div>
        <div id="contact" className='pb-5'>
          <Footer />
        </div>

      </div>



    </main>

  )
}