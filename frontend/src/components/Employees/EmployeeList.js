import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Mock zamestnanci, v reálnej app ich načítaj z backendu alebo MongoDB
const mockEmployees = [
  {
    id: 1,
    meno: "Ján",
    priezvisko: "Novák",
    rodneCislo: "900101/1234",
    ico: "12345678",
    telefon: "0903123456",
    adresa: "Hlavná 1, Bratislava",
    profesia: "Programátor"
  },
  // ... ďalší zamestnanci
];

export default function EmployeeList() {
  // Vyhľadávacie polia
  const [search, setSearch] = useState({
    rodneCislo: '',
    ico: '',
    meno: '',
    priezvisko: '',
    telefon: '',
    adresa: '',
    profesia: ''
  });
  // Filter, ktorý sa použije až po kliknutí na Vyhľadať
  const [appliedFilter, setAppliedFilter] = useState({ ...search });

  const [employees] = useState(mockEmployees);

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setAppliedFilter({ ...search });
  };

  const filteredEmployees = employees.filter(emp =>
    (!appliedFilter.rodneCislo || emp.rodneCislo.includes(appliedFilter.rodneCislo)) &&
    (!appliedFilter.ico || emp.ico.includes(appliedFilter.ico)) &&
    (!appliedFilter.meno || emp.meno.toLowerCase().includes(appliedFilter.meno.toLowerCase())) &&
    (!appliedFilter.priezvisko || emp.priezvisko.toLowerCase().includes(appliedFilter.priezvisko.toLowerCase())) &&
    (!appliedFilter.telefon || emp.telefon.includes(appliedFilter.telefon)) &&
    (!appliedFilter.adresa || emp.adresa.toLowerCase().includes(appliedFilter.adresa.toLowerCase())) &&
    (!appliedFilter.profesia || (emp.profesia && emp.profesia.toLowerCase().includes(appliedFilter.profesia.toLowerCase())))
  );

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Zamestnanci</h2>
        <Link to="/add-employee" className="btn btn-success">
          <i className="bi bi-plus-lg"></i> Pridať zamestnanca
        </Link>
      </div>

      {/* Vyhľadávacie polia */}
      <form onSubmit={handleSearch}>
        <fieldset className="mb-4">
          <legend>Vyhľadávanie</legend>
          <div className="row">
            <div className="col-md-3 mb-2">
              <input name="rodneCislo" className="form-control" placeholder="Rodné číslo" value={search.rodneCislo} onChange={handleChange} />
            </div>
            <div className="col-md-3 mb-2">
              <input name="ico" className="form-control" placeholder="IČO" value={search.ico} onChange={handleChange} />
            </div>
            <div className="col-md-3 mb-2">
              <input name="meno" className="form-control" placeholder="Meno" value={search.meno} onChange={handleChange} />
            </div>
            <div className="col-md-3 mb-2">
              <input name="priezvisko" className="form-control" placeholder="Priezvisko" value={search.priezvisko} onChange={handleChange} />
            </div>
            <div className="col-md-3 mb-2">
              <input name="telefon" className="form-control" placeholder="Telefón" value={search.telefon} onChange={handleChange} />
            </div>
            <div className="col-md-3 mb-2">
              <input name="adresa" className="form-control" placeholder="Adresa" value={search.adresa} onChange={handleChange} />
            </div>
            <div className="col-md-3 mb-2">
              <input name="profesia" className="form-control" placeholder="Profesia" value={search.profesia} onChange={handleChange} />
            </div>
            <div className="col-md-3 mb-2 d-flex align-items-end">
              <button type="submit" className="btn btn-primary w-100">
                <i className="bi bi-search"></i> Vyhľadať
              </button>
            </div>
          </div>
        </fieldset>
      </form>

      {/* Tabuľka zamestnancov */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Meno</th>
            <th>Priezvisko</th>
            <th>Rodné číslo</th>
            <th>IČO</th>
            <th>Telefón</th>
            <th>Adresa</th>
            <th>Profesia</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length === 0 ? (
            <tr>
              <td colSpan={7}>Žiadny zamestnanec nevyhovuje filtru</td>
            </tr>
          ) : (
            filteredEmployees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.meno}</td>
                <td>{emp.priezvisko}</td>
                <td>{emp.rodneCislo}</td>
                <td>{emp.ico}</td>
                <td>{emp.telefon}</td>
                <td>{emp.adresa}</td>
                <td>{emp.profesia}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}