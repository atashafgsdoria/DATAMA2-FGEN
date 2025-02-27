<template>
  <div class="section">
    <h2>Property Information</h2>
    <div class="columns">
      <div class="column">
        <label for="address">House No./Street/Purok/Subdivision:</label>
        <input v-model="property.address" type="text" id="address" required>

        <label for="country">Country:</label>
        <input v-model="property.country" type="text" id="country" required>

        <label for="region">Region:</label>
        <input v-model="property.region" type="text" id="region" required>

        <label for="province">Province:</label>
        <input v-model="property.province" type="text" id="province" required>
      </div>
      <div class="column">
        <label for="city">City/Municipality:</label>
        <input v-model="property.city" type="text" id="city" required>

        <label for="barangay">Barangay:</label>
        <input v-model="property.barangay" type="text" id="barangay" required>

        <label for="villagename">Village Name:</label>
        <input v-model="property.villagename" type="text" id="villagename">

        <label for="condoname">Condo Name:</label>
        <input v-model="property.condoname" type="text" id="condoname">
      </div>
    </div>
    <button @click="submitPropertyForm">Submit Property Information</button>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import supabase from '@/supabase';

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
        villagename: '',
        condoname: '',
      },
    };
  },
  computed: {
    client() {
      return this.$store.state.client; // ✅ Get client data correctly
    },
  },
  methods: {
    async submitPropertyForm() {
      if (!this.client || !this.client.client_id) {
        alert('Client ID missing. Please fill out the Client Form first.');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('propertyinformation')
          .insert([
            {
              address: this.property.address,
              country: this.property.country,
              region: this.property.region,
              province: this.property.province,
              city: this.property.city,
              barangay: this.property.barangay,
              villagename: this.property.villagename,
              condoname: this.property.condoname,
              client_id: this.client.client_id,
            },
          ])
          .select('id') // ✅ Ensure we get the inserted ID
          .single();

        if (error) throw error;
        if (!data || !data.id) {
          throw new Error('No ID returned from Supabase.');
        }

        // ✅ Store the property in Vuex
        this.$store.commit('setProperty', data);

        alert('Property data saved!');
        this.$router.push('/property-description'); // ✅ Navigate AFTER storing in Vuex
      } catch (error) {
        console.error('Error:', error);
        alert('Submission failed: ' + (error.message || 'Unknown error'));
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
