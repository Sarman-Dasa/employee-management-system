<script setup>
import { onMounted, reactive, computed, watch } from "vue";
import { useEmployeeStore } from "@/stores/employee";

const employeeStore = useEmployeeStore();

// Detect mode
const isEditMode = computed(() => employeeStore.showModal);
const isAddMode = computed(() => employeeStore.isAddEmployeeModal);

// Shared form state
const employeeForm = reactive({
    firstName: "",
    lastName: "",
    email: "",
    department: "Engineering",
    position: "",
    salary: 0,
    status: "active",
    phone: "",
});

// Reset form for Add
const resetForm = () => {
    Object.assign(employeeForm, {
        firstName: "",
        lastName: "",
        email: "",
        department: "Engineering",
        position: "",
        salary: 0,
        status: "active",
        phone: "",
    });
};

// Add employee
const handleAddEmployee = () => {
    if (employeeForm.firstName && employeeForm.lastName && employeeForm.email) {
        employeeStore.addEmployee({ ...employeeForm });
        resetForm();
        employeeStore.isAddEmployeeModal = false;
    }
};

// Update employee
const handleUpdateEmployee = () => {
    if (employeeForm && employeeStore.editingEmployeeId) {
       // If the updated status is inactive, we force isSelected to false
        if (employeeForm.status === 'inactive') {
            employeeForm.isSelected = false;
        }
        employeeStore.updateEmployee(employeeStore.editingEmployeeId, { ...employeeForm });
        employeeStore.closeModal();
    }
};

// Close modal handler
const handleClose = () => {
    resetForm();
    employeeStore.closeModal();
    employeeStore.isAddEmployeeModal = false;
};

onMounted(() => {
    const ID = employeeStore.editingEmployeeId;
    const emp = employeeStore.employees.find((item) => item.id === ID);
    if (emp) Object.assign(employeeForm, { ...emp });
});
</script>

<template>
    <div v-if="isEditMode || isAddMode" class="modal" @click.self="handleClose">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">{{ isEditMode ? "Edit" : "Add" }} Employee</h2>
                <button @click="handleClose" class="close-btn">&times;</button>
            </div>

            <div class="form-group">
                <label class="form-label">First Name</label>
                <input v-model="employeeForm.firstName" class="form-input" />
            </div>

            <div class="form-group">
                <label class="form-label">Last Name</label>
                <input v-model="employeeForm.lastName" class="form-input" />
            </div>

            <div class="form-group">
                <label class="form-label">Email</label>
                <input v-model="employeeForm.email" type="email" class="form-input" />
            </div>

            <div class="form-group">
                <label class="form-label">Department</label>
                <select v-model="employeeForm.department" class="form-select">
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                </select>
            </div>

            <div class="form-group">
                <label class="form-label">Position</label>
                <input v-model="employeeForm.position" class="form-input" />
            </div>

            <div class="form-group">
                <label class="form-label">Salary</label>
                <input v-model.number="employeeForm.salary" type="number" class="form-input" />
            </div>

            <div class="form-group" v-if="isEditMode">
                <label class="form-label">Status</label>
                <select v-model="employeeForm.status" class="form-select">
                    <option value="active">Active</option>
                    <option value="vacation">On Vacation</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>

            <div class="form-group">
                <label class="form-label">Phone</label>
                <input v-model="employeeForm.phone" class="form-input" />
            </div>

            <div class="add-edit-modal-footer">
                <button @click="isEditMode ? handleUpdateEmployee() : handleAddEmployee()" class="btn btn-primary">
                    {{ isEditMode ? "Update" : "Add" }} Employee
                </button>
                <button @click="handleClose" class="btn btn-secondary">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</template>