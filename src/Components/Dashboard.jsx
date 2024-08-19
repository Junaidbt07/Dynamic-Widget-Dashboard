import React, { useState } from "react";
import Navbar from "./NavBar";
import Widget from "./Widget";
import WidgetModal from "./WidgetModal";

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSearchChange = (query) => {
        setSearchQuery(query);
    };

    const [selectedOption, setSelectedOption] = useState("Last 2 days");

    const handleSelect = (option) => {
        setSelectedOption(option);
    };


    return (
        <>
            <Navbar onSearch={handleSearchChange} />

            <header className="py-3 mt-3">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col ms-3">
                            <h4 className="h4 mb-0">CNAPP Dashboard</h4>
                        </div>
                        <div className="col-auto me-4 d-flex align-items-center">
                            <button type="button" className="btn me-2 bg-white" onClick={openModal}>
                                Add Widget <i className="bi bi-plus-lg"></i>
                            </button>
                            <WidgetModal isOpen={isModalOpen} onClose={closeModal} />

                            <button className="btn me-2 bg-white">
                                <i className="bi bi-arrow-clockwise"></i>
                            </button>
                            <button className="btn me-2 bg-white">
                                <i className="bi bi-three-dots-vertical"></i>
                            </button>

                            <div className="dropdown">
                                <button className="btn btn-white dropdown-toggle d-flex align-items-center" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-clock-fill me-2 text-primary"></i>
                                    <span>{selectedOption}</span>
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><a className="dropdown-item" href="#" onClick={() => handleSelect("Last 2 days")}>Last 2 days</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => handleSelect("Last 10 days")}>Last 10 days</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={() => handleSelect("Last 30 days")}>Last 30 days</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="mt-4">
                <Widget searchQuery={searchQuery} />
            </div>
        </>
    );
};

export default Dashboard;
