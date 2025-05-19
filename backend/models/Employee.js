const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  // OSOBNÉ ÚDAJE
  titulPred:        { type: String, required: false }, // Nepovinné
  meno:             { type: String, required: true },
  priezvisko:       { type: String, required: true },
  titulZa:          { type: String, required: false }, // Nepovinné
  rodnePriezvisko:  { type: String, required: true },
  statnaPrislusnost:{ type: String, required: true },
  miestoNarodenia:  { type: String, required: true },
  krajinaNarodenia: { type: String, required: true },
  typDokladu:       { type: String, required: true },
  rodneCislo:       { type: String, required: true },

  // KONTAKTNÉ ÚDAJE
  mobil:            { type: String, required: true },
  email:            { type: String, required: true },

  // ADRESY
  ulica:            { type: String, required: true },
  cislo:            { type: String, required: true },
  mesto:            { type: String, required: true },
  psc:              { type: String, required: true },
  stat:             { type: String, required: true },

  // MARKETING
  marketingPonuky:      { type: Boolean, required: true },
  suhlasSpracovanie:    { type: Boolean, required: true }
});

module.exports = mongoose.model('Employee', employeeSchema);