import { client } from '@/app/lib/clients/eventsSanity'

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request) {
    //console.log('Fetch customers')

    const data = await client.fetch(`
        *[ _type=='eventParticipant' && event._ref==$id] {
            participant->{
                firstName,
                lastName,
                position,
                company->{
                _id,
                name,
                "imageUrl": logo.asset->url
                },
                phoneNumber,
                email
            }
        }`,
        {
            id: 'a084e590-19de-493d-aa52-6dc07e341a20'
        },
        {
            next: {
                revalidate: 1 // look for updates to revalidate cache every hour
            }
        })

    // Extract companies from the data
    const companies = data.map((item: any) => item.participant.company)

    // Filter unique companies by _id
    const uniqueCompanies = companies.filter((company: any, index: number, self: any) =>
        index === self.findIndex((c: any) => c._id === company._id)
    )

    // Format the companies as required
    const formattedCompanies = uniqueCompanies.map((company: any) => ({
        _id: company._id,
        name: company.name
    }))

    return Response.json(formattedCompanies)
}