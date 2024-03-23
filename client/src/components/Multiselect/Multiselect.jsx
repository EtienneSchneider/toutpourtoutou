import React, { useState, useRef, useEffect } from "react";
import "./Multiselect.scss";
import { FiChevronDown } from "react-icons/fi";
import classNames from "classnames";

const MultiSelect = ({ options, selectedOptions, updateSelectedOpts  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleOptionClick = (option) => {
        if (selectedOptions.includes(option)) {
            updateSelectedOpts(
                selectedOptions.filter((item) => item !== option),
            );
        } else {
            updateSelectedOpts([...selectedOptions, option]);
        }
    };

    return (
        <div className="multiselect" ref={dropdownRef}>
            <div className="multiselectInput">
                <div className="selectedOptions" onClick={toggleDropdown}>
                    {selectedOptions.length > 0 ? (
                        selectedOptions.map((option) => (
                            <span key={option} className="selectedOption">
                                {option}
                            </span>
                        ))
                    ) : (
                        <span className="placeholder">Select options...</span>
                    )}
                </div>
                <button
                    className={classNames("iconContainer", {
                        opened: isOpen,
                    })}
                    onClick={toggleDropdown}
                >
                    <FiChevronDown size={24} />
                </button>
            </div>

            {isOpen && (
                <div className="dropdown">
                    {options.map((option) => (
                        <div
                            key={option}
                            className={`option ${selectedOptions.includes(option) ? "selected" : ""}`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelect;
