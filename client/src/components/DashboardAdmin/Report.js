import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import NotificationsIcon from '@mui/icons-material/Notifications';
const ReportGen = () => {
  const [reports, setReports] = useState([]);

  const generateReport = (reportType) => {
    let reportTitle = '';
    let dummyData = [];

    switch (reportType) {
      case 'Daily Pass Report':
        reportTitle = 'Daily Pass Report';
        // Add dummy data for Daily Pass Report
        dummyData = [
          { id: 1, date: '2023-01-01', totalPasses: 50, revenue: '$500' },
          { id: 2, date: '2023-01-02', totalPasses: 65, revenue: '$600' },
          // Add more dummy data as needed
        ];
        break;
      case 'Daily Pass History Report':
        reportTitle = 'Daily Pass History Report';
        // Add dummy data for Daily Pass History Report
        dummyData = [
          { id: 1, date: '2023-01-01', vehicle: 'Car', passType: 'Daily', amount: '$10' },
          { id: 2, date: '2023-01-01', vehicle: 'Truck', passType: 'Daily', amount: '$15' },
          // Add more dummy data as needed
        ];
        break;
      case 'Daily Recipient Report':
        reportTitle = 'Daily Recipient Report';
        // Add dummy data for Daily Recipient Report
        dummyData = [
          { id: 1, date: '2023-01-01', recipient: 'John Doe', amount: '$50' },
          { id: 2, date: '2023-01-02', recipient: 'Jane Smith', amount: '$70' },
          // Add more dummy data as needed
        ];
        break;
      default:
        break;
    }

    setReports(dummyData);

    Swal.fire({
      title: reportTitle,
      html: `<table class="table">
              <thead class="thead-dark">
                <tr>
                  ${Object.keys(dummyData[0])
                    .map((key) => `<th>${key.toUpperCase()}</th>`)
                    .join('')}
                </tr>
              </thead>
              <tbody>
                ${dummyData
                  .map(
                    (data) =>
                      `<tr>${Object.values(data)
                        .map((value) => `<td>${value}</td>`)
                        .join('')}</tr>`
                  )
                  .join('')}
              </tbody>
            </table>`,
      confirmButtonText: 'Close',
    });
  };
 const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <div className="App">
         <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
         Reports Management
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar> <br/><br/><br/>
      <h1>Toll Plaza Management - Reports</h1>
      <div className="report-buttons">
        <button className="btn btn-primary mr-3" onClick={() => generateReport('Daily Pass Report')}>
          Daily Pass Report
        </button>
        <button
          className="btn btn-primary mr-3"
          onClick={() => generateReport('Daily Pass History Report')}
        >
          Daily Pass History Report
        </button>
        <button className="btn btn-primary" onClick={() => generateReport('Daily Recipient Report')}>
          Daily Recipient Report
        </button>
      </div>
    </div>
  );
};

export default ReportGen;
