'use client'

import { useEffect, useState } from "react"
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { format } from 'date-fns'
import { BsClock, BsPinMap } from "react-icons/bs"

export default function DelegationsGrid() {

    const [data, setData] = useState<any>([])

    useEffect(() => {
        getData('/api/program').then((result) => {
            console.log('ProgramGrid', result)
            setData(result)
        })
    }, [])

    async function getData(url: string) {
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
        return res.json()
    }

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

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId)
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' })
        }
    }

    if (!data) return <div>Loading...</div>

    return (
        <>
            <div className="row">
                <div className="col-md-3 border-end">

                    {/*<ul className="nav flex-column sticky-top">
                        {data && data.map((item: { _id: string, name: string }, index: number) => (
                            <li key={index} className="nav-item pb-3">
                                <a className="nav-link underline-animation" onClick={() => scrollToSection(item._id)} href="#">{item.name}</a>
                            </li>
                        ))}
                    </ul>*/}
                    <div className="sticky-top">
                        <ul>
                            <div className="pt-3 mb-2 border-bottom"><strong>Select date</strong></div>
                            {data && data.map((item: { _id: string, name: string }, index: number) => (
                                <li key={index} style={{ listStyle: 'none' }} className="pb-3">
                                    <a className="" onClick={() => scrollToSection(item._id)} href="#">{item.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-md-8">
                    <h3 className="ms-2 pt-3">Program</h3>
                    {data && data.map((item: any, index: number) => (
                        <div id={item._id} key={index} className="row">
                            <div className="col ms-2 mb-3 mt-3">
                                <h4 className="border-bottom ">{item.name}</h4>
                                {item.happenings && item.happenings.map((item: any, index: number) => (
                                    item.name !== null &&
                                    item.startTime.utc &&
                                    <div key={index} className="pb-3 mt-3 mb-3">
                                        <h6 className="pt-2 pb-2">{item.name}</h6>
                                        <div>
                                            <BsClock className="mb-1 me-3" />
                                            {format(new Date(item.startTime.local), "HH:mm") + ' - ' + format(new Date(item.endTime.local), "HH:mm")}</div>
                                        <div>
                                            <BsPinMap className="mb-1 me-3" />
                                            {item.meetingPoint}
                                        </div>
                                        <div className="pt-3">
                                            <PortableText
                                                value={item.description}
                                                components={portableTextComponents}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}