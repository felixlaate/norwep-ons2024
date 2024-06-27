'use client'

import { useEffect, useState } from "react"

interface CompanyContactsProps {
    id: string
}

const CompanyDescription: React.FC<CompanyContactsProps> = ({ id }) => {

    const [featured, setFeatured] = useState<any>([])
    const [data, setData] = useState<any>([])

    useEffect(() => {
        /*
        getData('/api/enonicCompanyUvps/' + id).then((result) => {
            console.log('CompanyDescription', result)
            setFeatured(result)
        })
            */
        getData('/api/enonicCompanyUvps/' + id).then((result) => {
            console.log('CompanyUvps', result)
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

    const htmlToSummary = (htmlString: any) => {
        // Function to strip HTML tags and summarize to 25 words
        const stripTagsAndSummarize = (html: any) => {
            // Use a temporary element to remove HTML tags
            const tempElement = document.createElement('div')
            tempElement.innerHTML = html
            const textContent = tempElement.textContent || tempElement.innerText || ''

            // Split the text into words
            const words = textContent.split(/\s+/)

            // Get the first 25 words and join them
            const summary = words.slice(0, 25).join(' ')

            // Add trailing dots if the text is longer than 25 words
            return words.length > 25 ? `${summary}...` : summary
        }
    }

    if (!data) return <div>Loading...</div>

    return (
        <>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Featured UVPs ({featured.length})</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">All UVPs ({data.length})</button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex={0}>
                    <div className="pt-3 pb-3">
                        Featured
                    </div>
                </div>
                <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex={0}>
                    <div className="pt-3 pb-3">
                        <div className="row row-cols-1 row-cols-md-2 g-2 mb-4 align-items-center">
                            {data && data.map((item: any, index: number) => (
                                <div key={index} className="col">
                                    <div className="uvp-small">
                                        {item.displayName}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default CompanyDescription




