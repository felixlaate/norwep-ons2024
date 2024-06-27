'use client'

import { useEffect, useState } from "react"

interface CompanyContactsProps {
    id: string
}

const CompanyDescription: React.FC<CompanyContactsProps> = ({ id }) => {

    const [data, setData] = useState<any>([])

    useEffect(() => {
        getData('/api/enonicCompany/' + id).then((result) => {
            //console.log('CompanyDescription', result)
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
        <div dangerouslySetInnerHTML={{ __html: data?.dataAsJson?.company_description }}></div>
    )
}

export default CompanyDescription


