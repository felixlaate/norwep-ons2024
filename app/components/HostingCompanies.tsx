import HostingCompaniesGrid from './HostingCompaniesGrid'

interface HostingCompaniesProps {
    data: any
}

const HostingCompanies: React.FC<HostingCompaniesProps> = ({ data }) => {

    return (
        <>
            <h3>Hosting Companies ({data.length})</h3>
            <em>Click on logos for contact information</em>
            <div className='pt-5 pb-5'>
                <HostingCompaniesGrid data={data} />
            </div>
        </>
    )
}

export default HostingCompanies