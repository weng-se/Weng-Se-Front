import React from 'react';
import CardBox from 'components/CardBox/index';
import DataTable from './Components/DataTable';

class Checks extends React.Component {

    render() {
        return (
            <div className="app-wrapper">
                <div className="row animated slideInUpTiny animation-duration-3">
                    <CardBox styleName="col-12" cardStyle=" p-0" heading="List des cheques"
                            headerOutside>
                        <DataTable/>
                    </CardBox>
                </div>
            </div>
        );
    }
}

export default Checks;