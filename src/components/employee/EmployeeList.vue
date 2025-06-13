<script setup>
import { useEmployeeStore } from "@/stores/employee";
import AddEditEmployee from "./AddEditEmployee.vue";
import Filter from "./Filter.vue";
import Employee from "./Employee.vue";
import { ref } from "vue";
import EmployeeDetailView from "./EmployeeDetailView.vue"

const employeeStore = useEmployeeStore();
const activeDropdownId = ref(null)
const employeeDetailViewId = ref(null)
const isDetailModalShow = ref(false)

const setActiveDropdownId = (id) => {
  activeDropdownId.value = id === activeDropdownId.value ? null : id
}

const openDetailModal = (id) => {
  isDetailModalShow.value = true
  employeeStore.showSelectedEmployeeDetailModal = true
  employeeDetailViewId.value = id
}
</script>

<template>
  <div class="content">
    <!-- FILTERS START -->
    <Filter />
    <!-- FILTER END -->
    <!-- EMPLOYEE LIST START -->
    <div v-if="employeeStore.filteredEmployees.length > 0" class="employee-grid">
      <Employee v-for="employee in employeeStore.filteredEmployees" :key="employee.id" :employee="employee"
        :active-dropdown-id="activeDropdownId" @set-active-dropdown="setActiveDropdownId"
        @open-employee-detail-view="openDetailModal" />
      <EmployeeDetailView v-if="isDetailModalShow" :id="employeeDetailViewId"
        @close="employeeDetailViewId = null, isDetailModalShow = false" />
    </div>
    <!-- EMPLOYEE LIST END -->

    <!-- SHOW WHEN NO EMPLOYEE FOUND -->
    <div v-else class="empty-state">
      <h3>No employees found</h3>
      <p>Try adjusting your search criteria or add new employees.</p>
    </div>
    <!-- Add/Edit employee Modal -->
    <AddEditEmployee v-if="employeeStore.showModal || employeeStore.isAddEmployeeModal" />
  </div>
</template>
