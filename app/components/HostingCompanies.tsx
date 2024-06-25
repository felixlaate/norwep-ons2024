import HostingCompaniesGrid from './HostingCompaniesGrid'

interface HostingCompaniesProps {
    data: any
}

const HostingCompanies: React.FC<HostingCompaniesProps> = ({ data }) => {

    return (
        <>
            <h3>Hosting Companies</h3>
            <HostingCompaniesGrid data={data} />
        </>
    )
}

export default HostingCompanies