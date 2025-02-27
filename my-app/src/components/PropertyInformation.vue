<template>
  <div class="section">
    <h2>Property Information</h2>
    <div class="columns">
      <div class="column">
        <label for="address">House No./Street/Purok/Subdivision:</label>
        <input v-model="property.address" type="text" id="address" placeholder="3 Humabon, Makati, 1232 Kalakhang Maynila" required><br><br>

        <label for="country">Country:</label>
        <input v-model="property.country" type="text" id="country" value="Philippines" required @input="validateCountry"><br><br>

        <label for="region">Region:</label>
        <input v-model="property.region" type="text" id="region" placeholder="National Capital Region (NCR)" required><br><br>

        <label for="province">Province:</label>
        <input v-model="property.province" type="text" id="province" placeholder="NCR, Fourth District" required><br><br>
      </div>
      <div class="column">
        <label for="city">City/Municipality:</label>
        <input v-model="property.city" type="text" id="city" placeholder="Makati City" required><br><br>

        <label for="barangay">Barangay:</label>
        <input v-model="property.barangay" type="text" id="barangay" placeholder="Magallanes" required><br><br>

        <label for="village_name">Village Name:</label>
        <input v-model="property.villageName" type="text" id="village_name" placeholder="Paseo de Magallanes"><br><br>

        <label for="condo_name">Condo Name:</label>
        <input v-model="property.condoName" type="text" id="condo_name" placeholder="Galeria de Magallanes"><br><br>
      </div>
    </div>
    <button @click="submitPropertyForm">Submit Property Information</button>
  </div>
</template>

<script>
import supabase from '@/supabase';  // ✅ Import the shared instance

export default {
  data() {
    return {
      property: {
        address: '',
        country: 'Philippines',
        region: '',
        province: '',
        city: '',
        barangay: '',
        villageName: '',
        condoName: '',
      },
    };
  },
  computed: {
    ...mapState(['client']), // Get client from Vuex
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async submitPropertyForm() {
      if (!this.client || !this.client.client_id) {
        alert('Client ID missing. Please fill out Client Form first.');
        return;
      }

      try {
        const { data, error } = await supabase.from('PropertyInformation')
          .insert([{ ...this.property, client_id: this.client.client_id }]);

        if (error) {
          console.error('Error:', error);
          alert('Submission failed');
        } else {
          alert('Property data saved!');
          this.router.push('/property-description'); // Navigate
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    },
  },
};
</script>

<style scoped>
.section {
  padding: 20px;
}
.columns {
  display: flex;
  flex-wrap: wrap;
}
.column {
  flex: 1;
  padding: 10px;
  min-width: 300px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input[type="text"] {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
