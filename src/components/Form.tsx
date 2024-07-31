import React, { useState } from 'react';
import Select from './Select';

const options = [
  { label: 'Image', value: 'image' },
  { label: 'Live', value: 'live' },
  { label: 'Notes', value: 'notes' },
  { label: 'Report', value: 'report' },
  { label: 'Video', value: 'video' },
];

const Form: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<(string | number)[]>(
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      selectedOptions,
    };
    console.log('Form data:', formData);
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <Select
            options={options}
            multiple
            placeholder="Search by category"
            onChange={setSelectedOptions}
          />
        </div>
        <div className="form-section">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-section">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
