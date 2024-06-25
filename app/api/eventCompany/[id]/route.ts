import { client } from '@/app/lib/clients/eventsSanity'

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request, { params }: { params: { id: string } }) {
    //console.log('Fetch contacts')

    const user = await client.fetch(`
        *[ _type=='company' && _id==$id ][0] {
             _id,
            name,
            "imageUrl": logo.asset->url,
            link
        }`,
        {
            id: params.id
        },
        {
            next: {
                revalidate: 1 // look for updates to revalidate cache every hour
            }
        })

    return Response.json(user)
}