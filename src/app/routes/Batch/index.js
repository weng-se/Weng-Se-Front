import React from 'react';
// import ContainerHeader from '../Customers/node_modules/components/ContainerHeader/index';
// import IntlMessages from '../Customers/node_modules/util/IntlMessages';
import * as XLSX from 'xlsx';
import { connect } from 'react-redux';
import { IMPORT_ORDER_REQUEST } from '../../../actions/Orders';

class BatchPage extends React.Component {



    CSVToArray(strData, strDelimiter) {
        strDelimiter = (strDelimiter || ",");
        // Create a regular expression to parse the CSV values.
        var objPattern = new RegExp(
            (
                // Delimiters.
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
        );
        var arrData = [[]];
        var arrMatches = null;
        while (arrMatches = objPattern.exec(strData)) {
            // Get the delimiter that was found.
            var strMatchedDelimiter = arrMatches[1];
            if (
                strMatchedDelimiter.length &&
                (strMatchedDelimiter != strDelimiter)
            ) {
                arrData.push([]);
            }

            if (arrMatches[2]) {
                // We found a quoted value. When we capture
                // this value, unescape any double quotes.
                var strMatchedValue = arrMatches[2].replace(
                    new RegExp("\"\"", "g"),
                    "\""
                );
            } else {
                // We found a non-quoted value.
                var strMatchedValue = arrMatches[3];
            }
            // Now that we have our value string, let's add
            // it to the data array.
            arrData[arrData.length - 1].push(strMatchedValue);
        }
        return (arrData);
    }

    handleClick = () => {
        if (window.File && window.FileReader && window.FileList && window.Blob) {

            let file = document.getElementById("file").files[0];
            const reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = (evt) => {
                /* Parse data */
                const bstr = evt.target.result;
                const wb = XLSX.read(bstr, { type: 'binary' });
                /* Get first worksheet */
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                /* Convert array of arrays */
                const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
                /* Update state */
                //console.log(this.csvToJSON(data));
                this.props.import(this.csvToJSON(data));

            };
            reader.onerror = function () {
                alert('Unable to read ' + file.fileName);
            };
        }
    }


    csvToJSON(csv) {

        var lines = csv.split("\n");

        var result = [];

        var headers = lines[0].split(",");

        for (var i = 1; i < lines.length; i++) {

            var obj = {};
            var currentline = lines[i].split(",");

            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }

            result.push(obj);

        }

        //return result; //JavaScript object
        return JSON.stringify(result); //JSON
    }



    render() {
        return (
            <div className="app-wrapper">
                <input type="file" name="file" id="file" accept=".csv,.xlsx" /><br />
                <button type="button" onClick={() => this.handleClick()}>import</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        progress: state.orders.progress,
        error: state.orders.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        import: (data) => dispatch({ type: IMPORT_ORDER_REQUEST , value: data }),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BatchPage);

