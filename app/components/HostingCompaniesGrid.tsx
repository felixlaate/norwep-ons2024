'use client'

import Link from "next/link"
import { useEffect, useState } from "react"

interface HostingCompaniesGridProps {
    data: any
}

const HostingCompaniesGrid: React.FC<HostingCompaniesGridProps> = ({ data }) => {

    //const [data, setData] = useState<any>([])
    const [groupedEventCompanies, setGroupedEventCompanies] = useState<any>({
        0: [],
        1: [],
        2: [],
        3: []
    })

    useEffect(() => {
        const fetchEventCompanies = async () => {
            try {
                const results = await Promise.all(
                    data.map(async (item: any) => {
                        const response = await fetch('/api/eventCompany/' + item.id)
                        const result = await response.json()
                        //console.log('Result', result)
                        return { ...item, level: parseInt(item.level), ...result } // Merge item with fetched result
                    })
                )

                //console.log('Results', results)

                // Group the results by level
                const grouped: any = {
                    0: results.filter(item => item.level === 0),
                    1: results.filter(item => item.level === 1),
                    2: results.filter(item => item.level === 2),
                    3: results.filter(item => item.level === 3)
                }

                console.log('grouped', grouped)

                setGroupedEventCompanies(grouped)
            } catch (error) {
                console.error('Error fetching event companies:', error)
            }
        }

        if (data) {
            fetchEventCompanies()
        }
    }, [data])

    // Function to render companies by level
    const renderCompaniesByLevel = (level: any) => {
        return groupedEventCompanies[level].map((item: any, index: number) => (
            <div key={index} className="col">
                <div className="border text-center">
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '200px', margin: 'auto' }}>
                        <img src={item.imageUrl} className="img-fluid p-3" style={{ maxHeight: '200px' }} alt={item.name} />
                    </div>
                </div>
            </div>
        ))
    }

    if (!data) return <div>Loading...</div>

    return (
        <>
            <div>
                <h5 className='hosting-company-category pb-3'>Category D  ({groupedEventCompanies[3].length})</h5>
                <div className="row row-cols-2 row-cols-md-6 g-4 mb-4 align-items-center">
                    {groupedEventCompanies && groupedEventCompanies[3].map((item: any, index: number) => (
                        <div key={index} className="col">
                            <div className="border text-center" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <div className="d-flex justify-content-center align-items-center" style={{ height: '200px', margin: 'auto' }}>
                                    <Link href={'/company/' + item._id}><img src={item.imageUrl} className="img-fluid p-3" style={{ maxHeight: '200px' }} alt={item.name} /></Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <h5 className='hosting-company-category pb-3'>Category C ({groupedEventCompanies[2].length})</h5>
                <div className="row row-cols-2 row-cols-md-6 g-4 mb-4 align-items-center">
                    {groupedEventCompanies && groupedEventCompanies[2].map((item: any, index: number) => (
                        <div key={index} className="col">
                            <div className="border text-center">
                                <div className="d-flex justify-content-center align-items-center" style={{ height: '200px', margin: 'auto' }}>
                                    <Link href={'/company/' + item._id}><img src={item.imageUrl} className="img-fluid p-3" style={{ maxHeight: '200px' }} alt={item.name} /></Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <h5 className='hosting-company-category pb-3'>Category B  ({groupedEventCompanies[1].length})</h5>
                <div className="row row-cols-2 row-cols-md-6 g-4 mb-4 align-items-center">
                    {groupedEventCompanies && groupedEventCompanies[1].map((item: any, index: number) => (
                        <div key={index} className="col">
                            <div className="border text-center">
                                <div className="d-flex justify-content-center align-items-center" style={{ height: '200px', margin: 'auto' }}>
                                    <Link href={'/company/' + item._id}><img src={item.imageUrl} className="img-fluid p-3" style={{ maxHeight: '200px' }} alt={item.name} /></Link>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <h5 className='hosting-company-category pb-3'>Category A ({groupedEventCompanies[0].length})</h5>
                <div className="row row-cols-2 row-cols-md-6 g-4 mb-4 align-items-center">
                    {groupedEventCompanies && groupedEventCompanies[0].map((item: any, index: number) => (
                        <div key={index} className="col">
                            <div className="border text-center">
                                <div className="d-flex justify-content-center align-items-center" style={{ height: '200px', margin: 'auto' }}>
                                    <Link href={'/company/' + item._id}><img src={item.imageUrl} className="img-fluid p-3" style={{ maxHeight: '200px' }} alt={item.name} /></Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default HostingCompaniesGrid