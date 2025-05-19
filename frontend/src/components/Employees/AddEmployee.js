import React, { useState } from 'react';

function AddEmployee() {
  const [personalData, setPersonalData] = useState({});
  const [contactData, setContactData] = useState({});
  const [addresses, setAddresses] = useState({});
  const [marketing, setMarketing] = useState({});

  const handlePersonalChange = (e) => {
    setPersonalData({ ...personalData, [e.target.name]: e.target.value });
  };
  const handleContactChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };
  const handleAddressChange = (e) => {
    setAddresses({ ...addresses, [e.target.name]: e.target.value });
  };
  const handleMarketingChange = (e) => {
    setMarketing({ ...marketing, [e.target.name]: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...personalData,
      ...contactData,
      ...addresses,
      ...marketing
    };
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 850 }}>
      <h2>Pridať zamestnanca</h2>
      <form onSubmit={handleSubmit}>

        {/* OSOBNÉ ÚDAJE */}
        <fieldset className="mb-4">
          <legend>Osobné údaje</legend>
          <div className="row">
            <div className="col-md-6 mb-2">
              <label>Titul pred menom:</label>
              <input name="titulPred" type="text" className="form-control" onChange={handlePersonalChange} />
            </div>
            <div className="col-md-6 mb-2">
              <label>Titul za menom:</label>
              <input name="titulZa" type="text" className="form-control" onChange={handlePersonalChange} />
            </div>
            <div className="col-md-6 mb-2">
              <label>Meno klienta:</label>
              <input name="meno" type="text" className="form-control" onChange={handlePersonalChange} />
            </div>
            <div className="col-md-6 mb-2">
              <label>Priezvisko klienta:</label>
              <input name="priezvisko" type="text" className="form-control" onChange={handlePersonalChange} />
            </div>
            <div className="col-md-6 mb-2">
              <label>Rodné priezvisko:</label>
              <input name="rodnePriezvisko" type="text" className="form-control" onChange={handlePersonalChange} />
            </div>
            <div className="col-md-6 mb-2">
              <label>Štátna príslušnosť:</label>
              <input name="statnaPrislusnost" type="text" className="form-control" onChange={handlePersonalChange} />
            </div>
            <div className="col-md-6 mb-2">
              <label>Miesto narodenia:</label>
              <input name="miestoNarodenia" type="text" className="form-control" onChange={handlePersonalChange} />
            </div>
            <div className="col-md-6 mb-2">
              <label>Krajina narodenia:</label>
              <input name="krajinaNarodenia" type="text" className="form-control" onChange={handlePersonalChange} />
            </div>
            <div className="col-md-6 mb-2">
              <label>Typ dokladu:</label>
              <input name="typDokladu" type="text" className="form-control" onChange={handlePersonalChange} />
            </div>
            <div className="col-md-6 mb-2">
              <label>Rodné číslo:</label>
              <input name="rodneCislo" type="text" className="form-control" onChange={handlePersonalChange} />
            </div>
          </div>
        </fieldset>
        
        {/* KONTAKTNÉ ÚDAJE */}
        <fieldset className="mb-4">
          <legend>Kontaktné údaje</legend>
          <div className="row">
            <div className="col-md-6 mb-2">
              <label>Mobil:</label>
              <input name="mobil" type="tel" className="form-control" onChange={handleContactChange} />
            </div>
            <div className="col-md-6 mb-2">
              <label>E-mail:</label>
              <input name="email" type="email" className="form-control" onChange={handleContactChange} />
            </div>
          </div>
        </fieldset>

        {/* ADRESY */}
        <fieldset className="mb-4">
          <legend>Adresy</legend>
          <div className="row">
            <div className="col-md-6 mb-2">
              <label>Ulica:</label>
              <input name="ulica" type="text" className="form-control" onChange={handleAddressChange} />
            </div>
            <div className="col-md-2 mb-2">
              <label>Číslo:</label>
              <input name="cislo" type="text" className="form-control" onChange={handleAddressChange} />
            </div>
            <div className="col-md-4 mb-2">
              <label>Mesto:</label>
              <input name="mesto" type="text" className="form-control" onChange={handleAddressChange} />
            </div>
            <div className="col-md-6 mb-2">
              <label>PSČ:</label>
              <input name="psc" type="text" className="form-control" onChange={handleAddressChange} />
            </div>
            <div className="col-md-6 mb-2">
              <label>Štát:</label>
              <input name="stat" type="text" className="form-control" onChange={handleAddressChange} />
            </div>
          </div>
        </fieldset>

        {/* MARKETING */}
        <fieldset className="mb-4">
          <legend>Marketing</legend>
          <div className="row">
            <div className="col-md-6 mb-2">
              <label>
                <input name="marketingPonuky" type="checkbox" onChange={handleMarketingChange} /> Oslovovať marketingovými ponukami
              </label>
            </div>
            <div className="col-md-6 mb-2">
              <label>
                <input name="suhlasSpracovanie" type="checkbox" onChange={handleMarketingChange} /> Súhlas so spracovaním osobných údajov
              </label>
            </div>
          </div>
        </fieldset>

        <button type="submit" className="btn btn-primary">Uložiť zamestnanca</button>
      </form>
    </div>
  );
}

export default AddEmployee;