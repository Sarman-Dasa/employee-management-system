<script setup>
import { onMounted, ref } from "vue";
import { useEmployeeStore } from "@/stores/employee";
import AddEditEmployee from "./AddEditEmployee.vue";

const employeeStore = useEmployeeStore();
const employee = ref();
const props = defineProps({
    id: Number,
});

const emit = defineEmits("close");

const handleEditEmployee = () => {
    closeModal();
    employeeStore.openEditModal(props.id);
};

const handleDeleteEmployee = () => {
    employeeStore.deleteEmployee(props.id);
    closeModal();
};

const closeModal = () => {
    employeeStore.closeSelectedEmployeeDetailModal();
    emit("close");
};
onMounted(() => {
    employee.value = employeeStore.employees.find((item) => item.id === props.id);
});
</script>

<template>
    <div class="selected-employee-modal" @click.self="closeModal">
        <div class="emp-modal-content">
            <div class="emp-modal-header">
                <h2 class="emp-modal-title">Employee Details</h2>
                <button @click="closeModal" class="close-btn">&times;</button>
            </div>

            <div class="emp-modal-body" v-if="employee">
                <!-- Selected employees list -->
                <div class="employee-item">
                    <div class="employee-avatar">
                        <div class="avatar-placeholder">
                            {{ employee.firstName?.charAt(0)?.toUpperCase() }}
                        </div>
                    </div>

                    <div class="employee-info">
                        <h3 class="employee-name">
                            {{ employee.firstName }} {{ employee.lastName }}
                        </h3>
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
                </div>

                <div class="employee-details">
                    <div class="detail-row">
                        <span class="detail-label">Email:</span>
                        <span class="detail-value">{{ employee.email }}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Department:</span>
                        <span class="detail-value">{{ employee.department }}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Salary:</span>
                        <span class="detail-value">{{
                            employeeStore.formatCurrency(employee.salary)
                        }}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Phone:</span>
                        <span class="detail-value">{{ employee.phone }}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Hired:</span>
                        <span class="detail-value">{{ employeeStore.formatDate(employee.hireDate) }} ({{
                            employeeStore.getYearsOfService(employee.hireDate)
                        }}
                            years)</span>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button @click="handleEditEmployee" class="action-btn btn-primary">
                    Edit
                </button>
                <button @click="handleDeleteEmployee" class="action-btn btn-danger">
                    Delete
                </button>
            </div>
        </div>
        <AddEditEmployee v-if="employeeStore.showModal "/> 
    </div>
</template>
