import React, { useState, useEffect } from 'react';
import { getInterns, addIntern, updateInternStatus, updateLeaveStatus } from './supabase';
import './App.css';

function App() {
  const [interns, setInterns] = useState([]);
  const [newInternName, setNewInternName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load interns when component mounts
  useEffect(() => {
    loadInterns();
  }, []);

  const loadInterns = async () => {
    try {
      setLoading(true);
      const data = await getInterns();
      setInterns(data || []);
    } catch (error) {
      setError('Failed to load interns: ' + error.message);
      console.error('Error loading interns:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIntern = async (e) => {
    e.preventDefault();
    if (!newInternName.trim()) return;

    try {
      const newIntern = {
        name: newInternName.trim(),
        status: 'Active',
        on_leave: false
      };

      await addIntern(newIntern);
      setNewInternName('');
      loadInterns();
      alert('Intern added successfully!');
    } catch (error) {
      alert('Failed to add intern: ' + error.message);
    }
  };

  const handleStatusToggle = async (intern) => {
    try {
      const newStatus = intern.status === 'Active' ? 'Inactive' : 'Active';
      await updateInternStatus(intern.id, newStatus);
      loadInterns();
    } catch (error) {
      alert('Failed to update status: ' + error.message);
    }
  };

  const handleLeaveToggle = async (intern) => {
    try {
      const newLeaveStatus = !intern.on_leave;
      await updateLeaveStatus(intern.id, newLeaveStatus);
      loadInterns();
    } catch (error) {
      alert('Failed to update leave status: ' + error.message);
    }
  };

  if (loading) return <div className="loading">Loading interns...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="App">
      <header className="app-header">
        <h1>🎯 Intern Tracker</h1>
        <p>Manage your interns' status and leave</p>
      </header>

      <main className="main-content">
        <section className="add-intern-section">
          <h2>Add New Intern</h2>
          <form onSubmit={handleAddIntern} className="add-intern-form">
            <input
              type="text"
              value={newInternName}
              onChange={(e) => setNewInternName(e.target.value)}
              placeholder="Enter intern name"
              className="intern-input"
              required
            />
            <button type="submit" className="add-button">
              Add Intern
            </button>
          </form>
        </section>

        <section className="interns-section">
          <h2>Interns List ({interns.length})</h2>
          
          {interns.length === 0 ? (
            <div className="no-interns">
              <p>No interns added yet. Add your first intern above!</p>
            </div>
          ) : (
            <div className="interns-grid">
              {interns.map((intern) => (
                <div key={intern.id} className="intern-card">
                  <div className="intern-info">
                    <h3 className="intern-name">{intern.name}</h3>
                    <div className="intern-status">
                      <span className={`status-badge ${intern.status.toLowerCase()}`}>
                        {intern.status}
                      </span>
                      {intern.on_leave && (
                        <span className="leave-badge">On Leave</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="intern-actions">
                    <button
                      onClick={() => handleStatusToggle(intern)}
                      className={`status-button ${intern.status.toLowerCase()}`}
                    >
                      {intern.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                    
                    <button
                      onClick={() => handleLeaveToggle(intern)}
                      className={`leave-button ${intern.on_leave ? 'on-leave' : 'available'}`}
                    >
                      {intern.on_leave ? 'End Leave' : 'Mark on Leave'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>© 2024 Intern Tracker. Simple intern management.</p>
      </footer>
    </div>
  );
}

export default App;