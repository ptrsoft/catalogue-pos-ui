import React, { useState, useEffect } from 'react';
import {
  Box,
  ColumnLayout,
  ContentLayout,
  Calendar,
} from '@cloudscape-design/components';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Grid from '@cloudscape-design/components/grid';
import SpaceBetween from '@cloudscape-design/components/space-between';
import PieChart from '@cloudscape-design/components/pie-chart';
import BarChart from '@cloudscape-design/components/bar-chart';
import Button from '@cloudscape-design/components/button';
import Icon from '@cloudscape-design/components/icon';
import Table from "@cloudscape-design/components/table";



const CustomDropdown = ({ options, selectedOption, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };
  

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span style={{ color: '#0073e7', marginRight: '0.5rem' }}><strong>{selectedOption.label}</strong></span>
        <Icon name="caret-down-filled" variant="link" />
      </button>
      {isOpen && (
        <ul
          style={{
            position: 'absolute',
            listStyle: 'none',
            margin: 0,
            padding: '0.5rem',
            backgroundColor: 'white',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
            zIndex: 1000,
          }}
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option)}
              style={{
                padding: '0.5rem',
                cursor: 'pointer',
                backgroundColor: option.value === selectedOption.value ? '#e6f7ff' : 'transparent',
                color: option.value === selectedOption.value ? '#0073e7' : 'inherit',
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const DashboardCards = () => {
  const [value, setValue] = useState('');
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedFilter1, setSelectedFilter1] = useState({ label: 'Today', value: 'today' });
  const [selectedFilter2, setSelectedFilter2] = useState({ label: 'Today', value: 'today' });
  const [selectedFilter3, setSelectedFilter3] = useState({ label: 'Today', value: 'today' });
  const [selectedFilter4, setSelectedFilter4] = useState({ label: 'Today', value: 'today' }); 
  const [selectedFilter5, setSelectedFilter5] = useState({ label: 'Today', value: 'today' });
  const [selectedFilter, setSelectedFilter] = useState({ label: 'Today', value: 'today' });


  const handleButtonClick = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const data = [
    { title: 'Morning', percentage: 35, value: 35 },
    { title: 'Afternoon', percentage: 30, value: 30 },
    { title: 'Evening', percentage: 20, value: 20 },
    { title: 'Night', percentage: 15, value: 15 },
  ];
  const data2 = [
    { title: 'UPI', percentage: 45, value: 45 },
    { title: 'Cash', percentage: 50, value: 50},
    { title: 'Cards', percentage: 0o5, value: 0o5 },
  ];

  const filterOptions = [
    { label: 'Today', value: 'today' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Yearly', value: 'yearly' },
  ];

  const handleFilterChange = (option) => {
    setSelectedFilter(option);
  };

  return (
    <ContentLayout
      headerVariant="high-contrast"
      header={
        <Header
          variant="h1"
          description="Welcome to the Point Of Sale Admin!"
          actions={
            <Button
              iconAlign="right"
              iconName="calendar"
              variant="primary"
              onClick={handleButtonClick}
            >
              {isCalendarVisible ? 'Hide Calendar' : 'Calendar'}
            </Button>
          }
        >
          DashBoard
        </Header>
      }
    >
      {isCalendarVisible && (
        <Container>
          <Calendar onChange={({ detail }) => setValue(detail.value)} value={value} />
        </Container>
      )}

      <SpaceBetween direction="vertical" size="s">
        <Container className="top-container" style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2 style={{ marginBottom: '1rem' }}>Harley's Dashboard</h2>
          </div>

          <ColumnLayout columns={5} variant="default" minColumnWidth={170}>
            <div>
            <Box variant="awsui-key-label"><p style={{ fontSize: 12}}>Todays's Sales</p></Box>
              <span style={{ fontSize: 36, fontWeight: '900', lineHeight: 1.3 }}>100</span>
            </div>
            <div>
            <Box variant="awsui-key-label"><p style={{ fontSize: 12}}>Order List</p></Box>
              <span style={{ fontSize: 36, fontWeight: '900', lineHeight: 1.3 }}>80</span>
            </div>
            <div>
            <Box variant="awsui-key-label"><p style={{ fontSize: 12}}>Invoice Count</p></Box>
              <span style={{ fontSize: 36, fontWeight: '900', lineHeight: 1.3 }}>143</span>
            </div>
            <div>
            <Box variant="awsui-key-label"><p style={{ fontSize: 12}}>New Orders</p></Box>
            <span style={{ fontSize: 36, fontWeight: '900', lineHeight: 1.3 }}>03</span>
            </div>
            <div>
              <Box variant="awsui-key-label"><p style={{ fontSize: 12}}>Overall POS Expenditure</p></Box>
              <span style={{ fontSize: 36, fontWeight: '900', lineHeight: 1.3 }}>$ 1.3M</span>
            </div>
          </ColumnLayout>
        </Container>

        <Grid
          gridDefinition={[
            { colspan: { default: 12, xxs: 6 } },
            { colspan: { default: 12, xxs: 6 } },
          ]}
        >
          <Container>
            {/* BarChart section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3>Purchase & Sales Stock</h3>
              <CustomDropdown
                options={filterOptions}
                selectedOption={selectedFilter1}
                onChange={setSelectedFilter1}
              />
            </div>
            <BarChart
              series={[
                {
                  title: 'Purchase',
                  type: 'bar',
                  data: [
                    { x: new Date(1601058600000), y: 91394 },
                    { x: new Date(1601065800000), y: 56012 },
                    { x: new Date(1601073000000), y: 156204 },
                    { x: new Date(1601080200000), y: 98349 },
                    { x: new Date(1601087400000), y: 99249 },
                  ],
                  valueFormatter: (e) =>
                    Math.abs(e) >= 1e9
                      ? (e / 1e9).toFixed(1).replace(/\.0$/, '') + 'G'
                      : Math.abs(e) >= 1e6
                      ? (e / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'
                      : Math.abs(e) >= 1e3
                      ? (e / 1e3).toFixed(1).replace(/\.0$/, '') + 'K'
                      : e.toFixed(2),
                },
                {
                  title: 'Sale',
                  type: 'bar',
                  data: [
                    { x: new Date(1601058600000), y: 102032 },
                    { x: new Date(1601065800000), y: 84201 },
                    { x: new Date(1601073000000), y: 173002 },
                    { x: new Date(1601080200000), y: 103283 },
                    { x: new Date(1601087400000), y: 95382 },
                  ],
                  valueFormatter: (e) =>
                    Math.abs(e) >= 1e9
                      ? (e / 1e9).toFixed(1).replace(/\.0$/, '') + 'G'
                      : Math.abs(e) >= 1e6
                      ? (e / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'
                      : Math.abs(e) >= 1e3
                      ? (e / 1e3).toFixed(1).replace(/\.0$/, '') + 'K'
                      : e.toFixed(2),
                },
              ]}
              xDomain={[
                new Date(1601058600000),
                new Date(1601065800000),
                new Date(1601073000000),
                new Date(1601080200000),
                new Date(1601087400000),
              ]}
              yDomain={[0, 200000]}
              i18nStrings={{
                xTickFormatter: (e) =>
                  e
                    .toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: false,
                    })
                    .split(',')
                    .join('\n'),
                yTickFormatter: (e) =>
                  Math.abs(e) >= 1e9
                    ? (e / 1e9).toFixed(1).replace(/\.0$/, '') + 'G'
                    : Math.abs(e) >= 1e6
                    ? (e / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'
                    : Math.abs(e) >= 1e3
                    ? (e / 1e3).toFixed(1).replace(/\.0$/, '') + 'K'
                    : e.toFixed(2),
              }}
              tooltip={true}
              hideFilter={true}
              height={270} 
            />
          </Container>
          <Container>
            {/* PieChart section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3>Periodic Sales</h3>
              <CustomDropdown
                options={filterOptions}
                selectedOption={selectedFilter2}
                onChange={setSelectedFilter2}
              />
            </div>
            <PieChart
              data={data}
              visibleSegments={data}
              segmentDescription={(datum, sum) => `${(datum.value / sum * 100).toFixed(0)}%`}
              ariaDescription="Pie chart showing sales distribution."
              ariaLabel="Pie chart"
              hideFilter
              empty={
                <Box textAlign="center" color="inherit">
                  <b>No data available</b>
                  <Box variant="p" color="inherit">
                    There is no data available
                  </Box>
                </Box>
              }
              noMatch={
                <Box textAlign="center" color="inherit">
                  <b>No matching data</b>
                  <Box variant="p" color="inherit">
                    There is no matching data to display
                  </Box>
                  <Button>Clear filter</Button>
                </Box>
              }
            />
          </Container>
        </Grid>
        <Grid
          gridDefinition={[
            { colspan: { default: 12, xxs: 6 } },
            { colspan: { default: 12, xxs: 6 } },
          ]}
        >
         <Container>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3>Top Selling Products</h3>
              <CustomDropdown
                options={filterOptions}
                selectedOption={selectedFilter3}
                onChange={setSelectedFilter3}
              />
            </div>
            <Table
        renderAriaLive={({
        firstIndex,
        lastIndex,
        totalItemsCount
      }) =>
        `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
      }
      columnDefinitions={[
        {
          id: "productId",
          header: "Product ID",
          wsortingField: "productId",
          isRowHeader: true,
          cell: item => item.productId || "-",
        },
        {
          id: "productName",
          header: "Product Name",
          cell: item => item.productName || "-",
          sortingField: "productName"
        },
        {
          id: "category",
          header: "Category",
          cell: item => item.category || "-"
        },
        
        {
          id: "repeatOrders",
          header: "Repeat Orders",
          cell: item => item.repeatOrders || "-"
        },
        {
          id: "totalAmount",
          header: "Total Amount",
          cell: item => item.totalAmount || "-"
        },
      ]}
      contentDensity="compact"
      enableKeyboardNavigation
      firstIndex={0}
      items={[
        {
          productId: "#1",
          productName: "Tomato",
          category: "Vegetables",
          repeatOrders: "60",
          totalAmount: "₹10,630",
          Width: 165
        },
        {
          productId: "#2",
          productName: "Mangoes",
          category: "Fruits",
          repeatOrders: "20",
          totalAmount: "₹1,000"
        },
        {
          productId: "#1",
          productName: "Tomato",
          category: "Vegetables",
          repeatOrders: "60",
          totalAmount: "₹10,630"
        },
        {
          productId: "#1",
          productName: "Tomato",
          category: "Vegetables",
          repeatOrders: "60",
          totalAmount: "₹10,630"
        },
        {
          productId: "#1",
          productName: "Tomato",
          category: "Vegetables",
          repeatOrders: "60",
          totalAmount: "₹10,630"
        },
        {
          productId: "#1",
          productName: "Tomato",
          category: "Vegetables",
          repeatOrders: "60",
          totalAmount: "₹10,630",
          Width: 165
        },
        {
          productId: "#1",
          productName: "Tomato",
          category: "Vegetables",
          repeatOrders: "60",
          totalAmount: "₹10,630",
          Width: 165
        },
        {
          productId: "#1",
          productName: "Tomato",
          category: "Vegetables",
          repeatOrders: "60",
          totalAmount: "₹10,630",
          Width: 165
        },
        {
          productId: "#1",
          productName: "Tomato",
          category: "Vegetables",
          repeatOrders: "60",
          totalAmount: "₹10,630",
          Width: 165
        },

      ]}
      loadingText="Loading resources"
      
      sortingDisabled
      variant="borderless"
      empty={
        <Box
          margin={{ vertical: "xs" }}
          textAlign="center"
          color="inherit"
        >
          <SpaceBetween size="m">
            <b>No resources</b>
            <Button>Create resource</Button>
          </SpaceBetween>
        </Box>
      }
    />         
     </Container>
     <Container>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
    <h3>Stock Inventory</h3>
    <CustomDropdown
      options={filterOptions}
      selectedOption={selectedFilter}
      onChange={handleFilterChange}
    />
  </div>
  <Table
    renderAriaLive={({ firstIndex, lastIndex, totalItemsCount }) =>
      `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
    }
    columnDefinitions={[
      {
        id: "productId",
        header: "Product ID",
        sortingField: "productId",
        isRowHeader: true,
        cell: item => item.productId || "-",
      },
      {
        id: "productName",
        header: "Product Name",
        cell: item => item.productName || "-",
        sortingField: "productName"
      },
      {
        id: "category",
        header: "Category",
        cell: item => item.category || "-"
      },
      {
        id: "quantity",
        header: "Quantity",
        cell: item => (
          <span style={{ color: item.quantity === 'Low' ? 'red' : 'inherit' }}>
            {item.quantity || "-"}
          </span>
        ),
      },
    ]}
    contentDensity="compact"
    enableKeyboardNavigation
    firstIndex={0}
    items={[
      {
        productId: "#1",
        productName: "Tomato",
        category: "Vegetables",
        quantity: "Low",
      },
      {
        productId: "#2",
        productName: "Mangoes",
        category: "Fruits",
        quantity: "Low",
      },
      {
        productId: "#3",
        productName: "Tomato",
        category: "Vegetables",
        quantity: "Low",
      },
      {
        productId: "#4",
        productName: "Tomato",
        category: "Vegetables",
        quantity: "Low",
      },
      {
        productId: "#5",
        productName: "Apple",
        category: "Fruits",
        quantity: "Low",
      },
      {
        productId: "#6",
        productName: "Tomato",
        category: "Vegetables",
        quantity: "Low",
      },
      {
        productId: "#7",
        productName: "potato",
        category: "Vegetables",
        quantity: "Low",
      },
      {
        productId: "#8",
        productName: "Tomato",
        category: "Vegetables",
        quantity: "Low",
      },
      {
        productId: "#9",
        productName: "Banana",
        category: "Fruits",
        quantity: "Low",
      },
    ]}
    loadingText="Loading resources"
    sortingDisabled
    variant="borderless"
    empty={
      <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
        <SpaceBetween size="m">
          <b>No resources</b>
          <Button>Create resource</Button>
        </SpaceBetween>
      </Box>
    }
  />
</Container>

        </Grid>
        <Grid
      gridDefinition={[
        { colspan: { default: 11, xxs: 7 } },
        { colspan: { default: 13, xxs: 5 } }
      ]}
    >
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3>Daily Sales</h3>
        <CustomDropdown
          options={filterOptions}
          selectedOption={selectedFilter4}
          onChange={setSelectedFilter4}
        />
      </div>
      <BarChart
        series={[
          {
            title: "Site 1",
            type: "bar",
            data: [
              { x: new Date(1601058600000), y: 470319 },
              { x: new Date(1601065800000), y: 374991 },
              { x: new Date(1601073000000), y: 430357 },
              { x: new Date(1601080200000), y: 440773 },
              { x: new Date(1601087400000), y: 464442 },
              { x: new Date(1601094600000), y: 423500 },
              { x: new Date(1601101800000), y: 450000 },
              { x: new Date(1601109000000), y: 410000 },
              { x: new Date(1601116200000), y: 420000 },
              { x: new Date(1601123400000), y: 460000 },
              { x: new Date(1601130600000), y: 470000 },
              { x: new Date(1601137800000), y: 480000 }
            ],
            valueFormatter: (e) => {
              return Math.abs(e) >= 1e9
                ? (e / 1e9).toFixed(1).replace(/\.0$/, "") + "G"
                : Math.abs(e) >= 1e6
                ? (e / 1e6).toFixed(1).replace(/\.0$/, "") + "M"
                : Math.abs(e) >= 1e3
                ? (e / 1e3).toFixed(1).replace(/\.0$/, "") + "K"
                : e.toFixed(2);
            }
          }
        ]}
        xDomain={[
          new Date(1601058600000),
          new Date(1601065800000),
          new Date(1601073000000),
          new Date(1601080200000),
          new Date(1601087400000),
          new Date(1601094600000),
          new Date(1601101800000),
          new Date(1601109000000),
          new Date(1601116200000),
          new Date(1601123400000),
          new Date(1601130600000),
          new Date(1601137800000)
        ]}
        yDomain={[0, 500000]}
        i18nStrings={{
          xTickFormatter: (e) =>
            e
              .toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: false
              })
              .split(",")
              .join("\n"),
          yTickFormatter: (e) => {
            return Math.abs(e) >= 1e9
              ? (e / 1e9).toFixed(1).replace(/\.0$/, "") + "G"
              : Math.abs(e) >= 1e6
              ? (e / 1e6).toFixed(1).replace(/\.0$/, "") + "M"
              : Math.abs(e) >= 1e3
              ? (e / 1e3).toFixed(1).replace(/\.0$/, "") + "K"
              : e.toFixed(2);
          }
        }}
        detailPopoverSeriesContent={({ series, y }) => ({
          key: series.title,
        })}
        ariaLabel="Multiple data series line chart"
        height={300}
        hideFilter
        hideLegend
        empty={
          <Box textAlign="center" color="inherit">
            <b>No data available</b>
            <Box variant="p" color="inherit">
              There is no data available
            </Box>
          </Box>
        }
        noMatch={
          <Box textAlign="center" color="inherit">
            <b>No matching data</b>
            <Box variant="p" color="inherit">
              There is no matching data to display
            </Box>
            <Button>Clear filter</Button>
          </Box>
        }
      />
    </Container>

    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3>Payment Received</h3>
        <CustomDropdown
          options={filterOptions}
          selectedOption={selectedFilter5}
          onChange={setSelectedFilter5}
        />
      </div>
      <PieChart
        data={data2}
        visibleSegments={data2}
        segmentDescription={(datum, sum) => `${(datum.value / sum * 100).toFixed(0)}%`}
        ariaDescription="Pie chart showing sales distribution."
        ariaLabel="Pie chart"
        variant="donut"
        hideFilter
        empty={
          <Box textAlign="center" color="inherit">
            <b>No data available</b>
            <Box variant="p" color="inherit">
              There is no data available
            </Box>
          </Box>
        }
        noMatch={
          <Box textAlign="center" color="inherit">
            <b>No matching data</b>
            <Box variant="p" color="inherit">
              There is no matching data to display
            </Box>
            <Button>Clear filter</Button>
          </Box>
        }
      />
    </Container>
  </Grid>
      </SpaceBetween>
    </ContentLayout>
  );
};

export default DashboardCards;
