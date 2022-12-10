import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

function DataTable() {
    const [userList, setUserList] = useState([])

    // fetching the data from(CSV -> JSON) file.
    useEffect(() => {
        fetch('././json.json')
            .then(response => response.json())
            .then(result => setUserList(result))
            .catch(error => console.log(error))

    }, [])
    // Styling of rows so that it should not overlap while changing the screen-size to enhance responsiveness
    const rowStyle = (row, rowIndex) => {
        return { overflowWrap: 'break-word' };
    };
    // Row click action to change the background color of the row.
    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        bgColor: '#00BFFF'
    };

    // AddOn: Pagination feature for enhanced UX
    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 10,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: function (page, sizePerPage) {
            console.log('page', page);
            console.log('sizePerPage', sizePerPage)
        },
        onSizePerPageChange: function (page, sizePerPage) {
            console.log('page', page)
            console.log('sizePerPage', sizePerPage);
        }
    })

    const columns = [
        { dataField: 'id', text: 'Id', sort: true, align: 'center', headerAlign: 'center' },
        { dataField: 'first_name', text: 'First Name', sort: true, filter: textFilter(), align: 'center', headerAlign: 'center' },
        { dataField: 'last_name', text: 'Last Name', sort: true, filter: textFilter(), align: 'center', headerAlign: 'center' },
        { dataField: 'email', text: 'E-mail', sort: true, filter: textFilter(), align: 'center', headerAlign: 'center' },
        { dataField: 'gender', text: 'Gender', sort: true, align: 'center', headerAlign: 'center' },
        { dataField: 'ip_address', text: 'Ip Address', align: 'center', headerAlign: 'center' },
        { dataField: 'airport_code', text: 'Airport Code', align: 'center', headerAlign: 'center' },
        { dataField: 'time', text: 'Time', sort: true, align: 'center', headerAlign: 'center' },
        {dataField: 'status', text: 'Status', sort: true, align: 'center', headerAlign: 'center',
            style: (cell) => {
                if (cell === true) {
                    return {
                        backgroundColor: '#4caf50'
                    };
                }
                return {
                    backgroundColor: '#c62828'
                };
            }
        },
        { dataField: 'mobile', text: 'Mobile', filter: textFilter(), align: 'center', headerAlign: 'center' },
        { dataField: 'area', text: 'Area', align: 'center', headerAlign: 'center' },
        { dataField: 'show', text: 'Show', sort: true, align: 'center', headerAlign: 'center' },
        { dataField: 'edit', text: 'Edit', sort: true, align: 'center', headerAlign: 'center' },
    ]
   

    return (

        <div>
            <BootstrapTable
                bootstrap4
                keyField='id'
                columns={columns}
                data={userList}
                pagination={pagination}
                filter={filterFactory()}
                selectRow={selectRow}
                rowStyle={rowStyle}
            />
        </div>
    )
}

export default DataTable