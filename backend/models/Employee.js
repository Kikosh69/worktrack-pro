const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  titulPred: String,
  titulZa: String,
  meno: { type: String, required: true },
  priezvisko: { type: String, required: true },
  rodnePriezvisko: String,
  statnaPrislusnost: String,
  miestoNarodenia: String,
  krajinaNarodenia: String,
  typDokladu: String,
  rodneCislo: { type: String, required: true },
  mobil: String,
  email: String,
  ulica: String,
  cislo: String,
  mesto: String,
  psc: String,
  stat: String,
  marketingPonuky: Boolean,
  suhlasSpracovanie: Boolean
});

module.exports = mongoose.model('Employee', employeeSchema);