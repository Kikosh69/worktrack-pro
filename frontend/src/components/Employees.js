import React, { useState } from 'react';

// Tu je ukážka dát, v skutočnosti načítaj zamestnancov z backendu alebo props
const mockEmployees = [
  {
    id: 1,
    meno: "Ján",
    priezvisko: "Novák",
    rodneCislo: "900101/1234",
    ica: "12345678",
    telefon: "0903123456",
    adresa: "Hlavná 1, Bratislava",
    profesia: "Programátor"
  },
  // ... ďalší zamestnanci
];

function Employees() {
  const [search, setSearch] = useState({
    rodneCislo: '',
    ica: '',
    meno: '',
    priezvisko: '',
    telefon: '',
    adresa: '',
    profesia: ''
  });

  const [employees] = useState(mockEmployees);

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const filteredEmployees = employees.filter(emp =>
    (!search.rodneCislo || emp.rodneCislo.includes(search.rodneCislo)) &&
    (!search.ica || emp.ica.includes(search.ica)) &&
    (!search.meno || emp.meno.toLowerCase().includes(search.meno.toLowerCase())) &&
    (!search.priezvisko || emp.priezvisko.toLowerCase().includes(search.priezvisko.toLowerCase())) &&
    (!search.telefon || emp.telefon.includes(search.telefon)) &&
    (!search.adresa || emp.adresa.toLowerCase().includes(search.adresa.toLowerCase())) &&
    (!search.profesia || (emp.profesia && emp.profesia.toLowerCase().includes(search.profesia.toLowerCase())))
  );

  return (
    <div className="container mt-5">
      <h2>Zamestnanci</h2>
      <fieldset className="mb-4">
        <legend>Vyhľadávanie</legend>
        <div className="row">
          <div className="col-md-4 mb-2">
            <input name="rodneCislo" className="form-control" placeholder="Rodné číslo" value={search.rodneCislo} onChange={handleChange} />
          </div>
          <div className="col-md-4 mb-2">
            <input name="ica" className="form-control" placeholder="IČA" value={search.ica} onChange={handleChange} />
          </div>
          <div className="col-md-4 mb-2">
            <input name="meno" className="form-control" placeholder="Meno" value={search.meno} onChange={handleChange} />
          </div>
          <div className="col-md-4 mb-2">
            <input name="priezvisko" className="form-control" placeholder="Priezvisko" value={search.priezvisko} onChange={handleChange} />
          </div>
          <div className="col-md-4 mb-2">
            <input name="telefon" className="form-control" placeholder="Telefón" value={search.telefon} onChange={handleChange} />
          </div>
          <div className="col-md-4 mb-2">
            <input name="adresa" className="form-control" placeholder="Adresa" value={search.adresa} onChange={handleChange} />
          </div>
          <div className="col-md-4 mb-2">
            <input name="profesia" className="form-control" placeholder="Profesia" value={search.profesia} onChange={handleChange} />
          </div>
        </div>
      </fieldset>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Meno</th>
            <th>Priezvisko</th>
            <th>Rodné číslo</th>
            <th>IČA</th>
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
                <td>{emp.ica}</td>
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

export default Employees;