import React, { useState, useEffect } from 'react';

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps {
  options: Option[];
  multiple?: boolean;
  placeholder?: string;
  onChange: (selected: (string | number)[]) => void;
}

const Select: React.FC<SelectProps> = ({
  options,
  multiple = false,
  placeholder = 'Select...',
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<(string | number)[]>(
    []
  );
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions, onChange]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (value: string | number) => {
    if (multiple) {
      setSelectedOptions((prevSelected) =>
        prevSelected.includes(value)
          ? prevSelected.filter((v) => v !== value)
          : [...prevSelected, value]
      );
    } else {
      setSelectedOptions([value]);
      setIsOpen(false);
    }
  };

  const handleSelectAll = () => {
    if (selectedOptions.length) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions(options.map((option) => option.value));
    }
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(filterText.toLowerCase())
  );

  const renderHeader = () => {
    return (
      <div className="select-header" onClick={toggleDropdown}>
        {selectedOptions.length === 0
          ? placeholder
          : options
              .filter((option) => selectedOptions.includes(option.value))
              .map((option) => option.label)
              .join(', ')}
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▶</span>
      </div>
    );
  };

  const renderOptions = () => {
    return filteredOptions.map((option) => (
      <li key={option.value} onClick={() => handleOptionClick(option.value)}>
        {multiple && (
          <input
            type="checkbox"
            checked={selectedOptions.includes(option.value)}
            onChange={(e) => e.preventDefault()}
          />
        )}
        {option.label}
      </li>
    ));
  };

  return (
    <div className="select-container">
      {renderHeader()}
      {isOpen && (
        <div className="select-dropdown">
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Search by Text"
            className="select-filter"
          />
          {multiple && (
            <div className="select-all" onClick={() => handleSelectAll()}>
              <input
                type="checkbox"
                checked={selectedOptions.length === options.length}
                onChange={(e) => e.preventDefault()}
              />
              {selectedOptions.length ? 'Deselect all' : 'Select all'}
            </div>
          )}
          <ul className="select-options">{renderOptions()}</ul>
        </div>
      )}
    </div>
  );
};

export default Select;
