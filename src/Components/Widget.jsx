import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeWidget } from "../Redux/sliceData";
import WidgetModal from "./WidgetModal";

const Widget = ({ searchQuery }) => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.dashboard.categories);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModalOnclick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="container max-width ms-3 mb-2">
            {Object.entries(categories).map(([catId, category]) => {
                const PlaceholderWidget = [...category.widgets];

                while (PlaceholderWidget.length < 3) {
                    PlaceholderWidget.push({
                        id: `${PlaceholderWidget.length}`,
                        title: "",
                        text: "",
                        isPlaceholder: true,
                    });
                }

                // Filter widgets based on the search query
                const filteredWidgets = PlaceholderWidget.filter(widget =>
                    widget.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    widget.text.toLowerCase().includes(searchQuery.toLowerCase())
                );

                return (
                    <div key={catId} className="mb-3">
                        <h5 className="mb-3 fw-bold">{category.title}</h5>
                        <div className="row ">
                            {filteredWidgets.length > 0 ? (
                                filteredWidgets.map((widget) =>
                                    widget.isPlaceholder ? (
                                        <div key={widget.id} className="col-md-4 mb-3 card">
                                            <button
                                                onClick={openModalOnclick}
                                                className="btn w-100 h-100 p-4 bg-light border rounded-2xl shadow-sm d-flex align-items-center justify-content-center"
                                            >
                                                <div className="text-center">
                                                    <div className="border rounded h-10 d-flex align-items-center justify-content-center text-muted font-weight-bold">
                                                        + Add Widget
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    ) : (
                                        <div key={widget.id} className="col-md-4 mb-3 card">
                                            <div className="border bg-white rounded-xl shadow-sm p-4 position-relative h-100 card">
                                                <h5 className="font-weight-bold">{widget.title}</h5>
                                                <p>{widget.text}</p>
                                                <button
                                                    onClick={() => dispatch(removeWidget({ catId, widgetId: widget.id }))}
                                                    className="btn-close btn-danger position-absolute top-0 end-0 mt-2 me-2"
                                                    aria-label="Close"
                                                ></button>
                                            </div>
                                        </div>
                                    )
                                )
                            ) : (
                                <div className="col-md-4 mb-3 card">
                                    <div className="border bg-light rounded-xl shadow-sm p-4 d-flex align-items-center justify-content-center text-muted font-weight-bold">
                                        No results found
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
            <WidgetModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default Widget;
