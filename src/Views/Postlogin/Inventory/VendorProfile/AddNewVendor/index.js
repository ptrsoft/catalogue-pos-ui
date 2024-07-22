import React, { Component } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { ValidationEngine } from "Utils/helperFunctions";

const validationSchema = {
  vendorName: [
    {
      message: "Please enter vendor name",
      type: ValidationEngine.type.MANDATORY,
    },
  ],
  contactPerson: [
    {
      message: "Please enter contact person",
      type: ValidationEngine.type.MANDATORY,
    },
  ],
  phone: [
    {
      message: "Please enter phone number",
      type: ValidationEngine.type.MANDATORY,
    },
    {
      message: "Please enter valid phone number",
      type: ValidationEngine.type.REGEX,
      regex: ValidationEngine.MOBILE_NUMBER_REGEX,
    },
  ],
  email: [
    {
      message: "Please enter email",
      type: ValidationEngine.type.MANDATORY,
    },
    {
      message: "Please enter valid email",
      type: ValidationEngine.type.REGEX,
      regex: ValidationEngine.EMAIL_REGEX,
    },
  ],
  address: [
    {
      message: "Please enter contact person",
      type: ValidationEngine.type.MANDATORY,
    },
  ],
  city: [
    {
      message: "Please enter contact person",
      type: ValidationEngine.type.MANDATORY,
    },
  ],
  postalCode: [
    {
      message: "Please enter contact person",
      type: ValidationEngine.type.MANDATORY,
    },
  ],
  country: [
    {
      message: "Please enter contact person",
      type: ValidationEngine.type.MANDATORY,
    },
  ],
};

class AddNewVendor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vendorName: "",
      contactPerson: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      isSubmitted: false,
    };
  }

  handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === "checkbox" ? checked : value;
    this.setState({ [name]: val });
  };

  validateForm = () => {
    const {
      vendorName,
      contactPerson,
      phone,
      email,
      address,
      city,
      postalCode,
      country,
    } = this.state;
    const error = ValidationEngine.validate(validationSchema, {
      vendorName,
      contactPerson,
      phone,
      email,
      address,
      city,
      postalCode,
      country,
    });
    return error;
  };

  handleSubmit = () => {
    const errorData = this.validateForm();
    this.setState({
      isSubmitted: true,
    });
    if (errorData.isValid) {
    }
  };

  render() {
    const errorData = this.validateForm();
    const {
      vendorName,
      contactPerson,
      phone,
      email,
      address,
      city,
      postalCode,
      country,
      isSubmitted,
    } = this.state;

    return (
      <div className="main-container">
        <div className="add-new-container">
          <div className="heading">
            <h2>Add New Vendor</h2>
          </div>
          <div className="add-new-form-container">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box className="form-text-field">
                  <label>Enter Vendor Name</label>
                  <TextField
                    name="vendorName"
                    value={vendorName}
                    onChange={this.handleChange}
                    className="text-field"
                    error={!errorData.vendorName.isValid && isSubmitted}
                    helperText={isSubmitted ? errorData.vendorName.message : ""}
                    defaultValue={vendorName}
                    placeholder="HealthSupplies Inc"
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box className="form-text-field">
                  <label>Enter Contact Person</label>
                  <TextField
                    name="contactPerson"
                    value={contactPerson}
                    onChange={this.handleChange}
                    className="text-field"
                    error={!errorData.contactPerson.isValid && isSubmitted}
                    helperText={
                      isSubmitted ? errorData.contactPerson.message : ""
                    }
                    defaultValue={contactPerson}
                    placeholder="John Doe"
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box className="form-text-field">
                  <label>Enter Phone</label>
                  <TextField
                    type="number"
                    name="phone"
                    value={phone}
                    onChange={this.handleChange}
                    className="text-field"
                    error={!errorData.phone.isValid && isSubmitted}
                    helperText={isSubmitted ? errorData.phone.message : ""}
                    defaultValue={phone}
                    placeholder="+1 (123)-456-789"
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box className="form-text-field">
                  <label>Enter Email</label>
                  <TextField
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                    className="text-field"
                    error={!errorData.email.isValid && isSubmitted}
                    helperText={isSubmitted ? errorData.email.message : ""}
                    defaultValue={email}
                    placeholder="info@brainmd.com"
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box className="form-text-field">
                  <label>Enter Address</label>
                  <TextField
                    name="address"
                    value={address}
                    onChange={this.handleChange}
                    className="text-field"
                    error={!errorData.address.isValid && isSubmitted}
                    helperText={isSubmitted ? errorData.address.message : ""}
                    defaultValue={address}
                    placeholder="1234 Stm El"
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box className="form-text-field">
                  <label>Enter City</label>
                  <TextField
                    select
                    name="city"
                    value={city}
                    onChange={this.handleChange}
                    className="text-field"
                    error={!errorData.city.isValid && isSubmitted}
                    helperText={isSubmitted ? errorData.city.message : ""}
                    defaultValue={city}
                    placeholder="Select City"
                  >
                    <MenuItem value="City1">City1</MenuItem>
                    <MenuItem value="City2">City2</MenuItem>
                    <MenuItem value="City3">City3</MenuItem>
                  </TextField>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box className="form-text-field">
                  <label>Enter Postal Code</label>
                  <TextField
                    select
                    name="postalCode"
                    value={postalCode}
                    onChange={this.handleChange}
                    className="text-field"
                    error={!errorData.postalCode.isValid && isSubmitted}
                    helperText={isSubmitted ? errorData.postalCode.message : ""}
                    defaultValue={postalCode}
                    placeholder="Select State"
                  >
                    <MenuItem value="Postal1">Postal1</MenuItem>
                    <MenuItem value="Postal2">Postal2</MenuItem>
                    <MenuItem value="Postal3">Postal3</MenuItem>
                  </TextField>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box className="form-text-field">
                  <label>Enter Country</label>
                  <TextField
                    select
                    name="country"
                    value={country}
                    onChange={this.handleChange}
                    className="text-field"
                    error={!errorData.country.isValid && isSubmitted}
                    helperText={isSubmitted ? errorData.country.message : ""}
                    defaultValue={country}
                    placeholder="Select Country"
                  >
                    <MenuItem value="Country1">Country1</MenuItem>
                    <MenuItem value="Country2">Country2</MenuItem>
                    <MenuItem value="Country3">Country3</MenuItem>
                  </TextField>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className="add-new-form-btn">
                  <Button className="btn-outline-secondary" variant="outlined">
                    Cancel
                  </Button>
                  <Button
                    className="primary-btn"
                    variant="contained"
                    onClick={this.handleSubmit}
                  >
                    Save
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default AddNewVendor;
