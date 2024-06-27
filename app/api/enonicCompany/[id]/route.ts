import axios from 'axios'

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request, { params }: { params: { id: string } }) {
    //console.log(params.id)

    let res: any

    try {
        const response = await axios({
            url: 'https://www.norwep.com/gql',
            method: 'post',
            data: {
                query: `  
                {
                    guillotine {
                    query(
                        contentTypes: "no.seeds.norwep:member-company"
                        query: "_id = '` + params.id + `'"
                    ) {
                        displayName
                        ... on no_seeds_norwep_MemberCompany {
                            _id
                            _path                        
                            dataAsJson
                            xAsJson
                            }
                        }
                    }
                }                
                `
            }
        })

        //console.dir(response.data.data.guillotine.query)
        res = response.data.data.guillotine.query
    } catch (error) {
        console.dir(error)
        res = error
    }

    return Response.json(res[0])
}