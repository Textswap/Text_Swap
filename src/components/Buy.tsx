'use client';

import React, { useState } from 'react';

// Sample textbook data
const textbooks = [
  { id: 1, title: 'Math 101', price: 10, department: 'Mathematics', course: 'Algebra', format: 'Hardcover', condition: 'Good', isbn: '12345' },
  { id: 2, title: 'History of Art', price: 50, department: 'Arts', course: 'History', format: 'Paperback', condition: 'Fair', isbn: '23456' },
  { id: 3, title: 'Science Basics', price: 150, department: 'Science', course: 'Physics', format: 'eBook', condition: 'Excellent', isbn: '34567' },
  { id: 4, title: 'Advanced Physics', price: 300, department: 'Science', course: 'Physics', format: 'Hardcover', condition: 'Good', isbn: '45678' },
  { id: 5, title: 'Modern Literature', price: 500, department: 'Arts', course: 'Literature', format: 'Paperback', condition: 'Excellent', isbn: '56789' },
  { id: 6, title: 'Data Structures', price: 700, department: 'Computer Science', course: 'Algorithms', format: 'Hardcover', condition: 'Fair', isbn: '67890' },
];

const Buy: React.FC = () => {
  const [maxPrice, setMaxPrice] = useState(1000);
  const [filters, setFilters] = useState({
    department: '',
    course: '',
    format: '',
    keywords: '',
    isbn: '',
    conditions: new Set<string>(),
  });

  // Handle maximum price slider changes
  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(event.target.value));
  };

  // Handle filter changes
  const handleFilterChange = (field: string, value: string) => {
    setFilters({ ...filters, [field]: value });
  };

  const handleConditionChange = (condition: string) => {
    const updatedConditions = new Set(filters.conditions);
    if (updatedConditions.has(condition)) {
      updatedConditions.delete(condition);
    } else {
      updatedConditions.add(condition);
    }
    setFilters({ ...filters, conditions: updatedConditions });
  };

  // Filter textbooks
  const filteredTextbooks = textbooks.filter((book) => {
    const matchesPrice = book.price <= maxPrice;
    const matchesDepartment = !filters.department || book.department === filters.department;
    const matchesCourse = !filters.course || book.course === filters.course;
    const matchesFormat = !filters.format || book.format === filters.format;
    const matchesKeywords =
      !filters.keywords || book.title.toLowerCase().includes(filters.keywords.toLowerCase());
    const matchesISBN = !filters.isbn || book.isbn.includes(filters.isbn);
    const matchesCondition =
      filters.conditions.size === 0 || filters.conditions.has(book.condition);

    return (
      matchesPrice &&
      matchesDepartment &&
      matchesCourse &&
      matchesFormat &&
      matchesKeywords &&
      matchesISBN &&
      matchesCondition
    );
  });

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '40px' }}>
      {/* Filters Section */}
      <div style={{ width: '25%', textAlign: 'center' }}>
        <h3 style={{ color: '#1b4a3d' }}>Filter Options</h3>
        <div style={{paddingTop: '2rem'}}>
          <span style={{ color: '#1b4a3d' }}>Up to ${maxPrice}</span>
          <input
            type="range"
            min="0"
            max="1000"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            style={{
              width: '100%',
              appearance: 'none',
              backgroundColor: '#225f49',
              height: '9px',
              borderRadius: '5px',
              marginTop: '10px',
              background: `linear-gradient(to right, #1b4a3d ${
                (maxPrice / 1000) * 100
              }%, #ddd ${(maxPrice / 1000) * 100}%)`, // Left: Green, Right: Gray
              outline: 'none',
            }}
          />
        </div>
        <div style={{ marginTop: '40px', padding: '30px' }}>
          <select
            style={{ width: '100%', marginBottom: '15px', textAlign:'center', fontSize: '25px', backgroundColor: 'lightGray', color: '#1b4a3d' }}
            value={filters.department}
            onChange={(e) => handleFilterChange('department', e.target.value)}
          >
        
            <option value="">Department</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Arts">Arts</option>
            <option value="Science">Science</option>
            <option value="Computer Science">Computer Science</option>
          </select>
          <select
            style={{ width: '100%', marginBottom: '15px', textAlign:'center', fontSize: '25px', backgroundColor: 'lightGray', color: '#1b4a3d' }}
            value={filters.course}
            onChange={(e) => handleFilterChange('course', e.target.value)}
          >
            <option value="">Course</option>
            <option value="Algebra">Algebra</option>
            <option value="History">History</option>
            <option value="Physics">Physics</option>
            <option value="Literature">Literature</option>
            <option value="Algorithms">Algorithms</option>
          </select>
          <select
            style={{ width: '100%', marginBottom: '40px', textAlign:'center', fontSize: '25px', backgroundColor: 'lightGray', color: '#1b4a3d' }}
            value={filters.format}
            onChange={(e) => handleFilterChange('format', e.target.value)}
          >
            <option value="">Format</option>
            <option value="Hardcover">Hardcover</option>
            <option value="Paperback">Paperback</option>
            <option value="eBook">eBook</option>
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Keywords"
            value={filters.keywords}
            onChange={(e) => handleFilterChange('keywords', e.target.value)}
            style={{ width: 'calc(100% - 40px)', fontSize: '22px', border: '3px solid #225f49', textAlign: 'center' }}
          />
        </div>
        <div style={{ marginBottom: '50px' }}>
          <input
            type="text"
            placeholder="ISBN"
            value={filters.isbn}
            onChange={(e) => handleFilterChange('isbn', e.target.value)}
            style={{ width: 'calc(100% - 40px)', fontSize: '22px', border: '3px solid #225f49', textAlign: 'center' }}
          />
        </div>
        <div style={{ fontSize: '20px' }}>
          {['Fair', 'Good', 'Excellent'].map((condition) => (
            <label key={condition} style={{ display: 'block' }}>
              <input
                type="checkbox"
                checked={filters.conditions.has(condition)}
                onChange={() => handleConditionChange(condition)}
              />
              {condition}
            </label>
          ))}
        </div>
      </div>

      {/* Product List */}
      <div style={{ width: '75%', color: '#1b4a3d', paddingTop: '20px', textAlign: 'center' }}>
        <h3>Available Textbooks</h3>
        {filteredTextbooks.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              paddingTop: '30px',
            }}
          >
            {filteredTextbooks.map((book) => (
              <div
                key={book.id}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  padding: '20px',
                  textAlign: 'center',
                }}
              >
                <h4>{book.title}</h4>
                <p>${book.price}</p>
                <p>{book.format}</p>
                <p>{book.condition}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No textbooks match your filters.</p>
        )}
      </div>
    </div>
  );
};

export default Buy;
