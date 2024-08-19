import React from 'react';
import SearchIcon from '../assets/svgs/search.svg';

function Navbar({ onSearch }) {
    const handleSearchInputChange = (e) => {
        onSearch(e.target.value);
    };

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-white">
            <div className="container-fluid">
                <a className="nav-link me-2 ms-3" href="#">Home</a>
                <span className="mx-2">&gt;</span>
                <a className="navbar-brand fw-medium fs-5" href="#">Dashboard V2</a>

                {/* Toggler button for mobile view */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    {/* Search Form, now inside the collapsible section */}
                    <form className="d-flex mx-auto col-md-4 col-12 mt-2 mt-md-0">
                        <div className="input-group">
                            <span className="input-group-text text-dark">
                                <img src={SearchIcon} alt="Search Icon" width="16px" height="16px" />
                            </span>
                            <input
                                className="form-control bg-light shadow-none"
                                type="search"
                                placeholder="Search anything..."
                                onChange={handleSearchInputChange}
                            />
                        </div>
                    </form>

                    <div className="ms-auto mt-2 mt-md-0 me-4">
                        <i className="bi bi-bell fs-4 me-3"></i>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
