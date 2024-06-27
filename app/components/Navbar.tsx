'use client'

import { useEffect, useState } from "react"
import { usePathname } from 'next/navigation'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'

const Navbar: React.FC = () => {

  const pathname = usePathname()
  const [data, setData] = useState<any>([])

  useEffect(() => {
    getData('/api/pages').then((result) => {
      //console.log('Navbar', result)
      setData(result.pages)
    })
  }, [])

  async function getData(url: string) {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  //if (!data) return <div>Loading...</div>

  return (
    <nav className="navbar navbar-norwep navbar-expand-lg bg-body-tertiary pt-5">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          {/*<div className="lead pb-2 text-medium" style={{ fontSize: '14px' }}>International Markets is presented by:</div>*/}

          <img src="/img/01-Hovedlogo-SVART.svg" width="183" height="40" className="d-none d-md-inline-block align-top pe-3" alt="NORWEP" />
          <img src="/img/06-Symbol-RGB.svg" width="60" height="60" className="d-none d-sm-inline-block d-md-none align-top pe-2" alt="NORWEP" />

          <img src="/img/ons-logo.png" width="112" height="36" className="d-inline-block align-top mt-2" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link underline-animation" onClick={() => scrollToSection('delegations')} href="/#delegations">Delegations</a>
            </li>
            <li className="nav-item">
              <a className="nav-link underline-animation" onClick={() => scrollToSection('hostingCompanies')} href="/#hostingCompanies">Hosting companies</a>
            </li>
            <li className="nav-item">
              <a className="nav-link underline-animation" href="/program">Program</a>
            </li>

            {data?.map((item: any) => (
              <li key={item._id} className="nav-item">
                <a className="nav-link underline-animation" href={'/page/' + item._id}>{item?.title}</a>
              </li>
            ))}

            <li className="nav-item">
              <a className="nav-link underline-animation" onClick={() => scrollToSection('contact')} href="/#contact">Contact</a>
            </li>

          </ul>
        </div>
      </div>
    </nav >
  )
}

export default Navbar