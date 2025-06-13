<script setup>
import { useEmployeeStore } from "@/stores/employee";

const employeeStore = useEmployeeStore();

const statuses = [
  { label: 'All Status', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'On Vacation', value: 'vacation' },
  { label: 'Inactive', value: 'inactive' },
]
</script>
<template>
  <div>
    <div class="search-box">
      <input v-model="employeeStore.searchQuery" class="form-input"
        placeholder="Search employees by name, email, or position..." />
      <button @click="employeeStore.openAddEmployeeModal()" class="btn btn-secondary btn-add-employee">
        Add New Employee
      </button>
    </div>

    <div class="filters">
      <button @click="employeeStore.setDepartmentFilter('all')" :class="[
        'filter-btn',
        { active: employeeStore.departmentFilter === 'all' },
      ]">
        All Departments
      </button>
      <button v-for="dept in employeeStore.departments" :key="dept" @click="employeeStore.setDepartmentFilter(dept)"
        :class="[
          'filter-btn',
          { active: employeeStore.departmentFilter === dept },
        ]">
        {{ dept }} ({{ employeeStore.departmentStats[dept]?.count || 0 }})
      </button>
    </div>

    <div class="filters">
      <button v-for="status in statuses" :key="status.value" @click="employeeStore.setStatusFilter(status.value)"
        :class="[
          'filter-btn',
          { active: employeeStore.statusFilter === status.value },
        ]">{{ status.label }}</button>
    </div>
  </div>
</template>