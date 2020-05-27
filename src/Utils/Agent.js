import request from "superagent";

//protocol = isExtension ? 'http:' : protocol;
const protocol = "https:";
// export const API_ROOT = isExtension
//   ? "167.71.69.250"
//   : `${window.location.host}`;

export const API_ROOT = "webservisdeneme.azurewebsites.net";
const requests = {
  del: (url) => request.del(`${protocol}//${API_ROOT}${url}`),
  get: (url) => request.get(`${protocol}//${API_ROOT}${url}`),
  put: (url, body) => request.put(`${protocol}//${API_ROOT}${url}`, body),
  post: (url, body) => request.post(`${protocol}//${API_ROOT}${url}`, body),
  delete: (url, body) => request.delete(`${protocol}//${API_ROOT}${url}`, body),
};

const Barbers = {
  getBarbers: () => requests.get("/barbers"),
  addBarbers: () => requests.post("/barbers/add"),
  getBarber: (barberId) => requests.get(`/barbers/${barberId}`),
};

const Login = {
  loginBarber: () => requests.post("/barbers/login"),
  loginCustomer: () => requests.post("/Customers/login"),
};

const Appointments = {
  getAppointments: () => requests.get("/Appointments"),
  addAppointments: () => requests.post("/Appointments/add"),
  deleteAppointments: (appointmentId) =>
    requests.delete(`/Appointments/delete/${appointmentId}`),

  montlyStaffAppointments: () => requests.post("Appointments/monthly/staff"),
  montlyCustomerAppointments: () =>
    requests.post("Appointments/monthly/customer"),
  montlyBarberAppointments: () => requests.post("Appointments/monthly/barber"),
  dateBeforeAppointments: () =>
    requests.post("Appointments/monthly/dateBefore/staff"),

  barberFilter: () => requests.post("/Appointments/barberFilter"),
  withDate: () => requests.post("/Appointments/withDate"),
  customerFilter: () => requests.post("/Appointments/customerFilter"),

  getStaff: (staffId) => requests.get(`/Appointments/staff/${staffId}`),
  getBarber: (barberId) => requests.get(`/Appointments/barbers/${barberId}`),
  getCustomerAppointments: (customerId) =>
    requests.get(`/Appointments/customer/${customerId}`),
};

const WorkHours = {
  getWorkHours: () => requests.get("/WorkHours"),
  addWorkHours: () => requests.post("/WorkHours/add"),
  updateWorkHours: () => requests.get("/WorkHours/put"),
  addWorkHours: () => requests.get("/WorkHours/add"),

  getWorkHoursBarber: (barberId) =>
    requests.get(`/WorkHours/barber/${barberId}`),
  dayStaff: () => requests.post("/WorkHours/staff/day"),
  getStaffWorkHours: (staffId) => requests.get(`/WorkHours/staff/${staffId}`),
};

const Staffs = {
  getStaffs: () => requests.get("/Staffs"),
  addStaffs: () => requests.post("/Staffs/add"),
  getStaffBarber: (id) => requests.get(`/Staffs/barber/${id}`),

  deleteStaffAppointment: (id) =>
    requests.delete(`/Staffs/Appointments/delete/${id}`),
};

const ServiceBarber = {
  getServices: (barberId) => requests.get(`/ServiceBarber/Barber/${barberId}`),
  addService: () => requests.post("/ServiceBarber/add"),
  updateService: (barberId) => requests.put(`/ServiceBarber/put/${barberId}`),
};

const Customers = {
  getCustomers: (barberId) => requests.get(`/Customer/Barber/${barberId}`),
  addCustomer: () => requests.post("/Customers/add"),
  updateCustomer: (customerId) => requests.put(`/Customers/edit/${customerId}`),
  login: () => requests.post("/Customers/login"),

  getCustomer: (customerId) =>
    requests.get(`/Customers/getCustomer/${customerId}`),

  updateCustomer: (customerId) =>
    requests.push(`/Customers/edit/${customerId}`),
};

export default {
  Barbers,
  ServiceBarber,
  Staffs,
  Login,
  Appointments,
  WorkHours,
  Customers,
  //   setToken: (_token) => {
  //     token = _token;
  //   },
};
