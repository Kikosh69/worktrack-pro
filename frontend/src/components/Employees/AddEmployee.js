import React, { useState } from 'react';

function AddEmployee() {
  const [personalData, setPersonalData] = useState({});
  const [contactData, setContactData] = useState({});
  const [addresses, setAddresses] = useState({});
  const [marketing, setMarketing] = useState({});
  const [message, setMessage] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...personalData,
      ...contactData,
      ...addresses,
      ...marketing
    };
    // Debug: Zobraziť payload v konzole
    console.log('Odosielané dáta:', data);
    try {
      const res = await fetch('http://localhost:5001/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        const errRes = await res.json();
        throw new Error(errRes.error || 'Chyba pri ukladaní');
      }
      setMessage('Zamestnanec uložený!');
      setPersonalData({});
      setContactData({});
      setAddresses({});
      setMarketing({});
    } catch (err) {
      setMessage('Chyba pri ukladaní zamestnanca: ' + err.message);
    }
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
              <input name="titulPred" type="text" className="form-control" onChange={handlePersonalChange} value={personalData.titulPred || ''} />
            </div>
            <div className="col-md-6 mb-2">
              <label>Titul za menom:</label>
              <input name="titulZa" type="text" className="form-control" onChange={handlePersonalChange} value={personalData.titulZa || ''} />
            </div>
            <div className="col-md-6 mb-2">
              <label>Meno klienta:</label>
              <input name="meno" type="text" className="form-control" onChange={handlePersonalChange} value={personalData.meno || ''} required />
            </div>
            <div className="col-md-6 mb-2">
              <label>Priezvisko klienta:</label>
              <input name="priezvisko" type="text" className="form-control" onChange={handlePersonalChange} value={personalData.priezvisko || ''} required />
            </div>
            <div className="col-md-6 mb-2">
              <label>Rodné priezvisko:</label>
              <input name="rodnePriezvisko" type="text" className="form-control" onChange={handlePersonalChange} value={personalData.rodnePriezvisko || ''} />
            </div>
            <div className="col-md-6 mb-2">
              <label>Štátna príslušnosť:</label>
              <input name="statnaPrislusnost" type="text" className="form-control" onChange={handlePersonalChange} value={personalData.statnaPrislusnost || ''} />
            </div>
            <div className="col-md-6 mb-2">
              <label>Miesto narodenia:</label>
              <input name="miestoNarodenia" type="text" className="form-control" onChange={handlePersonalChange} value={personalData.miestoNarodenia || ''} />
            </div>
            <div className="col-md-6 mb-2">
              <label>Krajina narodenia:</label>
              <input name="krajinaNarodenia" type="text" className="form-control" onChange={handlePersonalChange} value={personalData.krajinaNarodenia || ''} />
            </div>
            <div className="col-md-6 mb-2">
              <label>Typ dokladu:</label>
              <input name="typDokladu" type="text" className="form-control" onChange={handlePersonalChange} value={personalData.typDokladu || ''} />
            </div>
            <div className="col-md-6 mb-2">
              <label>Rodné číslo:</label>
              <input name="rodneCislo" type="text" className="form-control" onChange={handlePersonalChange} value={personalData.rodneCislo || ''} required />
            </div>
          </div>
        </fieldset>
        {/* KONTAKTNÉ ÚDAJE */}
        <fieldset className="mb-4">
          <legend>Kontaktné údaje</legend>
          <div className="row">
            <div className="col-md-6 mb-2">
              <label>Mobil:</label>
              <input name="mobil" type="tel" className="form-control" onChange={handleContactChange} value={contactData.mobil || ''} />
            </div>
            <div className="col-md-6 mb-2">
              <label>E-mail:</label>
              <input name="email" type="email" className="form-control" onChange={handleContactChange} value={contactData.email || ''} />
            </div>
          </div>
        </fieldset>
        {/* ADRESY */}
        <fieldset className="mb-4">
          <legend>Adresy</legend>
          <div className="row">
            <div className="col-md-6 mb-2">
              <label>Ulica:</label>
              <input name="ulica" type="text" className="form-control" onChange={handleAddressChange} value={addresses.ulica || ''} />
            </div>
            <div className="col-md-2 mb-2">
              <label>Číslo:</label>
              <input name="cislo" type="text" className="form-control" onChange={handleAddressChange} value={addresses.cislo || ''} />
            </div>
            <div className="col-md-4 mb-2">
              <label>Mesto:</label>
              <input name="mesto" type="text" className="form-control" onChange={handleAddressChange} value={addresses.mesto || ''} />
            </div>
            <div className="col-md-6 mb-2">
              <label>PSČ:</label>
              <input name="psc" type="text" className="form-control" onChange={handleAddressChange} value={addresses.psc || ''} />
            </div>
            <div className="col-md-6 mb-2">
              <label>Štát:</label>
              <input name="stat" type="text" className="form-control" onChange={handleAddressChange} value={addresses.stat || ''} />
            </div>
          </div>
        </fieldset>
        {/* MARKETING */}
        <fieldset className="mb-4">
          <legend>Marketing</legend>
          <div className="row">
            <div className="col-md-6 mb-2">
              <label>
                <input name="marketingPonuky" type="checkbox" onChange={handleMarketingChange} checked={!!marketing.marketingPonuky} /> Oslovovať marketingovými ponukami
              </label>
            </div>
            <div className="col-md-6 mb-2">
              <label>
                <input name="suhlasSpracovanie" type="checkbox" onChange={handleMarketingChange} checked={!!marketing.suhlasSpracovanie} /> Súhlas so spracovaním osobných údajov
              </label>
            </div>
          </div>
        </fieldset>
        <button type="submit" className="btn btn-primary">Uložiť zamestnanca</button>
      </form>
      {message && <div className="alert mt-3">{message}</div>}
    </div>
  );
}

export default AddEmployee;