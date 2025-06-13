<script setup>
import { useEmployeeStore } from "@/stores/employee";

const employeeStore = useEmployeeStore();
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
      <button @click="employeeStore.setStatusFilter('all')" :class="[
        'filter-btn',
        { active: employeeStore.statusFilter === 'all' },
      ]">
        All Status
      </button>
      <button @click="employeeStore.setStatusFilter('active')" :class="[
        'filter-btn',
        { active: employeeStore.statusFilter === 'active' },
      ]">
        Active
      </button>
      <button @click="employeeStore.setStatusFilter('vacation')" :class="[
        'filter-btn',
        { active: employeeStore.statusFilter === 'vacation' },
      ]">
        On Vacation
      </button>
      <button @click="employeeStore.setStatusFilter('inactive')" :class="[
        'filter-btn',
        { active: employeeStore.statusFilter === 'inactive' },
      ]">
        Inactive
      </button>
    </div>
  </div>
</template>