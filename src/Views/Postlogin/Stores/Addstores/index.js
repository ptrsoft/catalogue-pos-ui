import React, { useState } from 'react';
import { ContentLayout, Box } from '@cloudscape-design/components';
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import Button from "@cloudscape-design/components/button";
import Icon from "@cloudscape-design/components/icon";
import { useNavigate } from "react-router-dom";
import Select from "@cloudscape-design/components/select";
import image from '../../../../assets/img/jpg-svgrepo-com 1.png';
import { useDispatch } from 'react-redux';
import { addStore } from '../../../../Redux-Store/Stores/storeSlice';

const Addstores = () => {
  const [storeId, setStoreId] = useState('');
  const [fssaiLicence, setFssaiLicence] = useState('');
  const [storeName, setStoreName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [branchLocation, setBranchLocation] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const [errors, setErrors] = useState({
    storeId: '',
    fssaiLicence: '',
    storeName: '',
    gstNumber: '',
    contactNumber: '',
    address: '',
    district: '',
    branchLocation: '',
    state: '',
    postalCode: '',
    selectedOption: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/app/stores');
  };

  const handleConfirm = () => {
    let valid = true;
    const newErrors = {};

    if (!storeId) {
      newErrors.storeId = 'Store ID is required.';
      valid = false;
    }
    if (!fssaiLicence) {
      newErrors.fssaiLicence = 'FSSAI Licence is required.';
      valid = false;
    }
    if (!storeName) {
      newErrors.storeName = 'Store Name is required.';
      valid = false;
    }
    if (!gstNumber || !/^[0-9]{15}$/.test(gstNumber)) {
      newErrors.gstNumber = 'GST Number is required and must be 15 digits long.';
      valid = false;
    }
    if (!contactNumber || !/^[0-9]{10}$/.test(contactNumber)) {
      newErrors.contactNumber = 'Contact Number is required and must be 10 digits long.';
      valid = false;
    }
    if (!address) {
      newErrors.address = 'Address is required.';
      valid = false;
    }
    if (!district) {
      newErrors.district = 'District is required.';
      valid = false;
    }
    if (!branchLocation) {
      newErrors.branchLocation = 'Branch Location is required.';
      valid = false;
    }
    if (!state) {
      newErrors.state = 'State is required.';
      valid = false;
    }
    if (!postalCode) {
      newErrors.postalCode = 'Postal Code is required.';
      valid = false;
    }
    if (!selectedOption) {
      newErrors.selectedOption = 'Cashier is required.';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      const newStore = {
        id: storeId,
        fssaiLicence,
        name: storeName,
        gstNumber,
        contactNumber,
        address,
        district,
        branchLocation,
        state,
        postalCode,
        status: 'Active',
        cashier: selectedOption ? selectedOption.label : '',
      };
      dispatch(addStore(newStore));
      setIsSubmitted(true);
    }
  };

  const handleGoToStores = () => {
    navigate('/app/stores');
  };

  const handleChange = (setter, fieldName) => (event) => {
    if (event && typeof event === 'object') {
      if (event.detail && event.detail.selectedOption) {
        setter(event.detail.selectedOption);
        if (fieldName) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: ''
          }));
        }
      } else if (event.target && 'value' in event.target) {
        setter(event.target.value);
        if (fieldName) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: ''
          }));
        }
      } else if (event.detail && 'value' in event.detail) {
        setter(event.detail.value);
        if (fieldName) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: ''
          }));
        }
      } else {
        console.error('Unexpected event object:', event);
      }
    } else {
      console.error('Unexpected event object:', event);
    }
  };

  return (
    <ContentLayout
      headerVariant="high-contrast"
      header={<Header variant="h3">{isSubmitted ? 'Congratulations' : 'Add here!'}</Header>}
    >
      {isSubmitted ? (
        <Container>
          <div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', margin: '10rem' }}
          >
            <Icon
              name="status-positive"
              size="large"
              variant="link"
              style={{ fontWeight: 'bold' }}
            />
            <h2 style={{ margin: '1rem 0' }}>Success!</h2>
            <p style={{ fontWeight: 'bold' }}>New Store Added Successfully</p>
            <p style={{ marginBottom: '1rem' }}>You can view the newly added store in the "Stores Screen"</p>
            <Button variant='primary' onClick={handleGoToStores}>Go To Stores</Button>
          </div>
        </Container>
      ) : (
        <Container>
          <Box
            padding={{ vertical: 's', horizontal: 's' }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Header variant='h3'>Add here!</Header>
              </div>
              <Box>
                <button
                  style={{
                    backgroundColor: 'white',
                    color: 'red',
                    border: '2.5px solid red',
                    borderRadius: '40%',
                    height: '30px',
                    width: '80px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <Button
                  variant="link"
                  onClick={handleConfirm}
                >
                  Confirm
                </Button>
              </Box>
            </div>

            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
              <img
                src={image}
                alt="Generative AI assistant"
                style={{ height: '100px', width: '100px' }}
              />

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <FormField
                  label="Store ID (Generated By Default)"
                  style={{ width: '100%', marginBottom: '1rem' }}
                  errorText={errors.storeId}
                >
                  <Input
                    value={storeId}
                    onChange={handleChange(setStoreId, 'storeId')}
                  />
                </FormField>

                <FormField
                  label="FSSAI Licence"
                  style={{ width: '100%', marginBottom: '1rem' }}
                  errorText={errors.fssaiLicence}
                >
                  <Input
                    value={fssaiLicence}
                    onChange={handleChange(setFssaiLicence, 'fssaiLicence')}
                  />
                </FormField>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <FormField
                  label="Store Name"
                  style={{ width: '100%', marginBottom: '1rem' }}
                  errorText={errors.storeName}
                >
                  <Input
                    value={storeName}
                    onChange={handleChange(setStoreName, 'storeName')}
                  />
                </FormField>

                <FormField
                  label={
                    <span>
                      GST Number <i>- optional</i>{" "}
                    </span>
                  }
                  style={{ width: '100%', marginBottom: '1rem' }}
                  errorText={errors.gstNumber}
                >
                  <Input
                    value={gstNumber}
                    onChange={handleChange(setGstNumber, 'gstNumber')}
                  />
                </FormField>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <FormField
                  label="Contact Number"
                  style={{ width: '100%', marginBottom: '1rem' }}
                  errorText={errors.contactNumber}
                >
                  <Input
                    value={contactNumber}
                    onChange={handleChange(setContactNumber, 'contactNumber')}
                  />
                </FormField>
              </div>
            </div>

            <Box
              padding={{ vertical: 's', horizontal: 's' }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Header variant='h3'>Cashier</Header>
                </div>
              </div>

              <div style={{ width: '80%', marginLeft: "14%" }}>
                <FormField errorText={errors.selectedOption}>
                  <Select
                    options={[
                      { label: "Raj kumar", value: "1" },
                      { label: "john", value: "2" },
                      { label: "smith johnson", value: "3" },
                      { label: "roman", value: "4" },
                      { label: "shaistha samreen", value: "5" }
                    ]}
                    onChange={handleChange(setSelectedOption, 'selectedOption')}
                    selectedOption={selectedOption}
                  />
                </FormField>
              </div>
            </Box>

            <Box
              padding={{ vertical: 's', horizontal: 's' }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Header variant='h3'>Address</Header>
                </div>
              </div>

              <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginLeft: '4%' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                  <FormField
                    label="Address"
                    style={{ width: '100%', marginBottom: '1rem' }}
                    errorText={errors.address}
                  >
                    <Input
                      value={address}
                      onChange={handleChange(setAddress, 'address')}
                    />
                  </FormField>

                  <FormField
                    label="District"
                    style={{ width: '100%', marginBottom: '1rem' }}
                    errorText={errors.district}
                  >
                    <Input
                      value={district}
                      onChange={handleChange(setDistrict, 'district')}
                    />
                  </FormField>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <FormField
                    label="Branch Location"
                    style={{ width: '100%', marginBottom: '1rem' }}
                    errorText={errors.branchLocation}
                  >
                    <Input
                      value={branchLocation}
                      onChange={handleChange(setBranchLocation, 'branchLocation')}
                    />
                  </FormField>

                  <FormField
                    label="State"
                    style={{ width: '100%', marginBottom: '1rem' }}
                    errorText={errors.state}
                  >
                    <Input
                      value={state}
                      onChange={handleChange(setState, 'state')}
                    />
                  </FormField>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <FormField
                    label="Postal Code"
                    style={{ width: '100%', marginBottom: '1rem' }}
                    errorText={errors.postalCode}
                  >
                    <Input
                      value={postalCode}
                      onChange={handleChange(setPostalCode, 'postalCode')}
                    />
                  </FormField>
                </div>
              </div>
            </Box>
            </Box>

          </Container>
        )}
    </ContentLayout>
  );
};

export default Addstores;
