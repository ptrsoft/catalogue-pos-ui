import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import {
  ContentLayout,
  Container,
  Header,
  Grid,
  SpaceBetween,
  Button,
  Multiselect,
  ColumnLayout,
  Table,
  Box,
  TextFilter,
  Pagination,
} from "@cloudscape-design/components";
import Link from "@cloudscape-design/components/link";
import image from "../../../../../assets/img/market.jpeg";
import image1 from "../../../../../assets/img/market1.jpeg";
import image2 from "../../../../../assets/img/market2.jpeg";
import Modal from "@cloudscape-design/components/modal";
import BreadcrumbGroup from "@cloudscape-design/components/breadcrumb-group";

const sampleData = [
  {
    name: "Alice",
    role: "Manager",
    contactnumber: "123-456-7890",
    status: "Active",
  },
];

const Carousel = ({ currentIndex, goToSlide }) => {
  const images = [image, image1, image2];

  useEffect(() => {
    const interval = setInterval(() => {
      goToSlide((currentIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex, goToSlide, images.length]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "200px",
        overflow: "hidden",
        borderRadius: "10px",
        border: "1px solid #000716",
      }}
    >
      <img
        src={images[currentIndex]}
        alt="Market"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
};

const Storedetail = () => {
  const location = useLocation();
  const { storeId } = location.state || {};
  const stores = useSelector((state) => state.newstore.stores || []);
  const [selectedStore, setSelectedStore] = useState(null);
  const [filteringText, setFilteringText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fullName, setfullName] = useState("");
  const [country, setcountry] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [branchLocation, setbranchLocation] = useState("");
  const [contactNumber, setcontactNumber] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [email, setemail] = useState(null);

  useEffect(() => {
    if (storeId) {
      const store = stores.find((store) => store.id === storeId);
      setSelectedStore(store || null);
    }
  }, [storeId, stores]);

  const filteredData = sampleData.filter(
    (item) =>
      item.name.toLowerCase().includes(filteringText.toLowerCase()) ||
      item.role.toLowerCase().includes(filteringText.toLowerCase())
  );

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const renderCarouselIndicators = () => (
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      {Array.from({ length: 3 }).map((_, index) => (
        <span
          key={index}
          onClick={() => goToSlide(index)}
          style={{
            display: "inline-block",
            width: "10px",
            height: "10px",
            margin: "0 5px",
            borderRadius: "50%",
            backgroundColor: index === currentIndex ? "#000716" : "#C0C0C0",
            cursor: "pointer",
          }}
        ></span>
      ))}
    </div>
  );

  const handleChange = (setter, fieldName) => (event) => {
    if (event && typeof event === "object") {
      if (event.detail && event.detail.selectedOptions) {
        setter(event.detail.selectedOptions);
        if (fieldName) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
          }));
        }
      } else if (event.target && "value" in event.target) {
        setter(event.target.value);
        if (fieldName) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
          }));
        }
      } else if (event.detail && "value" in event.detail) {
        setter(event.detail.value);
        if (fieldName) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
          }));
        }
      } else {
        console.error("Unexpected event object:", event);
      }
    } else {
      console.error("Unexpected event object:", event);
    }
  };

  const handleCreate = () => {
    let valid = true;
    const newErrors = {};

    if (!fullName) {
      newErrors.fullName = "Full Name is required.";
      valid = false;
    }
    if (!email) {
      newErrors.email = "email is required.";
      valid = false;
    }
    if (!contactNumber || !/^[0-9]{10}$/.test(contactNumber)) {
      newErrors.contactNumber =
        "Contact Number is required and must be 10 digits long.";
      valid = false;
    }
    if (!address) {
      newErrors.address = "Address is required.";
      valid = false;
    }
    if (!country) {
      newErrors.country = "Country is required.";
      valid = false;
    }
    if (!branchLocation) {
      newErrors.branchLocation = "Branch Location is required.";
      valid = false;
    }
    if (!city) {
      newErrors.city = "City is required.";
      valid = false;
    }
    if (!postalCode) {
      newErrors.postalCode = "Postal Code is required.";
      valid = false;
    }
    if (selectedOptions.length === 0) {
      newErrors.selectedOptions = "option is required.";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      const newUser = {
        id: fullName,
        country,
        contactNumber,
        address,
        city,
        branchLocation,
        postalCode,
        role: selectedOptions.map((option) => option.label).join(", "),
        status: "Active",
      };
      setIsSubmitted(true);
      setModalVisible(false);
      setfullName("");
      setemail("");
      setcontactNumber("");
      setaddress("");
      setbranchLocation("");
      setcity("");
      setcountry("");
      setpostalCode("");
      setSelectedOptions([]);
    }
  };

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    address: "",
    branchLocation: "",
    city: "",
    country: "",
    postalCode: "",
  });

  return (
    <ContentLayout
      headerVariant="high-contrast"
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: "Stores", href: "/app/stores" },
            { text: "Store Detail", href: "#" },
          ]}
          ariaLabel="Breadcrumbs"
        />
      }
      header={
        <Header
          variant="h1"
          description="Manage Single Store Detail"
          actions={
            <Button iconAlign="right" iconName="external" variant="primary">
              View Dashboard
            </Button>
          }
        >
          Store Detail
        </Header>
      }
    >
      <SpaceBetween direction="vertical" size="s">
        <Container className="top-container">
          <Grid
            gridDefinition={[
              { colspan: { default: 4, xxs: 4 } },
              { colspan: { default: 12, xxs: 8 } },
            ]}
          >
            <div>
              <Carousel currentIndex={currentIndex} goToSlide={goToSlide} />
              {renderCarouselIndicators()}
            </div>

            <div>
              <SpaceBetween size="m">
                <div style={{ marginTop: "2rem" }}>
                  <ColumnLayout
                    columns={4}
                    variant="default"
                    minColumnWidth={100}
                  >
                    <div>
                      <Box variant="awsui-key-label">
                        <p style={{ fontSize: 12, color: "gray" }}>
                          Store Name
                        </p>
                      </Box>
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: "900",
                          lineHeight: 1.3,
                        }}
                      >
                        {selectedStore?.name || "N/A"}
                      </span>
                    </div>
                    <div>
                      <Box variant="awsui-key-label">
                        <p style={{ fontSize: 12, color: "gray" }}>
                          Store Manager
                        </p>
                      </Box>
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: "900",
                          lineHeight: 1.3,
                        }}
                      >
                        {selectedStore?.cashier || "N/A"}
                      </span>
                    </div>
                    <div>
                      <Box variant="awsui-key-label">
                        <p style={{ fontSize: 12, color: "gray" }}>
                          Manager Email
                        </p>
                      </Box>
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: "900",
                          lineHeight: 1.3,
                        }}
                      >
                        -
                      </span>
                    </div>
                    <div>
                      <Box variant="awsui-key-label">
                        <p style={{ fontSize: 12, color: "gray" }}>
                          Store Contact Number
                        </p>
                      </Box>
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: "900",
                          lineHeight: 1.3,
                        }}
                      >
                        {selectedStore?.contactNumber || "N/A"}
                      </span>
                    </div>
                  </ColumnLayout>
                </div>
                <div>
                  <ColumnLayout
                    columns={4}
                    variant="default"
                    minColumnWidth={1}
                  >
                    <div>
                      <Box variant="awsui-key-label">
                        <p style={{ fontSize: 12, color: "gray" }}>
                          FSSAI License
                        </p>
                      </Box>
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: "900",
                          lineHeight: 1.3,
                        }}
                      >
                        {selectedStore?.fssaiLicence || "N/A"}
                      </span>
                    </div>
                    <div>
                      <Box variant="awsui-key-label">
                        <p style={{ fontSize: 12, color: "gray" }}>
                          GST Number
                        </p>
                      </Box>
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: "900",
                          lineHeight: 1.3,
                        }}
                      >
                        {selectedStore?.gstNumber || "N/A"}
                      </span>
                    </div>
                    <div>
                      <Box variant="awsui-key-label">
                        <p style={{ fontSize: 12, color: "gray" }}>Address</p>
                      </Box>
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: "900",
                          lineHeight: 1.3,
                        }}
                      >
                        {selectedStore?.address || "N/A"}
                      </span>
                    </div>
                  </ColumnLayout>
                </div>
              </SpaceBetween>
            </div>
          </Grid>
        </Container>

        <Container>
          <Table
            renderAriaLive={({ firstIndex, lastIndex, totalItemsCount }) =>
              `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
            }
            onSelectionChange={({ detail }) =>
              setSelectedItems(detail.selectedItems)
            }
            selectedItems={selectedItems}
            ariaLabels={{
              selectionGroupLabel: "Items selection",
              allItemsSelectionLabel: ({ selectedItems }) =>
                `${selectedItems.length} ${
                  selectedItems.length === 1 ? "item" : "items"
                } selected`,
              itemSelectionLabel: (item) => item.name || "",
            }}
            columnDefinitions={[
              {
                id: "name",
                header: "Name",
                cell: (item) => item.name || "",
                sortingField: "name",
                isRowHeader: true,
              },
              {
                id: "role",
                header: "Role",
                cell: (item) => item.role || "",
                sortingField: "role",
              },
              {
                id: "contactnumber",
                header: "Contact No",
                cell: (item) => item.contactnumber || "",
              },
              {
                id: "status",
                header: "Status",
                cell: (item) => item.status || "",
              },
            ]}
            columnDisplay={[
              { id: "name", visible: true },
              { id: "role", visible: true },
              { id: "contactnumber", visible: true },
              { id: "status", visible: true },
            ]}
            loadingText="Loading resources"
            resizableColumns
            selectionType="multi"
            trackBy="name"
            variant="borderless"
            empty={
              <Box
                margin={{ vertical: "xs" }}
                textAlign="center"
                color="inherit"
              >
                <SpaceBetween size="m">
                  <b>No User Found</b>
                </SpaceBetween>
              </Box>
            }
            filter={
              <TextFilter
                filteringPlaceholder="Search"
                filteringText={filteringText}
                onChange={(e) => setFilteringText(e.detail.filteringText)}
              />
            }
            footer={
              <Box textAlign="center">
                <Link href="#">View all</Link>
              </Box>
            }
            header={
              <Header
                description="Collection Description"
                actions={
                  <SpaceBetween direction="horizontal" size="xs">
                    <button
                      style={{
                        color: "white",
                        border: "2px solid red",
                        fontWeight: "bold",
                        height: "32px",
                        width: "130px",
                        borderRadius: "16px",
                        background: "red",
                        cursor: "pointer",
                      }}
                    >
                      Remove User
                    </button>
                    <Button
                      variant="primary"
                      iconName="add-plus"
                      onClick={() => setModalVisible(true)}
                    >
                      Add User
                    </Button>
                  </SpaceBetween>
                }
              >
                All Users
              </Header>
            }
            pagination={<Pagination currentPageIndex={1} pagesCount={5} />}
            items={filteredData}
          />
        </Container>

        <Modal
          onDismiss={() => setModalVisible(false)}
          visible={modalVisible}
          footer={
            <React.Fragment>
              <Box float="left">
                <button
                  style={{
                    color: "white",
                    border: "2px solid red",
                    fontWeight: "bold",
                    height: "32px",
                    width: "130px",
                    borderRadius: "16px",
                    background: "red",
                    cursor: "pointer",
                  }}
                  onClick={() => setModalVisible(false)}
                >
                  Cancel
                </button>
              </Box>
              <Box float="right" border="vertical">
                <Button variant="primary" onClick={handleCreate}>
                  Create
                </Button>
              </Box>
            </React.Fragment>
          }
          header="Add User!"
        >
          <SpaceBetween size="xxl">
            <form>
              <SpaceBetween size="xs">
                <ColumnLayout columns={3} minColumnWidth={100}>
                  <FormField label="Full Name" errorText={errors.fullName}>
                    <Input
                      value={fullName}
                      onChange={handleChange(setfullName, "fullName")}
                    />
                  </FormField>
                  <FormField label="Email" errorText={errors.email}>
                    <Input
                      value={email}
                      onChange={handleChange(setemail, "email")}
                    />
                  </FormField>
                  <FormField
                    label="Contact Number"
                    errorText={errors.contactNumber}
                  >
                    <Input
                      value={contactNumber}
                      onChange={handleChange(setcontactNumber, "contactNumber")}
                    />
                  </FormField>
                </ColumnLayout>
                <ColumnLayout columns={3} minColumnWidth={100}>
                  <FormField label="Address" errorText={errors.address}>
                    <Input
                      value={address}
                      onChange={handleChange(setaddress, "address")}
                    />
                  </FormField>
                  <FormField
                    label="Branch Location"
                    errorText={errors.branchLocation}
                  >
                    <Input
                      value={branchLocation}
                      onChange={handleChange(
                        setbranchLocation,
                        "branchLocation"
                      )}
                    />
                  </FormField>
                  <FormField label="City" errorText={errors.city}>
                    <Input
                      value={city}
                      onChange={handleChange(setcity, "city")}
                    />
                  </FormField>
                </ColumnLayout>
                <ColumnLayout columns={3} minColumnWidth={100}>
                  <FormField label="Country" errorText={errors.country}>
                    <Input
                      value={country}
                      onChange={handleChange(setcountry, "country")}
                    />
                  </FormField>
                  <FormField label="Postal Code" errorText={errors.postalCode}>
                    <Input
                      value={postalCode}
                      onChange={handleChange(setpostalCode, "postalCode")}
                    />
                  </FormField>
                </ColumnLayout>
              </SpaceBetween>
            </form>
            <Box>
              <SpaceBetween size="m">
                <p style={{ fontSize: "19px", fontWeight: "bold" }}>
                  Add Roles!
                </p>
                <FormField errorText={errors.selectedOptions}>
                  <Multiselect
                    selectedOptions={selectedOptions}
                    onChange={handleChange(
                      setSelectedOptions,
                      "selectedOptions"
                    )}
                    options={[
                      {
                        label: "james", value: "1", description: "Admin",
                      },
                      {
                        label: "sam", value: "2", description: "Cashier",
                      },
                      { label: "david", value: "3", description: "Hr" },
                    ]}
                    placeholder="Choose options"
                  />
                </FormField>
              </SpaceBetween>
            </Box>
          </SpaceBetween>
        </Modal>
      </SpaceBetween>
    </ContentLayout>
  );
};

export default Storedetail;
