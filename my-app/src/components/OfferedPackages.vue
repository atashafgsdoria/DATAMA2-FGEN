<template>
  <div class="section">
    <h2>Offered Packages</h2>
    <label for="package">Select a Package:</label>
    <select v-model="selectedPackage" id="package" name="package" required>
      <option value="homecare-plus-2">Homecare Plus 2</option>
      <option value="homecare-enhance">Homecare Enhance</option>
      <option value="homecare-plus-1">Homecare Plus 1</option>
      <option value="homecare-compre">Homecare Compre</option>
    </select><br><br>

    <div id="package-inclusions">
      <h3>Package Inclusions</h3>
      <table>
        <tr>
          <th>Package</th>
          <th>Inclusions</th>
        </tr>
        <tr v-for="(inclusions, packageName) in packageInclusions" :key="packageName">
          <td>{{ packageName }}</td>
          <td>
            <ul>
              <li v-for="inclusion in inclusions" :key="inclusion">{{ inclusion }}</li>
            </ul>
          </td>
        </tr>
      </table>
    </div><br><br>

    <label for="inception-date">Inception Date:</label>
    <input v-model="inceptionDate" type="date" id="inception-date" name="inception-date" :min="minInceptionDate" required><br><br>

    <button @click="submitPackage">Submit</button>
  </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qlldaarhspqfvvfpnuqf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbGRhYXJoc3BxZnZ2ZnBudXFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NTY4ODIsImV4cCI6MjA1NjIzMjg4Mn0.Q3BCKZzUZ2oas4qPAj9qCNZekuYmSTDRPRcFrl7Wro4';
const supabase = createClient(supabaseUrl, supabaseKey);

export default {
  data() {
    return {
      selectedPackage: 'homecare-plus-2',
      inceptionDate: '',
      packageInclusions: {
        "Homecare Plus 2": ["Fire/Lightning", "Typhoon", "Flood", "Extended Cover", "Riot and Strike", "Malicious Damage", "Robbery/Burglary"],
        "Homecare Enhance": ["Fire/Lightning", "Extended Cover"],
        "Homecare Plus 1": ["Fire/Lightning", "Typhoon", "Flood", "Extended Cover", "Riot and Strike", "Malicious Damage", "Robbery/Burglary"],
        "Homecare Compre": ["Fire/Lightning", "Typhoon", "Flood", "Extended Cover", "Riot and Strike", "Malicious Damage", "Robbery/Burglary", "Broad Water Damage", "Bowtap"]
      }
    };
  },
  computed: {
    minInceptionDate() {
      const today = new Date();
      today.setDate(today.getDate() + 1); // Minimum date is tomorrow
      return today.toISOString().split('T')[0];
    },
  },
  methods: {
    async submitPackage() {
      try {
        const propertyData = this.$store.state.property;
        if (!propertyData || !propertyData.propertiestobecovered_id) {
          alert("Property coverage data not found. Please complete previous steps.");
          return;
        }

        const packageData = {
          propertiestobecovered_id: propertyData.propertiestobecovered_id,
          selectedPackage: this.selectedPackage,
          inceptionDate: this.inceptionDate,
        };

        const { data, error } = await supabase
          .from('OfferedPackages')
          .insert([packageData]);

        if (error) {
          console.error('Error inserting package data:', error);
          alert('Error submitting package form.');
        } else {
          console.log('Package data inserted successfully:', data);
          alert('Package form submitted successfully!');

          this.selectedPackage = 'homecare-plus-2';
          this.inceptionDate = '';
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred.');
      }
    },
  },
};
</script>

<style scoped>
.section {
  padding: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

select, input[type="date"] {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

ul {
  list-style-type: disc;
  margin-left: 20px;
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
