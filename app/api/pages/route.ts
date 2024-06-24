import { client } from '@/app/lib/clients/sanity'

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request) {
    //console.log('Fetch pages')

    const user = await client.fetch(`
        *[_type=="site" && _id == 'd6ced41a-c310-414f-b878-c25b01ad4f4a' ] {
            _id,
            pages[]->{
                _id,
                title,
                description,
                image,      
                slug
            }          
        }`,
        {
            id: 'd6ced41a-c310-414f-b878-c25b01ad4f4a'
        },
        {
            next: {
                revalidate: 1 // look for updates to revalidate cache every hour
            }
        })

    return Response.json(user)
}