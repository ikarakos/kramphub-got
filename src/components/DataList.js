import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BootstraTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

const DataList = () => {
  const [heroesList, setHeroesList] = useState([]);

  const pageNo = 1;
  const pageSize = 10;

  const columns = [
    { dataField: 'name', text: 'Name', sort: true, filter: textFilter() },
    { dataField: 'gender', text: 'Gender', sort: true },
    { dataField: 'culture', text: 'Culture' },
    { dataField: 'born', text: 'Born' },
    { dataField: 'died', text: 'Died', sort: true },
    { dataField: 'titles', text: 'Titles' },
    { dataField: 'aliases', text: 'Aliases', sort: true, filter: textFilter() },
  ];

  const fetchChars = async (pageNo, pageSize) => {
    return await axios
      .get(
        `https://anapioficeandfire.com/api/characters?page=${pageNo}&pageSize=${pageSize}`
      )
      .then((res) => setHeroesList(res.data))
      .catch((err) => console.log(err));
  };

  const pagination = paginationFactory({
    page: pageNo,
    sizePerPage: pageSize,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: 'next',
    prePageText: 'prev',
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: (page, sizePerPage) => {
      console.log('page: ', page);
      console.log('sizePerPage: ', sizePerPage);
    },
    onSizePerPageChange: (page, sizePerPage) => {
      console.log('page: ', page);
      console.log('sizePerPage: ', sizePerPage);
    },
  });

  useEffect(() => {
    fetchChars();
  }, []);

  return (
    <div>
      <BootstraTable
        bootstrap4
        keyField='url'
        columns={columns}
        data={heroesList}
        pagination={pagination}
        filter={filterFactory()}
      />
    </div>
  );
};

export default DataList;
