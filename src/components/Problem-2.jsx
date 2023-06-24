import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Checkbox } from 'antd';

const Problem2 = () => {
  const [isModalAOpen, setIsModalAOpen] = useState(false);
  const [isModalBOpen, setIsModalBOpen] = useState(false);
  const [isModalCOpen, setIsModalCOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [usContacts, setUSContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [filteredUSContacts, setFilteredUSContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEvenOnly, setIsEvenOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchAllContacts();
    fetchUSContacts();
  }, []);

  const fetchAllContacts = async () => {
    try {
      const response = await axios.get('https://contact.mediusware.com/api/contacts');
      setContacts(response.data.definitions);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUSContacts = async () => {
    try {
      const response = await axios.get('https://contact.mediusware.com/api-doc/');
      setUSContacts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAllContactsButtonClick = () => {
    setIsModalAOpen(true);
    setIsModalBOpen(false);
    setIsModalCOpen(false);
  };

  const handleUSContactsButtonClick = () => {
    setIsModalAOpen(false);
    setIsModalBOpen(true);
    setIsModalCOpen(false);
  };

  const handleContactItemClick = () => {
    setIsModalCOpen(true);
  };

  const closeModal = () => {
    setIsModalAOpen(false);
    setIsModalBOpen(false);
    setIsModalCOpen(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setIsEvenOnly(e.target.checked);
  };

  useEffect(() => {
    if (isModalAOpen) {
      filterContacts();
    } else if (isModalBOpen) {
      filterUSContacts();
    }
  }, [searchQuery, isEvenOnly]);

  const filterContacts = () => {
    let filtered = contacts;
    if (searchQuery) {
      filtered = filtered.filter((contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (isEvenOnly) {
      filtered = filtered.filter((contact) => contact.id % 2 === 0);
    }
    setFilteredContacts(filtered.slice(0, currentPage * pageSize));
  };

  const filterUSContacts = () => {
    let filtered = usContacts;
    if (searchQuery) {
      filtered = filtered.filter((contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (isEvenOnly) {
      filtered = filtered.filter((contact) => contact.id % 2 === 0);
    }
    setFilteredUSContacts(filtered.slice(0, currentPage * pageSize));
  };

  const handleModalCLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleModalCScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg"
            style={{ backgroundColor: isModalAOpen ? '#46139f' : '', color: '#00000', border: '1px solid #46139f' }}
            type="button"
            onClick={handleAllContactsButtonClick}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg"
            style={{ backgroundColor: isModalBOpen ? '#ff7f50' : '', color: '#00000', border: '1px solid #ff7f50' }}
            type="button"
            onClick={handleUSContactsButtonClick}
          >
            US Contacts
          </button>
          <button
            className="btn btn-lg"
            style={{ backgroundColor: '#ffffff', color: '#46139f', border: '1px solid #46139f' }}
            type="button"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
      <Modal
        visible={isModalAOpen}
        onCancel={closeModal}
        title="All Contacts"
        footer={null}
        destroyOnClose
      >
        <div className="mb-3">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <Checkbox checked={isEvenOnly} onChange={handleCheckboxChange}>
            Only even
          </Checkbox>
        </div>
        <ul>
          {filteredContacts.map((contact) => (
            <li key={contact.id} onClick={handleContactItemClick}>{contact.name}</li>
          ))}
        </ul>
      </Modal>
      <Modal
        visible={isModalBOpen}
        onCancel={closeModal}
        title="US Contacts"
        footer={null}
        destroyOnClose
      >
        <div className="mb-3">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <Checkbox checked={isEvenOnly} onChange={handleCheckboxChange}>
            Only even
          </Checkbox>
        </div>
        <ul>
          {filteredUSContacts.map((contact) => (
            <li key={contact.id} onClick={handleContactItemClick}>{contact.name}</li>
          ))}
        </ul>
      </Modal>
      <Modal
        visible={isModalCOpen}
        onCancel={closeModal}
        title="Contact Details"
        footer={null}
        destroyOnClose
        onScroll={handleModalCScroll}
      >
        <ul>
          {}
        </ul>
        <button className="btn btn-lg btn-primary" onClick={handleModalCLoadMore}>
          Load More
        </button>
      </Modal>
    </div>
  );
};

export default Problem2;