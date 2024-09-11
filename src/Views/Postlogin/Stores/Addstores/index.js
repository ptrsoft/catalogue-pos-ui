import React, { useState } from 'react';
import { ContentLayout, Box, ColumnLayout, SpaceBetween } from '@cloudscape-design/components';
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import Button from "@cloudscape-design/components/button";
import Icon from "@cloudscape-design/components/icon";
import { useNavigate } from "react-router-dom";
import image from '../../../../assets/img/jpg-svgrepo-com 1.png';
import { useDispatch } from 'react-redux';
import { addStore } from '../../../../Redux-Store/Stores/storeSlice';
import BreadcrumbGroup from "@cloudscape-design/components/breadcrumb-group";
import Grid from "@cloudscape-design/components/grid";
import Multiselect from "@cloudscape-design/components/multiselect";

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
  const [
    selectedOptions,
    setSelectedOptions
  ] = React.useState([
    
  ]);

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
    if (!gstNumber || !/^[A-Za-z0-9]{15}$/.test(gstNumber)) {
      newErrors.gstNumber = 'GST Number is required and must be 15 alphanumeric characters.';
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
    if (selectedOptions.length === 0) {
      newErrors.selectedOptions = 'Cashier is required.';
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
        cashier: selectedOptions.map(option => option.label).join(', '),
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
      if (event.detail && event.detail.selectedOptions) {
        setter(event.detail.selectedOptions);
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
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: "Stores", href: "/app/stores" },
            { text: "Add Stores", href: "#" },
          ]}
          ariaLabel="Breadcrumbs"
        />
      }
      header={<Header variant="h1"
        description="Add Your Stores"
        actions=  {isSubmitted && (
          <Button variant="primary" onClick={handleGoToStores}>
            Go To Stores
          </Button>
        )}
                 >{isSubmitted ? 'Congratulations' : 'Add Stores'}
                
      </Header>
    }
      
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
          </div>
        </Container>
      ) : (
        <Container>
          
          <div style={{height: "2.8rem"}}>
              <Box float="left" >
             <h3>Add Here!</h3>          
                    </Box>
              <Box float='right'>
              <button
                      style={{
                          color: 'white',
                          border: '2px solid red',   
                          fontWeight: 'bold',
                          height: '32px', 
                          width: '100px', 
                          borderRadius: '16px',
                          background: 'red',
                          cursor: 'pointer',
                          marginRight: '0.5rem'
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
<SpaceBetween size='xxl' >
<Grid
      
      gridDefinition={[
        { colspan: { default: 6, xxs: 2 } },
        { colspan: { default: 12, xxs: 9 } }
      ]}
    >
             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
  <img
    src={image}
    alt="Generative AI assistant"
    style={{ height: '80px', width: '80px' }}
  />
</div>

                 <div>
           <ColumnLayout columns={3} minColumnWidth={100} >
                <FormField
                  label="Store ID (Generated By Default)"
                  errorText={errors.storeId}
                >
                  <Input
                    value={storeId}
                    onChange={handleChange(setStoreId, 'storeId')}
                  />
                </FormField>
                <FormField
                  label="Store Name"
                  errorText={errors.storeName}
                >
                  <Input
                    value={storeName}
                    onChange={handleChange(setStoreName, 'storeName')}
                  />
                </FormField>
                <FormField
  label="Store Contact Number"
  errorText={errors.contactNumber}
>
  <Input
    value={contactNumber}
    onChange={handleChange(setContactNumber, 'contactNumber')}
  />
</FormField>
                <FormField
                  label="FSSAI Licence"
                  errorText={errors.fssaiLicence}
                >
                  <Input
                    value={fssaiLicence}
                    onChange={handleChange(setFssaiLicence, 'fssaiLicence')}
                  />
                </FormField>
               
                <FormField
                  label={
                    <span>
                      GST Number <i>- optional</i>{" "}
                    </span>
                  }
                  errorText={errors.gstNumber}
                >
                  <Input
                    value={gstNumber}
                    onChange={handleChange(setGstNumber, 'gstNumber')}
                  />
                </FormField>
                </ColumnLayout>
                </div>
                </Grid>

                <Grid
      
      gridDefinition={[
        { colspan: { default: 6, xxs: 2 } },
        { colspan: { default: 12, xxs: 5 } }
      ]}
    >
      <div><h3>Add User!</h3></div>
            <div>
            <FormField
  errorText={errors.selectedOptions}
>
  <Multiselect
    selectedOptions={selectedOptions}
    onChange={handleChange(setSelectedOptions, 'selectedOptions')}
    options={[
      { label: 'Nandini', value: 'Nandini' },
      { label: 'Dandini', value: 'Dandini' },
      { label: 'Sagar', value: 'Sagar' },
      { label: 'Guru', value: 'Guru' },
    ]}
    placeholder="Choose option"
    selectedAriaLabel="Selected"
  />
</FormField>
            </div>
            </Grid>

            <Grid
      
      gridDefinition={[
        { colspan: { default: 6, xxs: 2 } },
        { colspan: { default: 12, xxs: 9 } }
      ]}
    >
        <div><h3>Address</h3></div>
        <ColumnLayout columns={3} minColumnWidth={100}>
        <FormField
                    label="Address"
                    errorText={errors.address}
                  >
                    <Input
                      value={address}
                      onChange={handleChange(setAddress, 'address')}
                    />
                  </FormField>
                  
                  <FormField
                    label="Branch Location"
                    errorText={errors.branchLocation}
                  >
                    <Input
                      value={branchLocation}
                      onChange={handleChange(setBranchLocation, 'branchLocation')}
                    />
                  </FormField>

                  <FormField
                    label="Postal Code"
                    errorText={errors.postalCode}
                  >
                    <Input
                      value={postalCode}
                      onChange={handleChange(setPostalCode, 'postalCode')}
                    />
                  </FormField>
                  <FormField
                    label="District"
                    errorText={errors.district}
                  >
                    <Input
                      value={district}
                      onChange={handleChange(setDistrict, 'district')}
                    />
                  </FormField>
                  <FormField
                    label="State"
                    errorText={errors.state}
                  >
                    <Input
                      value={state}
                      onChange={handleChange(setState, 'state')}
                    />
                  </FormField>

                  </ColumnLayout>
                  </Grid>

                  </SpaceBetween>
          </Container>
        )}
    </ContentLayout>
  );
};

export default Addstores;
