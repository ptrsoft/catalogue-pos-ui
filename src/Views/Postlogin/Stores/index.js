import React, { useState, useEffect } from 'react'; // Added useEffect import
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  ContentLayout,
  Container,
  Header,
  Cards,
  Button,
  TextFilter,
  Pagination,
  Icon,
  SpaceBetween,
  Table,
  Grid,
  Toggle
} from '@cloudscape-design/components';

import { updateStoreStatus } from 'Redux-Store/Stores/storeSlice';

const Stores = ({ newstore, updateStoreStatus }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [filteringText, setFilteringText] = useState('');
  const [view, setView] = useState('cards');
  const [filteredItems, setFilteredItems] = useState([]); 
  const [selectedItems, setSelectedItems] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = newstore.filter(item =>
      (item.name || '').toLowerCase().includes(filteringText.toLowerCase()) ||
      (item.cashier || '').toLowerCase().includes(filteringText.toLowerCase()) ||
      (item.address || '').toLowerCase().includes(filteringText.toLowerCase()) ||
      (item.contactNumber || '').toLowerCase().includes(filteringText.toLowerCase())
    );
    setFilteredItems(filtered);
    setIsEmpty(filtered.length === 0);
  }, [newstore, filteringText]);

  const handleAddStoresClick = () => navigate("/app/stores/addstores", { replace: true });
  const handleViewDetailClick = (storeId) => {
    navigate("/app/stores/addstores/storedetail", { state: { storeId } });
  };

  const itemsPerPage = 6;
  const startIndex = (currentPageIndex - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);
  const pagesCount = Math.ceil(filteredItems.length / itemsPerPage);

  const handleToggleChange = (item, checked) => {
    updateStoreStatus(item.id, checked ? 'Active' : 'Inactive');
  };

  const empty = (
    <Box margin={{ vertical: "xs" }} textAlign="center">
      <b>No Stores</b>
    </Box>
  );

  return (
    <ContentLayout
      headerVariant="high-contrast"
      header={
        <Header
          variant="h1"
          description="Manage Your Stores"
          actions={
            <Button
              iconName="add-plus"
              variant="primary"
              onClick={handleAddStoresClick}
            >
              Add stores
            </Button>
          }
        >
          Stores
        </Header>
      }
    >
      <Container
        header={<Header variant="h3">Stores Info</Header>}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', border: 'none' }}
      >
        <SpaceBetween size="xxl">
          <Box>
            <Grid gridDefinition={[{ colspan: 9 }, { colspan: 3 }]}>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '50%' }}>
                  <TextFilter
                    filteringPlaceholder="Search"
                    filteringText={filteringText}
                    onChange={e => setFilteringText(e.detail.filteringText)}
                  />
                </div>
                <div style={{ marginLeft: '1%' }}>
                  <button
                    href="#"
                    iconName="filter"
                    variant="link"
                    style={{
                      height: '32px',
                      width: '40px',
                      borderRadius: '12%',
                      border: 'none',
                      boxShadow: '0 0 0 0.5px gray',
                      background: 'white',
                      color: '#0972D3'
                    }}
                  >
                    <Icon name="filter" />
                  </button>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  variant={view === 'cards' ? 'primary' : 'link'}
                  onClick={() => setView('cards')}
                  style={{ height: '32px', width: '40px', background: '#0972D3', border: '0', borderRadius: '12%', marginRight: '8%', color: 'white' }}
                >
                  <Icon name="multiscreen" />
                </button>
                <button
                  iconName="menu"
                  variant={view === 'table' ? 'primary' : 'link'}
                  onClick={() => setView('table')}
                  style={{
                    height: '32px',
                    width: '40px',
                    borderRadius: '12%',
                    border: 'none',
                    boxShadow: '0 0 0 0.5px gray',
                    background: 'white',
                    color: '#0972D3'
                  }}
                >
                  <Icon name="menu" size="small" />
                </button>
              </div>
            </Grid>
          </Box>

          <Box>
            {view === 'cards' ? (
              paginatedItems.length === 0 ? (
                empty 
              ) : (
                <Grid
                  gridDefinition={[
                    { colspan: { default: 12, xxs: 4 } },
                    { colspan: { default: 12, xxs: 4 } },
                    { colspan: { default: 12, xxs: 4 } }
                  ]}>
                  {paginatedItems.map(item => (
                    <Cards
                      key={item.id}
                      ariaLabels={{
                        itemSelectionLabel: (e, i) => `select ${i.name}`,
                        selectionGroupLabel: "Item selection"
                      }}
                      cardDefinition={{
                        header: item => (
                          <Grid
                            disableGutters
                            gridDefinition={[
                              { colspan: 8 },
                              { colspan: 4 },
                            ]}
                          >
                            <div style={{ fontSize: '12px' }}>Store ID: <strong>{item.id}</strong></div>
                            <div style={{ fontSize: '12px', display: 'flex' }}>
                              <p style={{ marginRight: '12%' }}>Status: </p>
                              <div>
                                <Toggle
                                  checked={item.status === "Active"}
                                  onChange={({ detail }) => handleToggleChange(item, detail.checked)}
                                  style={{ color: item.status === 'Active' ? '#0972D3' : '#414D5C' }}
                                />
                              </div>
                            </div>
                          </Grid>
                        ),
                        sections: [
                          {
                            id: "details",
                            content: item => (
                              <div style={{ color: item.status === 'Active' ? 'inherit' : '#414D5C' }}>
                                <Grid
                                  disableGutters
                                  gridDefinition={[
                                    { colspan: 8 },
                                    { colspan: 4 },
                                  ]}
                                >
                                  <div style={{ display: 'flex' }}>
                                    <div style={{
                                      height: '34px',
                                      width: '40px',
                                      background: '#7E57C2',
                                      borderRadius: '5px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: '20px',
                                      fontWeight: 'bold',
                                      color: 'white'
                                    }}>
                                      P
                                    </div>

                                    <div style={{ marginLeft: '6px' }}>
                                      <p style={{ fontSize: '15px', fontWeight: 'bold' }}>{item.name}</p>
                                      <p style={{ fontSize: '12px' }}>Gmail: {item.email}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <p style={{ color: '#0972D3', fontWeight: 'bold' }}>{item.address}</p>
                                    <p><strong>{item.contactNumber}</strong></p>
                                  </div>
                                </Grid>
                                <div style={{ margin: 'auto', width: '50%', justifyItems: 'end' }}>
                                  <Button variant="link" onClick={() => handleViewDetailClick(item.id)}>
                                    View Details
                                  </Button>
                                </div>
                              </div>
                            )
                          }
                        ]
                      }}
                      cardsPerRow={[{ cards: 1 }]}
                      items={[item]}
                      loadingText="Loading resources"
                      variant="full-page"
                    />
                  ))}
                </Grid>
              )
            ) : (
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
                    `${selectedItems.length} ${selectedItems.length === 1 ? "item" : "items"} selected`,
                  itemSelectionLabel: ({ selectedItems }, item) => item.name
                }}
                columnDefinitions={[
                  {
                    id: "id",
                    header: "Store ID",
                    cell: item => item.id || "-",
                    sortingField: "id"
                  },
                  {
                    id: "name",
                    header: "Store Name",
                    cell: item => item.name || "-",
                    sortingField: "name"
                  },
                  {
                    id: "contactNumber",
                    header: "Store Number",
                    cell: item => item.contactNumber || "-"
                  },
                  {
                    id: "address",
                    header: "Location",
                    cell: item => item.address || "-"
                  },
                  {
                    id: "gmail",
                    header: "Gmail",
                    cell: item => item.gmail || "-"
                  },
                  {
                    id: "status",
                    header: "Status",
                    cell: item => (
                      <Toggle
                        checked={item.status === "Active"}
                        onChange={({ detail }) => handleToggleChange(item, detail.checked)}
                        style={{ color: item.status === 'Active' ? 'inherit' : '#414D5C' }}
                      />
                    )
                  },
                ]}
                enableKeyboardNavigation
                items={paginatedItems}
                loadingText="Loading resources"
                selectionType="multi"
                sortingDisabled
                wrapLines
                variant="borderless"
                empty={isEmpty ? empty : null} 
              />
            )}

            <div style={{ margin: 'auto', width: '110px' }}>
              <Pagination
                currentPageIndex={currentPageIndex}
                onChange={({ detail }) => setCurrentPageIndex(detail.currentPageIndex)}
                openEnd
                pagesCount={pagesCount}
              />
            </div>
          </Box>
        </SpaceBetween>
      </Container>
    </ContentLayout>
  );
}

const mapStateToProps = state => ({
  newstore: state.newstore.stores,
});

const mapDispatchToProps = dispatch => ({
  updateStoreStatus: (storeId, status) => {
    dispatch(updateStoreStatus({ storeId, status }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Stores);
