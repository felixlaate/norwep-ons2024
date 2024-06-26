'use client'

import { useEffect, useState } from "react"

interface CompanyContactsProps {
    id: string
}

const CompanyContacts: React.FC<CompanyContactsProps> = ({ id }) => {

    const [data, setData] = useState<any>([])

    useEffect(() => {
        getData('/api/eventCompanyContacts/' + id).then((result) => {
            console.log('CompanyContacts', result)
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

    if (!data) return <div>Loading...</div>

    return (
        <>
            {data && data.map((item: any, index: number) => (
                <div key={index} className="row">
                    <div className="col">
                        <div className="pt-3 pb-3">
                            <div className="">{item.firstName} {item.lastName}</div>
                            <div className="">{item.position}</div>
                            <div className="">+{item.phoneNumber.countryCallingCode} {item.phoneNumber.phoneNumber}</div>
                            <div className="">{item.email}</div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default CompanyContacts