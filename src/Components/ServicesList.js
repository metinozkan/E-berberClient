import React, { useState, useEffect } from "react";
import { Agent } from "../Utils/importFiles";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9)
// ];

function createData(id, name, time, price, button) {
  return { id, name, time, price, button };
}
const sample = [
  [
    "Saç",
    "30min",
    "15tl",
    <Button
      variant="outlined"
      color="secondary"
      size="small"
      onClick={() => {}}
    >
      Seç
    </Button>,
  ],
  [
    "Sakal",
    "15min",
    "10tl",
    <Button variant="outlined" color="secondary" size="small">
      Seç
    </Button>,
  ],
  [
    "Yıkama",
    "20min",
    "115tl",
    <Button variant="outlined" color="secondary" size="small">
      Seç
    </Button>,
  ],
  [
    "Çocuk traş",
    "20min",
    "20tl",
    <Button variant="outlined" color="secondary" size="small">
      Seç
    </Button>,
  ],
  [
    "Damat tıraşı",
    "20min",
    "500tl",
    <Button variant="outlined" color="secondary" size="small">
      Seç
    </Button>,
  ],
  [
    "Ense kılı",
    "5min",
    "3tl",
    <Button variant="outlined" color="secondary" size="small">
      Seç
    </Button>,
  ],
  // ["Cupcake", 305, 3.7, 67, 4.3],
  // ["Gingerbread", 356, 16.0, 49, 3.9]
]; // const rows = [];
const rows = [];

for (let i = 0; i < sample.length; i += 1) {
  const randomSelection = sample[i];
  rows.push(createData(i, ...randomSelection));
}
export const ServicesList = ({
  updateSelectedServices,
  handleCloseModal,
  handleNextStepper,
  barberId,
}) => {
  const classes = useStyles();
  const [services, setServices] = useState([]);

  const _getServices = () => {
    Agent.ServiceBarber.getServices(barberId).then((res) => {
      if (res.ok) {
        {
          if (!res.body.Error) {
            setServices(res.body.data);
          } else {
            console.log("hata", res.body.Message);
          }
        }
      }
    });
  };
  useEffect(() => {
    //  _getServices();

    const services = [
      {
        id: 1,
        name: "Ağda",
        price: "35",
        time: "30",
      },
      {
        id: 2,
        name: "Ense",
        price: "15",
        time: "10",
      },
    ];
    setServices(services);
  }, [barberId]);
  return (
    <TableContainer component={Paper} variant="outlined">
      {services.length > 0 ? (
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Hizmetler</TableCell>
              <TableCell align="right">Süre</TableCell>
              <TableCell align="right">Ücret</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.time}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={() => {
                      updateSelectedServices({
                        id: row.id,
                        name: row.name,
                        time: row.time,
                        price: row.price,
                      });
                      handleCloseModal();
                      handleNextStepper();
                    }}
                  >
                    Seç
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div> loading</div>
      )}
    </TableContainer>
  );
};
