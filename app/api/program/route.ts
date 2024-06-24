import { client } from '@/app/lib/clients/eventsSanity'

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request) {
    //console.log('Fetch program')

    const user = await client.fetch(`
        *[ _type=='program' && event._ref==$id] {
            _id,
            name,
            "happenings": *[ _type=='happening' && program._ref==^._id] | order(startTime.utc)
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