'use client'

import { useEffect, useState } from "react"

export default function DelegationsGrid() {

    const [data, setData] = useState<any>([])

    useEffect(() => {
        getData('/api/participants').then((result) => {
            // Extract companies from the data
            const companies = result
                .map((item: any) => item.participant.company)
                .filter((company: any) => company !== null)// Filter out null companies

            // Filter unique companies by _id
            const uniqueCompanies = companies.filter((company: any, index: number, self: any) =>
                index === self.findIndex((c: any) => c._id === company._id)
            )

            // Format the companies as required
            const formattedCompanies = uniqueCompanies.map((company: any) => ({
                _id: company._id,
                name: company.name,
                imageUrl: company.imageUrl
            }))
            console.log('HostingCompaniesGrid', formattedCompanies)
            setData(formattedCompanies)
        })
    }, [])

    async function getData(url: string) {
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
        return res.json()
    }

    if (!data) return <div>Loading...</div>

    return (
        <div className="row row-cols-md-4 g-4 mb-4 align-items-center">
            {data && data.map((item: any, index: number) => (
                <div key={index} className="col">
                    <div className="border text-center">
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '300px', margin: 'auto' }}>
                            <img src={item.imageUrl} className="img-fluid p-5" style={{ maxHeight: '300px' }} alt={item.name} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}