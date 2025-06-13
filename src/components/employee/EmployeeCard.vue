<script setup>
import { useEmployeeStore } from "@/stores/employee";
import { computed } from "vue";
import SelectedEmployee from './SelectedEmployeeList.vue'

const employeeStore = useEmployeeStore();

const selectedEmployeeCount = computed(() =>
  employeeStore.employees.filter(item => item.isSelected).length
)
</script>
<template>
  <div class="header">
    <div class="title">
      <h1>Employee Management System</h1>
      <div class="selected-emp" @click="employeeStore.showSelectedEmployeeModal = true">
        <span>Selected Employee</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#e7e761"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-star" color="#e7e761">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
        </svg>
        <span class="selected-emp-count"> {{ selectedEmployeeCount }}</span>
      </div>
    </div>
    <SelectedEmployee />
  </div>
</template>
