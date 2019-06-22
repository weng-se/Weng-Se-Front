import React from 'react';
// import ContainerHeader from '../../../Customers/node_modules/components/ContainerHeader/index';
// import IntlMessages from IntlMessages';

class SamplePage extends React.Component {

    render() {
        return (
            <div className="app-wrapper">
                {/* <ContainerHeader match={this.props.match} title={<IntlMessages id="pages."/>}/> */}
                <div className="d-flex justify-content-center">
                    <h1>samplePage</h1>
                </div>

            </div>
        );
    }
}

export default SamplePage;