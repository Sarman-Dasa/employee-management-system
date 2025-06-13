<script setup>
import { useEmployeeStore } from "@/stores/employee";

const props = defineProps({
    employee: Object,
    activeDropdownId: Number,
});

const emit = defineEmits(["set-active-dropdown", "open-employee-detail-view"]);
const employeeStore = useEmployeeStore();

// Function for create employee avatar image base on employee firstName and lastName
const employeeAvatar = (firstName, lastName) => {
    return (firstName[0] + lastName[0]).toUpperCase();
};

// Function for toggle action button dropdown
const toggleDropdown = () => {
    emit("set-active-dropdown", props.employee.id);
};

// Function for open employee detail view modal
const openDetailView = () => {
    emit('open-employee-detail-view', props.employee.id)
    if (props.activeDropdownId) {
        emit("set-active-dropdown", null);
    }
};

// Function to open selected employee edit modal
const handelEditEmployee = () => {
    employeeStore.openEditModal(props.employee.id)
    emit("set-active-dropdown", null);
}
</script>

<template>
    <div class="employee-card" @click="openDetailView">
        <div class="employee-header">
            <div class="avatar-name">
                <div class="employee-avatar">
                    {{ employeeAvatar(employee.firstName, employee.lastName) }}
                </div>
                <div class="employee-info">
                    <h3>{{ employee.firstName }} {{ employee.lastName }}</h3>
                    <p>{{ employee.position }}</p>
                </div>
            </div>
            <span :class="['status-badge', 'status-' + employee.status]">
                {{ employee.status }}
            </span>
            <div :id="employee.id" class="more-actions-container">
                <button @click.stop="toggleDropdown" class="more-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="icon icon-tabler icons-tabler-outline icon-tabler-dots">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                        <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                        <path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                    </svg>
                </button>

                <div @click.stop v-if="activeDropdownId === employee.id" class="dropdown-menu">
                    <button @click="handelEditEmployee" class="dropdown-item">
                        Edit
                    </button>
                    <button @click="employeeStore.deleteEmployee(employee.id)" class="dropdown-item delete">
                        Delete
                    </button>
                </div>
            </div>
        </div>

        <div class="star-icon" v-if="employee.status !== 'inactive'">
            <span @click.stop="employeeStore.toggleSelectedEmployee(employee.id)"><svg
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    :fill="employee.isSelected ? '#e7e761' : '#808080'" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-star"
                    :style="{ color: employee.isSelected ? '#e7e761' : '#808080' }">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path
                        d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                </svg>
            </span>
        </div>
    </div>
</template>
