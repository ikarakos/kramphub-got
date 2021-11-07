import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BootstraTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

const DataList = () => {
  const [heroesList, setHeroesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [age, setAge] = useState();

  const columns = [
    { dataField: 'name', text: 'Name', sort: true, filter: textFilter() },
    { dataField: 'gender', text: 'Gender', sort: true },
    { dataField: 'culture', text: 'Culture' },
    { dataField: 'born', text: 'Born' },
    { dataField: 'died', text: 'Died', sort: true },
    { dataField: 'titles', text: 'Titles' },
    { dataField: 'aliases', text: 'Aliases', sort: true, filter: textFilter() },
    {
      dataField: 'age',
      text: 'Age',
      formatter: (e, row) =>
        row.name && (
          <div>
            <button onClick={() => handleEstimateAge(row.name)}>
              Calculate age
            </button>
            <div>{age ? `Estimated age: ${row.name} is ${age}` : null}</div>
          </div>
        ),
    },
  ];

  const handleEstimateAge = async (name) => {
    // await axios
    //   .get(`https://api.agify.io?name=${name}`)
    //   .then((res) => res.data.age);
    setAge(5);
  };
  const rowEvents = {
    onClick: (e, row) => {
      console.log(row.name);
    },
  };

  const fetchChars = async (page, size) => {
    if (page < 1 || page > 214) return;
    const URL = `https://anapioficeandfire.com/api/characters?page=${page}&pageSize=${size}`;
    if (page !== currentPage) setCurrentPage(page);
    if (size !== pageSize) setPageSize(size);
    localStorage.getItem(`${page}`)
      ? setHeroesList(JSON.parse(localStorage.getItem(`${page}`)))
      : await axios
          .get(URL)
          .then((res) => {
            setHeroesList(res.data);
            localStorage.setItem(`${page}`, JSON.stringify(res.data));
          })
          .catch((err) => console.warn(err));
  };

  useEffect(() => {
    fetchChars(currentPage, pageSize);
  }, []);

  return (
    <div>
      <BootstraTable
        bootstrap4
        keyField='url'
        columns={columns}
        data={heroesList}
        filter={filterFactory()}
        rowEvents={rowEvents}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <button onClick={() => fetchChars(1, pageSize)}>first</button>

        <button onClick={() => fetchChars(currentPage - 1, pageSize)}>
          prev
        </button>
        <div style={{ marginLeft: '2rem', marginRight: '2rem' }}>
          Page: {currentPage}
        </div>
        <button onClick={() => fetchChars(currentPage + 1, pageSize)}>
          next
        </button>
        <button onClick={() => fetchChars(214, pageSize)}>Last</button>
      </div>
    </div>
  );
};

export default DataList;
