<script setup>
import { computed, ref } from 'vue'
import { useEmployeeStore } from "@/stores/employee";
import EmployeeDetailView from './EmployeeDetailView.vue';

const employeeStore = useEmployeeStore();
const employeeDetailViewId = ref(null)
const isDetailModalShow = ref(false)
// Get selected employees list
const selectedEmployees = computed(() =>
  employeeStore.employees.filter(employee => employee.isSelected)
)

// Function for remove all employee from selected employee list
const clearAllSelections = () => {
  employeeStore.employees.forEach(employee => {
    employee.isSelected = false
  })
}

// Function for open selected employee detail modal 
const getSelectedEmployeeDetail = (id) => {
  isDetailModalShow.value = true
  employeeDetailViewId.value = id
  employeeStore.showSelectedEmployeeDetailModal = true
}

const closeDetailModal = () => {
  isDetailModalShow.value = false
  employeeDetailViewId.value = null
}
</script>
<template>
  <div v-if="employeeStore.showSelectedEmployeeModal" class="selected-employee-modal"
    @click.self="employeeStore.closeSelectedEmployeeModal">
    <div class="emp-modal-content">
      <div class="emp-modal-header">
        <h2 class="emp-modal-title">Selected Employees</h2>
        <button @click="employeeStore.closeSelectedEmployeeModal" class="close-btn">
          &times;
        </button>
      </div>

      <div class="emp-modal-body">
        <!-- Selected count -->
        <div class="selected-count">
          <span class="count-badge">{{ selectedEmployees.length }}</span>
          employee{{ selectedEmployees.length !== 1 ? 's' : '' }} selected
        </div>

        <!-- Selected employees list -->
        <div v-if="selectedEmployees.length > 0" class="employee-list">
          <div v-for="employee in selectedEmployees" :key="employee.id" class="employee-item"
            @click="getSelectedEmployeeDetail(employee.id)">
            <div class="employee-avatar">
              <div class="avatar-placeholder">
                {{ employee.firstName?.charAt(0)?.toUpperCase() }}
              </div>
            </div>

            <div class="employee-info">
              <h3 class="employee-name">{{ employee.firstName }} {{ employee.lastName }}</h3>
              <p>
                <span class="employee-position">{{ employee.position }}</span>
                <span v-if="employee.department" class="employee-department">
                  • {{ employee.department }}
                </span>
              </p>
              <p v-if="employee.email" class="employee-email">
                {{ employee.email }}
              </p>
            </div>

            <button @click.stop="employeeStore.toggleSelectedEmployee(employee.id)" class="remove-btn"
              title="Remove from selection">
              ✕
            </button>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else class="empty-state">
          <p>No employees selected</p>
        </div>
      </div>

      <div class="modal-footer">
        <button @click="clearAllSelections" class="btn btn-outline">
          Clear All
        </button>
        <button @click="employeeStore.closeSelectedEmployeeModal" class="btn btn-primary">
          Close
        </button>
      </div>
    </div>
  </div>
  <EmployeeDetailView v-if="isDetailModalShow" :id="employeeDetailViewId" @close="closeDetailModal" />
</template>
