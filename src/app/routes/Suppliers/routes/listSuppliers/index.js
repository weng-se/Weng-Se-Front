import React from 'react';
import CardBox from 'components/CardBox/index';
// import IntlMessages from '../../../Customers/node_modules/util/IntlMessages';
// import DataTable from './Components/DataTable';
// import ContainerHeader from '../../../Customers/node_modules/components/ContainerHeader/index';


class Suppliers extends React.Component {

    render() {
        return (
            <div className="app-wrapper">
                {/* <ContainerHeader match={this.props.match} title={<IntlMessages id="pages.listSuppliers"/>}/> */}
                <div className="row animated slideInUpTiny animation-duration-3">
                    <CardBox styleName="col-12" cardStyle=" p-0" headerOutside>
                        {/* <DataTable/> */}
                    </CardBox>
                </div>
            </div>
        );
    }
}

export default Suppliers;