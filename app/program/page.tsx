import Image from '../components/Image'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ProgramGrid from '../components/ProgramGrid'

export default async function Home() {


    //if (site) dispatch({ type: "setSite", site: site })

    return (
        <main>
            <div>
                <div className="container">
                    <Navbar />
                    <div className=''>
                        <Image imageUrl='/img/ons-venue.jpg' />
                    </div>
                    <div className='pt-5 pb-5'>
                        <ProgramGrid />
                    </div>
                </div>
                <Footer />
            </div>
        </main>
    )
}