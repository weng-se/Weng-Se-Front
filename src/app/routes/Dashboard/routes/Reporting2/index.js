import React from 'react';
// import ContainerHeader from '../../../Customers/node_modules/components/ContainerHeader/index';
// import IntlMessages from '../../../Customers/node_modules/util/IntlMessages';

class SamplePage extends React.Component {

    render() {
        return (
            <div className="app-wrapper">
                {/* <ContainerHeader match={this.props.match} title={<IntlMessages id="pages.samplePage"/>}/> */}
                <div className="d-flex justify-content-center">
                    <h1>
                        {/* <IntlMessages id="pages.samplePage.description"/> */}
                    </h1>
                </div>

            </div>
        );
    }
}

export default SamplePage;