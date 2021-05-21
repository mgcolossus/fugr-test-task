import { makeAutoObservable, runInAction } from "mobx";

class TableDataStore {
  constructor() {
    this.tableData = [];
    this.filteredData = [];
    this.isSwitchedToFilteredData = false;
    this.currentPage = 1;
    this.tableRowsPerPage = 50;
    this.loading = true;
    this.sortedColumnName = null;
    this.sortDirection = null;
    this.selectedUserId = null;
    makeAutoObservable(this);
  }

  get dataToShow() {
    const firstIndex = this.tableRowsPerPage * (this.currentPage - 1);
    const lastIndex = firstIndex + this.tableRowsPerPage - 1;
    if (this.isSwitchedToFilteredData) {
      return this.filteredData.slice(firstIndex, lastIndex);
    }
    return this.tableData.slice(firstIndex, lastIndex);
  }

  get pagesCount() {
    if (this.isSwitchedToFilteredData) {
      return Math.ceil(this.filteredData.length / this.tableRowsPerPage);
    }
    return Math.ceil(this.tableData.length / this.tableRowsPerPage);
  }

  get selectedUser() {
    if (this.selectedUserId === null) {
      return null;
    }
    if (this.isSwitchedToFilteredData) {
      const user = this.filteredData.find((el) => el.id === this.selectedUserId);
      return user || null;
    } else {
      const user = this.tableData.find((el) => el.id === this.selectedUserId);
      return user || null;
    }
  }

  setCurrentPage(newPageNumber) {
    this.currentPage = newPageNumber;
  }

  changeSelectedUserId(id) {
    this.selectedUserId = id;
  }

  changeSortParams(columnName) {
    if (columnName === this.sortedColumnName) {
      if (this.sortDirection === "asc") {
        this.sortDirection = "desc";
      } else {
        this.sortDirection = "asc";
      }
    } else {
      this.sortedColumnName = columnName;
      this.sortDirection = "asc";
    }
    this.sortTable(this.sortedColumnName, this.sortDirection);
  }

  sortTable(columnName, sortDirection) {
    try {
      let sortedData = this.tableData;
      if (this.isSwitchedToFilteredData) {
        sortedData = this.filteredData;
      }
      switch (columnName) {
        case "id":
          if (sortDirection === "asc") {
            sortedData = sortedData.sort((a, b) => a.id - b.id);
            return;
          }
          if (sortDirection === "desc") {
            sortedData = sortedData.sort((a, b) => b.id - a.id);
          }
          break;
        case "firstName":
          if (sortDirection === "asc") {
            sortedData = sortedData.sort((a, b) =>
              a.firstName > b.firstName ? 1 : a.firstName === b.firstName ? 0 : -1
            );
            return;
          }
          if (sortDirection === "desc") {
            sortedData = sortedData.sort((a, b) =>
              a.firstName < b.firstName ? 1 : a.firstName === b.firstName ? 0 : -1
            );
          }
          break;
        case "lastName":
          if (sortDirection === "asc") {
            sortedData = sortedData.sort((a, b) => (a.lastName > b.lastName ? 1 : a.lastName === b.lastName ? 0 : -1));
            return;
          }
          if (sortDirection === "desc") {
            sortedData = sortedData.sort((a, b) => (a.lastName < b.lastName ? 1 : a.lastName === b.lastName ? 0 : -1));
          }
          break;
        case "email":
          if (sortDirection === "asc") {
            sortedData = sortedData.sort((a, b) => (a.email > b.email ? 1 : a.email === b.email ? 0 : -1));
            return;
          }
          if (sortDirection === "desc") {
            sortedData = sortedData.sort((a, b) => (a.email < b.email ? 1 : a.email === b.email ? 0 : -1));
          }
          break;
        case "phone":
          if (sortDirection === "asc") {
            sortedData = sortedData.sort((a, b) => (a.phone > b.phone ? 1 : a.phone === b.phone ? 0 : -1));
            return;
          }
          if (sortDirection === "desc") {
            sortedData = sortedData.sort((a, b) => (a.phone < b.phone ? 1 : a.phone === b.phone ? 0 : -1));
          }
          break;
        default:
          throw Error(`Unknown field name: ${columnName}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  filterTable(filterSubstring) {
    if (filterSubstring.length === 0) {
      this.currentPage = 1;
      this.isSwitchedToFilteredData = false;
      this.filteredData = [];
      if (this.sortedColumnName && this.sortDirection) {
        this.sortTable(this.sortedColumnName, this.sortDirection);
      }
    } else {
      this.currentPage = 1;
      this.isSwitchedToFilteredData = true;
      this.filteredData = this.tableData.filter((rowData) => {
        const columnNames = ["id", "firstName", "lastName", "email", "phone"];
        for (let key of columnNames) {
          if (key === "id") {
            if (String(rowData[key]).includes(filterSubstring)) {
              return true;
            }
          } else if (rowData[key].includes(filterSubstring)) {
            return true;
          }
        }
        return false;
      });
      if (this.sortedColumnName && this.sortDirection) {
        this.sortTable(this.sortedColumnName, this.sortDirection);
      }
    }
  }

  addNewRow(id, firstName, lastName, email, phone) {
    this.tableData.unshift({ id, firstName, lastName, email, phone });
    this.filterTable("");
  }

  async loadSmallData() {
    try {
      const response = await fetch(
        "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
      );
      const data = await response.json();
      runInAction(() => {
        this.tableData = data;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async loadLargeData() {
    try {
      const response = await fetch(
        "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
      );
      const data = await response.json();
      runInAction(() => {
        this.tableData = data;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      console.log(error)
    }
  }
}

const tableData = new TableDataStore();

// autorun(() => {
//   console.log("Energy level:", giraffe.energyLevel)
// })

export { tableData };
