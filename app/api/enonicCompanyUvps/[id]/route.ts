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
                        contentTypes: "no.seeds.norwep:technology-and-solutions"
                        query: "data.company LIKE '*` + params.id + `*'"
                        first: 100
                    ) {
                        displayName
                        ... on no_seeds_norwep_TechnologyAndSolutions {
                        _id
                        _path
                        data {
                            company {
                            _id
                            displayName
                            dataAsJson
                            }
                            company_contact {
                            dataAsJson
                            }
                            subcategory {
                            _path
                            dataAsJson
                            }
                        }
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

    return Response.json(res)
}