import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addWidget, removeWidget } from "../Redux/sliceData";

const WidgetModal = ({ isOpen, onClose }) => {
    const [selectedCategory, setSelectedCategory] = useState("CSPM");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [widgetStates, setWidgetStates] = useState({});

    const dispatch = useDispatch();
    const categories = useSelector((state) => state.dashboard.categories);

    useEffect(() => {
        if (isOpen) {
            setTitle("");
            setText("");
            if (categories[selectedCategory]) {
                setWidgetStates(
                    categories[selectedCategory].widgets.reduce((acc, widget) => {
                        acc[widget.id] = true;
                        return acc;
                    }, {})
                );
            }
        }
    }, [isOpen, selectedCategory, categories]);

    const handleConfirm = () => {
        if (title) {
            const newWidget = {
                id: `${selectedCategory}-${Date.now()}`,
                title,
                text,
            };
            dispatch(addWidget({ catId: selectedCategory, widget: newWidget }));

            setWidgetStates((prevState) => ({
                ...prevState,
                [newWidget.id]: true,
            }));
        }

        Object.keys(widgetStates).forEach((widgetId) => {
            if (!widgetStates[widgetId]) {
                dispatch(removeWidget({ catId: selectedCategory, widgetId }));
            }
        });

        onClose();
    };

    const toggleWidgetCheck = (widgetId) => {
        setWidgetStates({
            ...widgetStates,
            [widgetId]: !widgetStates[widgetId],
        });
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div className="modal-backdrop fade show"></div>

            {/* Sidebar Modal */}
            <div className={`sidebar-modal ${isOpen ? 'show' : 'hide'} d-flex flex-column`}>
                <div className="modal-header custom-bg text-white">
                    <h6 className="modal-title ms-3" id="exampleModalLabel">Add Widget</h6>
                    <button type="button" className="btn-close ms-auto me-3 text-white" style={{ filter: "invert(1)" }} onClick={onClose} aria-label="Close"></button>
                </div>
                <div className="modal-body flex-grow-1 overflow-auto">
                    <div className="mb-3">
                        <p className="mb-3 ms-3 mt-3">Personalize your dashboard by adding the following widget</p>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="d-flex justify-content-around mb-6">
                                        {["CSPM", "CWPP", "Image", "Ticket"].map((category) => (
                                            <button
                                                key={category}
                                                onClick={() => setSelectedCategory(category)}
                                                className={`btn ${selectedCategory === category
                                                    ? "btn-hover-selected"
                                                    : "btns"
                                                    } p-2 rounded`}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3 ms-4 me-3 mt-5 ">
                        <input value={title} onChange={(e) => setTitle(e.target.value)} className="form-control form-control-lg placeholder-sm" placeholder="Widget Title" />
                        <textarea value={text} onChange={(e) => setText(e.target.value)} className="form-control mt-4" placeholder="Widget Text"
                        />
                    </div>
                    <div className="mb-3 ms-3 me-3 mt-5 pt-5">
                        <h6 className="mb-2">Your Widgets:</h6>
                        {categories[selectedCategory]?.widgets.map((widget) => (
                            <div key={widget.id} className="form-check">
                                <input type="checkbox" checked={widgetStates[widget.id]} onChange={() => toggleWidgetCheck(widget.id)} className="form-check-input" />
                                <label className="form-check-label">{widget.title}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="modal-footer mb-4">
                    <button type="button" className="btn-cancel me-3" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="button" className="btn-confirm me-4" onClick={handleConfirm}>
                        Confirm
                    </button>
                </div>
            </div>
        </>
    );
};

export default WidgetModal;
