import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useEmployeeStore = defineStore("employees", () => {
  // State
  const employees = ref([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@company.com",
      department: "Engineering",
      position: "Senior Developer",
      salary: 85000,
      status: "active",
      hireDate: new Date("2020-03-15"),
      phone: "9878675646",
      isSelected:false
    },
    {
      id: 2,
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@company.com",
      department: "Marketing",
      position: "Marketing Manager",
      salary: 75000,
      status: "active",
      hireDate: new Date("2019-07-22"),
      phone: "9089786756",
      isSelected:true
    },
    {
      id: 3,
      firstName: "Mike",
      lastName: "Wilson",
      email: "mike.wilson@company.com",
      department: "Sales",
      position: "Sales Representative",
      salary: 55000,
      status: "vacation",
      hireDate: new Date("2021-01-10"),
      phone: "6747346789",
      isSelected:false
    },
    {
      id: 4,
      firstName: "Emily",
      lastName: "Brown",
      email: "emily.brown@company.com",
      department: "HR",
      position: "HR Specialist",
      salary: 60000,
      status: "inactive",
      hireDate: new Date("2018-11-05"),
      phone: "8978574534",
      isSelected:false
    },
  ]);

  const searchQuery = ref("");
  const departmentFilter = ref("all");
  const statusFilter = ref("all");
  const editingEmployeeId = ref(null);
  const showModal = ref(false);
  const isAddEmployeeModal = ref(false)
  const showSelectedEmployeeModal = ref(false)
  const showSelectedEmployeeDetailModal = ref(false)

  // Getters
  // Get unique department names from the employees list and return them sorted alphabetically
  const departments = computed(() => {
    const depts = [...new Set(employees.value.map((emp) => emp.department))];
    return depts.sort();
  });

  // Computed property for filter
  const filteredEmployees = computed(() => {
    return employees.value.filter((employee) => {
      const matchesSearch =
        employee.firstName
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        employee.lastName
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        employee.email
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        employee.position
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase());

      const matchesDepartment =
        departmentFilter.value === "all" ||
        employee.department === departmentFilter.value;

      const matchesStatus =
        statusFilter.value === "all" || employee.status === statusFilter.value;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  });

  // computed property that returns the count of employees grouped by their status
  const employeeStats = computed(() => {
    const total = employees.value.length;
    const active = employees.value.filter(
      (emp) => emp.status === "active"
    ).length;
    const onVacation = employees.value.filter(
      (emp) => emp.status === "vacation"
    ).length;
    const inactive = employees.value.filter(
      (emp) => emp.status === "inactive"
    ).length;

    return {
      total,
      active,
      onVacation,
      inactive,
    };
  });

  // computed property that returns the count of employees grouped by their department
  const departmentStats = computed(() => {
    const stats = {};
    employees.value.forEach((emp) => {
      if (!stats[emp.department]) {
        stats[emp.department] = { count: 0};
      }
      stats[emp.department].count++;
    });

    return stats;
  });

  // Actions
  const openAddEmployeeModal =() => {
    isAddEmployeeModal.value = true
  }

  // Function for add new employee
  const addEmployee = (employeeData) => {
    const newEmployee = {
      ...employeeData,
      id: Date.now(),
      hireDate: new Date(),
      status: "active",
      isSelected:false
    };
    employees.value.push(newEmployee);
  };

  // Function for Update employee details
  const updateEmployee = (id, updates) => {
    const index = employees.value.findIndex((emp) => emp.id === id);
    if (index !== -1) {
      employees.value[index] = { ...employees.value[index], ...updates };
    }
  };

  // Function for delete employee
  const deleteEmployee = (id) => {
    const index = employees.value.findIndex((emp) => emp.id === id);
    if (index !== -1) {
      employees.value.splice(index, 1);
    }
  };


  // Function for set department filter
  const setDepartmentFilter = (department) => {
    departmentFilter.value = department;
  };

  // Function for set status filter
  const setStatusFilter = (status) => {
    statusFilter.value = status;
  };

  // Function for open employee edit modal
  const openEditModal = (id) => {
    editingEmployeeId.value = id
    showModal.value = true;
  };

  // Function for close employee edit model
  const closeModal = () => {
    showModal.value = false;
    editingEmployeeId.value = null;
  };

  // Function for close selected employee model
  const closeSelectedEmployeeModal = () => {
    showSelectedEmployeeModal.value = false
  }

  // Function for close selected employee detail model
  const closeSelectedEmployeeDetailModal = () => {
    showSelectedEmployeeDetailModal.value = false
  }

  // Function for format currency
  const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

 // Function for format date
const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

// Function for calculate number of year employee service 
const getYearsOfService = (hireDate) => {
  const years = (new Date() - hireDate) / (1000 * 60 * 60 * 24 * 365);
  return Math.floor(years);
};

// Function for toggle selected employee
const toggleSelectedEmployee = (id) => {
  const employee =  employees.value.find((item) => item.id === id)
  employee.isSelected = !employee.isSelected
}

  return {
    // State
    employees,
    searchQuery,
    departmentFilter,
    statusFilter,
    editingEmployeeId,
    showModal,
    isAddEmployeeModal,
    showSelectedEmployeeModal,
    showSelectedEmployeeDetailModal,
    // Getters
    departments,
    filteredEmployees,
    employeeStats,
    departmentStats,
    // Actions
    openAddEmployeeModal,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    setDepartmentFilter,
    setStatusFilter,
    openEditModal,
    closeModal,
    formatCurrency,
    formatDate,
    getYearsOfService,
    toggleSelectedEmployee,
    closeSelectedEmployeeModal,
    closeSelectedEmployeeDetailModal
  };
});
