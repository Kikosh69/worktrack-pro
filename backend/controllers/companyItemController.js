const CompanyItem = require('../models/CompanyItem');

exports.getAllCompanyItems = async (req, res) => {
  try {
    const companyItems = await CompanyItem.find();
    res.json(companyItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCompanyItem = async (req, res) => {
  const companyItem = new CompanyItem({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category
  });

  try {
    const newCompanyItem = await companyItem.save();
    res.status(201).json(newCompanyItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getCompanyItemById = async (req, res) => {
  try {
    const companyItem = await CompanyItem.findById(req.params.id);
    if (companyItem == null) {
      return res.status(404).json({ message: 'Cannot find company item' });
    }
    res.json(companyItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCompanyItem = async (req, res) => {
  try {
    const companyItem = await CompanyItem.findById(req.params.id);
    if (companyItem == null) {
      return res.status(404).json({ message: 'Cannot find company item' });
    }

    if (req.body.name != null) {
      companyItem.name = req.body.name;
    }
    if (req.body.description != null) {
      companyItem.description = req.body.description;
    }
    if (req.body.category != null) {
      companyItem.category = req.body.category;
    }

    const updatedCompanyItem = await companyItem.save();
    res.json(updatedCompanyItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCompanyItem = async (req, res) => {
  try {
    const companyItem = await CompanyItem.findById(req.params.id);
    if (companyItem == null) {
      return res.status(404).json({ message: 'Cannot find company item' });
    }

    await companyItem.remove();
    res.json({ message: 'Deleted Company Item' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};