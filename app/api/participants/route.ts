import { client } from '@/app/lib/clients/eventsSanity'

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request) {
    //console.log('Fetch customers')

    const user = await client.fetch(`
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

    return Response.json(user)
}